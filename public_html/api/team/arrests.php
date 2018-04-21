<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$param[$query_string_parameter] = get_query_string('team');


$limit = get_limit();

$result = $db->query('SELECT * FROM '.$DB_MAIN_TABLE.' '. prepare_filters($param) .' ORDER BY Date DESC' . $limit);

print json_encode(gather_results($result));
