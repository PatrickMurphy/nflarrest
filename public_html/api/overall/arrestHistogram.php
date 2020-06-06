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

// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$limit = get_limit();


$query = 'SELECT DaysToLastArrest AS \'Day\', count(1) as \'Value\' FROM `ArrestsCacheTable` '. prepare_filters() .' AND DaysToLastArrest IS NOT NULL GROUP BY DaysToLastArrest ORDER BY DaysToLastArrest';
$result = $db->query($query);
$result2 = array_reverse(gather_results($result));
$row = array_pop($result2);
$return = array();
$count = count($result2);
$i = 0;
while($count >= 0){
	if($i == $row['Day']){
		array_push($return, $row['Value']);
		$row = array_pop($result2);
		$count--;
	}else{
		array_push($return, '0');
	}
	$i++;
}
print json_encode($return);
?>