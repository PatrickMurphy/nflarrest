<?php
// SELECT Date, Name, Team FROM `arrest_stats` WHERE Category = 'DUI' ORDER BY Date DESC

if(!isset($_GET['id'])){
	die('must select crime');
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

$result = $db->query('SELECT Date, Name, Team FROM `arrest_stats` WHERE Category = \''. $id .'\''. $date_range .' ORDER BY date DESC' . $limit);

print json_encode(gather_results($result));
