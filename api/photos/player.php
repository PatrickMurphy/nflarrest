<?php
require_once('libraries/flickr.php'); 
$Flickr = new Flickr('d5a8c36aefbc887b60302a18133a0f48'); 
$data = $Flickr->search($_GET['id'] . ' NFL'); 
$return = array();
$i = 0;
foreach($data['photos']['photo'] as $photo) { 
	// the image URL becomes somthing like 
	// http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg  
	$return[$i]['details'] = $photo;
	$return[$i++]['photo_url'] = 'http://farm' . $photo["farm"] . '.static.flickr.com/' . $photo["server"] . '/' . $photo["id"] . '_' . $photo["secret"] . '.jpg'; 
}
echo json_encode($return);
?>