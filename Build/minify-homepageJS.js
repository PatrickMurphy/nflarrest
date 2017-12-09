var compressor = require('node-minify');

var filename = 'compressed_homepage.js';
var cssFilename = "styles.min.css";

var generateCSS = true;
var generateJS = true;

process.argv.forEach(function (val, index, array) {
    if (val == "test") {
        filename = 'compressed_homepage_test.js';
        cssFilename = "styles.min.test.css"
    }
    if (val == "only-js") {
        generateCSS = false;
        generateJS = true;
    }
    if (val == "only-css") {
        generateJS = false;
        generateCSS = true;
    }
    if (val == "test-js") {
        filename = 'compressed_homepage_test.js';
    }
});

// Using UglifyJS
if (generateJS) {
    compressor.minify({
        compressor: 'uglifyjs',
        input: ['../js/index.js', '../js/common.js', '../js/stackedBarChart.js', '../js/dateRangeController.js', '../js/google-tracking.js', '../js/nflLoadingBar.js', '../js/loadCSS.js'],
        output: '../js/' + filename,
        callback: function (err, min) {
            console.log('finished: ' + filename);
        }
    });
}

if (generateCSS) {
    compressor.minify({
        compressor: 'clean-css',
        input: ['../css/styles.css'],
        output: '../css/' + cssFilename,
        callback: function (err, min) {
            console.log('css finished: ' + cssFilename);
        }
    });
}
