import gulp from 'gulp';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import ghPages from 'gulp-gh-pages';
import pkg from './package.json';
import cssnano from 'gulp-cssnano';
import shell from 'gulp-shell';

const slim_banner = (
`*
* Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
* ${pkg.name} - ${pkg.description}
* @version ${pkg.version}
* @link ${pkg.homepage}
* @license ${pkg.license.type}
*`);

gulp.task('jekyll', () => {
    return gulp.src('*.js', {read: false})
      .pipe(shell('jekyll build'))
});

gulp.task('deploy', ['pss', 'jekyll'] ,() => {
    return gulp.src('./_gh-pages/**/*')
      .pipe(ghPages())
});

gulp.task('psslint', function() {
    return gulp.src('./src/pss/**/*.pss')
        .pipe(postcss([
            require('stylelint')()
        ]))
});

gulp.task('pss', ['psslint'],() => {
    return gulp.src(`./src/pss/${pkg.name}.pss`)
        .pipe(postcss([
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-at-rules-variables')(),
            require('postcss-custom-properties')(),
            require('postcss-for')(),
            require('postcss-conditionals'),
            require('postcss-nested')(),
            require('postcss-calc')({ precision: 3 }),
            require('postcss-class-prefix')('sl-'),
            require('postcss-banner')({banner: slim_banner})
        ]))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./docs/dist/css/'))
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./docs/dist/css/'))
});



gulp.task('default',['pss']);