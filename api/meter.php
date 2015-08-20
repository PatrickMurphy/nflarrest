<?php
require_once('api.php');
if(isset($_GET['id'])){
	$where = " WHERE Team = '".$_GET['id']."'";
}else{
	$where = '';
}
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
    if($this_span > $max_span){
        $max_span = $this_span;
        $max_dates = [date("m/d/Y h:i:s A T",$last_date),date("m/d/Y h:i:s A T",$this_date)];
    }
    $last_date = $this_date;
}
$avg_span = $span_total / $span_count;
$returnArray = array(
	'record' => $max_span,
	'average' => floor($avg_span),
	'daysSince' => floor((abs(strtotime(date('Y-m-d')) - $last_date))/(60*60*24))
);
print json_encode($returnArray);
