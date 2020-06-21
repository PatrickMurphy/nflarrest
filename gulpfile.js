const { series } = require('gulp');
var ghpages = require('gh-pages');
var shell = require('shelljs');

// run DB update procs (cache arrest state, cache last arrests, cache arrest table)

// build detailPage html
// minify detailPage JS 

function buildJSONFromDB(cb) {
	shell.exec('node ./Build/BuildJSONFromDB.js', function(code, stdout, stderr) {
		if(code !== 0){
			console.log('Program stderr:', stderr);
			shell.exit(1);
		}else{	
			cb();
		}
	});
}

function minifyHomepageJS(cb) {
	shell.exec('node ./Build/minify-homepageJS.js', function(code, stdout, stderr) {
		if(code !== 0){
			console.log('Program stderr:', stderr);
			shell.exit(1);
		}else{	
			cb();
		}
	});
}

function publishGHPages(cb) {
	// publish branch for website
	ghpages.publish('Website', function(){
		cb();
	});
}

exports.default = series(buildJSONFromDB, minifyHomepageJS);
exports.publish = series(buildJSONFromDB, minifyHomepageJS, publishGHPages)