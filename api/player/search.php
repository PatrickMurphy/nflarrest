<?php
if(isset($_GET['term'])){
	$term = $_GET['term'];
}else{
	die('player name must be set');
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
$query = 'SELECT Name, Position, COUNT(Name) AS arrest_count FROM `arrest_stats` WHERE Name LIKE \'%'. $term .'%\''. $date_range .'GROUP BY Name ORDER BY arrest_count DESC' . $limit;
$result = $db->query($query);

print json_encode(gather_results($result));
