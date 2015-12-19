<?php
require_once('../api/PHP-Multi-SQL/classes/MySQL.class.php');

require_once('../api/db_config.php');

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

if($db == false){
	die('DB connection error.');
}
$today = (new DateTime())->getTimestamp();
//where active, time less than today, time != 0
$results = $db->select('bets','*', '`active` = 1 AND recordDate != 0 AND recordDate < '.$today);

print_r($results);

// give each user winnings

// update same set
?>
