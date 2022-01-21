// --- Include Refrenced Packages --- //
var fs = require('fs');
var UglifyJS = require("uglify-js");
var mysql = require('mysql');
var node_minify = require('node-minify');
var simple_git = require('simple-git');
var readline = require('readline');
var readlinesync = require('readline-sync');
var mysqldump = require('mysqldump');
var dbConfig = require('./dbconfig');
var shell = require('shelljs');
var pug = require('pug');

// --- Setup imported objects --- //
var git = simple_git('./nflarrest/');
var mysql_user_options = dbConfig;


// --- Add Run Node Process Functions --- //
// spawn node child process
function runNode(path, cb1, cb) {
    shell.exec('node ' + path, function (code, stdout, stderr) {
        cb(code, stdout, stderr, cb1);
    });
}

// standard default callback for node child process
function nodeCB(code, stdout, stderr, cb) {
    if (code !== 0) {
        console.log('Program stderr:', stderr);
        shell.exit(1);
    } else {
        cb();
    }
}

// --- Setup Enum Variables --- //
var runOption_Environment_Details_enum = [{
    Environment: "development",
    path: "/development/"
}, {
    Environment: "production",
    path: "/"
}];
var runOption_Environment_Names_enum = ["development", "production"];
var runOption_Release_Detail_Types_enum = {
    "FileChangeCount": 1,
    "FileChangedPath": 2,
    "CommitHash": 3,
    "ArrestCount": 4
};
var runOption_Release_Detail_Types_Names_enum = ["FileChangeCount", "FileChangedPath", "CommitHash", "ArrestCount"];

// --- Script Arguments --- //
var runOption_Environment = 0;
var runOption_Generate_CSS_Flag = true;
var runOption_Generate_JS_Flag = true;
var runOption_UseModular_CSS_Flag = true;
var runOption_publish_Flag = false;
var runOption_publish_mode_AllFiles = false;
var runOption_publish_mode_Update = false;
var runOption_Commit_Message_Flag = false;
var runOption_Release_Flag = false;
var runOption_Skip_Questions = false;

// --- User Input Variables --- //
var runOption_UserInput_Version = 'x.x.x';
var runOption_UserInput_Commit_MSG = '';

// --- Runtime Variables --- //
var runVariables_GitStatus_Files = undefined;
var runVariables_GitStatus_Files_ReturnStatus = false;
var runVariables_ArrestCount = 0;

// --- Script Parameters --- //
var path_global = "nflarrest";
var MinFilename_JS = 'index.min.js';
var MinFilename_Detail_JS = 'DetailPage.min.js';
var MinFilename_CSS = "styles.min.css";
var DataFilename_JSON = 'ArrestsCacheTable_data.js';
var DataFilename_ReleaseHistory = 'ReleaseHistory_data.js';
var DataFilePath = 'js/data/';
var PUGFilePath = 'views/';

var DW_stored_procedures = ["sp_dim_day_update", "sp_etl_arrests", "sp_materialize_arrests"];
var DW_arrests_view = "vwarrestsweb";
var mysqldump_path = '../Database/backup/lastGHPagesUpdateDump.sql';

var cacheUglifyJSFileName1 = "./cacheJSMinifyNamesIndex.json";
var cacheUglifyJSFileName2 = "./cacheJSMinifyNamesDetailPage.json";
var JS_filenames_index = ['js/LoadingBarManager.js',
    'js/modules/ArrestCard.Module.js',
    'js/data/lastUpdate_data.js',
    'js/DataController.js',
    'js/Utilities.js',
    'js/GoogleAnalyticsManager.js',
    'js/WebPage.js',
    'js/charts/Chart.js',
    'js/IndexPage.js',
    'js/charts/stackedBarChart.js',
    'js/DateRangeControl.js',
    'js/StyleSheetManager.js'
];

// any files that are new that have not been added to production environment, these files need to be moved to production before prod release
var JS_filenames_index_development = [];

var JS_filenames_detail = [
    'js/LoadingBarManager.js',
    'js/Utilities.js',
    'js/GoogleAnalyticsManager.js',
    'js/WebPage.js',
    'js/DetailPage.js',
    'js/model/FiltersModel.js',
    'js/FiltersControl.js',
    'js/charts/Chart.js',
    'js/charts/DonutChart.js',
    'js/data/lastUpdate_data.js',
    'js/modules/ArrestCard.Module.js',
    'js/DataController.js',
    'js/charts/timeSeriesChart.js',
    'js/DateRangeControl.js',
    'js/StyleSheetManager.js'
];

// any files that are new that have not been added to production environment, these files need to be moved to production before prod release
var JS_filenames_detail_development = [];

var CSS_filenames = ['css/styles-modular.css',
    //'css/modules/styles-indexpage.css', // remove to include individually on page
    'css/modules/styles-daterange.css',
    'css/modules/styles-toplists.css',
    'css/modules/styles-arrestometer.css',
    'css/modules/styles-chart.css',
    'css/modules/styles-cards.css',
    'css/modules/styles-kpi.css',
    'css/modules/styles-mobile.css',
    'css/modules/styles-newsletter.css'
];

// any files that are new that have not been added to production environment, these files need to be moved to production before prod release
var CSS_filenames_development = [];

// --------- PUG Variables ----------- //
var PUG_fn_generateDetailPageCrime,PUG_fn_generateDetailPagePlayer,PUG_fn_generateDetailPageTeam,PUG_fn_generateDetailPagePosition;

function main_is_development_env() {
    return runOption_Environment_Details_enum[runOption_Environment].Environment === 'development';
}

function main_get_env() {
    return runOption_Environment_Details_enum[runOption_Environment];
}

function getEnvPath(path) {
    return path_global + main_get_env().path + path;
}

function getJSFiles() {
    var jsFiles = [];

    if (main_is_development_env()) {
        for (var i = 0; i < JS_filenames_index_development.length; i++) {
            jsFiles.push(getEnvPath(JS_filenames_index_development[i]));
        }
    }

    for (var i = 0; i < JS_filenames_index.length; i++) {
        jsFiles.push(getEnvPath(JS_filenames_index[i]));
    }

    return jsFiles;
}

function getJSFilesDetail() {
    var jsFiles2 = [];

    if (main_is_development_env()) {
        for (var i = 0; i < JS_filenames_detail_development.length; i++) {
            jsFiles2.push(getEnvPath(JS_filenames_detail_development[i]));
        }
    }

    for (var i = 0; i < JS_filenames_detail.length; i++) {
        jsFiles2.push(getEnvPath(JS_filenames_detail[i]));
    }

    return jsFiles2;
}

function getCSSFiles() {
    var cssFiles = [];

    if (main_is_development_env()) {
        for (var i = 0; i < CSS_filenames_development.length; i++) {
            cssFiles.push(getEnvPath(CSS_filenames_development[i]));
        }
    }

    for (var i = 0; i < CSS_filenames.length; i++) {
        cssFiles.push(getEnvPath(CSS_filenames[i]));
    }

    return cssFiles;
}

// ------- PUG Functions ----------//
function setupPUG() {
    PUG_fn_generateDetailPageCrime = pug.compileFile(getEnvPath(PUGFilePath + 'Crime.pug'));
    PUG_fn_generateDetailPagePlayer = pug.compileFile(getEnvPath(PUGFilePath + 'Player.pug'));
    PUG_fn_generateDetailPageTeam = pug.compileFile(getEnvPath(PUGFilePath + 'Team.pug'));
    PUG_fn_generateDetailPagePosition = pug.compileFile(getEnvPath(PUGFilePath + 'Position.pug'));
}

function exportPUGViews(){
    var pageData = {pageTitle:'Crime',pageDesc:"The page where you can read about crimes."};
    fs.writeFile(getEnvPath('Crime.html'), PUG_fn_generateDetailPageCrime(pageData), function (err) {
        if (err) {
            return console.log("Error:: " + err);
        }
        console.log("Success::       PUG Crime Output saved.");
    });
    pageData = {pageTitle:'Player',pageDesc:"The page where you can read about crimes by each NFL Player arrested."};
    fs.writeFile(getEnvPath('Player.html'), PUG_fn_generateDetailPagePlayer(pageData), function (err) {
        if (err) {
            return console.log("Error:: " + err);
        }
        console.log("Success::       PUG Player Output saved.");
    });
    pageData = {pageTitle:'Team',pageDesc:"The page where you can read about NFL Arrests by team."};
    fs.writeFile(getEnvPath('Team.html'), PUG_fn_generateDetailPageTeam(pageData), function (err) {
        if (err) {
            return console.log("Error:: " + err);
        }
        console.log("Success::       PUG Team Output saved.");
    });
    pageData = {pageTitle:'Position',pageDesc:"The page where you can read about NFL crimes by position."};
    fs.writeFile(getEnvPath('Position.html'), PUG_fn_generateDetailPagePosition(pageData), function (err) {
        if (err) {
            return console.log("Error:: " + err);
        }
        console.log("Success::       PUG Position Output saved.");
    });
}


// ------- MYSQL Functions ------- //
function dumpDatabase(callback) {
    console.log('MYSQL:          DUMP SQL');
    mysqldump({
        connection: {
            host: mysql_user_options.host,
            user: mysql_user_options.user,
            password: mysql_user_options.password,
            database: mysql_user_options.database,
        },
        dumpToFile: mysqldump_path,
    });

    callback();
}

function getEnvironmentDBIndex() {
    var envFilterId = 1; //dev
    if (main_is_development_env()) {
        envFilterId = 1; // development
    } else {
        envFilterId = 2; // production
    }
    return envFilterId;
}

function getLatestVersion(mysql2, callback) {

    var strQuery = "SELECT build_release_version FROM nflarrestdw.build_release WHERE build_release_id = (SELECT MAX(build_release_id) FROM nflarrestdw.build_release WHERE build_release_version <> 'x.x.x')"; //AND build_environment_id = " + getEnvironmentDBIndex() + ")";
    mysql2.query(strQuery, (error2, results2, fields2) => {
        if (error2) {
            console.log(error2);
        }

        var res = results2[0];
        console.log("MYSQL:          Result: Latest Version = " + res.build_release_version);
        callback(parseVersionStr(res.build_release_version));
    });
};

function versionObjToString(versionObj) {
    return versionObj.version_major + '.' + versionObj.version_minor + '.' + versionObj.version_revision;
}

function parseVersionStr(versionStr) {
    var versionParts = [];
    var returnObj = {
        version_major: 0,
        version_minor: 0,
        version_revision: 0
    };
    if (versionStr.indexOf('.') > -1) {
        versionParts = versionStr.split(".");
        for (var i = 0; i < versionParts.length; i++) {
            var tmpInt = parseInt(versionParts[i]);
            if (i == 0) {
                returnObj.version_major = tmpInt;
            } else if (i == 1) {
                returnObj.version_minor = tmpInt;
            } else if (i == 2) {
                returnObj.version_revision = tmpInt;
            }
        }
    }

    return returnObj;
}

function insertBuildRelease(mysql, desc, version) {
    var envdbid = runOption_Environment + 1;
    var reldate = new Date();
    var build_release_version = version || runOption_UserInput_Version;
    var build_release_type_id = 1;

    if (main_is_development_env()) {
        build_release_type_id = runOption_Release_Flag ? 2 : 3;
    }

    var release = {
        build_environment_id: envdbid,
        build_release_type_id: build_release_type_id,
        build_release_version: build_release_version,
        build_release_description: desc,
        build_release_date: reldate.toISOString().split('T')[0]
    };

    var strQuery = "INSERT INTO nflarrestdw.build_release SET ?";
    mysql.query(strQuery, release, (error2, results2, fields2) => {
        if (error2) {
            console.log(error2);
        }
        console.log("Success::     MYSQL INSERT Build Release::  InsertID: " + results2.insertId);

        insertBuildReleaseDetail(mysql, results2.insertId, runOption_Release_Detail_Types_enum.FileChangeCount, runVariables_GitStatus_Files.length);
        insertBuildReleaseDetail(mysql, results2.insertId, runOption_Release_Detail_Types_enum.ArrestCount, runVariables_ArrestCount);
        for (var i = 0; i < runVariables_GitStatus_Files.length; i++) {
            insertBuildReleaseDetail(mysql, results2.insertId, runOption_Release_Detail_Types_enum.FileChangedPath, runVariables_GitStatus_Files[i].path);
        }

        insertBuildReleaseDetailCommit(mysql, results2.insertId);
    });
}

// insert a release detail to sql, given release id, detail type and a value
function insertBuildReleaseDetail(mysql, releaseID, detailType, val) {
    var release = {
        build_release_id: releaseID,
        build_release_detail_type_id: detailType,
        build_release_detail_value: val
    };

    var strQuery = "INSERT INTO nflarrestdw.build_release_detail SET ?";
    mysql.query(strQuery, release, (error2, results2, fields2) => {
        if (error2) {
            console.log(error2);
        }
        console.log("Success::     MYSQL INSERT Build " + runOption_Release_Detail_Types_Names_enum[detailType - 1] + " Release Detail::  InsertID: " + results2.insertId);

    });
}

// get the most recent commit and insert into db
function insertBuildReleaseDetailCommit(mysql, build_release_id) {
    git.revparse(['HEAD'], function (err, mostRecentCommitHash) {
        insertBuildReleaseDetail(mysql, build_release_id, runOption_Release_Detail_Types_enum.CommitHash, mostRecentCommitHash);
    });
}

// use stored_procedures array for sp
function call_sp(sp, mysql, callback) {
    mysql.query("CALL " + sp + "()", function (error2, results2, fields2) {
        if (error2) {
            console.log(error2);
        } else {
            console.log("Success::       " + sp + "() Proc::  Rows Affected: " + results2.affectedRows);
            callback(results2.affectedRows);
        }
    });
}

function cacheArrestsDateViewJS(mysql, callback) {
    var SelectQuery = "SELECT * FROM " + DW_arrests_view;

    mysql.query(SelectQuery, function (error, results, fields) {
        var newText = "var ArrestsCacheTable = " + JSON.stringify(results) + ";";

        fs.writeFile(getEnvPath(DataFilePath + DataFilename_JSON), newText, function (err) {
            if (err) {
                return console.log("Error:: " + err);
            }
            console.log("Success::       JS Data Table " + DataFilename_JSON + " saved.");
            callback();
        });
    });
}

// save js file for UI include with variables for current datetime and most recent release version
// issue todo: assumes runoption user input version is already set
function cacheUpdateDate(mysql, callback) {
    var datecurr = new Date();
    var newText = "var lastUpdate = \"" + datecurr.toLocaleString("en-US") + "\";";
    newText += ' var lastVersion = "' + runOption_UserInput_Version + '";';
    fs.writeFile(getEnvPath(DataFilePath + "lastUpdate_data.js"), newText, function (err) {
        if (err) {
            return console.log("Error:: " + err);
        }
        console.log("Success::       JS Data Table " + "lastUpdate_data.js" + " saved.");
        callback();
    });
}

// save js file for UI include with results of view vwbuildreleases
function cacheReleaseHistory(mysql, callback) {
    var SelectQuery = "SELECT * FROM vwbuildreleases;";

    mysql.query(SelectQuery, function (error, results, fields) {
        var newText = "var ReleaseHistoryCacheTable = " + JSON.stringify(results) + ";";

        fs.writeFile(getEnvPath(DataFilePath + DataFilename_ReleaseHistory), newText, function (err) {
            if (err) {
                return console.log("Error:: " + err);
            }
            console.log("Success::       JS Data Table " + DataFilename_ReleaseHistory + " saved.");
            callback();
        });
    });
}
// ------- End MYSQL Functions ------- //

// ------- Minify Functions ------- //
function minifyHomepage(callback) {
    minifyJS(function () {
        minifyCSS(function () {
            callback();
        });
    });
}

function minifyJS(callback) {
    // Using UglifyJS
    if (runOption_Generate_JS_Flag) {
        var files1 = getJSFiles();
        var files2 = getJSFilesDetail();

        var fileObj1 = {};
        var fileObj2 = {};

        for (var i = 0; i < files1.length; i++) {
            var key = files1[i].slice(files1[i].lastIndexOf('/') + 1, files1[i].length);
            fileObj1[key] = fs.readFileSync(files1[i], "utf8");
        }

        for (var j = 0; j < files2.length; j++) {
            var key = files2[j].slice(files2[j].lastIndexOf('/') + 1, files2[j].length);
            fileObj2[key] = fs.readFileSync(files2[j], "utf8");
        }

        var opts1 = readCacheJSMinifyNames(cacheUglifyJSFileName1);

        fs.writeFileSync(getEnvPath('js/compressed/' + MinFilename_JS), UglifyJS.minify(fileObj1, opts1).code);
        //writeCacheJSMinifyNames(JSON.stringify(opts1.nameCache), cacheUglifyJSFileName1);
        console.log('Success::       Minify Homepage JS: ' + MinFilename_JS);

        fs.writeFileSync(getEnvPath('js/compressed/' + MinFilename_Detail_JS), UglifyJS.minify(fileObj2, opts1).code);
        writeCacheJSMinifyNames(JSON.stringify(opts1.nameCache), cacheUglifyJSFileName1);
        console.log('Success::       Minify Homepage JS Detail Page: ' + MinFilename_Detail_JS);

        callback();
    }
}

function minifyCSS(callback) {
    if (runOption_Generate_CSS_Flag) {
        // minify CSS modular or not
        if (runOption_UseModular_CSS_Flag) {
            // generate css from modular files
            node_minify.minify({
                compressor: 'clean-css',
                input: getCSSFiles(),
                output: getEnvPath('css/' + MinFilename_CSS),
                callback: function (err, min) {
                    console.log('Success::       CSS Minify finished Modular: ' + MinFilename_CSS);
                    callback();
                }
            });
        } else {
            // minify CSS non modular
            node_minify.minify({
                compressor: 'clean-css',
                input: [getEnvPath('css/styles.css')],
                output: getEnvPath('css/' + MinFilename_CSS),
                callback: function (err, min) {
                    console.log('Success::       CSS Minify finished non modular: ' + MinFilename_CSS);
                    callback();
                }
            });
        }
    }
}

function writeCacheJSMinifyNames(cache, filename) {
    fs.writeFileSync(filename, cache, "utf8");
}

function readCacheJSMinifyNames(filename, firstRun) {
    firstRun = firstRun || '';

    var options = {
        nameCache: JSON.parse(fs.readFileSync(filename, "utf8"))
    };
    /*
    if(true){// switch if file does not exist?
        options.nameCache = JSON.parse(fs.readFileSync(filename, "utf8"));
    }
    */
    return options;
}
// ------- End Minfiy Functions ------- //


// ------- Publish (GIT) Functions ------- //
function checkPublish(mysql) {
    if (runOption_publish_Flag) {
        promptConfirmPublish(mysql);
    } else {
        console.log("GIT:          Not Publishing (tip: add arg 'publish' to publish)");
    }
}


// get git status result and print it
async function getGitFileStatus(useEnvironmentPath) {
    useEnvironmentPath = useEnvironmentPath || false;
    var StatusResult = await git.status(['.' + runOption_Environment_Details_enum[runOption_Environment].path]);
    var SRFiles = [];

    // set runtime variable
    runVariables_GitStatus_Files_ReturnStatus = true;
    runVariables_GitStatus_Files = StatusResult.files;
    for (var i = 0; i < StatusResult.files.length; i++) {
        SRFiles.push(StatusResult.files[i].working_dir + ": " + StatusResult.files[i].path);
    }

    console.log('');
    console.log("----------------  Files Modified Locally  --------------");
    console.log(SRFiles);
}

function read_input_version() {
    var versionNumAnswer = runOption_UserInput_Version;
    if (runOption_Release_Flag) {
        versionNumAnswer = readlinesync.question("GIT:          Release Version: ");
        console.log("GIT:          Version set to: " + versionNumAnswer);
        return versionNumAnswer;
    }

    return versionNumAnswer;
}

function read_input_commit_msg() {
    if (runOption_Commit_Message_Flag) {
        var answer2 = readlinesync.question("GIT:          Commit Message: ");
        if (answer2 === "no" || answer2 === 'quit') {
            console.log("GIT:          Not Publishing");
        } else {
            console.log("GIT:          Commit Message set to: " + answer2);
            return answer2;
        }
    }
}

async function promptConfirmPublish(mysql) {
    var useEnvironmentPath = true;
    await getGitFileStatus(useEnvironmentPath); // use environment specific path to limit file changes to dev when  

    runOption_UserInput_Version = read_input_version();

    // if commit message set in args
    runOption_UserInput_Commit_MSG = read_input_commit_msg();

    console.log("VERSION:      " + runOption_UserInput_Version);
    // setup all file message or no message
    var allFiles = runOption_publish_mode_AllFiles ? ' ~~!!WARNING ALL FILES SET!!~~ ' : '';
    if (main_ask_bool_input(mysql, "GIT:          Publish changes? " + allFiles + " Yes/[no]: ", 1)) {
        console.log("GIT:          Publishing...");
        publishGHPages(mysql);
    } else { // said no to publish
        console.log("GIT:          Not Publishing");
    }
}

function publishGHPages(mysql) {
    //Git add ., Git commit -m "update x", git push;
    if (runOption_publish_mode_AllFiles) {
        var addAllPath = '.';
        if (runOption_Environment == runOption_Environment_Names_enum.indexOf("development")) {
            addAllPath += runOption_Environment_Details_enum[runOption_Environment].path;
        }
        git.add(addAllPath, function (p1, p2, p3) {
            console.log('GIT File Add: all changes');
            var datenow = new Date();
            var theMsg = runOption_Commit_Message_Flag ? runOption_UserInput_Commit_MSG : "Commit";
            var hours = datenow.getHours() > 9 ? datenow.getHours() : "0" + datenow.getHours();
            var mins = datenow.getMinutes() > 9 ? datenow.getMinutes() : "0" + datenow.getMinutes();
            var date = datenow.toLocaleDateString('en-US');
            var env = runOption_Environment_Details_enum[runOption_Environment].Environment;

            var msg = `BUILD ${env} ${runOption_UserInput_Version}: ${theMsg} || ${date} ${hours}:${mins}`;

            git.commit(msg, function () {
                git.push();
                insertBuildRelease(mysql, msg, runOption_UserInput_Version);
            });
        });
    } else {
        // create return var to use modified files only
        var tmp_runVariables_GitStatus_Files = [];
        git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/data/ArrestsCacheTable_data.js', function (p1, p2, p3) {
            tmp_runVariables_GitStatus_Files = ifFileChangedAdd('js/data/ArrestsCacheTable_data.js', tmp_runVariables_GitStatus_Files);
            git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/compressed/index.min.js', function (p1, p2, p3) {
                tmp_runVariables_GitStatus_Files = ifFileChangedAdd('js/compressed/index.min.js', tmp_runVariables_GitStatus_Files);
                git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'css/styles.min.css', function (p1, p2, p3) {
                    tmp_runVariables_GitStatus_Files = ifFileChangedAdd('css/styles.min.css', tmp_runVariables_GitStatus_Files);
                    git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/data/lastUpdate_data.js', function (p1, p2, p3) {
                        tmp_runVariables_GitStatus_Files = ifFileChangedAdd('js/data/lastUpdate_data.js', tmp_runVariables_GitStatus_Files);
                        runVariables_GitStatus_Files = tmp_runVariables_GitStatus_Files; // overwrite files with only modified files
                        console.log('GIT File Add: ArrestsCacheTable_data.js, index.min.js, and styles.min.css, lastUpdate_data.js');

                        var datenow = new Date();
                        var msg = "AUTO COMMIT: " + (datenow.toLocaleDateString('en-US')) + " Build Process " + datenow.getHours() + ":" + datenow.getMinutes();
                        git.commit(msg, function () {
                            git.push();
                            gitCheckoutBranch();
                            insertBuildRelease(mysql, msg, runOption_UserInput_Version);
                        });
                    });
                });
            });
        });
    }
}

function ifFileChangedAdd(filePath, arr) {
    var isChangedRes = gitStatus_Files_Contains(runOption_Environment_Details_enum[runOption_Environment].path.substring(1) + filePath);
    if (isChangedRes >= 0) {
        return arr.push(runVariables_GitStatus_Files[isChangedRes]);
    } else {
        return arr;
    }
}

function gitStatus_Files_Contains(filename) {
    if (runVariables_GitStatus_Files_ReturnStatus) {
        for (var i = 0; i < runVariables_GitStatus_Files.length; i++) {
            if (runVariables_GitStatus_Files[i].path.toLowerCase().includes(filename.toLowerCase())) {
                return i;
            }
        }
    }

    return -1;
}

function gitCheckoutBranch(b) {
    b = b || "gh-pages";
    git.checkout(b);
}
// ------- End Publish (GIT) Functions ------- //


// ------- Set Run Options ------- //
process.argv.forEach(function (val, index, array) {
    // Environment: development, production
    // Minify Options: only-js, only-css
    // Use Modular CSS: modular-css
    if (index == 0) {
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.log('Run Options Setup: ------------------------ ');
    }

    if (val === "allfiles") {
        console.log('Run Option Set: Publish Mode = All Files');
        runOption_publish_mode_AllFiles = true;
    }

    if (val === "update") {
        console.log('Run Option Set: Publish Mode = Update Only');
        runOption_publish_mode_Update = true;
        runOption_publish_mode_AllFiles = false;
    }

    if (val === "env-development") {
        console.log('Run Option Set: Environment = Development');
        runOption_Environment = runOption_Environment_Names_enum.indexOf("development");
    }
    if (val === "env-production") {
        console.log('Run Option Set: Environment = Production');
        runOption_Environment = runOption_Environment_Names_enum.indexOf("production");
    }

    if (val === "publish") {
        console.log('Run Option Set: Publish Flag = True');
        runOption_publish_Flag = true;
    }

    if (val === "release") {
        console.log('Run Option Set: Release Flag = True');
        console.log('Run Option Set: Commit Message Flag = True');
        runOption_Release_Flag = true;
        runOption_Commit_Message_Flag = true;
    }
    if (val === "skip") {
        console.log('Run Option Set: Skip = True');
        runOption_Skip_Questions = true;
    }
    if (val === "only-js") {
        console.log('Run Option Set: Minfiy Only JS = True');
        runOption_Generate_CSS_Flag = false;
        runOption_Generate_JS_Flag = true;
    }
    if (val === "only-css") {
        console.log('Run Option Set: Minfiy Only CSS = True');
        runOption_Generate_JS_Flag = false;
        runOption_Generate_CSS_Flag = true;
    }
    if (val === "modular-css") {
        console.log('Run Option Set: Minfiy Modular CSS = True');
        runOption_Generate_CSS_Flag = true;
        runOption_UseModular_CSS_Flag = true;
    }

    if (val === "msg" || val === "message" || val === "commit-message") {
        console.log('Run Option Set: Commit Message Flag = True');
        runOption_Commit_Message_Flag = true;
    }
});

function main_ask_bool_input(mysql_connection, question, security_level) {
    if (runOption_Skip_Questions && runOption_Environment === 0 && security_level < 1) {
        return true;
    } else {
        return main_ask_bool_input_readline(mysql_connection, question, security_level);
    }
}

function main_ask_bool_input_readline(mysql_connection, question, security_level) {
    // Security Level -1 = blank, yes or y
    // Security Level 1 = strict "Yes"
    // Security Level 2 = any text-case "yes"
    // Security Level 3 = any text-case not "no"
    // Security Level 4 = strict "No"
    security_level = security_level || -1;

    console.log('');
    console.log('--------------====== Question =====-----');
    var input_answer = readlinesync.question(question);

    var ret_val = false; // default false

    if ((input_answer === '' || input_answer.toLowerCase() === 'yes' || input_asnwer.toLowerCase() === 'y') && security_level == -1) { // if empty and security set to negitive 1
        ret_val = true;
    } else if (input_answer === 'Yes' && security_level == 1) { // strict "Yes"
        ret_val = true;
    } else if (input_answer.toLowerCase() === 'yes' && security_level == 2) { // "yes" any case
        ret_val = true;
    } else if (input_answer.toLowerCase() !== 'no' && security_level == 3) { // any form of "no" ("No", "no", "nO", "NO")
        ret_val = true;
    } else if (input_answer !== 'No' && security_level == 4) { // strictly "No"
        ret_val = true;
    }

    if (!ret_val) {
        mysql_connection.end();
    }

    return ret_val;
}

function main_mysql_stored_procs(mysql_connection, callback) {
    if (main_ask_bool_input(mysql_connection, "MYSQL:          Run Stored Procedures? (dimDay, etl_arrests, mat_arrests) [yes]/no: ", -1)) {
        call_sp("sp_day_dim_update", mysql_connection, () => {
            call_sp("sp_etl_arrests", mysql_connection, () => {
                call_sp("sp_materialize_arrests", mysql_connection, (rowCount) => {
                    runVariables_ArrestCount = rowCount;
                    callback();
                });
            });
        });
    }
}

function main_mysql_cache_data(mysql_connection, callback) {
    if (main_ask_bool_input(mysql_connection, "MYSQL:          Cache Data? (mat_arrests, update_date) [yes]/no: ", -1)) {
        cacheArrestsDateViewJS(mysql_connection, function () {
            cacheUpdateDate(mysql_connection, function () {
                cacheReleaseHistory(mysql_connection, function () {
                    callback();
                })
            });
        });
    }
}

function main_minify_files(mysql_connection, callback) {
    if (main_ask_bool_input(mysql_connection, "BUILD:          Minify JS/CSS? (index_min.js, detail_page_min.js, style.min.css) [yes]/no: ", -1)) {
        minifyHomepage(function () {
            callback();
        });
    }
}

function main_mysql_dump_db(mysql_connection, callback) {
    if (main_ask_bool_input(mysql_connection, "MYSQL:          Dump DB Schema/Data to file? [yes]/no: ", -1))
        dumpDatabase(function () {
            callback();
        });
}

// if release set display file diff between prod and dev folders
function main_runNode_BuildFileDiff(mysql_connection, callback) {
    if (runOption_Release_Flag) {
        console.log('Files Modified in Development, not reflected in Production: ');
        runNode("BuildFileDiff.js", function () {
            callback();
        }, nodeCB);
    } else {
        callback();
    }
}

function main() {
    console.log(' ');
    console.log(' ');
    console.log('Begin Main ----------------------');
    console.log("ENVIRONMENT:    " + runOption_Environment_Details_enum[runOption_Environment].Environment);

    var mysql_connection = mysql.createConnection({
        host: mysql_user_options.host,
        user: mysql_user_options.user,
        password: mysql_user_options.password,
        database: mysql_user_options.database
    });
    mysql_connection.connect();
    console.log("MYSQL:          Connected");

    mysql_connection.on('error', function (err) {
        console.log("[mysql error]", err);
    });
    
    setupPUG();
    exportPUGViews();

    getLatestVersion(mysql_connection, function (r) {
        if (main_is_development_env()) {
            if (runOption_Release_Flag) {
                r.version_revision = r.version_revision + 1;
            } else {
                r.version_revision = r.version_revision + 1;
            }
        } else {
            r.version_minor = r.version_minor + 1;
            r.version_revision = 0;
        }
        runOption_UserInput_Version = versionObjToString(r);
        main_mysql_stored_procs(mysql_connection, function () {
            main_mysql_cache_data(mysql_connection, function () {
                main_minify_files(mysql_connection, function () {
                    main_mysql_dump_db(mysql_connection, function () {
                        main_runNode_BuildFileDiff(mysql_connection, function () {
                            checkPublish(mysql_connection);
                        });
                    });
                });
            });
        });
    });
}

main();