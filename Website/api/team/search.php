<?php
if(isset($_GET['term'])){
	$term = $_GET['term'];
}else{
	die('team name must be set');
}
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ';
	if(isset($_GET['start_pos'])){
		$limit .= $_GET['start_pos'] . ', ';
	}
	$limit .= $_GET['limit'];
}

if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
	$date_range = " && Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}
$query = 'SELECT teams_full_name, team_code, city FROM `teams` WHERE team_code LIKE \'%'. $term .'%\' OR teams_full_name LIKE \'%'. $term .'%\' OR city LIKE \'%'. $term .'%\''. $date_range .'ORDER BY teams_full_name DESC' . $limit;
$result = $db->query($query);

print json_encode(gather_results($result));
