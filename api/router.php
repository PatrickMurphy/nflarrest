<?php
$restful = true;
// get args
if(isset($_GET['endpoint'])){
	$endpoint = strtolower($_GET['endpoint']);
}else{
	die('endpoint must be supplied');
}

if(isset($_GET['verb'])){
	$verb = $_GET['verb'];
}else{
	$verb = false;
}

if(isset($_GET['id'])){
$id = $_GET['id'];
}else{
	$id = false;
}

// check endpoint
$endpoints = ['crime', 'player', 'team', 'position', 'meter','lastarrestbyteam','arrestsseasonstate', 'bets'];
if(in_array($endpoint, $endpoints)){
	// check verb
	if($verb == false){
		if($endpoint == 'meter'){
			include('NewMeter.php');
		}else if($endpoint == 'lastarrestbyteam'){
			include('overall/lastArrestByTeam.php');
		}else if($endpoint == 'arrestsseasonstate'){
			include('overall/arrestsSeasonState.php');
		}else{
			include('overall/top' . ucfirst($endpoint) . 's.php');
		}
	}else{
		include($endpoint . '/' . $verb . '.php');
	}
}else{
 die('endpoint not supported ' . $endpoint . ' ' . $verb . ' ' . $id);
}
