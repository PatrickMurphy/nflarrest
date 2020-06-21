var ghpages = require('gh-pages');

// run DB update procs (cache arrest state, cache last arrests, cache arrest table)
// build json from db
// minify homepage
// build detailPage html
// minify detailPage JS 
ghpages.publish('../Website', function(err) {
	console.log(err);
});