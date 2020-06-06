<?php
$tsstring = gmdate('D, d M Y H:i:s ', time() - (24 * 60 * 60)) . 'GMT';
$etag = $_GET['graph'] . $_GET['limit'] . $_GET['start_pos'] . $_GET['start_date'] . $_GET['end_date'];
$etag = md5($etag);

$if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false;

$if_none_match = isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] : false;
if(is_string($if_none_match)){
	$if_none_match = substr($if_none_match, 1, strlen($if_none_match) - 2);
}

$etagMatches = (($if_none_match && $if_none_match == $etag) || (!$if_none_match));

$timeTolerance = ($if_modified_since && ((strtotime($if_modified_since) - strtotime($tsstring)) < (12*60*60)));

if ($etagMatches && $timeTolerance)
{
    header('HTTP/1.1 304 Not Modified');
    exit();
}
else
{
	header('Content-Type: application/json');
    header("Last-Modified: $tsstring");
    header("ETag: \"{$etag}\"");
}
$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');

$start = substr($start,0, 4);
$end = substr($end, 0,4);

// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$limit = get_limit();
$date_range = '';

if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$date_range = "WHERE Year >= '" . $start . "' AND Year <= '" . $end . "' ";
}

$query = 'SELECT * FROM `ArrestsByYearView` '. $date_range . $limit;

$result = $db->query($query);
$ytdCatTitle_string = "Before ". date('M-d');
$totalCatTitle_string = "After ". date('M-d');

	$year_stats2 = array('columns'=>array('x'=>array('x'),$ytdCatTitle_string=>array($ytdCatTitle_string),$totalCatTitle_string=>array($totalCatTitle_string)));

	foreach($result as $row){
       // print_r( $row);
        array_push($year_stats2['columns']['x'], $row['Year']);
        array_push($year_stats2['columns'][$ytdCatTitle_string], $row['ArrestsYTD']);
        array_push($year_stats2['columns'][$totalCatTitle_string], $row['ArrestsDiff']);
			//$year_stats[$row['Team']][$row['Category']] = $row['arrest_count'];
    }

    $year_stats['columns'] = array_values($year_stats2['columns']);
    $year_stats['groups'] = [$totalCatTitle_string, $ytdCatTitle_string];
    print json_encode($year_stats);
