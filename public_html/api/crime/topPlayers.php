<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$param[$query_string_parameter] = get_query_string('crime');


$limit = get_limit();

if(isset($_GET['simple'])){
	$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE. ' ' . prepare_filters($param) .' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}else{
	$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' ' .prepare_filters($param).' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
