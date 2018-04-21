<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$query_string_parameter = 'player';
$param[$query_string_parameter] = get_query_string($query_string_parameter);

$limit = get_limit(); $date_range = get_date_range();

$query = 'SELECT Name, Position, COUNT(Name) AS arrest_count FROM '.$DB_MAIN_TABLE.' WHERE Name LIKE \'%'. $term .'%\''. $date_range .' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
$result = $db->query($query);

print json_encode(gather_results($result));
