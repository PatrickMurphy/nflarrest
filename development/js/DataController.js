class DataController {
    constructor(DateRangeControl, parent){
        this.DateRangeControl = DateRangeControl;
        this.parent = parent;
        this.data = this.ConvertArrayToObjects(ArrestsCacheTableArr);
        
        // initialize Data updates
        this.PreProcessData();
    }
    
    ConvertArrayToObjects(arr){
        var dataReturn = [];
        for(var i = 0; i<arr.length; i++){
            dataReturn.push(this.ConvertArrayToObject(arr[i]));
        }
        return dataReturn;
    }
    
    ConvertArrayToObject(row){
        var returnObj = {};
        // TODO: Remove this arrest specific hard coding
        var columns = ['arrest_stats_id', 'Date', 'Team', 'Team_name', 'Team_preffered_name', 'Team_city', 'Team_logo_id', 'Team_Conference', 'Team_Division', 'Team_Conference_Division', 'Team_hex_color', 'Team_hex_alt_color', 'Name', 'Position', 'Position_name', 'Position_type', 'Encounter', 'Category', 'Crime_category', 'Crime_category_color', 'Description', 'Outcome', 'Season', 'ArrestSeasonState', 'general_category_id', 'legal_level_id', 'resolution_category_id', 'Year', 'Month', 'Day', 'Day_of_Week', 'Day_of_Week_int', 'YearToDate', 'DaysSince', 'DaysToLastArrest', 'DaysToLastCrimeArrest', 'DaysToLastTeamArrest'];
        // if columns has as many or more column titles as row has values
        if(columns.length >= row.length){
            for (var i = 0; i < row.length; i++){
                returnObj[columns[i]] = row[i];
            }
        }
        return returnObj;
    }
    
    // Function called at end of constructor to process the data upon initialization
    PreProcessData(){
        this.PreProcessData_DaysSince();
        this.PreProcessData_YearToDate();
        this.PreProcessData_SortOrder();
    }
    
    // Sub-Function of PreProcess Data - Add/Update each row in data collection to add [DaysSince], the number of days elapsed between [Date] and today.
    PreProcessData_DaysSince(){
        // a and b are javascript Date objects
		var dateDiffInDays = function(a, b) {
		  	// Discard the time and time-zone information
		  	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		  	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
			return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
		};
        
        // for each arrest calc daysSince
        this.forEach((r,i) => {
            this.data[i].DaysSince = dateDiffInDays(new Date(r.Date),new Date());
        });
    }
    
    // Sub-Function of PreProcess Data - Add/Update each row in data collection to add [YearToDateStatus], boolean for if this record is within last.
    PreProcessData_YearToDate(){
        // a and b are javascript Date objects
		var dateDiffInDays = function(a, b) {
		  	// Discard the time and time-zone information
		  	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		  	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
			return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
		};
        
        // for each arrest calc daysSince
        this.forEach((r,i) => {
            var janfirst = new Date(new Date().getFullYear(), 0, 1);
            var today = new Date();
            var daysSinceJanFirst = dateDiffInDays(janfirst,today);
            this.data[i].YearToDateStatus = (daysSinceJanFirst > r.YearToDate) ? 'Year To Date' : 'Future Period';
        });
    }
    
    // Sub-Function of PreProcess Data - Sort the Data
    PreProcessData_SortOrder(){
        // sort data on init
        function compare( a, b ) {
          if ( a.DaysSince < b.DaysSince ){
            return 1;
          }
          if ( a.DaysSince > b.DaysSince ){
            return -1;
          }
          return 0;
        }
        this.data.sort(compare);
    }
    
	forEach(rowCallback, finsihedCallback, dateLimit){
        finsihedCallback = finsihedCallback || function(){};
		dateLimit = dateLimit || true;
		for (var i = this.data.length - 1; i >= 0; i--) {
			var row = this.data[i];
			if(dateLimit){
				if(this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
					rowCallback(row,i);
				}
			}else{
				rowCallback(row,i);
			}
		}
		finsihedCallback();
	}

	incrementMap(map, value){
		if(!map.hasOwnProperty(value)){
			map[value] = 1;    // set init value to Map
		}else{
			map[value] = map[value]+1;
		}
		return map;
	}

	dateLimit(row, start_date, end_date){
		return(new Date(row.Date) >= new Date(start_date) && new Date(row.Date) <= new Date(end_date));
	}

	getActivePlayerArrests(callback){
		callback(['no data']);
	}
    
    getMostRecentArrest(callback){
        var returnRow;
        var minDaysSince = 999999999;
        
		this.forEach((row) => {
			if(this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
				if(row.DaysSince < minDaysSince){
					returnRow = row;
                    minDaysSince = row.DaysSince;
				}
			}
		},()=>{
			// finished
			callback(returnRow);
		});
    }

	getTeams(callback, filterFn){
        var filterFunction = filterFn || (row) => {return this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd());};
		var result = [];
        var team_result_id = {}; // team:intpos
        var team_items = {};
		var map = new Map();
		
		for (var i = this.data.length - 1; i >= 0; i--) {
            var row = this.data[i];
			if(filterFunction(row)){
                var item = {'Team': row.Team, 'Team_name': row.Team_name, 'Team_preffered_name': row.Team_preffered_name, 'Team_logo_id': row.Team_logo_id, 'Team_Conference': row.Team_Conference, 'Team_Division': row.Team_Division, 'Team_Conference_Division': row.Team_Conference_Division, 'Team_Arrest_Count':1};
                if(!map.has(row.Team)){
                    map.set(row.Team, 1);    // set any value to Map
                    team_result_id[row.Team] = result.length;
                    team_items[row.Team] = item;
                    //result.push(item);
                }else{
                    // add 1 to arrest count by team
                    map.set(item.Team, map.get(item.Team)+1);
                    team_items[row.Team]['Team_Arrest_Count']++;
                }
            }//else filtered out
		}
        
        for(var k = Object.keys(team_items).length - 1; k >= 0; k--){
            var obj = team_items[Object.keys(team_items)[k]];
            result.push(obj);
        }
        
        result.sort(function(a,b){
            if(a.Team_Arrest_Count > b.Team_Arrest_Count){
                return -1;
            }else if(a.Team_Arrest_Count < b.Team_Arrest_Count){
                return 1;
            }else{
                // equal
                return 0;
            }
        });
        

		callback(result);
	}

	getArrestMeter(callback){
		var avg_days = 0.0;
		var max_days = -1;
		var record_count = 0;
		var min_days = 9000000000;
        
        this.forEach((r,i) => {
            record_count++;
            avg_days += r.DaysToLastArrest;

            if(r.DaysToLastArrest > max_days){
                max_days = r.DaysToLastArrest;
            }

            if(r.DaysSince < min_days){
                min_days = r.DaysSince;
            }
        });

        avg_days = avg_days / record_count;

		callback({
				'alltime': 	{'record': Math.floor(max_days)
								,'average':Math.floor(avg_days)
								,'raw_average':Math.floor(avg_days)
							},
				'current': 	{'daysSince':Math.floor(min_days)
								,'probability': Math.exp(min_days*-1)/avg_days
								,'odds': Math.floor(1/Math.exp((min_days*-1)/avg_days))
							}
				});
	}

	getDonutChart(column, filterFunc, callback){
		var sortDESC = function(a, b) {
		  return b.arrest_count - a.arrest_count;
		};

		var return_map = {};

		var return_arr = [];

		for (var i = this.data.length - 1; i >= 0; i--) {
			var row = this.data[i];
			if(filterFunc(row) && this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
				return_map = this.incrementMap(return_map, row[column]);
			}
		}

		Object.keys(return_map).forEach((key) => {
			var obj = {};
			obj[column] = key;
			obj['arrest_count'] = return_map[key];
			return_arr.push(obj);
		});

		callback(return_arr.sort(sortDESC));
	}

	getOverallChart(stack,bar,order_col,order_dir,callback){
		var column_values = {};
        // TODO: Move this to data model objects
		column_values['Year'] = 'Year';
		column_values['Month'] = 'Month';
		column_values['Day'] = 'Day_of_Week';
		column_values['DayOrder'] = 'Day_of_Week_int';
		column_values['Team'] = 'Team_preffered_name';
		column_values['Team Code'] = 'Team';
		column_values['Conference'] = 'Team_Conference';
		column_values['Division'] = 'Team_Conference_Division';
		column_values['Position'] = 'Position';
		column_values['Crime'] = 'Crime_category';
		column_values['Season'] = 'Season';
		column_values['SeasonState'] = 'ArrestSeasonState';
		column_values['Measure'] = 'arrest_count';

		var bar_column = column_values[bar];
		var stacks_column = column_values[stack];

		var order_by_column = column_values[order_col];
		var order_by_direction = order_dir;

		var legend_order_by_column = 'Measure';
		var legend_order_by_direction = 'ASC';

		var bar_order_by_column = order_by_column;
		var bar_order_by_direction = order_by_direction;

		var limit;

		var bar_stacks_count = {};
		var bar_count = {};
		var stacks_count = {};
        var bar_attributes = {};

		var bar_stacks_measure = [];
		var legends_categories = [];

		var newResult = {};

		var sortDESC = function(a, b) {
		  return b.arrest_count - a.arrest_count;
		};
        var sortASC = function(a, b) {
		  return a.arrest_count - b.arrest_count;
		};

		for (var i = this.data.length - 1; i >= 0; i--) {
			var row = this.data[i];
			if(this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
				bar_stacks_count = this.incrementMap(bar_stacks_count, (row[bar_column]+row[stacks_column]));
				bar_count = this.incrementMap(bar_count, row[bar_column]);
				stacks_count = this.incrementMap(stacks_count, row[stacks_column]);
                bar_attributes[row[bar_column]] = row[bar_order_by_column];
			}
		}

        // build and sort bar order
        // deterimine order of bars
		var bar_order = [];
		Object.keys(bar_count).forEach((key) => {
            var bartmp = {'bar': key, 'arrest_count': bar_count[key]};
            bartmp[bar_order_by_column] = bar_attributes[key];
            bar_order.push(bartmp);
		});

		if(bar_order_by_direction == 'DESC' && bar_order_by_column == bar_column){
			bar_order.sort(sortDESC);
		}/*else if (bar_order_by_direction == 'ASC' && bar_order_by_column == bar_column){
            bar_order.sort(sortASC);
        }*/else if (bar_order_by_direction == 'ASC' && bar_order_by_column == 'Day_of_Week_int'){
            bar_order.sort((a, b) => {
		      return a[bar_order_by_column] - b[bar_order_by_column];
		    });
        }
        
        // build bar groups
		var bar_groups = [];
		Object.keys(stacks_count).forEach((key) => {
			bar_groups.push(key);
            //console.log(bar_groups, key); // ['Crime']
		});
        
        bar_groups = bar_groups.sort((a, b) => {
          return stacks_count[b] - stacks_count[a];
        });


        // build bar titles
		var bar_titles = ['x'];
		bar_order.forEach((obj) => {
			bar_titles.push(obj.bar);
		});

        // build column rows
		var column_rows = [];
		column_rows.push(bar_titles);

        // use bar groups to preserve sorting
		Object.keys(bar_groups).forEach((stack_id) => {
            var stack_key = bar_groups[stack_id];
			var stack_row = [stack_key];
			bar_order.forEach((bar_obj) => {
				var bar_key = bar_obj.bar;
				// for each stack and bar
				var val = bar_stacks_count[bar_key+stack_key];
				if(val == undefined) {
					val = 0;
				}
				stack_row.push(val);
			});
			column_rows.push(stack_row);
		});

		newResult = {columns: column_rows
					, groups: bar_groups};
		callback(newResult);
	}

	getTopLists(last_start_pos, dateStart, dateEnd, callback){
		var result = [];

		var crime_map = {};
		var player_map = {};
		var position_map = {};
        var position_name_map = {};

		var crime_arr = [];
		var player_arr = [];
		var position_arr = [];

		for (var i = this.data.length - 1; i >= 0; i--) {
			var row = this.data[i];
			if(this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
				crime_map = this.incrementMap(crime_map, row.Category);
				player_map = this.incrementMap(player_map, row.Name);
				position_map = this.incrementMap(position_map, row.Position);
                position_name_map[row.Position] = row.Position_name;
			}
		}

		Object.keys(crime_map).forEach((key) => {
			var obj = {};
			obj['Category'] = key;
			obj['arrest_count'] = crime_map[key];
			crime_arr.push(obj);
		});


		Object.keys(player_map).forEach((key) => {
			var obj = {};
			obj['Name'] = key;
			obj['arrest_count'] = player_map[key];
			player_arr.push(obj);
		});


		Object.keys(position_map).forEach((key) => {
			var obj = {};
			obj['Position'] = key;
            obj['Position_name'] = position_name_map[key];
			obj['arrest_count'] = position_map[key];
			position_arr.push(obj);
		});

		var sortDESC = function(a, b) {
		  return b.arrest_count - a.arrest_count;
		};

		// push crime, push name, push position
		result.push(crime_arr.sort(sortDESC).slice(last_start_pos,last_start_pos+5));
		result.push(player_arr.sort(sortDESC).slice(last_start_pos,last_start_pos+5));
		result.push(position_arr.sort(sortDESC).slice(last_start_pos,last_start_pos+5));
	
		callback(result);
	}

	getArrests(filterFunc, callback){
		var arrests = [];
		this.forEach((row) => {
			if(this.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
				if(filterFunc(row)){
					arrests.push(row);
				}
			}
		},() => {
			// finished
			callback(arrests);
		});
	}
};