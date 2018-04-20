<?php
if(isset($_GET['id'])){
	$id = $_GET['id'];
}else{
	die('CRIME must be set');
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

if(isset($_GET['simple'])){
		$query = 'SELECT A.arrest_stats_id, A.Date, A.Team, A.Name, A.Position, A.Encounter, A.Category, A.Description, A.Outcome, A.general_category_id FROM '.$DB_MAIN_TABLE.' AS A, `general_category` AS B ' . prepare_filters() . ' AND A.general_category_id = B.general_category_id AND Category = \''. $id .'\' '. $date_range .' ORDER BY A.Date DESC' . $limit;
}else{
	$query = 'SELECT * FROM '.$DB_MAIN_TABLE . ' ' . prepare_filters() .'ORDER BY Date DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
