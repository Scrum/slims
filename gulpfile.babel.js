import gulp from 'gulp';
import postcss from 'gulp-postcss';
import ghPages from 'gulp-gh-pages';
import execa from 'execa';

export function jekyll() {
	return execa.shell('jekyll build');
}

export function deployGhPages() {
	return gulp.src('./_gh-pages/**/*')
		.pipe(ghPages());
}

export function csssupport() {
	return gulp.src('./dist/css/**/*.css')
		.pipe(postcss([
			require('doiuse')({
				browsers: [
					'ie >= 10',
					'last 2 versions'
				]
			})
		]));
}

const test = gulp.parallel(csssupport);
export {test};

const deploy = gulp.series(jekyll, deployGhPages);
export {deploy};

export default test;
