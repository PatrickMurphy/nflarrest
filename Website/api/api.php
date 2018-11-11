<?php
session_start();

// include MySQL Library & Database Settings
require_once('PHP-Multi-SQL/classes/MySQL.class.php');
require_once('db_config.php');

// Connect to MySQL Server Database 
$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

// check for db connection, or stop executing with error
if($db == false){
	die('DB connection error.');
}

// Utility function converting sql result to php array
function gather_results($result){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$return_array[] = $result->fetch_assoc();
	}
	return $return_array;
}

// Function to build and return the WHERE filter from the query string
function prepare_filters($default_param = array()){
	// default filter settings from GET, or empty
	if(isset($_GET)){
		$query_values = $_GET;
	}else{
		$query_values = array();
	}
	
	// Add or overwrite default arguments
	if(is_array($default_param) && count($default_param) > 0){
		// convert array to string
		foreach($default_param as $key => $value){
			$query_values[$key] = $value;
		}
	}
	// The Return Variable
	$where_filters = [];
	
	// Date Filter | DateRangeControl
    if(isset($query_values['start_date']) || isset($query_values['end_date'])){
        $start = isset($query_values['start_date']) ? $query_values['start_date'] : '2000-01-01';
        $end = isset($query_values['end_date']) ? $query_values['end_date'] : date('Y-m-d');
        $date_range = "Date BETWEEN '" . $start . "' AND '" . $end . "' ";
        array_push($where_filters,$date_range);
    }
    
	// Month | select
    if(isset($query_values['month'])){
		if(is_array($query_values['month'])){
			array_push($where_filters,'Month IN (\''.implode("','",$query_values['month']).'\')');
		}else{
			array_push($where_filters, 'Month = \'' . $query_values['month'] . '\'');
		}
    }
    
	// Day of week | checkbox-group
    if(isset($query_values['dayofweek'])){
        $in_list_day = [];
        $day_val = 0;
        foreach (str_split($query_values['dayofweek']) as $day){
            $day_val++;
            if($day == 1){
                array_push($in_list_day,$day_val);
            }
        }
        array_push($where_filters,'Day_of_Week_INT IN (\''.implode("','",$in_list_day).'\')');
    }
    
	// Year To Date | Checkbox
    if(isset($query_values['yeartodate'])){
        if($query_values['yeartodate']==1){
            array_push($where_filters,'YearToDate = 1');
        }else{
            array_push($where_filters,'YearToDate = 0');
        }
    }
    
	// Season | Select
    if(isset($query_values['season'])){
		if(is_array($query_values['season'])){
        	array_push($where_filters,'Season IN (\''.implode("','",$query_values['season']).'\')');
		}else{
			array_push($where_filters, 'Season = \'' . $query_values['season'] . '\'');
		}
    }
    
	// Season Status | checkbox-group
    if(isset($query_values['season_status'])){
        if($query_values['season_status'] == '10'){
            array_push($where_filters,'ArrestSeasonState = "OffSeason"');
        }else if ($query_values['season_status'] == '01'){
            array_push($where_filters,'ArrestSeasonState = "InSeason"');       
        }
    }
    
	// team | select
    if(isset($query_values['team'])){
		if(is_array($query_values['team'])){
        	array_push($where_filters,'Team IN (\''.implode("','",$query_values['team']).'\')');
		}else{
			array_push($where_filters,'Team = \'' . $query_values['team'] . '\'');
		}
    }
    
	// conference | checkbox-group
    if(isset($query_values['conference'])){
        if($query_values['conference'] == '10'){
            array_push($where_filters,'Team_Conference = "AFC"');
        }else if ($query_values['conference'] == '01'){
            array_push($where_filters,'Team_Conference = "NFC"');       
        }
    }
    
	// division | select
    if(isset($query_values['division'])){
		if(is_array($query_values['division'])){
			array_push($where_filters,'Team_Conference_Division IN (\''.implode("','",$query_values['division']).'\')');
    	}else{
			array_push($where_filters, 'Team_Conference_Division = \'' . $query_values['division'] . '\'');
		}
    }
	
    // crime category | select
    if(isset($query_values['crimeCategory'])){
		if(is_array($query_values['crimeCategory'])){
			array_push($where_filters, 'Crime_category IN (\''.implode("','",$query_values['crimeCategory']).'\')');
    	}else{
			array_push($where_filters, 'Crime_category = \'' . $query_values['crimeCategory'] . '\'');
		}
    }
    
	// crime | select
    if(isset($query_values['crime'])){
		if(is_array($query_values['crime'])){
			array_push($where_filters, 'Category IN (\''.implode("','",$query_values['crime']).'\')');
		}else{
			array_push($where_filters, 'Category = \'' . $query_values['crime'] . '\'');
		}
    }
	
	// position | select
    if(isset($query_values['position'])){
		if(is_array($query_values['position'])){
			array_push($where_filters,'Position IN (\''.implode("','",$query_values['position']).'\')');
		}else{
			array_push($where_filters, 'Position = \'' . $query_values['position'] . '\'');
		}
    }
	
	// position type | checkbox-group
    if(isset($query_values['position_type'])){
        $arr_pos_type = str_split($query_values['position_type']);
        $arr_vals = array();
        if($arr_pos_type[0] == '1'){
            $arr_vals[] = "'D'";
        }
        
        if($arr_pos_type[1] == '1'){
            $arr_vals[] = "'O'";
        }
        
        if($arr_pos_type[2] == '1'){
            $arr_vals[] = "'S'";
        }
        array_push($where_filters,'Position_type IN (\''.implode("','",$arr_vals).'\')');
    }
    
    // player | select
    if(isset($query_values['player'])){
		if(is_array($query_values['player'])){
        	array_push($where_filters,'Name IN (\''.implode("','",$query_values['player']).'\')');
		}else{
			array_push($where_filters, 'Name = \'' . $query_values['player'] . '\'');
		}
    }
    
	// return filters
    if(count($where_filters) > 0){
    	return 'WHERE ' . implode(' AND ',$where_filters);
	}else{
		return '';
	}
}

// Function to return the value of a $_GET Query String
function get_query_string($get_var){
	if(isset($_GET[$get_var])){
		// if exists use param
		return $_GET[$get_var];
	}else if(isset($_GET['id'])){
		// if id exists use that
		$_GET[$get_var] = $_GET['id'];
		return $_GET['id'];
	}else{
		// no value to return
		die(strtoupper($get_var).' must be set');
	}
	return 'ERROR: QueryString variable not set';
}

// Function to return the LIMIT sql query string from a get request
function get_limit(){
	$return_limit = '';
	if(isset($_GET['limit'])){
		$return_limit = ' LIMIT ' . $_GET['limit'];
	}
	return $return_limit;
}

// Function to return the SQL filter condition for the date GET
function get_date_range(){	
	$return_date_range = '';

	if(isset($_GET['start_date']) || isset($_GET['end_date'])){
		$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
		$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
		$return_date_range = " && Date BETWEEN '" . $start . "' AND '" . $end . "' ";
	}
	
	return $return_date_range;
}

//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-type:application/json');

// debug
if(isset($_GET['test'])){
	// print get var array
	print_r($_GET);
	
	// test print filters
    echo prepare_filters();
}
                   
//sets the table that standard queries pull from
$DB_MAIN_TABLE = 'ArrestsCacheTable';
