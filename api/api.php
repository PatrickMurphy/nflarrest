<?php
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
 header("Access-Control-Allow-Origin: *");

//sets the table that standard queries pull from
$DB_MAIN_TABLE = 'ArrestsDateView';
