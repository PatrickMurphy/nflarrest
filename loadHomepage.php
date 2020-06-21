<?php
$showHighTraffic = false; // setting to enable high traffic page
$highTrafficPercent = 92; // 0 to 100
$showHighTrafficBool = (rand(0,1000) > ($highTrafficPercent*100)); // should we show the high traffic error? Based on random

// test variables and redirect output to correct file
if($showHighTraffic && $showHighTrafficBool){
	include('index_HighTraffic.html');
}else{
	include('index.html');
}