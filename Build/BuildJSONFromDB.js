var mysql = require('mysql');
var fs = require('fs');


var filename = 'ArrestsCacheTable_data.js';
var scriptPath = '../Website/js/data/';

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest'
});


// Save results to SQL Source - NFL Arrest DB
mysql_connection.connect();

// Select data
mysql_connection.query("SELECT * FROM arrestscachetable", function (error, results, fields) {
	var newText = "var ArrestsCacheTable = " + JSON.stringify(results) + ";";
	//newText += "\r\n" + "module.exports.data = ArrestsCacheTable;";
    fs.writeFile(scriptPath+filename, newText, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
});

mysql_connection.end();


//SELECT Team, Team_preffered_name,Team_name, Team_city, Team_Conference, Team_Conference_Division, Team_logo_id, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. $date_range .' GROUP BY Team, Team_preffered_name,Team_name, Team_city, Team_Conference, Team_Conference_Division, Team_logo_id ORDER BY arrest_count DESC


/*

// determine how many days since last
$result = $db->query('SELECT * FROM ArrestOMeterStats');
$arrestOMeter = $result->fetch_assoc();

$returnArray = array(
'alltime' => array(
	'record' => $arrestOMeter['Record'],
	'average' => floor($arrestOMeter['Average']),
	'raw_average' => $arrestOMeter['Average']
),
'current' => array(
	'daysSince' => $arrestOMeter['Current'],
	'probability' => exp((($arrestOMeter['Current'])*(0-1))/$arrestOMeter['Average']),
	'odds' => floor(1/exp((($arrestOMeter['Current'])*(0-1))/$arrestOMeter['Average']))
)
);
*/

// query main table
// save json
// create special json