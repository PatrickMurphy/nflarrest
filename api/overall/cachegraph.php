<?php
$url = 'http://nflarrest.com/api/v1/team?graph=true&start_date=2000-01-01&end_date='.date('Y-m-d', time()).'&cache=false';

$ch = curl_init($url);
$fp = fopen("cache.json", "w");

curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);

if(curl_exec($ch) === false){
	echo 'Curl Error:' . curl_error($ch);
}
curl_close($ch);
fclose($fp);
