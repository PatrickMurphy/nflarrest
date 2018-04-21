<?php
$tsstring = gmdate('D, d M Y H:i:s ', time() - ((24 * 60) * 60)) . 'GMT';
$if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false;

$timeTolerance = ($if_modified_since && ((strtotime($if_modified_since) - strtotime($tsstring)) < (4*60*60)));

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

// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

// get days since last arrest
$result = $db->query('SELECT DATEDIFF(NOW(),Date) AS daysSinceArrest FROM '.$DB_MAIN_TABLE.' ORDER BY Date DESC LIMIT 1 ');

print json_encode(gather_results($result));
