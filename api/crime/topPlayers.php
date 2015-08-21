<?php
if(!isset($_GET['id'])){
	die('must select crime');
}else{
	$id = $_GET['id'];
}

require_once('../api.php');

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

if(isset($_GET['simple'])){
		$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM `arrest_stats` WHERE general_category_id = (SELECT general_category_id FROM `general_category` WHERE Category = \''. $id .'\') '. $date_range .' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}else{
	$query = 'SELECT Name, count(arrest_stats_id) AS arrest_count FROM `arrest_stats` WHERE Category = \''. $id .'\''. $date_range .' GROUP BY Name ORDER BY arrest_count DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
