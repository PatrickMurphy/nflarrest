<?php
session_start();
require_once('PHP-Multi-SQL/classes/MySQL.class.php');
require_once('db_config.php');

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

if($db == false){
	die('DB connection error.');
}

function gather_results($result){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$return_array[] = $result->fetch_assoc();
	}
	return $return_array;
}

function prepare_filters(){
    $where_filters = [];
	
	// Date Filter | DateRangeControl
    if(isset($_GET['start_date']) || isset($_GET['end_date'])){
        $start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
        $end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
        $date_range = "Date BETWEEN '" . $start . "' AND '" . $end . "' ";
        array_push($where_filters,$date_range);
    }
    
	// Month | select
    if(isset($_GET['month'])){
		if(is_array($_GET['month'])){
			array_push($where_filters,'Month IN (\''.implode("','",$_GET['month']).'\')');
		}else{
			array_push($where_filters, 'Month = \'' . $_GET['month'] . '\'');
		}
    }
    
	// Day of week | checkbox-group
    if(isset($_GET['dayofweek'])){
        $in_list_day = [];
        $day_val = 0;
        foreach (str_split($_GET['dayofweek']) as $day){
            $day_val++;
            if($day == 1){
                array_push($in_list_day,$day_val);
            }
        }
        array_push($where_filters,'Day_of_Week_INT IN (\''.implode("','",$in_list_day).'\')');
    }
    
	// Year To Date | Checkbox
    if(isset($_GET['yeartodate'])){
        if($_GET['yeartodate']==1){
            array_push($where_filters,'YearToDate = 1');
        }else{
            array_push($where_filters,'YearToDate = 0');
        }
    }
    
	// Season | Select
    if(isset($_GET['season'])){
		if(is_array($_GET['season'])){
        	array_push($where_filters,'Season IN (\''.implode("','",$_GET['season']).'\')');
		}else{
			array_push($where_filters, 'Season = \'' . $_GET['season'] . '\'');
		}
    }
    
	// Season Status | checkbox-group
    if(isset($_GET['season_status'])){
        if($_GET['season_status'] == '10'){
            array_push($where_filters,'ArrestSeasonState = "OffSeason"');
        }else if ($_GET['season_status'] == '01'){
            array_push($where_filters,'ArrestSeasonState = "InSeason"');       
        }
    }
    
	// team | select
    if(isset($_GET['team'])){
		if(is_array($_GET['team'])){
        	array_push($where_filters,'Team IN (\''.implode("','",$_GET['team']).'\')');
		}else{
			array_push($where_filters,'Team = \'' . $_GET['team'] . '\'');
		}
    }
    
	// conference | checkbox-group
    if(isset($_GET['conference'])){
        if($_GET['conference'] == '10'){
            array_push($where_filters,'Team_Conference = "AFC"');
        }else if ($_GET['conference'] == '01'){
            array_push($where_filters,'Team_Conference = "NFC"');       
        }
    }
    
	// division | select
    if(isset($_GET['division'])){
		if(is_array($_GET['division'])){
			array_push($where_filters,'Team_Conference_Division IN (\''.implode("','",$_GET['division']).'\')');
    	}else{
			array_push($where_filters, 'Team_Conference_Division = \'' . $_GET['division'] . '\'');
		}
    }
	
    // crime category | select
    if(isset($_GET['crimeCategory'])){
		if(is_array($_GET['crimeCategory'])){
			array_push($where_filters, 'Crime_category IN (\''.implode("','",$_GET['crimeCategory']).'\')');
    	}else{
			array_push($where_filters, 'Crime_category = \'' . $_GET['crimeCategory'] . '\'');
		}
    }
    
	// crime | select
    if(isset($_GET['crime'])){
		if(is_array($_GET['crime'])){
			array_push($where_filters, 'Category IN (\''.implode("','",$_GET['crime']).'\')');
		}else{
			array_push($where_filters, 'Category = \'' . $_GET['crime'] . '\'');
		}
    }
	
	// position | select
    if(isset($_GET['position'])){
		if(is_array($_GET['position'])){
			array_push($where_filters,'Position IN (\''.implode("','",$_GET['position']).'\')');
		}else{
			array_push($where_filters, 'Position = \'' . $_GET['position'] . '\'');
		}
    }
	
	// position type | checkbox-group
    if(isset($_GET['position_type'])){
        $arr_pos_type = str_split($_GET['position_type']);
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
    if(isset($_GET['player'])){
		if(is_array($_GET['player'])){
        	array_push($where_filters,'Name IN (\''.implode("','",$_GET['player']).'\')');
		}else{
			array_push($where_filters, 'Name = \'' . $_GET['player'] . '\'');
		}
    }
    
    if(count($where_filters) > 0){
    	return 'WHERE ' . implode(' AND ',$where_filters);
	}else{
		return '';
	}
}

function get_query_string($get_var){
	if(isset($_GET[$query_string_parameter])){
		return $_GET[$query_string_parameter];
	}else{
		die(strtoupper($query_string_parameter).' must be set');
	}
	return 'ERROR: QueryString variable not set';
}

function get_limit(){
	$return_limit = '';
	if(isset($_GET['limit'])){
		$return_limit = ' LIMIT ' . $_GET['limit'];
	}
	return $return_limit;
}

function get_date_range(){	
	$return_date_range = '';

	if(isset($_GET['start_date']) || isset($_GET['end_date'])){
		$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
		$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
		$return_date_range = " && Date BETWEEN '" . $start . "' AND '" . $end . "' ";
	}
	
	return $return_date_range;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS" );
header('Content-type:application/json');

if(isset($_GET['test'])){
	
	print_r($_GET);
	
    echo prepare_filters();
}
                   
//sets the table that standard queries pull from
$DB_MAIN_TABLE = 'ArrestsCacheTable';
