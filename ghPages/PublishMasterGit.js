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

// --- Setup imported objects --- //
var git = simple_git('../nflarrest/');
var mysql_user_options = dbConfig;


// --- Add Run Node Process Functions --- //
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

// --- Setup Enum Variables --- //
var runOption_Environment_Details_enum = [{Environment: "development", path: "/development/"}, {Environment: "production", path: "/"}];
var runOption_Environment_Names_enum = ["development", "production"];

// --- Script Arguments --- //
var runOption_Environment           = 0;
var runOption_Generate_CSS_Flag     = true;
var runOption_Generate_JS_Flag      = true;
var runOption_UseModular_CSS_Flag   = true;
var runOption_publish_Flag          = false;
var runOption_publish_mode_AllFiles = false;
var runOption_publish_mode_Update   = false;
var runOption_Commit_Message_Flag   = false;
var runOption_Release_Flag          = false;

// --- User Input Variables --- //
var runOption_UserInput_Version = 'x.x.x';
var runOption_UserInput_Commit_MSG = '';


// ------- MYSQL Functions ------- //
function insertBuildRelease(mysql,desc,version){
    var envdbid = runOption_Environment+1;
    var reldate = new Date();
    var build_release_version = version || "x.x.x";
    var build_release_type_id = 1;
    
    if(runOption_Environment_Details_enum[runOption_Environment].Environment == "development"){
        build_release_type_id = runOption_Release_Flag ? 2 : 3;
    }
    
    var release = {build_environment_id: envdbid,
        build_release_type_id:build_release_type_id,
        build_release_version: build_release_version, 
        build_release_description:desc,
        build_release_date:reldate.toISOString().split('T')[0]
    };
    
    var strQuery = "INSERT INTO nflarrestdw.build_release SET ?";
    mysql.query(strQuery, release, (error2, results2, fields2) => {
        if (error2) {
            console.log(error2);
        }
        console.log("Success::     MYSQL INSERT Build Release::  InsertID: " + results2.insertId);
    });
    mysql.end();
}

// ------- Publish (GIT) Functions ------- //
function checkPublish(mysql) {
    if (runOption_publish_Flag) {
        promptConfirmPublish(mysql);
    } else {
        console.log("GIT:          Not Publishing (tip: add arg 'publish' to publish)");
    }
}

async function displayGitStatus(){
    // get git status result and print it
    var StatusResult = await git.status();
    var SRFiles = [];
    for(var i = 0; i < StatusResult.files.length; i++){
        // todo add if dev statment
        SRFiles.push(StatusResult.files[i].working_dir + ": " + StatusResult.files[i].path);
    }
    console.log("----------------  Files Modified Locally  --------------");
    console.log(SRFiles);
}

function read_input_version(){
    var versionNumAnswer = 'x.x.x';
    if(runOption_Release_Flag){
        versionNumAnswer = readlinesync.question("GIT:          Release Version: ");
        console.log("GIT:          Version set to: "+versionNumAnswer);
        return versionNumAnswer;
    }
}

function read_input_commit_msg(){
    if(runOption_Commit_Message_Flag){
        var answer2 = readlinesync.question("GIT:          Commit Message: ");
        if (answer2 === "no" || answer2  === 'quit') {
            console.log("GIT:          Not Publishing");
        } else {
            console.log("GIT:          Commit Message set to: "+answer2);
            return answer2;
        }
    }
}

async function promptConfirmPublish(mysql) {
    await displayGitStatus();
    
    runOption_UserInput_Version = read_input_version();
    
    // if commit message set in args
    runOption_UserInput_Commit_MSG = read_input_commit_msg();
    
    // setup all file message or no message
    var allFiles = runOption_publish_mode_AllFiles ? ' ~~!!WARNING ALL FILES SET!!~~ ' : '';
    var answer = readlinesync.question("GIT:          Publish changes? " + allFiles + " [yes]/no: ");
    if (answer.toLowerCase() === "yes") {
        console.log("GIT:          Publishing...");
        publishGHPages(mysql);
    } else { // said no to publish
        console.log("GIT:          Not Publishing" + (answer.toLowerCase() === 'no' ? '' : ", response lowercase: '" + answer.toLowerCase() + "' != 'yes'"));
        mysql.end();
    }
}

function publishGHPages(mysql) {
    //Git add ., Git commit -m "update x", git push;
    if (runOption_publish_mode_AllFiles) {
        var addAllPath = '.';
        if (runOption_Environment == runOption_Environment_Names_enum.indexOf("development")) {
            addAllPath += runOption_Environment_Details_enum[runOption_Environment].path;
        }
        git.add(addAllPath, function(p1, p2, p3) {
            console.log('GIT File Add: all changes');
            var datenow = new Date();
            var theMsg = runOption_Commit_Message_Flag ? runOption_UserInput_Commit_MSG : "Commit";
            var hours = datenow.getHours()>9 ? datenow.getHours() : "0"+datenow.getHours();
            var mins = datenow.getMinutes()>9 ? datenow.getMinutes() : "0"+datenow.getMinutes();
            var date = datenow.toLocaleDateString('en-US');
            var env = runOption_Environment_Details_enum[runOption_Environment].Environment;
            
            var msg = `BUILD ${env}: ${theMsg} || ${date} ${hours}:${mins}`;
            
            git.commit(msg, function() {
                git.push();
                insertBuildRelease(mysql,msg,runOption_UserInput_Version);
            });
        });
    } else {
        git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/data/ArrestsCacheTable_data.js', function(p1, p2, p3) {
            git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/compressed/index.min.js', function(p1, p2, p3) {
                git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'css/styles.min.css', function(p1, p2, p3) {
                    git.add('.' + runOption_Environment_Details_enum[runOption_Environment].path + 'js/data/lastUpdate_data.js', function(p1, p2, p3) {
                        console.log('GIT File Add: ArrestsCacheTable_data.js, index.min.js, and styles.min.css, lastUpdate_data.js');
                        var datenow = new Date();
                        var msg = "AUTO COMMIT: " + (datenow.toLocaleDateString('en-US')) + " Build Process " + datenow.getHours() + ":" + datenow.getMinutes();
                        git.commit(msg, function() {
                            git.push();
                            gitCheckoutBranch();
                            insertBuildRelease(mysql,msg,runOption_UserInput_Version);
                        });
                    });
                });
            });
        });
    }
}

function gitCheckoutBranch(b) {
    b = b || "gh-pages";
    git.checkout(b);
}
// ------- End Publish (GIT) Functions ------- //


// ------- Set Run Options ------- //
process.argv.forEach(function(val, index, array) {
    // Environment: development, production
    // Minify Options: only-js, only-css
    // Use Modular CSS: modular-css
    if(index == 0){
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

function main() {
    console.log(' ');
    console.log(' ');
    console.log('Begin Main ----------------------');
    
    var mysql_connection = mysql.createConnection({
        host: mysql_user_options.host,
        user: mysql_user_options.user,
        password: mysql_user_options.password,
        database: mysql_user_options.database
    });
    
    mysql_connection.connect();
    console.log("MYSQL:          Connected");

    mysql_connection.on('error', function(err) {
        console.log("[mysql error]", err);
    });
    
    checkPublish(mysql_connection);
}

main();