var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	banner = require('postcss-banner'),
	rename = require('gulp-rename'),
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

/*gulp.task('bump', function(type){
	console.log(type);
	var type = type ? type : 'path';
	gulp.src('./package.json')
		.pipe(bump({type: type}))
		.pipe(gulp.dest('./'));
});*/

gulp.task('changelog', function() {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
    .pipe(changelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('pcss', function() {
	var processors = [
		banner({banner: slim_banner})
	];
    return gulp.src('./app/pcss/' + pkg.name + '.pcss')
    	.pipe(postcss(processors))
    	.pipe(rename({ extname: '.css' }))
    	.pipe(gulp.dest('./dest/css/'));
});



gulp.task('default',['pcss']);