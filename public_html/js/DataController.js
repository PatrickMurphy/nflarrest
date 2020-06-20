var DataController = {
	options: {},
	init: function(callback){
		DataController.options.data = ArrestsCacheTable;
		callback(this);
	},

	forEach: function(rowCallback, finsihedCallback, dateLimit){
		dateLimit = dateLimit || true;
		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			if(dateLimit){
				if(this.dateLimit(row,dateRangeNFL.getStart(),dateRangeNFL.getEnd())){
					rowCallback(row);
				}
			}else{
				rowCallback(row);
			}
		}
		finsihedCallback();
	},

	incrementMap: function(map, value){
		if(!map.hasOwnProperty(value)){
			map[value] = 1;    // set init value to Map
		}else{
			map[value] = map[value]+1;
		}
		return map;
	},

	dateLimit: function(row, start_date, end_date){
		return(new Date(row.Date) >= new Date(start_date) && new Date(row.Date) <= new Date(end_date));
	},

	getActivePlayerArrests: function(callback){
		callback(['no data']);
	},

	getTeams: function(callback){
		var return_data = [];
		var result = [];
		var map = new Map();
		
		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			return_data.push({'Team': row.Team, 'Team_preffered_name': row.Team_preffered_name, 'Team_logo_id': row.Team_logo_id});
		}


		for (var i = return_data.length - 1; i >= 0; i--) {
			var item = return_data[i];
		    if(!map.has(item.Team)){
		        map.set(item.Team, true);    // set any value to Map
		        result.push(item);
		    }
		}

		callback(result);
	},

	getArrestMeter: function(callback){
		var avg_days = 0.0;
		var max_days = -1;
		var record_count = 0;
		var min_days = 9000000000;

		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			if(this.dateLimit(row,dateRangeNFL.getStart(),dateRangeNFL.getEnd())){
				record_count++;
				avg_days += row.DaysToLastArrest;

				if(row.DaysToLastArrest > max_days){
					max_days = row.DaysToLastArrest;
				}

				if(row.DaysSince < min_days){
					min_days = row.DaysSince;
				}
			}
		}

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
	},

	getOverallChart: function(stack,bar,order_col,order_dir,callback){
		var column_values = {};
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

		var bar_stacks_measure = [];
		var legends_categories = [];

		var newResult = {};

		var sortDESC = function(a, b) {
		  return b.arrest_count - a.arrest_count;
		};

		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			if(this.dateLimit(row,dateRangeNFL.getStart(),dateRangeNFL.getEnd())){
				bar_stacks_count = this.incrementMap(bar_stacks_count, (row[bar_column]+row[stacks_column]));
				bar_count = this.incrementMap(bar_count, row[bar_column]);
				stacks_count = this.incrementMap(stacks_count, row[stacks_column]);
			}
		}

		var bar_order = [];
		Object.keys(bar_count).forEach(function (key) {
			bar_order.push({'bar': key, 'arrest_count': bar_count[key]});
		});

		if(bar_order_by_direction == 'DESC' && bar_order_by_column == bar_column){
			bar_order.sort(sortDESC);
		}

		var bar_groups = [];
		Object.keys(stacks_count).forEach(function (key) {
			bar_groups.push(key);
		});


		var bar_titles = ['x'];
		bar_order.forEach(function (obj) {
			bar_titles.push(obj.bar);
		});

		var column_rows = [];
		column_rows.push(bar_titles);

		Object.keys(stacks_count).forEach(function (stack_key){
			var stack_row = [stack_key];
			bar_order.forEach(function(bar_obj){
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
	},

	getTopLists: function(last_start_pos, dateStart, dateEnd, callback){
		var result = [];

		var crime_map = {};
		var player_map = {};
		var position_map = {};

		var crime_arr = [];
		var player_arr = [];
		var position_arr = [];

		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			if(this.dateLimit(row,dateRangeNFL.getStart(),dateRangeNFL.getEnd())){
				crime_map = this.incrementMap(crime_map, row.Category);
				player_map = this.incrementMap(player_map, row.Name);
				position_map = this.incrementMap(position_map, row.Position);
			}
		}

		Object.keys(crime_map).forEach(function (key) {
			var obj = {};
			obj['Category'] = key;
			obj['arrest_count'] = crime_map[key];
			crime_arr.push(obj);
		});


		Object.keys(player_map).forEach(function (key) {
			var obj = {};
			obj['Name'] = key;
			obj['arrest_count'] = player_map[key];
			player_arr.push(obj);
		});


		Object.keys(position_map).forEach(function (key) {
			var obj = {};
			obj['Position'] = key;
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
	},

	getArrests: function(filterFunc, callback){
		var arrests = [];
		this.forEach(function(row){
			if(filterFunc(row)){
				arrests.push(row);
			}
		},function(){
			// finished
			callback(arrests);
		});
	}
};