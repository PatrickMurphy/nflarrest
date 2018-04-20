<?php
// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}
function gather_results_array($result){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$tempArr = $result->fetch_array(MYSQLI_NUM);
		$return_array[] = array($tempArr[0], $tempArr[1], intval($tempArr[2]));
	}
	return $return_array;
}
$result = $db->query('SELECT `old_flair_team`, `flair_team`, `Bandwagonners` FROM bandwagon_bipartite');

print json_encode(gather_results_array($result));
