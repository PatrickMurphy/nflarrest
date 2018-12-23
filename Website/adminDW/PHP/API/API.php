<?php
require_once('../Libraries/PHP-Multi-SQL/classes/MySQL.class.php');
require_once('../db_config.php');
require_once('../Login_System.php');

if(isLoggedIn() || formFieldsSet()){
    // if password valid or already logged in
    if(isLoggedIn() || isValidLogin()){
        $_SESSION['auth'] = $login_system_settings['values']['auth_code']; // set flag for logged in
    }else{ // else invalid password attempt, use alert
        die($login_system_settings['errors']['invalid_login_json']);
    }
}

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], 'pmphotog_NFL_Arrest');
$db2 = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

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


//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS" );
header('Content-type:application/json');
