import gulp from 'gulp';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import ghPages from 'gulp-gh-pages';
import pkg from './package.json';
import execa from 'execa';
import cssValidator from 'gulp-css-validator';

const slimBanner = (
	`*
	* Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
	* ${pkg.title} - ${pkg.description}
	* @version ${pkg.version}
	* @link ${pkg.homepage}
	* @license ${pkg.license.type}
	*`);

export function jekyll() {
	return execa.shell('jekyll build');
}

export function deployGhPages() {
	return gulp.src('./_gh-pages/**/*')
		.pipe(ghPages());
}

export function psslint() {
	return gulp.src('./src/pss/**/*.pss')
		.pipe(postcss([
			require('stylelint')()
		]));
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

export function pss() {
	return gulp.src(`./src/pss/${pkg.title}.pss`)
		.pipe(postcss([
			require('postcss-devtools')(),
			require('postcss-easy-import')({
				prefix: '_',
				extensions: '.pss'
			}),
			require('postcss-each')(),
			require('postcss-mixins')(),
			require('postcss-at-rules-variables')(),
			require('postcss-custom-properties')(),
			require('postcss-for')(),
			require('postcss-conditionals'),
			require('postcss-nested')(),
			require('postcss-calc')({precision: 6}),
			require('postcss-clearfix')(),
			require('postcss-initial')(),
			require('postcss-class-prefix')('sl-'),
			require('postcss-attribute-selector-prefix')({prefix: 'sl-', filter: ['class']}),
			require('postcss-sorting')(),
			require('postcss-banner')({banner: slimBanner}),
			require('postcss-browser-reporter')()
		]))
		.pipe(cssValidator())
		.pipe(rename({extname: '.css'}))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulp.dest('./docs/dist/css/'))
		.pipe(postcss([
			require('postcss-devtools')(),
			require('postcss-csso')()
		]))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulp.dest('./docs/dist/css/'));
}

const test = gulp.parallel(psslint, csssupport);
export {test};

const deploy = gulp.series(pss, jekyll, deployGhPages);
export {deploy};

const build = gulp.series(test, gulp.parallel(pss));
export {build};

export default build;
