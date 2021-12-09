var mysql = require('mysql');
var fs = require('fs');
var ArrestsCacheTable = require('../Website/js/data/ArrestsCacheTable_data.js').data;
//console.log(ArrestsCacheTable.length);

// Connect to NFL Arrest database
var mysql_connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nflarrest'
});


// Save results to SQL Source - NFL Arrest DB
mysql_connection.connect();
var newrecords = [['2021-02-22','SF','Kevin Givens','DT','Charged','Assault','Accused of attacking a man at a Baltimore hotel.','Resolution undetermined.',4,1,1],
['2021-04-20','SEA','Aldon Smith','DE','Surrendered','Battery','Accused of choking a man unconscious during confrontation near New Orleans.','Resolution undetermined.',4,1,1],
['2020-08-25','CIN','Mackensie Alexander','CB','Arrested','Battery','Accused of hitting a man in the face in Collier County, Fla., as Alexander searched for information about his missing father.','Dropped by prosecutors.',4,1,1],
['2021-03-14','BAL','Broderick Washington','DT','Arrested','Destroying property','Accused of damaging five vehicles outside apartment complex in Arlington, Va.','Resolution undetermined.',5,1,1],
['2020-07-14','HOU','Kenny Stills','WR','Arrested','Disorderly conduct','Accused of felony intimidation in Louisville after taking part in protest to demand police accountability for the death of Breonna Taylor.','Dropped by prosecutors.',5,1,1],
['2021-04-05','MIN','Jeff Gladney','CB','Surrendered','Domestic violence','Accused of hitting and strangling girlfriend in Dallas after conflict over content on her phone.','Resolution undetermined.',2,1,1],
['2021-01-23','SEA','Chad Wheeler','OT','Arrested','Domestic violence','Accused of strangling girlfriend in Seattle suburb.','Resolution undetermined.',2,1,1],
['2020-10-03','PIT','Jarron Jones','OT','Arrested','Domestic violence','Charged with aggravated assault, strangulation and simple assault in alleged altercation with girlfriend in Pittsburgh.','Resolution undetermined.',2,1,1],
['2020-08-07','WAS','Derrius Guice','RB','Arrested','Domestic violence','Accused of strangulation, assault and property destruction in Loudoun County, Va.','Resolution undetermined. Team released him same day.',2,1,1],
['2021-01-04','LV','Josh Jacobs','RB','Arrested','DUI','Suspected of drunk driving after single-car crash in Las Vegas.','Paid $500 fine, community service for traffic violation.',1,1,1],
['2020-10-13','DEN','Melvin Gordon','RB','Cited','DUI','Suspected of drunk driving, speeding in Denver.','Pleaded guilty to reckless driving, excessive speeding.',1,1,1],
['2020-09-11','TEN','Isaiah Wilson','OT','Arrested','DUI','Pulled over, accused of drunken driving near Nashville with a blood-alcohol content of 0.11.','Resolution undetermined.',1,1,1],
['2020-06-27','ARI','Jermiah Braswell','WR','Arrested','DUI','Accused of driving while intoxiated after his Camaro ended up in Lake Erie in Put-in-Bay, Ohio.','Resolution undetermined.',1,1,1],
['2021-02-20','LV','Kemah Siverand','CB','Arrested','Evading arrest','Accused of being part of illegal street racing incident in Houston, Texas.','Resolution undetermined.',10,1,1],
['2021-01-07','TEN','Isaiah Wilson','OT','Arrested','Evading police, drugs','Accused of fleeing police, driving 140 mph and possession of drugs in Barrow County, Ga.','Resolution undetermined.',3,1,1],
['2021-04-23','PIT','Justin Layne','CB','Arrested','Gun','Pulled over, accused of felony transportation of a gun and speeding in Lake County, Ohio, near Cleveland.','Pleaded guilty to lesser charge, six months probation, 32 hours community service.',6,1,1],
['2021-03-25','NO','Marshon Lattimore','CB','Arrested','Gun','Suspected of possessing stolen gun after Cleveland police pulled over car he was a passenger in.','Resolution undetermined.',6,1,1]];
/*for(var i = 0; i < ArrestsCacheTable.length; i++){
	let a = ArrestsCacheTable[i];
	//if(a["Year"] >= 2018 && a["Month"] >= 4 && a["Day"] > 15){
	let newrecord = [
						a.Date.substring(0,10)
						, a.Team
						, a.Name
						, a.Position
						, a.Encounter
						, a.Category
						, a.Description
						, a.Outcome
						, a.general_category_id
						, a.legal_level_id
						, a.resolution_category_id
					];
	newrecords.push(newrecord);
	//}
}*/
var stmt = "INSERT INTO arrest_stats(Date,Team,Name,Position,Encounter,Category,Description,Outcome,general_category_id,legal_level_id,resolution_category_id)  VALUES ?";

mysql_connection.query(stmt, [newrecords], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});

//console.log(newrecords);
mysql_connection.end();