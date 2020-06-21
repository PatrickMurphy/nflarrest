<?php
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
$limit = '';
$date_range = false;


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
	$date_range = "WHERE (Date BETWEEN '" . $start . "' AND '" . $end . "') ";
}


if(isset($_GET['simple'])){
	if($date_range != false){
		$query = 'SELECT B.Category, COUNT(A.general_category_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' AS A, `general_category` AS B '.$date_range.' AND A.general_category_id = B.general_category_id GROUP BY A.general_category_id ORDER BY arrest_count DESC' . $limit;
	}else{
		$query = 'SELECT B.Category, COUNT(A.general_category_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' AS A, `general_category` AS B WHERE A.general_category_id = B.general_category_id GROUP BY A.general_category_id ORDER BY arrest_count DESC' . $limit;
	}
}else{
	$query = 'SELECT Category, COUNT(Category) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. $date_range .'GROUP BY Category ORDER BY arrest_count DESC' . $limit;
}

$result = $db->query($query);

print json_encode(gather_results($result));
