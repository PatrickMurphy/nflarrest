<?php
// connect db
require_once('PHP-Multi-SQL/classes/MySQL.class.php');
require_once('db_config.php');

// connect to both dbs, one for email, one for nfl arrest
$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);
$db2 = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], 'pmphotog_main');

// if connected
if($db == false || $db2 == false){
	die('DB connection error.');
}

// Function: interpret fetch rows result as standard php array
function gather_results($result){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$return_array[] = $result->fetch_assoc();
	}
	return $return_array;
}

?>
