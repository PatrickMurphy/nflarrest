// TODO use gulp for this and gulp-minify

var compressor = require('node-minify');

var filename = 'index.min.js';
var cssFilename = "styles.min.css";

var generateCSS = false;
var generateJS = true;
var modular_css = false;


// Handle Script arguments
process.argv.forEach(function (val, index, array) {
	// test test-js only-js only-css modular-css
	if (val === "test") {
		filename = 'index_test.min.js';
		cssFilename = "styles.min.test.css";
	}
	if (val === "test-js") {
		filename = 'index_test.min.js';
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

// Using UglifyJS
if (generateJS) {
	compressor.minify({
		compressor: 'uglifyjs',
		input: ['Website/js/nflLoadingBar.js',
				'Website/js/data/ArrestsCacheTable_data.js',
				'Website/js/DataController.js',
				'Website/js/index_no_php.js',
				'Website/js/common.js',
				'Website/js/charts/stackedBarChart.js',
				'Website/js/dateRangeController.js',
				'Website/js/google-tracking.js',
				'Website/js/loadCSS.js'
				],
		output: 'Website/js/compressed/' + filename,
		callback: function (err, min) {
			console.log('finished: ' + filename);
		}
	});
}

if (generateCSS) {
	if (modular_css) {
		// generate css from modular files
		compressor.minify({
			compressor: 'clean-css',
			input: ['Website/css/styles-modular.css',
                    'Website/css/modules/styles-indexpage.css',
                    'Website/css/modules/styles-daterange.css',
                    'Website/css/modules/styles-toplists.css',
                    'Website/css/modules/styles-arrestometer.css',
                    'Website/css/modules/styles-chart.css',
                    'Website/css/modules/styles-cards.css',
                    'Website/css/modules/styles-kpi.css',
					'Website/css/modules/styles-mobile.css'
                   ],
			output: 'Website/css/' + cssFilename,
			callback: function (err, min) {
				console.log('css finished: ' + cssFilename);
			}
		});
	} else {
		compressor.minify({
			compressor: 'clean-css',
			input: ['Website/css/styles.css'],
			output: 'Website/css/' + cssFilename,
			callback: function (err, min) {
				console.log('css finished: ' + cssFilename);
			}
		});
	}
}
