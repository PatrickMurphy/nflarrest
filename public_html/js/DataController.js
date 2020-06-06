var DataController = {
	options: {},
	init: function(){
		options.data = ArrestsCacheTable;
	},
	getActivePlayerArrests: function(){
		return ['no data'];
	},

	getTeams: function(){
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

		return result;
	},

	getArrestMeter: function(){
		var avg_days = 0.0;
		var max_days = -1;
		var min_days = 9000000000;

		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			
			avg_days += row.DaysToLastArrest;

			if(row.DaysToLastArrest > max_days){
				max_days = row.DaysToLastArrest;
			}

			if(row.DaysSince < min_days){
				min_days = row.DaysSince;
			}
		}

		avg_days = avg_days / DataController.options.data.length;

		return {
				'alltime': 	{'record':max_days
								,'average':avg_days
								,'raw_average':avg_days
							},
				'current': 	{'daysSince':min_days
								,'probability': Math.exp(min_days*-1)/avg_days
								,'odds': Math.floor(1/Math.exp((min_days*-1)/avg_days))
							}
				};
	},

	getOverallChart: function(){
		/*
		$query = 
			'SELECT '.$bar_column
					.',a.'.$stacks_column
					.', '.$measure.' AS '.$measure_column
					.' FROM '. $DB_MAIN_TABLE.' AS a '
					// where
					. prepare_filters() 
					.' GROUP BY '.$bar_column.', a.'.$stacks_column
					.' ORDER BY '.$order_by_column.' '.$order_by_direction;

		$legends_categories_query = 
			'SELECT '.$stacks_column
					.', '.$measure.' AS '.$measure_column
					.' FROM '. $DB_MAIN_TABLE.' AS a '
					// where
					. prepare_filters() 
					.' GROUP BY '.$stacks_column
					.' ORDER BY '.$legend_order_by_column.' '.$legend_order_by_direction;

		$bar_group_query = 
			'SELECT '.$bar_column
					.', '.$measure.' AS '.$measure_column
					.' FROM '. $DB_MAIN_TABLE.' AS a '
					. prepare_filters() 
					.' GROUP BY '.$bar_column
					.' ORDER BY '.$bar_order_by_column.' '.$bar_order_by_direction
					.' ' . $limit;
		*/

		var bar_stacks_measure = [];
		var legends_categories = [];
		var bar_groups = [];

		/*
		// =================  run the 3 queries  =======================
		$result = $db->query($query);
		$bar_groups_result = $db->query($bar_group_query);
		$legend_cats = $db->query($legends_categories_query);


		// temp var for stacks and bars 
		$stacks = [];
		$bar_groups = [];

		// add each stack value
		foreach($result as $main_row){
			$bar_id = $main_row[$bar_column];
			$stack_id = $main_row[$stacks_column];
		        $stacks[$bar_id][$stack_id] = $main_row[$measure_column];
		}

		// get legend categories
		foreach($legend_cats as $legend_row){
		    if(!in_array($legend_row[$stacks_column], $bar_groups)){
		        $bar_groups[] = $legend_row[$stacks_column];
		    }
		}
		*/

		/*
		// ======================= create output format =============================
		$new_result = array();
		$new_result['columns'][0][0] = 'x';

		// add each bar title to output
		foreach($bar_groups as $cat){
		    $new_result['columns'][$cat][0] = $cat;
		}

		// add each bar value to output
		foreach($bar_groups_result as $bar_row){
		    //$teams[$bar_row[$bar_column]] = $bar_row[$measure_column];
		    $new_result['columns'][0][] = $bar_row[$bar_column];
		    foreach($bar_groups as $cat){
		        $new_result['columns'][$cat][] = isset($stacks[$bar_row[$bar_column]][$cat]) ? $stacks[$bar_row[$bar_column]][$cat] : 0;
		    }
		}

		// setup and send
		$new_result['columns'] = array_values($new_result['columns']);
		$new_result['groups'] = $bar_groups;
		print json_encode($new_result);
		*/

		return ['no data'];
	},

	getTopLists: function(){
		var result = [];

		var crime_map = {};
		var player_map = {};
		var position_map = {};

		var crime_arr = [];
		var player_arr = [];
		var position_arr = [];

		for (var i = DataController.options.data.length - 1; i >= 0; i--) {
			var row = DataController.options.data[i];
			
			if(!crime_map.hasOwnProperty(row.Category)){
		        crime_map[row.Category] = 1;    // set init value to Map
		    }else{
		    	crime_map[row.Category] = crime_map[row.Category]+1;
		    }

		    if(!player_map.hasOwnProperty(row.Name)){
		        player_map[row.Name] = 1;    // set init value to Map
		    }else{
		    	player_map[row.Name] = player_map[row.Name]+1;
		    }

		    if(!position_map.hasOwnProperty(row.Position)){
		        position_map[row.Position] = 1;    // init any value to Map
		    }else{
		    	position_map[row.Position] = position_map[row.Position]+1;
		    }
		}

		Object.keys(crime_map).forEach(function (key) {
			var obj = {};
			obj[key] = crime_map[key];
			crime_arr.push(obj);
		});


		Object.keys(player_map).forEach(function (key) {
			var obj = {};
			obj[key] = player_map[key];
			player_arr.push(obj);
		});


		Object.keys(position_map).forEach(function (key) {
			var obj = {};
			obj[key] = position_map[key];
			position_arr.push(obj);
		});

		var sortDESC = function(a, b) {
		  return Object.values(b)[0] - Object.values(a)[0];
		};

		// push crime, push name, push position
		result.push(crime_arr.sort(sortDESC));
		result.push(player_arr.sort(sortDESC));
		result.push(position_arr.sort(sortDESC));
	
		return result;
	}
};

// class DataController {
// 	constructor() {
// 		this.data = ArrestsCacheTable;
// 	}

// 	getActivePlayerArrests(){
// 		return ['no data'];
// 	}

// 	getTeams(){
// 		var return_data = [];
// 		var result = [];
// 		var map = new Map();
		
// 		for (var i = this.data.length - 1; i >= 0; i--) {
// 			var row = this.data[i];
// 			return_data.push({'Team': row.Team, 'Team_preffered_name': row.Team_preffered_name, 'Team_logo_id': row.Team_logo_id});
// 		}

// 		for (const item of return_data) {
// 		    if(!map.has(item.Team)){
// 		        map.set(item.Team, true);    // set any value to Map
// 		        result.push(item);
// 		    }
// 		}

// 		return result;
// 	}

// 	getArrestMeter(){
// 		var avg_days = 0.0;
// 		var max_days = -1;
// 		var min_days = 9000000000;

// 		for (var i = this.data.length - 1; i >= 0; i--) {
// 			var row = this.data[i];
			
// 			avg_days += row.DaysToLastArrest;

// 			if(row.DaysToLastArrest > max_days){
// 				max_days = row.DaysToLastArrest;
// 			}

// 			if(row.DaysSince < min_days){
// 				min_days = row.DaysSince;
// 			}
// 		}

// 		avg_days = avg_days / this.data.length;

// 		return {
// 				'alltime': 	{'record':max_days
// 								,'average':avg_days
// 								,'raw_average':avg_days
// 							},
// 				'current': 	{'daysSince':min_days
// 								,'probability': Math.exp(min_days*-1)/avg_days
// 								,'odds': Math.floor(1/Math.exp((min_days*-1)/avg_days));
// 							}
// 				};
// 	}

// 	getOverallChart(){
// 		/*
// 		$query = 
// 			'SELECT '.$bar_column
// 					.',a.'.$stacks_column
// 					.', '.$measure.' AS '.$measure_column
// 					.' FROM '. $DB_MAIN_TABLE.' AS a '
// 					// where
// 					. prepare_filters() 
// 					.' GROUP BY '.$bar_column.', a.'.$stacks_column
// 					.' ORDER BY '.$order_by_column.' '.$order_by_direction;

// 		$legends_categories_query = 
// 			'SELECT '.$stacks_column
// 					.', '.$measure.' AS '.$measure_column
// 					.' FROM '. $DB_MAIN_TABLE.' AS a '
// 					// where
// 					. prepare_filters() 
// 					.' GROUP BY '.$stacks_column
// 					.' ORDER BY '.$legend_order_by_column.' '.$legend_order_by_direction;

// 		$bar_group_query = 
// 			'SELECT '.$bar_column
// 					.', '.$measure.' AS '.$measure_column
// 					.' FROM '. $DB_MAIN_TABLE.' AS a '
// 					. prepare_filters() 
// 					.' GROUP BY '.$bar_column
// 					.' ORDER BY '.$bar_order_by_column.' '.$bar_order_by_direction
// 					.' ' . $limit;
// 		*/

// 		var bar_stacks_measure = [];
// 		var legends_categories = [];
// 		var bar_groups = [];

		
// 		// =================  run the 3 queries  =======================
// 		$result = $db->query($query);
// 		$bar_groups_result = $db->query($bar_group_query);
// 		$legend_cats = $db->query($legends_categories_query);


// 		// temp var for stacks and bars 
// 		$stacks = [];
// 		$bar_groups = [];

// 		// add each stack value
// 		foreach($result as $main_row){
// 			$bar_id = $main_row[$bar_column];
// 			$stack_id = $main_row[$stacks_column];
// 		        $stacks[$bar_id][$stack_id] = $main_row[$measure_column];
// 		}

// 		// get legend categories
// 		foreach($legend_cats as $legend_row){
// 		    if(!in_array($legend_row[$stacks_column], $bar_groups)){
// 		        $bar_groups[] = $legend_row[$stacks_column];
// 		    }
// 		}
		

// 		/*
// 		// ======================= create output format =============================
// 		$new_result = array();
// 		$new_result['columns'][0][0] = 'x';

// 		// add each bar title to output
// 		foreach($bar_groups as $cat){
// 		    $new_result['columns'][$cat][0] = $cat;
// 		}

// 		// add each bar value to output
// 		foreach($bar_groups_result as $bar_row){
// 		    //$teams[$bar_row[$bar_column]] = $bar_row[$measure_column];
// 		    $new_result['columns'][0][] = $bar_row[$bar_column];
// 		    foreach($bar_groups as $cat){
// 		        $new_result['columns'][$cat][] = isset($stacks[$bar_row[$bar_column]][$cat]) ? $stacks[$bar_row[$bar_column]][$cat] : 0;
// 		    }
// 		}

// 		// setup and send
// 		$new_result['columns'] = array_values($new_result['columns']);
// 		$new_result['groups'] = $bar_groups;
// 		print json_encode($new_result);
// 		*/

// 		return ['no data'];
// 	}

// 	getTopLists(){
// 		var result = [];

// 		var crime_map = {};
// 		var player_map = {};
// 		var position_map = {};

// 		var crime_arr = [];
// 		var player_arr = [];
// 		var position_arr = [];

// 		for (var i = this.data.length - 1; i >= 0; i--) {
// 			var row = this.data[i];
			
// 			if(!crime_map.hasOwnProperty(row.Category)){
// 		        crime_map[row.Category] = 1;    // set init value to Map
// 		    }else{
// 		    	crime_map[row.Category] = crime_map[row.Category]+1;
// 		    }

// 		    if(!player_map.hasOwnProperty(row.Name)){
// 		        player_map[row.Name] = 1;    // set init value to Map
// 		    }else{
// 		    	player_map[row.Name] = player_map[row.Name]+1;
// 		    }

// 		    if(!position_map.hasOwnProperty(row.Position)){
// 		        position_map[row.Position] = 1;    // init any value to Map
// 		    }else{
// 		    	position_map[row.Position] = position_map[row.Position]+1;
// 		    }
// 		}

// 		Object.keys(crime_map).forEach(function (key) {
// 			var obj = {};
// 			obj[key] = crime_map[key];
// 			crime_arr.push(obj);
// 		});


// 		Object.keys(player_map).forEach(function (key) {
// 			var obj = {};
// 			obj[key] = player_map[key];
// 			player_arr.push(obj);
// 		});


// 		Object.keys(position_map).forEach(function (key) {
// 			var obj = {};
// 			obj[key] = position_map[key];
// 			position_arr.push(obj);
// 		});

// 		var sortDESC = function(a, b) {
// 		  return Object.values(b)[0] - Object.values(a)[0];
// 		};

// 		// push crime, push name, push position
// 		result.push(crime_arr.sort(sortDESC));
// 		result.push(player_arr.sort(sortDESC));
// 		result.push(position_arr.sort(sortDESC));
	
// 		return result;
// 	}
// }


