<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$query_string_parameter = 'player';
$param[$query_string_parameter] = get_query_string($query_string_parameter);

$limit = get_limit();

$result = $db->query('SELECT category, COUNT(Category) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters() .' GROUP BY Category ORDER BY Date DESC' . $limit);

print json_encode(gather_results($result));
