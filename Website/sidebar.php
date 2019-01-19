<?php
require_once('api/api.php');

$date_range = '';
		$json = file_get_contents('http://nflarrest.com/api/v1/meter');
	$obj = json_decode($json, true);
	$record = $obj['alltime']['record'];
	$daysSince = $obj['current']['daysSince'];
	// determine how many days since last
	//$lastResult = $db->query('SELECT Date FROM `arrest_stats` ORDER BY Date DESC LIMIT 1');
	//$lastArrest = $lastResult->fetch_assoc();
	//$daysSince = floor((abs(strtotime(date('Y-m-d')) - strtotime($lastArrest['Date'])))/(60*60*24));


	
$my_img = imagecreate( 200, 80 );
$background = imagecolorallocate( $my_img, 210, 210, 210 );
$text_color = imagecolorallocate( $my_img, 255, 50, 50 );
$text_color2 = imagecolorallocate( $my_img, 35, 35, 35 );
$line_color = imagecolorallocate( $my_img, 128, 255, 0 );
$line_color2 = imagecolorallocate( $my_img, 255, 50, 50 );
$theString = "[".$daysSince."] days since an NFL Arrest";
imagestring( $my_img, 2, 10, 24, $theString, $text_color2 );
imagestring( $my_img, 1, 5, 67, "presented by NFLarrest.com", $text_color );
imagestring( $my_img, 1, 24, 41, "0", $text_color2 );
imagestring( $my_img, 1, 167, 41, $record."", $text_color2 );
imagesetthickness ( $my_img, 5 );
$percent = $daysSince/$record;
$percent = $percent*165;
imageline( $my_img, 30, 45, 165, 45, $line_color );
imageline( $my_img, 30, 45, $percent, 45, $line_color2 );

header( "Content-type: image/png" );
imagepng( $my_img );
imagecolordeallocate( $line_color );
imagecolordeallocate( $text_color );
imagecolordeallocate( $background );
imagedestroy( $my_img );
?>