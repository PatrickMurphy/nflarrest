<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$query_string_parameter = 'team';
$main_parameter = get_query_string($query_string_parameter);

$limit = get_limit();

$query = 'SELECT teams_full_name, team_code, city FROM `teams` WHERE team_code LIKE \'%'. $term .'%\' OR teams_full_name LIKE \'%'. $term .'%\' OR city LIKE \'%'. $term .'%\''. $date_range .'ORDER BY teams_full_name DESC' . $limit;
$result = $db->query($query);

print json_encode(gather_results($result));
