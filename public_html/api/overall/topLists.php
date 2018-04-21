<?php
$tsstring = gmdate('D, d M Y H:i:s ', time() - ((24 * 60) * 60)) . 'GMT';
$etag = $_GET['limit'] . $_GET['start_pos'] . $_GET['start_date'] . $_GET['end_date'];
$etag = md5($etag);

if(!isset($path_ext)){
    $path_ext = '../';
}

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
$megaresult = [];
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once($path_ext . 'api.php');
}


if($_GET['debug'] == '1'){
	print $if_none_match;
	$debug_options = array(
		'timeTol' => $timeTolerance,
		'etagEqual' => $etagMatches,
		'if_modified' => $if_modified_since,
		'if_none' => $if_none_match,
		'etag' => $etag,
		'tsstring' => $tsstring,
		'timeDiff' => ((strtotime($if_modified_since) - strtotime($tsstring)) < (12*60*60)),
		'1string' => is_string($etag),
		'2string' => is_string($if_none_match)
	);
	print_r ($debug_options);
}


$limit = get_limit();

$date_range = '';

// crime
$result2 = $db->query('SELECT Category, COUNT(Category) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters() .' GROUP BY Category ORDER BY arrest_count DESC' . $limit);

$megaresult[] = gather_results($result2);

// players
$result = $db->query('SELECT Name, Position, COUNT(Name) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters() .' GROUP BY Name HAVING arrest_count > 1 ORDER BY arrest_count DESC' . $limit);

$megaresult[] = gather_results($result);

// position
$result3 = $db->query('SELECT Position, COUNT(Position) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. $date_range .' GROUP BY Position ORDER BY arrest_count DESC' . $limit);
$megaresult[] = gather_results($result3);

print json_encode($megaresult);
