// TODO use gulp for this and gulp-minify

var compressor = require('node-minify');

var filename = 'index.min.js';
var cssFilename = "styles.min.css";

var generateCSS = true;
var generateJS = true;
var modular_css = true;


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
		input: ['../public_html/js/index_no_php.js',
				'../public_html/js/common.js',
				'../public_html/js/charts/stackedBarChart.js',
				'../public_html/js/dateRangeController.js',
				'../public_html/js/google-tracking.js',
				'../public_html/js/nflLoadingBar.js',
				'../public_html/js/loadCSS.js',
				'../public_html/js/data/ArrestsCacheTable_data.js',
				'../public_html/js/DataController.js'
				],
		output: '../public_html/js/compressed/' + filename,
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
			input: ['../public_html/css/styles-modular.css',
                    '../public_html/css/modules/styles-indexpage.css',
                    '../public_html/css/modules/styles-daterange.css',
                    '../public_html/css/modules/styles-toplists.css',
                    '../public_html/css/modules/styles-arrestometer.css',
                    '../public_html/css/modules/styles-chart.css',
                    '../public_html/css/modules/styles-cards.css',
                    '../public_html/css/modules/styles-kpi.css',
					'../public_html/css/modules/styles-mobile.css'
                   ],
			output: '../public_html/css/' + cssFilename,
			callback: function (err, min) {
				console.log('css finished: ' + cssFilename);
			}
		});
	} else {
		compressor.minify({
			compressor: 'clean-css',
			input: ['../public_html/css/styles.css'],
			output: '../public_html/css/' + cssFilename,
			callback: function (err, min) {
				console.log('css finished: ' + cssFilename);
			}
		});
	}
}
