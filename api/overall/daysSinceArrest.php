<?php
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

// get days since last arrest
$result = $db->query('SELECT DATEDIFF(NOW(),Date) AS daysSinceArrest FROM `arrest_stats` ORDER BY Date DESC LIMIT 1 ');

print json_encode(gather_results($result));
