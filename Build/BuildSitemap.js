var mysql = require('mysql');
var fs = require('fs');

var filename = 'sitemap.xml';
var scriptPath = 'Website/';

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest_static'
});

function print_results(result, url){
	var return_array = [];
	for(i = 0; i < result.length; i++){
		var temp = result[i];
		return_array.push('<url><loc>http://nflarrest.com/' + url + encodeURIComponent(temp['id']) + '/</loc></url>');
	}
	return return_array;
}

mysql_connection.connect();

mysql_connection.query('SELECT DISTINCT(Team) AS id FROM `arrest_stats` ORDER BY id DESC', function (error, results, fields) {
    var teams  = JSON.parse(JSON.stringify(results));
    //console.log(teams);
    mysql_connection.query('SELECT DISTINCT(Category) AS id FROM `arrest_stats` ORDER BY id DESC', function (error, results1, fields) {
	    var crimes = JSON.parse(JSON.stringify(results1));
	    //console.log(error);
	    //console.log(fields);
	    //console.log(results1);
	   	mysql_connection.query('SELECT DISTINCT(Position) AS id FROM `arrest_stats` ORDER BY id DESC', function (error, results2, fields) {
		    var positions = JSON.parse(JSON.stringify(results2));
		   //console.log(positions);

			var lines = [];
			lines.push('<?xml version="1.0" encoding="utf-8"?>');
			lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"><url>');
			lines.push('<loc>http://nflarrest.com/</loc>');
			lines.push('<lastmod>2020-10-05T22:42:05+00:00</lastmod>');
			lines.push('</url>');
			lines.push('<url>');
			lines.push('<loc>http://nflarrest.com/api/</loc>');
			lines.push('<lastmod>2020-10-05T22:43:23+00:00</lastmod>');
			lines.push('</url>');
			var team_output = print_results(teams, "Team.html#");
			for (var i = team_output.length - 1; i >= 0; i--) {
				lines.push(team_output[i]);
			}
			var crime_output = print_results(crimes, "Crime.html#");
			for (var i = crime_output.length - 1; i >= 0; i--) {
				lines.push(crime_output[i]);
			}
			var position_output = print_results(positions, "Position.html#");
			for (var i = position_output.length - 1; i >= 0; i--) {
				lines.push(position_output[i]);
			}

			lines.push('</urlset>');

			var newText = lines.join(' ');

			fs.writeFile(scriptPath+filename, newText, function(err) {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("The file was saved!");
			    mysql_connection.end();
			}); 
		});
	});
});
