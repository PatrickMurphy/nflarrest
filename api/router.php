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
$endpoints = ['crime', 'player', 'team', 'position'];
if(in_array($endpoint, $endpoints)){
	// check verb
	if($verb == false){
		include('overall/top' . ucfirst($endpoint) . 's.php');
	}else{
		include($endpoint . '/' . $verb . '.php');
	}
}else{
 die('endpoint not supported ' . $endpoint . ' ' . $verb . ' ' . $id);
}
