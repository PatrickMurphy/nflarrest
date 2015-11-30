<?php
function array_msort($array, $cols)
{
    $colarr = array();
    foreach ($cols as $col => $order) {
        $colarr[$col] = array();
        foreach ($array as $k => $row) { $colarr[$col]['_'.$k] = strtolower($row[$col]); }
    }
    $eval = 'array_multisort(';
    foreach ($cols as $col => $order) {
        $eval .= '$colarr[\''.$col.'\'],'.$order.',';
    }
    $eval = substr($eval,0,-1).');';
    eval($eval);
    $ret = array();
    foreach ($colarr as $col => $arr) {
        foreach ($arr as $k => $v) {
            $k = substr($k,1);
            if (!isset($ret[$k])) $ret[$k] = $array[$k];
            $ret[$k][$col] = $array[$k][$col];
        }
    }
    return $ret;

}
$tsstring = gmdate('D, d M Y H:i:s ', time()) . 'GMT';
$if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false;

$timeTolerance = ($if_modified_since && ((strtotime($tsstring) - strtotime($if_modified_since)) < (4*60*60)));

if ($timeTolerance)
{
    header('HTTP/1.1 304 Not Modified');
    exit();
}
else
{
		header('Content-Type: application/json');
    header("Last-Modified: $tsstring");
}
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
$record_history = array();
$broken_records = array();
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
		$thatRecord = $this_span;
		$record_history[] = array(
			'date' => $broken,
			'record' => $thatRecord
		);
		$that_lastDate = date("m-d-Y",$last_date);
	}else if($this_span > (($daysSince/2.2)+5)){
		$lastCurrentRecordDate = strtotime(date('Y-m-d', $last_date) . ' + ' . $daysSince . ' days');
		$broken = date("m-d-Y",$this_date);
		$thatRecord = $this_span;
		$broken_records[] = array(
			'date' => $broken,
			'record' => $thatRecord
		);
	}
    if($this_span > $max_span){
      $max_span = $this_span;
      $max_dates = [date("m-d-Y",$last_date),date("m-d-Y",$this_date)];
    }
    $last_date = $this_date;
}
$avg_span = $span_total / $span_count;

$record_history = array_reverse($record_history);
// if limit is set
if(isset($_GET['limit']) && is_numeric($_GET['limit'])){
	$record_history = array_slice($record_history, 0, $_GET['limit']);
}

$broken_records = array_msort($broken_records, array('record'=>SORT_ASC));
$broken_records = array_slice($broken_records, count($broken_recrods) - 3, count($broken_records));
$returnArray = array(
	'alltime' => array(
		'record' => $max_span,
		'average' => floor($avg_span)
	),
	'current' => array(
		'daysSince' => $daysSince
	),
	'lastRecord' => array(
		'date' => date('m-d-Y', $lastCurrentRecordDate), // last time it was daysSince days
		'broken' => $broken, // when the next arrest occured
		'thatRecord' => $thatRecord, // what was the total span
		'thatLast' => $that_lastDate
	),
	'broken' => $broken_records,
	'history' => $record_history
);
print json_encode($returnArray);
