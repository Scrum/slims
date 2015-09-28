var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    ghPages = require('gulp-gh-pages'),
	shell = require('gulp-shell'),
	changelog = require('gulp-conventional-changelog');

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

gulp.task('changelog', function() {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
    .pipe(changelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('copy', function() {
    return gulp.src('./dist/**/*.*', {base: './dist/'})
      .pipe(gulp.dest('./docs/dist/'))
});

gulp.task('jekyll', function() {
    return gulp.src('*.js', {read: false})
      .pipe(shell('jekyll build'))
});

gulp.task('deploy', ['pcss', 'copy', 'jekyll'] ,function() {
    return gulp.src('./_gh-pages/**/*')
      .pipe(ghPages())
});

gulp.task('pcss', function() {
    return gulp.src('./app/pcss/' + pkg.name + '.pcss')
    	.pipe(postcss([
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-nested')(),
            require('postcss-for-variables')(),
            require('postcss-for')(),
            require('postcss-custom-properties')(),
            require('postcss-calc')({ precision: 3 }),
    		require('postcss-banner')({banner: slim_banner})
    	]))
    	.pipe(rename({ extname: '.css' }))
    	.pipe(gulp.dest('./dist/css/'));
});



gulp.task('default',['pcss']);