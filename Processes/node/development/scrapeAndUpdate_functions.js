// load request HTTP Lib, Cheerio HTML parser and MYSQL database lib
var request = require('request'),
    cheerio = require('cheerio'),
    mysql = require('mysql');
	
// connect to SQL function, returns a MYSQL connection
var connectSQL = function(){
    return mysql.createConnection({
        host: '192.185.35.74',
        user: 'pmphotog_nfl',
        password: '12thman',
        database: 'pmphotog_nfl'
    });
}

var disconnectSQL = function (connection) {
    connection = connection || mysql_connection;
    connection.end();
}

// rename columns to record columns
var convert_data = function (record) {
    return {
        arrest_stats_id: 0,
        Date: record[0],
        Team: record[1],
        Name: record[2],
        Position: record[3],
        Encounter: record[4],
        Category: record[5],
        Description: record[6],
        Outcome: record[7]
    };
}

// update the SQL database
var updateSQL = function updateSQL(updateRows, callback) {
    updateRows.reverse();
    //console.log(updateRows);

    callback = callback | function () {};

    for (var recordNum in updateRows) {
        var record = convert_data(updateRows[recordNum]);
		
        // select crime ids with same crime category
		var checkCrimeQuery = 	'SELECT general_category_id, count(`Name`) AS `occur`' +
								'FROM `arrest_stats` ' +
								'WHERE `Category`= \'' + record.Category + '\' ' +
								'GROUP BY general_category_id ' +
								'ORDER BY `occur` ' +
								'LIMIT 1';
								
		mysql_connection.query(checkCrimeQuery, function (error, results, fields) {
            if (results.length > 0) {
                record.general_category_id = results[0].general_category_id;
            } else {
				// if there are no other crimes with this same description, use category other
                record.general_category_id = 27;
            }
			
			// insert new record
            mysql_connection.query('INSERT INTO arrest_stats SET ?', record, function (err, res) {
                console.log(err, res);
                if (recordNum + 1 == updateRows.length) {
                    callback();
                }
            });
        });
    }
}


// lookback match function????
//  uses 2 global vars
//      - lookbackNumber (only in console log)
//      - lastRows (temp storage for last resutl)
var LookBackMatch = function (html, result, callback) {
    callback = callback | function () {};

    console.log('Begin LookBack Match #' + ++lookbackNumber);

    var tempPos = html.indexOf("<td ");
    var tempString = html.substring(tempPos);
    var endPos = tempString.indexOf('</tr>');
    var tempRow = tempString.substring(0, endPos);

    tempRow = tempRow.replace(/<.*?\>/g, "@@");
    tempRow = tempRow.substring(2);
    tempRow = tempRow.substring(0, tempRow.length - 2);

    var topRow = tempRow.split('@@@@');
    var newHTML = html.substring(endPos + tempPos, html.length);

    if (topRow[2] === result['Name']) {
        console.log('Same record');
        if(lastRows.length > 0){
            updateSQL(lastRows, callback);
        }else{
            mysql_connection.end();
        }
    } else {
        console.log('Not The Same Record');
        lastRows.push(topRow);
        LookBackMatch(newHTML, result, callback);
    }
}

// Request Get Source URL callback function
var get_usa_today_arrests = function (error, response, html) {
    // if no error and the HTTP status code was Success (200)
    if (!error && response.statusCode == 200) {
        LookBackMatch(html, result, disconnectSQL);
    }
};

// MYSQL query get ETL date callback function
var get_most_recent_date = function (error, results, fields) {
    // why do we get first result?
    var result = results[0];

    // Use USA today as source to ETL
    var source_url = 'http://www.usatoday.com/sports/nfl/arrests/';
    request(source_url, get_usa_today_arrests);
};

// setup global program vars
var mysql_connection;
var lastRows = [];
var lookbackNumber = 0;

// Main Program Function
var main_func = function(){
    // Connect to SQL using defined global var
    mysql_connection = connectSQL();

    // select most recent date in NFLArrest DB, temp var in scope
    var get_etl_date_Query = 'SELECT * FROM `arrest_stats` ORDER BY Date DESC Limit 1';
    mysql_connection.query(get_etl_date_Query, get_most_recent_date);
}

// Start Program
main_func();
