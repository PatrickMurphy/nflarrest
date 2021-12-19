const { series } = require('gulp');
var shell = require('shelljs');

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

function buildSeasonStateDB(cb) {
	runNode('./ghPages/BuildAllDBMinify_DW.js', cb, nodeCB);
}

exports.default = series(buildJSONFromDB, minifyHomepageJS, buildSiteMap);
exports.buildDB = series(buildSeasonStateDB, buildArrestCacheTableDB, buildLastArrestsDB);
exports.publish = series(buildSeasonStateDB, buildArrestCacheTableDB, buildLastArrestsDB, buildJSONFromDB, minifyHomepageJS, buildSiteMap, publishGHPages)