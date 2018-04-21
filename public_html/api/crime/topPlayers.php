<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$query_string_parameter = 'crime';
$param[$query_string_parameter] = get_query_string($query_string_parameter);

$limit = get_limit();

if(isset($_GET['simple'])){
		$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE. ' ' . prepare_filters() .' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}else{
	$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' ' .prepare_filters().' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
