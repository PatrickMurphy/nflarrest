var mysql = require('mysql');
var fs = require('fs');
var compressor = require('node-minify');

var jsFilename = 'index.min.js';
var cssFilename = "styles.min.css";
var dataFilename = 'ArrestsCacheTable_data.js';
var dataScriptPath = '../Website/js/data/';

var generateCSS = true;
var generateJS = true;
var modular_css = true;

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest'
});

// Handle Script arguments
process.argv.forEach(function (val, index, array) {
	// test test-js only-js only-css modular-css
	if (val === "test") {
		jsFilename = 'index_test.min.js';
		cssFilename = "styles.min.test.css";
	}
	if (val === "test-js") {
		jsFilename = 'index_test.min.js';
	}
	if (val === "only-js") {
		generateCSS = false;
		generateJS = true;
	}
	if (val === "only-css") {
		generateJS = false;
		generateCSS = true;
	}
	if (val === "modular-css") {
		generateCSS = true;
		modular_css = true;
		//cssFilename = "styles-modular.min.css";
	}
});

function cacheSeasonStateProc(mysql, callback){
	mysql.query("CALL CacheArrestSeasonStateByArrest()", function (error, results, fields) {
		console.log("Success::: Cache Season State Proc::  Rows Affected: " + results.affectedRows);
		callback();
	});
}

function cacheSeasonLastArrestProc(mysql, callback){
	mysql.query("CALL CacheLastArrests()", function (error1, results1, fields1) {
		console.log("Success::: Cache Last Arrest By Team Proc::  Rows Affected: " + results1.affectedRows);
		callback();
	});
}

function cacheArrestsDateViewProc(mysql, callback){
	mysql.query("CALL CacheArrestsDateView()", function (error2, results2, fields2) {
			console.log("Success::: Cache ArrestsDateView Proc::  Rows Affected: " + results2.affectedRows);
			callback();
	});
}

function cacheArrestsDateViewJS(mysql, callback){
	mysql.query("SELECT * FROM arrestscachetable", function (error, results, fields) {
				var newText = "var ArrestsCacheTable = " + JSON.stringify(results) + ";";
				//newText += "\r\n" + "module.exports.data = ArrestsCacheTable;";
				fs.writeFile(dataScriptPath+dataFilename, newText, function(err) {
					if(err) {
						return console.log("Error:: " + err);
					}
					console.log("Success:: JS Data Table " + dataFilename + " saved.");
					callback();
				});
	});
}

function minifyHomepage(){
	minifyJS();
	minifyCSS();
}

function minifyJS(){		
	// Using UglifyJS
	if (generateJS) {
		compressor.minify({
			compressor: 'uglifyjs',
			input: ['../Website/js/nflLoadingBar.js',
					'../Website/js/data/ArrestsCacheTable_data.js',
					'../Website/js/DataController.js',
					'../Website/js/index_no_php.js',
					'../Website/js/common.js',
					'../Website/js/charts/stackedBarChart.js',
					'../Website/js/dateRangeController.js',
					'../Website/js/google-tracking.js',
					'../Website/js/loadCSS.js'
					],
			output: '../Website/js/compressed/' + jsFilename,
			callback: function (err, min) {
				console.log('Success:: Minify Homepage JS: ' + jsFilename);
			}
		});
	}
}

function minifyCSS(){
	if (generateCSS) {
		// minify CSS modular or not
		if (modular_css) {
			// generate css from modular files
			compressor.minify({
				compressor: 'clean-css',
				input: ['../Website/css/styles-modular.css',
						'../Website/css/modules/styles-indexpage.css',
						'../Website/css/modules/styles-daterange.css',
						'../Website/css/modules/styles-toplists.css',
						'../Website/css/modules/styles-arrestometer.css',
						'../Website/css/modules/styles-chart.css',
						'../Website/css/modules/styles-cards.css',
						'../Website/css/modules/styles-kpi.css',
						'../Website/css/modules/styles-mobile.css'
					   ],
				output: '../Website/css/' + cssFilename,
				callback: function (err, min) {
					console.log('Success:: CSS Minify finished Modular: ' + cssFilename);
				}
			});
		} else {
			// minify CSS non modular
			compressor.minify({
				compressor: 'clean-css',
				input: ['../Website/css/styles.css'],
				output: '../Website/css/' + cssFilename,
				callback: function (err, min) {
					console.log('Success:: CSS Minify finished non modular: ' + cssFilename);
				}
			});
		}
	}
}

mysql_connection.connect();

cacheSeasonStateProc(mysql_connection, function(){
	cacheSeasonLastArrestProc(mysql_connection, function(){
		cacheArrestsDateViewProc(mysql_connection, function(){
			cacheArrestsDateViewJS(mysql_connection, function(){
				mysql_connection.end();
				minifyHomepage();
			});
		});
	});
});

/*
// Select data
mysql_connection.query("CALL CacheArrestSeasonStateByArrest()", function (error, results, fields) {
    console.log("Cache Season State Proc:  Rows Affected: " + results.affectedRows);
	
	mysql_connection.query("CALL CacheLastArrests()", function (error1, results1, fields1) {
		console.log("Cache Last Arrest By Team Proc:  Rows Affected: " + results1.affectedRows);		
	
		mysql_connection.query("CALL CacheArrestsDateView()", function (error2, results2, fields2) {
			console.log("Cache ArrestsDateView Proc:  Rows Affected: " + results2.affectedRows);
			
			cacheArrestsDateViewJS(mysql_connection, function(){
				mysql_connection.end();
				minifyHomepage();
			});
			
			/*
			//cache arrests js data
			mysql_connection.query("SELECT * FROM arrestscachetable", function (error, results, fields) {
				var newText = "var ArrestsCacheTable = " + JSON.stringify(results) + ";";
				//newText += "\r\n" + "module.exports.data = ArrestsCacheTable;";
				fs.writeFile(dataScriptPath+dataFilename, newText, function(err) {
					if(err) {
						return console.log(err);
					}
					console.log("The file was saved!");
					
					// Using UglifyJS
					if (generateJS) {
						compressor.minify({
							compressor: 'uglifyjs',
							input: ['../Website/js/nflLoadingBar.js',
									'../Website/js/data/ArrestsCacheTable_data.js',
									'../Website/js/DataController.js',
									'../Website/js/index_no_php.js',
									'../Website/js/common.js',
									'../Website/js/charts/stackedBarChart.js',
									'../Website/js/dateRangeController.js',
									'../Website/js/google-tracking.js',
									'../Website/js/loadCSS.js'
									],
							output: '../Website/js/compressed/' + jsFilename,
							callback: function (err, min) {
								console.log('finished: ' + jsFilename);
							}
						});
					}

					if (generateCSS) {
						if (modular_css) {
							// generate css from modular files
							compressor.minify({
								compressor: 'clean-css',
								input: ['../Website/css/styles-modular.css',
										'../Website/css/modules/styles-indexpage.css',
										'../Website/css/modules/styles-daterange.css',
										'../Website/css/modules/styles-toplists.css',
										'../Website/css/modules/styles-arrestometer.css',
										'../Website/css/modules/styles-chart.css',
										'../Website/css/modules/styles-cards.css',
										'../Website/css/modules/styles-kpi.css',
										'../Website/css/modules/styles-mobile.css'
									   ],
								output: '../Website/css/' + cssFilename,
								callback: function (err, min) {
									console.log('css finished: ' + cssFilename);
								}
							});
						} else {
							compressor.minify({
								compressor: 'clean-css',
								input: ['../Website/css/styles.css'],
								output: '../Website/css/' + cssFilename,
								callback: function (err, min) {
									console.log('css finished: ' + cssFilename);
								}
							});
						}
					}
				}); 
			});
		});
	});
});
*/