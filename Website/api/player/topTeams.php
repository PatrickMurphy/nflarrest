<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$param[$query_string_parameter] = get_query_string('player');


$limit = get_limit();

$result = $db->query('SELECT Team, Team_name, Team_city, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters($param) .' GROUP BY Team, Team_name, Team_city ORDER BY arrest_count DESC' . $limit);

print json_encode(gather_results($result));
