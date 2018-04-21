<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$query_string_parameter = 'position';
$param[$query_string_parameter] = get_query_string($query_string_parameter);

$limit = get_limit();

$result = $db->query('SELECT Category, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters() .' GROUP BY Category ORDER BY arrest_count DESC' . $limit);

print json_encode(gather_results($result));
