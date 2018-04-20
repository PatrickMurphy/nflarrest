<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$query_string_parameter = 'crime';
$main_parameter = get_query_string($query_string_parameter);

$limit = get_limit();

$result = $db->query('SELECT Date, Name, Team FROM '.$DB_MAIN_TABLE.' '.prepare_filters().' ORDER BY date DESC' . $limit);

print json_encode(gather_results($result));
