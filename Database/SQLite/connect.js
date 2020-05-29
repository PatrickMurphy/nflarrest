const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./NFLArrest.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
    	console.error(err.message);
  	}else{
  		console.log('Connected to the NFLArrest database file.');
	}
});

/*
db.serialize(() => {
  db.each(`SELECT PlaylistId as id,
                  Name as name
           FROM playlists`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

*/

db.close((err) => {
	if (err) {
		console.error(err.message);
  	}else{
  		console.log('Close the database connection NFLArrest database file.');
	}
});