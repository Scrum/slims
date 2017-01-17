import gulp from 'gulp';
import postcss from 'gulp-postcss';

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

export default test;
