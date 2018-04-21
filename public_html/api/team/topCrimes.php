<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$query_string_parameter = 'team';
$param[$query_string_parameter] = get_query_string($query_string_parameter);

$limit = get_limit();


if(isset($_GET['summary'])){
    $query = 'SELECT Category, count(a.arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' AS a, `general_category` AS b '. prepare_filters($param) .' AND a.general_category_id = b.general_category_id && a.Team = \''. $id .'\''. $date_range .' GROUP BY Category ORDER BY arrest_count DESC' . $limit;
}else{
    $query = 'SELECT Category, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters($param) .' GROUP BY Category ORDER BY arrest_count DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
