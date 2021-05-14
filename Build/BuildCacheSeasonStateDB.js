var mysql = require('mysql');

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest'
});

mysql_connection.connect();

// Select data
mysql_connection.query("CALL CacheArrestSeasonStateByArrest()", function (error, results, fields) {
    console.log(results);
});

mysql_connection.end();
