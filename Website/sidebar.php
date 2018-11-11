<?php
$json = file_get_contents('http://nflarrest.com/api/v1/meter');
$obj = json_decode($json, true);

$record = $obj['alltime']['record'];
$daysSince = $obj['current']['daysSince'];
$theString = "[".$daysSince."] days since an NFL Arrest";
$percent = $daysSince/$record;
$percent = $percent*165;
	
// create image and colors
$my_img = imagecreate( 200, 80 );
$background = imagecolorallocate( $my_img, 210, 210, 210 );
$text_color = imagecolorallocate( $my_img, 255, 50, 50 );
$text_color2 = imagecolorallocate( $my_img, 35, 35, 35 );
$line_color = imagecolorallocate( $my_img, 128, 255, 0 );
$line_color2 = imagecolorallocate( $my_img, 255, 50, 50 );

// create image with gd lib
imagestring( $my_img, 2, 10, 24, $theString, $text_color2 );
imagestring( $my_img, 1, 5, 67, "presented by NFLarrest.com", $text_color );
imagestring( $my_img, 1, 24, 41, "0", $text_color2 );
imagestring( $my_img, 1, 167, 41, $record."", $text_color2 );
imagesetthickness ( $my_img, 5 );

imageline( $my_img, 30, 45, 165, 45, $line_color );
imageline( $my_img, 30, 45, $percent, 45, $line_color2 );

// send image
header( "Content-type: image/png" );
imagepng( $my_img );
imagecolordeallocate( $line_color );
imagecolordeallocate( $text_color );
imagecolordeallocate( $background );
imagedestroy( $my_img );
?>
