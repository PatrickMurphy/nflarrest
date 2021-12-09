<?php
require_once('api/PHP-Multi-SQL/classes/MySQL.class.php');

require_once('api/db_config.php');
header("Content-type: text/xml");

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

if($db == false){
	die('DB connection error.');
}

$teams = $db->query('SELECT DISTINCT(Team) AS id FROM `arrest_stats` ORDER BY id DESC');
$crimes = $db->query('SELECT DISTINCT(Category) AS id FROM `arrest_stats` ORDER BY id DESC');
$pos = $db->query('SELECT DISTINCT(Position) AS id FROM `arrest_stats` ORDER BY id DESC');

function print_results($result, $url){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$temp = $result->fetch_assoc();
		print '<url><loc>http://nflarrest.com/'.$url.urlencode($temp['id']).'/</loc></url>';
	}
	return $return_array;
}


print'<?xml version="1.0" encoding="utf-8"?>';
print'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
print'<url>
  <loc>http://nflarrest.com/</loc>
  <lastmod>2015-10-05T22:42:05+00:00</lastmod>
</url>
<url>
  <loc>http://nflarrest.com/api/</loc>
  <lastmod>2015-10-05T22:43:23+00:00</lastmod>
</url>';

print_results($teams, 'team/');
print_results($crimes, 'crime/');
print_results($pos, 'position/');

print  '</urlset>';