// load request HTTP Lib, Cheerio HTML parser and MYSQL database lib
var request = require('request'),
    cheerio = require('cheerio'),
    mysql = require('mysql');

class MYSQLController {
    constructor(s){
        // supplied settings or defaults
        this.settings = s || {
            host: '192.185.35.74',
            user: 'pmphotog_nfl',
            password: '12thman',
            database: 'pmphotog_nfl'
        };
        this.mysql_connection = this.connectSQL();
    }

    // connect to SQL function
    connectSQL(){
        console.log('MYSQL Connected: ' + this.settings.database);
        return mysql.createConnection(this.settings);
    }

    disconnectSQL() {
        this.mysql_connection.end();
        console.log('MYSQL Disconnected');
    }

    query(query,data,callback){
        console.log('MYSQL Debug: Query: ' + query + " Data: " + JSON.stringify(data));
        // if data is set, and not null/false then use it, else callback
        if(data)
            this.mysql_connection.query(query,data,callback)
        else
            this.mysql_connection.query(query,callback);
    }

    // select
    select(query,callback){
        this.query(query,false,callback);
    }

    // insert
    insert(query,data,callback){
        return this.query(query,obj,data,callback);
    }

}

class NFLArrestETL {
    constructor(s){        
        // debug vars
        this.RowsProcessedCount = 0;

        // settings variables
        this.settings = s || {};
        this.settings.queries = {};
        this.settings.updateDB = false;
        this.settings.observedRecords = true;
        this.settings.source_url = 'http://www.usatoday.com/sports/nfl/arrests/';
        this.settings.source_table = 'arrest_stats';

        // state variables
        this.sourceDataArray = [];
        this.lastFactArrestResult = null;
        this.db = new MYSQLController();

        // select most recent date in NFLArrest DB, temp var in scope
        this.settings.queries.getLastFactRecord = 'SELECT * FROM `' + this.settings.source_table + '` ORDER BY Date DESC Limit 1';
        //this.db.select(this.settings.queries.getLastFactRecord, this, this.FindLastArrestAndFetchSource);
        this.db.select(this.settings.queries.getLastFactRecord, this.FindLastArrestAndFetchSource.bind(this));
    }

    // rename columns to record columns
    convertArrestToJSON(record) {
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

    // MYSQL query get ETL date callback function and request HTML (SHould decouple)
    FindLastArrestAndFetchSource(error,results,fields) {
        // used to pass result to next function
        this.lastFactArrestResult = results[0];

        // Use USA today as source to ETL    
        request(this.settings.source_url, this.handleSourceRequestHTTP.bind(this));
    }

    // Request Get Source URL callback function
    handleSourceRequestHTTP(error, response, html) {
        // if no error and the HTTP status code was Success (200)
        if (!error && response.statusCode == 200) {
            this.processHTMLResult(html);
        }else{
            console.log('HTTP Error');
        }
    }

    processHTMLResult(html) {
        // add one to tracker
        if(html == ''){
            return false;
        }
        this.RowsProcessedCount++;
        console.log('Begin LookBack Match #' + this.RowsProcessedCount);

        this.findHTMLRow(html, this.processHTMLRow.bind(this));
    }


    findHTMLRow(html,callback){
        // find next cell
        var tempPos = html.indexOf("<td ");
        var tempPosEnd = html.indexOf("</tr></tbody></table></article>");
        if(tempPos>tempPosEnd){
            html = '';
        }

        if(html != ''){
            // limit HTML string to start at first html cell position
            var tempString = html.substring(tempPos);
            // find the end of that cells row
            var endPos = tempString.indexOf('</tr>');
            // create string of html for all of the rows
            var tempRow = tempString.substring(0, endPos);

            // with cells html, replace tags with @@
            tempRow = tempRow.replace(/<.*?\>/g, "@@");
            // remove 2 char for first <td>
            tempRow = tempRow.substring(2);
            // remove last 2 char for last </td>
            tempRow = tempRow.substring(0, tempRow.length - 2);
            // trim html to the end of that </tr> for the end of that row to be the next html to process
            var newHTML = html.substring(endPos + tempPos, html.length);

            // now split where there were </td><td> to get each cell contents
            var data = tempRow.split('@@@@');
        }else{ 
            newHTML = '';
            var data = {};
        }
        //console.log(html);
        // return data
        callback(newHTML,data);
    }

    // inits loop
    processHTMLRow(newHTML, rowData){
        // is this the most recent arrest
        /*
        if (rowData[2] === this.lastFactArrestResult['Name']) {
            console.log('Same record as most recent in fact');
            if(this.sourceDataArray.length > 0){
                //this.updateSQL(this.sourceDataArray, callback);
                console.log(JSON.stringify(this.sourceDataArray));
                callback();

            }else{
                this.db.disconnectSQL();
            }
        } else {*/
            // recursion
            //console.log('Not The Same Record as last in fact');
            console.log(JSON.stringify(rowData));
            this.sourceDataArray.push(rowData);
            this.processHTMLResult(newHTML);
        //}
    }
/*
    // update the SQL database
    updateSQL(updateRows, callback) {
        updateRows.reverse();
        //console.log(updateRows);

        callback = callback | function () {};

        for (var recordNum in updateRows) {
            var record = convertArrestToJSON(updateRows[recordNum]);
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

    }*/
// end of ETL Class
}

var ETLObj = new NFLArrestETL();