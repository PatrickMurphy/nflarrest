const { series } = require('gulp');
var ghpages = require('gh-pages');
var shell = require('shelljs');

// run DB update procs (cache arrest state, cache last arrests, cache arrest table)

// build detailPage html
// minify detailPage JS 

function runNode(path, cb1, cb){
	shell.exec('node '+ path, function(code, stdout, stderr){
		cb(code, stdout, stderr, cb1);
	});
}

function nodeCB(code, stdout, stderr, cb) {
	if(code !== 0){
		console.log('Program stderr:', stderr);
		shell.exit(1);
	}else{	
		cb();
	}
}

function buildArrestCacheTableDB(cb) {
	runNode('./Build/BuildArrestsCacheTableDB.js', cb, nodeCB);
}

function buildLastArrestsDB(cb) {
	runNode('./Build/BuildCacheLastArrestsDB.js', cb, nodeCB);
}

function buildJSONFromDB(cb) {
	runNode('./Build/BuildJSONFromDB.js', cb, nodeCB);
}

function minifyHomepageJS(cb) {
	runNode('./Build/minify-homepageJS.js', cb, nodeCB);
}

function buildSiteMap(cb) {
	runNode('./Build/BuildSitemap.js', cb, nodeCB);
}

function publishGHPages(cb) {
	ghpages.publish('Website', cb);
}

exports.default = series(buildJSONFromDB, minifyHomepageJS, buildSiteMap);
exports.buildDB = series(buildSeasonStateDB, buildArrestCacheTableDB, buildLastArrestsDB);
exports.publish = series(buildSeasonStateDB, buildArrestCacheTableDB, buildLastArrestsDB, buildJSONFromDB, minifyHomepageJS, buildSiteMap, publishGHPages)