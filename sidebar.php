<?php
require_once('api/api.php');

$date_range = '';

	// determine how many days since last
	$lastResult = $db->query('SELECT Date FROM `arrest_stats` ORDER BY Date DESC LIMIT 1');
	$lastArrest = $lastResult->fetch_assoc();
	$daysSince = floor((abs(strtotime(date('Y-m-d')) - strtotime($lastArrest['Date'])))/(60*60*24));

	$lastResult2 = $db->query('SELECT Date FROM `arrest_stats` ORDER BY Date DESC LIMIT 1');
	$lastArrest2 = $lastResult->fetch_assoc();

$my_img = imagecreate( 200, 80 );
$background = imagecolorallocate( $my_img, 210, 210, 210 );
$text_color = imagecolorallocate( $my_img, 255, 50, 50 );
$text_color2 = imagecolorallocate( $my_img, 35, 35, 35 );
$line_color = imagecolorallocate( $my_img, 128, 255, 0 );
$line_color2 = imagecolorallocate( $my_img, 255, 50, 50 );
$theString = "[".$daysSince."] since the last NFL arrest";
imagestring( $my_img, 2, 10, 30, $theString, $text_color2 );
imagestring( $my_img, 1, 5, 67, "presented by NFLarrest.com", $text_color );
imagesetthickness ( $my_img, 5 );
$percent = $daysSince/$daysSince;
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
