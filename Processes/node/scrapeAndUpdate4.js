// load request HTTP Lib, Cheerio HTML parser and MYSQL database lib
var request = require('request'),
    cheerio = require('cheerio'),
    MYSQLController = require('./MYSQLController.js');

class NFLArrestETL {
    constructor(s){        
        // settings variables
        this.settings = s || {};
        if(!this.settings.hasOwnProperty('queries')){
            this.settings.queries = {};
        }

        this.settings.debug = true;
        this.settings.updateDB = false;
        this.settings.observedRecords = true; // if false then only look at new records
        this.settings.source_url = 'http://www.usatoday.com/sports/nfl/arrests/';
        this.settings.source_table = 'arrest_stats';

        // debug vars
        this.RowsProcessedCount = 0;
        // state variables
        this.sourceDataArray = [];
        this.lastFactArrestResult = null;
        this.db = new MYSQLController();

        // select most recent date in NFLArrest DB, temp var in scope
        this.settings.queries.getLastFactRecord = 'SELECT * FROM `' + this.settings.source_table + '` ORDER BY Date DESC Limit 1';

        // define callback for main select function
        var callback = function(error,results,fields){
            this.lastFactArrestResult = results[0];
            this.RequestArrestSourceHTML();
        };

        this.db.select(this.settings.queries.getLastFactRecord, callback.bind(this));
    }


    // MYSQL query get ETL date callback function and request HTML (SHould decouple)
    RequestArrestSourceHTML() {
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
        var isEndOfTable = html.indexOf("</tr></tbody>") == 0;


        // check for end of table
        if(isEndOfTable){
            if(this.settings.debug)
                console.log('End of table found');
            this.db.disconnectSQL();
            return this.sourceDataArray;
        }else{
            // add one to tracker
            this.RowsProcessedCount++;
            if(this.RowsProcessedCount%100 == 0 && this.settings.debug)
                console.log('Begin LookBack Match #' + this.RowsProcessedCount);

            var htmlRowResult = this.findHTMLRow(html);
            return this.processHTMLRow(htmlRowResult[0],htmlRowResult[1]);
        }
    }


    findHTMLRow(html){
        // find next cell
        var firstCellIndex = html.indexOf("<td ");
        // limit HTML string to start at first html cell position
        var trimmedHTML = html.substring(firstCellIndex);
        // find the end of that cells row
        var endOfRowIndex = trimmedHTML.indexOf('</tr>');
        // create string of html for all of the rows
        var rowHTML = trimmedHTML.substring(0, endOfRowIndex);

        // with cells html, replace tags with @@
        rowHTML = rowHTML.replace(/<.*?\>/g, "@@");
        // remove 2 char for first <td>
        rowHTML = rowHTML.substring(2);
        // remove last 2 char for last </td>
        rowHTML = rowHTML.substring(0, rowHTML.length - 2);
        // trim html to the end of that </tr> for the end of that row to be the next html to process
        var newHTML = html.substring(endOfRowIndex + firstCellIndex, html.length);

        // now split where there were </td><td> to get each cell contents
        var data = rowHTML.split('@@@@');

        // return data
        return([newHTML,data]);
    }

    // process one row
    processHTMLRow(newHTML, rowData){
        this.sourceDataArray.push(rowData);
        return this.processHTMLResult(newHTML);
    }
// end of ETL Class
}

var ETLObj = new NFLArrestETL();