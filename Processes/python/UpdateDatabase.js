// node js script to parse json and update database

// need table for player info               - NFL_Game_Player_Details
// need table for player status history     - NFL_Game_Player_Status_History
// need table for team history              - NFL_Game_Player_Team_History
// need table for position history?

/*
    INSERT NFL_Game_Player_Details
    SELECT DISTINCT Name
    FROM CompResults cr
    WHERE
    NOT EXISTS(SELECT * FROM Competitors c WHERE cr.Name = c.cName)
*/

// import latest player pull to source db
// insert new players, record initial status, record initial team, record initial position
// select all players whos status does not equal the most recent known status, insert row in status history
// select all players whos team does not equal the most recent known team, insert row in team history
// select all position whos team does not equal the most recent known position, insert row in position history

// Imports
var mysql = require('mysql');
var player_data = require('./nflgame-master/nflgame/players.json');
//var execSync = require('exec-sync');

//var user = execSync('python UpdatePy.py');

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '192.185.35.74',
    user: 'pmphotog_nfl',
    password: '12thman',
    database: 'pmphotog_nfl'
});

var replaceAll = function (text, search, replacement) {
    return String(text).split(search).join(replacement);
};


var generate_insert_query = function (data) {
    var row_values = '';
    var query_prefix = 'INSERT INTO SOURCE_NFL_Game_Player '+
						'(`player_id`,`birthdate`,`college`,`first_name`,`full_name`,`gsis_id`,`gsis_name`,`height`,'+
						'`last_name`,`number`,`position`,`profile_url`,`status`,`team`,`weight`,`years_pro`) VALUES ';
    //  n = typeof n !== 'undefined' ? n : data.length;
    // offset = typeof offset !== 'undefined' ? offset : 0;

    var temp_player = {};

    Object.keys(data).forEach(function (key) {
        temp_player = data[key];
        if (!temp_player.hasOwnProperty('player_id')) {
            temp_player.player_id = 0;
        }
        if (!temp_player.hasOwnProperty('birthdate')) {
            temp_player.birthdate = '01/01/1800';
        }
        if (!temp_player.hasOwnProperty('college')) {
            temp_player.college = 'unknown';
        }
        if (!temp_player.hasOwnProperty('team')) {
            temp_player.team = '';
        }
        if (!temp_player.hasOwnProperty('status')) {
            temp_player.status = 'none';
        }
        if (!temp_player.hasOwnProperty('gsis_name')) {
            temp_player.gsis_name = temp_player.first_name.slice(0, 1) + '.' + temp_player.last_name;
        }
        if (!temp_player.hasOwnProperty('position')) {
            temp_player.position = ' ';
        }
        if (!temp_player.hasOwnProperty('number')) {
            temp_player.number = -1;
        }
        if (!temp_player.hasOwnProperty('years_pro')) {
            temp_player.years_pro = -1;
        }
        if (!temp_player.hasOwnProperty('height')) {
            temp_player.height = -1;
        }
        if (!temp_player.hasOwnProperty('weight')) {
            temp_player.weight = -1;
        }

        temp_player.player_id = Number(key.split('-').join(''));
        row_values += '(' + temp_player.player_id + ", \"" + temp_player.birthdate + "\", \"" + temp_player.college + "\", \"" + temp_player.first_name + "\", \"" + temp_player.full_name + "\", \"" + temp_player.gsis_id + "\", \"" + temp_player.gsis_name + "\", " + temp_player.height + ", \"" + temp_player.last_name + "\", " + temp_player.number + ", \"" + temp_player.position + "\", \"" + temp_player.profile_url + "\", \"" + temp_player.status + "\", \"" + temp_player.team + "\", " + temp_player.weight + ', ' + temp_player.years_pro + '),';
    });

    // use slice to remove last comma
    return query_prefix + row_values.slice(0, -1) + ';';
}

var print_result = function (error, results, fields) {
    console.log(results, error);
}

// Save results to SQL Source - NFL Arrest DB
mysql_connection.connect();
// Empty Source Table
mysql_connection.query('TRUNCATE TABLE `SOURCE_NFL_Game_Player`', print_result);
// Insert to source table
mysql_connection.query(generate_insert_query(player_data), print_result);
mysql_connection.end();