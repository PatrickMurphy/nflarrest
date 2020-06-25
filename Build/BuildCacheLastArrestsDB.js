var mysql = require('mysql');

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest_static'
});

mysql_connection.connect();

// Select data
mysql_connection.query("CALL CacheLastArrests()", function (error, results, fields) {
    console.log(results);
});

mysql_connection.end();
