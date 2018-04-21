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
	$query = 'SELECT A.arrest_stats_id, A.Date, A.Team, A.Name, A.Position, A.Encounter, A.Category, A.Description, A.Outcome, A.general_category_id FROM '.$DB_MAIN_TABLE.' AS A ' . prepare_filters($param) .' ORDER BY A.Date DESC' . $limit;
}else{
	$query = 'SELECT * FROM '.$DB_MAIN_TABLE . ' ' . prepare_filters($param) .'ORDER BY Date DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
