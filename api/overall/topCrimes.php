<?php
require_once('../api.php');

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ' . $_GET['limit'];
}

if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
	$date_range = "WHERE Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

$result = $db->query('SELECT Category, COUNT(Category) AS arrest_count FROM `arrest_stats` '. $date_range .'GROUP BY Category ORDER BY arrest_count DESC' . $limit);

print json_encode(gather_results($result));
