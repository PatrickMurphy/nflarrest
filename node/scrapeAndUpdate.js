var request = require('request'),
    cheerio = require('cheerio'),
    mysql = require('mysql');

var mysql_connection = mysql.createConnection({
    host: '192.185.35.74',
    user: 'pmphotog_nfl',
    password: '12thman',
    database: 'pmphotog_nfl'
});

var lastRows = [];
var lookbackNumber = 0;

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

var updateSQL = function updateSQL(updateRows, callback) {
    updateRows.reverse();
    //console.log(updateRows);

    callback = callback | function () {};

    for (var recordNum in updateRows) {
        var record = convert_data(updateRows[recordNum]);
        mysql_connection.query('SELECT general_category_id, count(`Name`) AS `occur` FROM `arrest_stats` WHERE `Category`= \'' + record.Category + '\' GROUP BY general_category_id ORDER BY `occur` LIMIT 1', function (error, results, fields) {
            if (results.length > 0) {
                record.general_category_id = results[0].general_category_id;

            } else {
                record.general_category_id = 27;
            }
            console.log(record);
            mysql_connection.query('INSERT INTO arrest_stats SET ?', record, function (err, res) {
                console.log(err, res);
                if (recordNum + 1 == updateRows.length) {
                    callback();
                }
            });
        });
    }

}

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

mysql_connection.query('SELECT * FROM `arrest_stats` ORDER BY Date DESC Limit 1', function (error, results, fields) {
    var result = results[0];
    request('http://www.usatoday.com/sports/nfl/arrests/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            LookBackMatch(html, result, function () {
                mysql_connection.end();
            });
        }
    });
});
