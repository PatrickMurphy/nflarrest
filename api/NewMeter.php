<?php
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

	// determine how many days since last
	$result = $db->query('SELECT * FROM ArrestOMeterStats');
	$arrestOMeter = $result->fetch_assoc();

$returnArray = array(
	'alltime' => array(
		'record' => $arrestOMeter['Record'],
		'average' => floor($arrestOMeter['Average']),
		'raw_average' => $arrestOMeter['Average']
	),
	'current' => array(
		'daysSince' => $arrestOMeter['Current'],
		'probability' => exp((($arrestOMeter['Current'])*(0-1))/$arrestOMeter['Average']),
		'odds' => floor(1/exp((($arrestOMeter['Current'])*(0-1))/$arrestOMeter['Average']))
	)
);
print json_encode($returnArray);
