var MYSQLController = require('./MYSQLController.js');

var db = new MYSQLController({
            host: '192.185.35.74',
            user: 'pmphotog_nfl',
            password: '12thman',
            dateStrings:true,
            database: 'pmphotog_nfl'
        });
var db2 = new MYSQLController({
            host: '192.185.35.74',
            user: 'pmphotog_nfl',
            password: '12thman',
            dateStrings:true,
            database: 'pmphotog_NFL_Arrest'
        });

var callback = function(error,results,fields){
    console.log(JSON.stringify(error));
    console.log(JSON.stringify(results));
    console.log(JSON.stringify(fields));
}

/*
SELECT `teams_id`
    , `teams_full_name`
    , `Team_preffered_name`
    , `team_code`
    , `city`
    , `state`
    , `Team_logo_id`
    , `Team_Conference`
    , `Team_Division`
    , `Stadium`
    , `Stadium_Capacity`
    , `first_nfl_season`
    , `Head_coach_2016`
    , `Team_hex_color`
    , `Team_hex_alt_color`
    , `reddit_group_id`
 FROM `Team_details_view`


  `TeamID` int(11) NOT NULL,
  `TeamCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `TeamDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `TeamFullName` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `FranchiseID` int(11) NOT NULL,
  `City` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `State` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `Stadium` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `DivisionID` int(11) NOT NULL,
  `UpdateDate` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateUser` varchar(15) DEFAULT NULL,
  `CreateUser` varchar(15) DEFAULT 'System'

  `FranchiseCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `FranchiseDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  

*/
var oldTeamResult = function(error,results,fields){
    var newTeamRow = [];
    var newFranchiseRow = [];
    db2.query('DELETE FROM dimFranchise',callback);
    db2.query('DELETE FROM dimTeam',callback);
    for(var i in results){
        var row = results[i];
        newFranchiseRow.push([row.team_code,row.teams_full_name]);
        newTeamRow.push([row.team_code,row.Team_preffered_name,row.teams_full_name,row.city,row.state,row.Stadium,0]);
        //newFranchiseRow[row.team_code]['FranchiseCode'] = row.team_code;
        //newFranchiseRow[row.team_code]['FranchiseDesc'] = row.teams_full_name;
        /*newTeamRow[row.team_code]['TeamCode'] = row.team_code;
        newTeamRow[row.team_code]['TeamDesc'] = row.Team_preffered_name;
        newTeamRow[row.team_code]['TeamFullName'] = row.teams_full_name;
        newTeamRow[row.team_code]['City'] = row.city;
        newTeamRow[row.team_code]['State'] = row.state;
        newTeamRow[row.team_code]['Stadium'] = row.Stadium;
        newTeamRow[row.team_code]['DivisionID'] = row.Team_Division;

        var createFranchiseCallback =  function(err,result){
            if (err) throw err;
            newTeamRow[row.team_code]['FranchiseID'] = result.insertId;
            console.log(newTeamRow[row.team_code]);
            
            //db2.insert('INSERT INTO dimTeam SET ?', newTeamRow['team'+k], function(err2,result2){
            //    if (err2) throw err2;
              //  console.log(result2.insertId);
          //  });
        };
        */
    }
    console.log(newFranchiseRow);
    insertFran(newFranchiseRow,function(err,res){console.log(res);});
    
    //insertFran(newFranchiseRow,function(err,res){console.log(res);});
    
    //db2.insert('INSERT INTO dimTeam SET ?',newResults,afterTeamInsert);
}

var insertFran = function(newFranchiseRow,createFranchiseCallback){
    db2.insert('INSERT INTO dimFranchise (FranchiseCode, FranchiseDesc) VALUES ?', [newFranchiseRow], createFranchiseCallback);
}

var oldTeamResult2 = function(error,results,fields){
    var newTeamRow = {};
    var newFranchiseRow = [];
    //db2.query('DELETE FROM dimFranchise',callback);
    db2.query('TRUNCATE TABLE dimTeam',callback);
    for(var i in results){
        var row = results[i];
        newFranchiseRow.push([row.team_code,row.teams_full_name]);
        //newTeamRow.push([row.team_code,row.Team_preffered_name,row.teams_full_name,row.city,row.state,row.Stadium,0]);
        newTeamRow[row.team_code] = {};
        newTeamRow[row.team_code]['TeamCode'] = row.team_code;
        newTeamRow[row.team_code]['TeamDesc'] = row.Team_preffered_name;
        newTeamRow[row.team_code]['TeamFullName'] = row.teams_full_name;
        newTeamRow[row.team_code]['City'] = row.city;
        newTeamRow[row.team_code]['State'] = row.state;
        newTeamRow[row.team_code]['Stadium'] = row.Stadium;
        newTeamRow[row.team_code]['DivisionID'] = row.Team_Division;
        db2.insert('INSERT INTO dimTeam SET ?',newTeamRow[row.team_code],function(err,res){
            console.log(res);
        });
    }    
    
}

/*
  `PositionCode` varchar(2) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Short Code',
  `PositionDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Position Title',
  `PositionTypeID` int(11) NOT NULL COMMENT 'Position Type (Off, Def, Spe)',
  
*/
var oldPositionResult = function(err,res,fields){
    for(var i in res){
        var row = res[i];
        console.log(row);
        var posResult = {};
        posResult['PositionCode'] = row.position_tag;
        posResult['PositionDesc'] = row.position_title;

        // offense default
        posResult['PositionTypeID'] = 1; 
        if(row.position_type == 'D'){
            posResult['PositionTypeID'] = 2;
        }else if(row.position_type == 'S'){
            posResult['PositionTypeID'] = 3;
        }

        db2.insert('INSERT INTO dimPosition SET ?', posResult, function(err,res){
            console.log(res);
        });        
    }
}

var updateTeamFranchise = function(err,res,fields){
    var franchiseKeys = {};
    for(var i in res){
        var teamRow = res[i];
        franchiseKeys[teamRow.FranchiseCode] = teamRow.FranchiseID;
    }

    console.log('Lkup: ' + JSON.stringify(franchiseKeys));

    var updateTeamFranchise2 = function(err2,res2,fields2){
        for(var k in res2){
            var row2 = res2[k];
            //console.log(row2.TeamCode);
            db2.query('UPDATE dimTeam SET FranchiseID = ' + franchiseKeys[row2.TeamCode] + ' WHERE TeamID = ' + row2.TeamID, {}, function(error1,result1,fields1){
                console.log(result1);
            });
        }
    };

    db2.select('SELECT * FROM dimTeam',updateTeamFranchise2);
}

/*
  `InfractionCategoryCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionCategoryDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionCategoryHex` varchar(6) COLLATE utf8_unicode_ci DEFAULT NULL,
*/

var getOldCrimeCategories = function(err,res,fields){
    for(var i in res){
        var row = res[i];
        console.log(row);
        var newRow = {};
        newRow['InfractionCategoryCode'] = row.code;
        newRow['InfractionCategoryDesc'] = row.Category;
        newRow['InfractionCategoryHex'] = row.hex_color;
        db2.insert('INSERT INTO dimInfractionCategory SET ?',newRow, function(err,res){
            console.log(res);
        });
    }
}

/*
`InfractionCode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL,
  `InfractionColor` varchar(6) COLLATE utf8_unicode_ci NOT NULL DEFAULT '000000',
  `InfractionCategoryID` int(11) NOT NULL,
*/
var lkupInfractionCategories = function(err,res){
    var lkupInfractionCategoriesData = {};
    for(var i in res){
        var row = res[i];
    //    console.log(row);
        lkupInfractionCategoriesData[row.InfractionCategoryDesc] = row.InfractionCategoryID;
    }

    db.select('SELECT DISTINCT a.Category as crime, left(a.Category,5) as code, b.Category, b.hex_color FROM arrest_stats as a LEFT JOIN general_category as b ON a.general_category_id = b.general_category_id',function(err,res){
        db2.query('TRUNCATE TABLE dimInfraction',{},function(err,res){
            console.log(err,res);
        });
        for(var i in res){
            var row = res[i];
            var newRow = {};
            newRow['InfractionCode'] = row.code;
            newRow['InfractionDesc'] = row.crime;
            newRow['InfractionColor'] = row.hex_color;
            newRow['InfractionCategoryID'] = lkupInfractionCategoriesData[row.Category];
            db2.insert('INSERT INTO dimInfraction SET ?',newRow,function(err,res){
                console.log(res);
            });
        }        
    });
}

/*  ----- GET Codes that are not unique
SELECT * FROM dimInfraction WHERE InfractionCode IN (SELECT InfractionCode FROM `dimInfraction` Group BY InfractionCode HAVING count(1) > 1)*/

/*
 `PlayerBirthDate` int(8) NOT NULL,  
  `PlayerDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Player Name',
 
*/

var insertPlayers = function(err,res){
    for(var i in res){
        var row = res[i];
        var newRow = {};
        newRow['PlayerBirthDate'] = 20010101;
        newRow['PlayerDesc'] = row.Name;

        db2.insert('INSERT INTO dimPlayer SET ?', newRow, function(err,res){
            console.log(res);
        });
    }
}

/*  ------------ Insert Season
  `SeasonCode` varchar(24) NOT NULL,  
  `SeasonDesc` varchar(127) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Season Name',
  `Year` int(4) NOT NULL,
  `StartDate` datetime NOT NULL COMMENT 'Season Start Date',
  `EndDate` datetime NOT NULL COMMENT 'Season End Date',
  `PreSeasonDate` datetime NOT NULL COMMENT 'PreSeason Start Date',
  `ProBowlDate` datetime NOT NULL,
  `PlayoffDate` datetime NOT NULL COMMENT 'Season Playoff Start Date',
  `SuperBowlDate` datetime NOT NULL,
  `SuperBowlNumber` int(5) NOT NULL COMMENT 'Super Bowl #X',

*/

var insertSeasons = function(err,res){
    for(var i in res){
        var row = res[i];
        var newRow = {};
        newRow['SeasonCode'] = row.season;
        newRow['SeasonDesc'] = row.season;
        newRow['Year'] = row.season;
        newRow['StartDate'] = row.season_start;
        newRow['EndDate'] = row.season_end;
        newRow['PreSeasonDate'] = '2001-01-01';
        newRow['ProBowlDate'] = row.probowl_date;
        newRow['PlayoffDate'] = row.playoff_start;
        newRow['SuperBowlDate'] = row.superbowl_date;
        newRow['SuperBowlNumber'] = 0;
        //console.log(newRow);

        db2.insert('INSERT INTO dimSeason SET ?', newRow, function(err,res){
            console.log(res);
        });
    }
}

/*------ Insert Date Dim  
  `DateID` int(11) NOT NULL,
  `DateCode` int(8) NOT NULL COMMENT 'MMDDYYYY',
  `DateDesc` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'MM/DD/YYYY',
  `Date` datetime NOT NULL COMMENT 'The date in MySQL DateTime Format',
  `SeasonYear` int(4) NOT NULL,
  `SeasonStartDateFlag` int(1) DEFAULT 0,
  `SeasonEndDateFlag` int(1) DEFAULT 0,
  `PlayoffStartDateFlag` int(1) DEFAULT 0,
  `SuperBowlDateFlag` int(1) DEFAULT 0,
  `ProBowlDateFlag` int(1) DEFAULT 0,
  `InSeasonFlag` int(1) DEFAULT 0,
  `OffSeasonFlag` int(1) DEFAULT 1,
  `CalendarYear` int(4) NOT NULL,
  `CalendarMonth` int(2) NOT NULL,
  `CalendarMonthName` varchar(9) NOT NULL,
  `CalendarDay` int(2) NOT NULL COMMENT 'integer day of month',
  `CalendarDayName` varchar(9) NOT NULL COMMENT 'Monday, Tuesday etc',

*/
var insertDateRows = function(err,res){
    var seasons = {};
    var fromSeason = 2000;
    var toSeason = 2018;

//    db2.query('TRUNCATE TABLE dimDate',{},function(err,res){
  //      console.log(res);
    //});

    for(var i in res){
        var row = res[i];
        seasons[row.Year] = {};
        seasons[row.Year]['SeasonCode'] = row.SeasonCode;
        seasons[row.Year]['SeasonDesc'] = row.SeasonDesc;
        seasons[row.Year]['Year'] = row.Year;
        seasons[row.Year]['StartDate'] = new Date(row.StartDate);
        seasons[row.Year]['EndDate'] = new Date(row.EndDate);
        seasons[row.Year]['PreSeasonDate'] = new Date(row.PreSeasonDate);
        seasons[row.Year]['ProBowlDate'] = new Date(row.ProBowlDate);
        seasons[row.Year]['PlayoffDate'] = new Date(row.PlayoffDate);
        seasons[row.Year]['SuperBowlDate'] = new Date(row.SuperBowlDate);
        seasons[row.Year]['SuperBowlNumber'] = new Date(row.SuperBowlNumber);
        //console.log(row.StartDate, row.EndDate);
    }

    var from = new Date("01/01/"+fromSeason);
    var to = new Date("12/31/"+toSeason);
    var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var dateRows = [];

    // loop for every day
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
        var tempSeason = seasons[day.getFullYear()];
        var tempLastSeason = seasons[day.getFullYear()-1];
        var dateRow = []; //{};
/*
        dateRow['DateCode'] = ('0'+(day.getMonth()+1)).slice(-2)+''+('0'+(day.getDate())).slice(-2)+''+day.getFullYear();
        dateRow['DateDesc'] = ('0'+(day.getMonth()+1)).slice(-2)+'/'+('0'+(day.getDate())).slice(-2)+'/'+day.getFullYear();
        dateRow['SeasonYear'] = tempSeason.Year;
        dateRow['SeasonStartDateFlag'] = (tempSeason.StartDate.getTime() - day.getTime()) == 0;
        dateRow['SeasonEndDateFlag'] = (tempSeason.EndDate.getTime() - day.getTime()) == 0;
        dateRow['PlayoffStartDateFlag'] = (tempSeason.PlayoffDate.getTime() - day.getTime()) == 0;
        dateRow['SuperBowlDateFlag'] = (tempSeason.SuperBowlDate.getTime() - day.getTime()) == 0;
        dateRow['ProBowlDateFlag'] = (tempSeason.ProBowlDate.getTime() - day.getTime()) == 0;
        var isSeasonEndThisYear = tempSeason.EndDate.getFullYear() == day.getFullYear();
        var isInSeason = tempSeason.StartDate.getTime() <= day.getTime() && tempSeason.EndDate.getTime() >= day.getTime();
        var isInLastSeason = tempLastSeason.StartDate.getTime() <= day.getTime() && tempLastSeason.EndDate.getTime() >= day.getTime();
        dateRow['InSeasonFlag'] = isInSeason || isInLastSeason;
        dateRow['OffSeasonFlag'] = !isInSeason && !isInLastSeason;
        dateRow['CalendarDate'] = day.getFullYear()+'-'+('0'+(day.getMonth()+1)).slice(-2)+'-'+('0'+(day.getDate()+1)).slice(-2);//2017-06-15
        dateRow['CalendarYear'] = day.getFullYear();
        dateRow['CalendarMonth'] = day.getMonth()+1;
        dateRow['CalendarMonthName'] = monthNames[day.getMonth()];
        dateRow['CalendarDay'] = day.getDate();
        dateRow['CalendarDayName'] = daysInWeek[day.getDay()];
*/
        dateRow.push(('0'+(day.getMonth()+1)).slice(-2)+''+('0'+(day.getDate())).slice(-2)+''+day.getFullYear());
        dateRow.push(('0'+(day.getMonth()+1)).slice(-2)+'/'+('0'+(day.getDate())).slice(-2)+'/'+day.getFullYear());
        dateRow.push(tempSeason.Year);
        dateRow.push((tempSeason.StartDate.getTime() - day.getTime()) == 0);
        dateRow.push((tempSeason.EndDate.getTime() - day.getTime()) == 0);
        dateRow.push((tempSeason.PlayoffDate.getTime() - day.getTime()) == 0);
        dateRow.push((tempSeason.SuperBowlDate.getTime() - day.getTime()) == 0);
        dateRow.push((tempSeason.ProBowlDate.getTime() - day.getTime()) == 0);
        var isSeasonEndThisYear = tempSeason.EndDate.getFullYear() == day.getFullYear();
        var isInSeason = tempSeason.StartDate.getTime() <= day.getTime() && tempSeason.EndDate.getTime() >= day.getTime();
        var isInLastSeason = tempLastSeason.StartDate.getTime() <= day.getTime() && tempLastSeason.EndDate.getTime() >= day.getTime();
        dateRow.push(isInSeason || isInLastSeason);
        dateRow.push(!isInSeason && !isInLastSeason);
        dateRow.push(day.getFullYear()+'-'+('0'+(day.getMonth()+1)).slice(-2)+'-'+('0'+(day.getDate())).slice(-2));//2017-06-15
        dateRow.push(day.getFullYear());
        dateRow.push(day.getMonth()+1);
        dateRow.push(monthNames[day.getMonth()]);
        dateRow.push(day.getDate());
        dateRow.push(daysInWeek[day.getDay()]);
        dateRows.push(dateRow);
    }

//    console.log(dateRows);

        db2.insert('INSERT INTO dimDate (`DateCode`, `DateDesc`, `SeasonYear`, `SeasonStartDateFlag`, `SeasonEndDateFlag`, `PlayoffStartDateFlag`, `SuperBowlDateFlag`, `ProBowlDateFlag`, `InSeasonFlag`, `OffSeasonFlag`, `CalendarDate`, `CalendarYear`, `CalendarMonth`, `CalendarMonthName`, `CalendarDay`, `CalendarDayName`) VALUES ?',[dateRows],function(err,res){
            if(err)
                console.log(err,res);
            //if(day.getDate()==1){
                //console.log(dateRow);
            //}
        });
}

/* ----- Insert Fact Table
  `DateID` int(11) NOT NULL COMMENT 'Date Key',
  `PlayerID` int(11) NOT NULL COMMENT 'Player Key',
  `TeamID` int(11) NOT NULL COMMENT 'Team Key',
  `PositionID` int(11) NOT NULL COMMENT 'Position Key',
  `InfractionID` int(11) NOT NULL COMMENT 'Infraction Key',
  */

var insertFctIncident = function(err,res){
    for(var i in res){
        var row = res[i];
        
        //console.log(row);
        // INSERT INTO fctIncidents (DateID, PlayerID, TeamID, PositionID, InfractionID) 
        var sql = 'SELECT DateID, PlayerID, TeamID, PositionID, InfractionID FROM dimPlayer as p'
        sql += ' LEFT JOIN dimTeam as t ON t.TeamCode = "'+row.Team+'"';
        sql += ' LEFT JOIN dimDate as d ON d.CalendarDate = "'+row.Date+'"';
        sql += ' LEFT JOIN dimPosition as pos ON pos.PositionCode = "'+row.Position+'"';
        sql += ' LEFT JOIN dimInfraction as i ON i.InfractionDesc = "'+row.Category+'"';
        sql += ' WHERE PlayerDesc = "' + row.Name + '"';
        db2.query(sql,{},function(err,res){
            console.log(res);
        });
    }
};

//db.select('SELECT DISTINCT * FROM Team_details_view', oldTeamResult);
//db.select('SELECT DISTINCT * FROM Team_details_view', oldTeamResult2);
//db.select("SELECT DISTINCT * FROM position WHERE position_tag != 'DE/DT'", oldPositionResult);
//db2.select('SELECT DISTINCT FranchiseID, FranchiseCode FROM dimFranchise', updateTeamFranchise);
//db.select('SELECT `general_category_id`,left(`Category`,5) as code,`Category`,`hex_color` FROM `general_category` WHERE general_category_id in (SELECT DISTINCT general_category_id FROM arrest_stats)', getOldCrimeCategories);
//db2.select('SELECT * FROM dimInfractionCategory',lkupInfractionCategories);
//db.select('SELECT DISTINCT TRIM(Name) as Name FROM arrest_stats',insertPlayers);
//db.select('SELECT * FROM seasons',insertSeasons);
//db2.select('SELECT * FROM dimSeason',insertDateRows);
db.select('SELECT * FROM arrest_stats',insertFctIncident);