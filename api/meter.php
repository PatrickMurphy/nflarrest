<?php
require_once('api.php');

$date_range = '';
if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
	$date_range = " Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

if(isset($_GET['id'])){
	if($date_range != ''){
		$date_range = ' && ' . $date_range;
	}
	$where = " WHERE Team = '".$_GET['id']."'".$date_range;
}else{
	if($date_range != ''){
		$date_range = ' WHERE ' . $date_range;
	}
	$where = $date_range;
}

if(isset($_GET['daysSince'])){
	$daysSince = $_GET['daysSince'];
}else{
	// determine how many days since last
	$lastResult = $db->query('SELECT Date FROM `arrest_stats`' . $where . ' ORDER BY Date DESC LIMIT 1');
	$lastArrest = $lastResult->fetch_assoc();
	$daysSince = floor((abs(strtotime(date('Y-m-d')) - strtotime($lastArrest['Date'])))/(60*60*24));
}

// get avg and max and last time it was days since
$result = $db->query('SELECT Date FROM `arrest_stats`'. $where .' ORDER BY Date ASC');
$data = gather_results($result);
$max_span = 0; // start with zero days
$max_dates = [];
$avg_span = 0;
$span_count = 0;
$span_total = 0;
$last_date = strtotime('2000-01-01');
foreach($data as $row){
    $this_date = strtotime($row['Date']);
    //print $this_date . '<br/>';
    $date_diff = abs($this_date - $last_date);
    //print $date_diff . '<br/>';
    $this_span = floor($date_diff/(60*60*24));
    $span_count++;
    $span_total += $this_span;
    //print $this_span . '<br/>';
	if($this_span >= $daysSince){
		$lastCurrentRecordDate = strtotime(date('Y-m-d', $last_date) . ' + ' . $daysSince . ' days');
		$broken = date("m-d-Y",$this_date);
		print $broken;
		$thatRecord = $this_span;
		$that_lastDate = date("m-d-Y",$last_date);
	}
    if($this_span > $max_span){
      $max_span = $this_span;
      $max_dates = [date("m-d-Y",$last_date),date("m-d-Y",$this_date)];
    }
    $last_date = $this_date;
}
$avg_span = $span_total / $span_count;
$returnArray = array(
	'record' => $max_span,
	'average' => floor($avg_span),
	'daysSince' => $daysSince,
	'lastRecord' => date('m-d-Y', $lastCurrentRecordDate),
	'broken' => $broken,
	'thatRecord' => $thatRecord,
	'thatLast' => $that_lastDate
);
print json_encode($returnArray);
