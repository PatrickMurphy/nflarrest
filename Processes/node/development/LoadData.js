var MYSQLController = require('./MYSQLController.js');

var db = new MYSQLController({
            host: '192.185.35.74',
            user: 'pmphotog_nfl',
            password: '12thman',
            database: 'pmphotog_nfl'
        });
var db2 = new MYSQLController({
            host: '192.185.35.74',
            user: 'pmphotog_nfl',
            password: '12thman',
            database: 'pmphotog_NFL_Arrest'
        });

this.db.select('SELECT DISTINCT', callback.bind(this));