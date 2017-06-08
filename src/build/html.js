const path = require('path');
const fs = require('fs');
const posthtml = require('posthtml');

[
	'./src/docs/index.html',
	'./src/docs/grid-col.html',
	'./src/docs/grid-row.html'
].forEach(file => {
	const html = fs.readFileSync(path.resolve(file), 'utf8');

	posthtml([
		require('posthtml-extend')({
			root: 'src/docs/'
		}),
		require('posthtml-modules')({
			root: 'src/docs/',
			from: 'src/docs/layout/'
		}),
		require('posthtml-spaceless')()
	])
	.process(html)
	.then(result => {
		fs.writeFileSync(path.resolve(`./docs/${path.basename(file)}`), result.html);
	});
});
