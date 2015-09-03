<?php
//SELECT category, COUNT(Category) FROM `arrest_stats` WHERE name = 'Aldon Smith' GROUP BY Category ORDER BY Date Desc
if(!isset($_GET['id'])){
	die('must select player name');
}else{
	$id = $_GET['id'];
}

if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ' . $_GET['limit'];
}

if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
	$date_range = " && Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

$result = $db->query('SELECT category, COUNT(Category) AS arrest_count FROM `arrest_stats` WHERE Name = \''. $id .'\''. $date_range .' GROUP BY Category ORDER BY Date DESC' . $limit);

print json_encode(gather_results($result));
