var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    ghPages = require('gulp-gh-pages'),
    shell = require('gulp-shell')

    require('gulp-release-tasks')(gulp);

var pkg = require('./package.json'),
    slim_banner = [
        '*',
        '* Copyright (c) ' + new Date().getFullYear() + ' ' + pkg.author.name,
        '* ' + pkg.name + ' - ' + pkg.description,
        '* @version ' + pkg.version,
        '* @link ' + pkg.homepage,
        '* @license ' + pkg.license.type,
        '*'
        ].join('\n');

gulp.task('jekyll', function() {
    return gulp.src('*.js', {read: false})
      .pipe(shell('jekyll build'))
});

gulp.task('deploy', ['pcss', 'jekyll'] ,function() {
    return gulp.src('./_gh-pages/**/*')
      .pipe(ghPages())
});

gulp.task('pss', function() {
    return gulp.src('./src/pss/' + pkg.name + '.pss')
        .pipe(postcss([
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-for-variables')(),
            require('postcss-for')(),
            require('postcss-custom-properties')(),
            require('postcss-nested')(),
            require('postcss-calc')({ precision: 3 }),
            require('postcss-banner')({banner: slim_banner})
        ]))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./docs/dist/css/'))
});



gulp.task('default',['pcss']);