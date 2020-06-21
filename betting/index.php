<?php

/**
 * Uses PHP SESSIONS, modern password-hashing and salting and gives the basic functions a proper login system needs.
 */

// checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
    // if you are using PHP 5.3 or PHP 5.4 you have to include the password_api_compatibility_library.php
    // (this library adds the PHP 5.5 password hashing functions to older versions of PHP)
    require_once("libraries/password_compatibility_library.php");
}

// include the configs / constants for the database connection
require_once("config/db.php");

$pageTitle = "NFL Arrest Bet";

if(isset($_GET['register'])){
	require_once("classes/Registration.php");

	// create the registration object. when this object is created, it will do all registration stuff automatically
	// so this single line handles the entire registration process.
	$registration = new Registration();
	$pageTitle = "Register | NFL Arrest Bet";
}else{
	// load the login class
	require_once("classes/Login.php");

	// create a login object. when this object is created, it will do all login/logout stuff automatically
	// so this single line handles the entire login process. in consequence, you can simply ...
	$login = new Login();
}

function getDBData(){
	require_once('../api/PHP-Multi-SQL/classes/MySQL.class.php');

	require_once('../api/db_config.php');
	global $db;
	$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

	if($db == false){
		die('DB connection error.');
	}

	function gather_results($result){
		$return_array = [];
		for($i = 0; $i < $result->num_rows; $i++){
			$return_array[] = $result->fetch_assoc();
		}
		return $return_array;
	}
	global $crime_odds_json, $crime_json, $crime_options, $team_json, $team_options, $pos_options;

	$results4 = gather_results($db->query('SELECT gen_cat.`Category`, gen_cat.`general_category_id`, count(`arrest_stats_id`) AS `Count` FROM `arrest_stats` as ArrStat INNER JOIN `general_category` AS gen_cat ON ArrStat.general_category_id = gen_cat.general_category_id GROUP BY general_category_id ORDER BY count(`arrest_stats_id`) DESC'));
	$crime_odds_json = '{';
	$crime_options = '';
	$crime_json = '{';
	foreach($results4 as $crime){
		$crime_details = '{"category": "'.$crime['Category'].'","category_id": '.$crime['general_category_id'].',"arrest_count": '.$crime['Count'].'}';
		$crime_odds_json .= $crime['general_category_id'].': '.$crime_details.',';
		$crime_options .= '<option value="'.$crime['general_category_id'].'">'.$crime['Category'].'</option>';
		$crime_json .= $crime['general_category_id'].':"'.$crime['Category'].'",';
	}
	$crime_odds_json = rtrim($crime_odds_json, ",");
	$crime_odds_json .= '}';
	$crime_json = rtrim($crime_json, ",");
	$crime_json .= '}';

	$results2 = gather_results($db->query('SELECT `team_code`,`teams_full_name`,`city` FROM `teams` WHERE `teams_id` < 36 ORDER BY `team_code`'));
	$team_options = '';
	$team_json = '{';
	foreach($results2 as $team){
		$team_options .= '<option value="'.$team['team_code'].'" title="'.$team['team_code'].'" >'.$team['team_code'].' - '.$team['teams_full_name'].'</option>';
		$team_json .= $team['team_code'].':"'.$team['teams_full_name'].'",';
	}
	$team_json = rtrim($team_json, ",");
	$team_json .= '}';
	$result3 = gather_results($db->query('SELECT `position_tag`, `position_title`, `position_type` FROM `position` ORDER BY `position_type`, `position_title`'));
	$pos_options = '';
	$this_type='none';
	foreach($result3 as $posit){
		if($this_type != $posit['position_type']){
			if($this_type != 'none'){
				$pos_options .= '</optgroup>';
			}
			$this_type = $posit['position_type'];
			switch($this_type){
				case 'D':
					$title = 'Defense';
				break;
				case 'O':
					$title = 'Offense';
				break;
				case 'S':
					$title = 'Special Teams';
				break;
				default:
					$title = 'Other';
			}
			$pos_options .= '<optgroup label="'.$title.'">';
		}
		$pos_options .= '<option value="'.$posit['position_tag'].'">'.$posit['position_title'].'</option>';
	}
}

?>
<!doctype html>
<html lang="en">
	<head>
		<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
		<script src="js/google-tracking.js"></script>
		<meta charset="utf-8">
		<title><?php echo $pageTitle; ?></title>
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/styles.min.css" />
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/vendor/normalize.min.css" />
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/vendor/skeleton.min.css" />

		<meta property="og:url" content="http://NFLArrest.com" />
    <meta property="og:title" content="NFL Arrest Statistics" />
    <meta property="og:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident! Checkout our Arrest-o-Meter and findout how many days it's been since the last NFL Arrest." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NFL Arrest"/>
    <meta property="og:image" content="http://nflarrest.com/images/preview.png?cache=710" />
    <meta name="description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident! Checkout our Arrest-o-Meter and findout how many days it's been since the last NFL Arrest.">
    <meta name="author" content="Patrick Murphy">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@nfl_arrest">
		<meta name="twitter:creator" content="@patrickmurphoto">
		<meta name="twitter:title" content="NFL Arrest Statistics">
		<meta name="twitter:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!">
		<meta name="twitter:image" content="http://nflarrest.com/images/preview.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">


	<link rel="image_src" href="http://nflarrest.com/images/preview.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="http://nflarrest.com/images/favicon/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="http://nflarrest.com/images/favicon/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="http://nflarrest.com/images/favicon/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="http://nflarrest.com/images/favicon/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="http://nflarrest.com/images/favicon/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="http://nflarrest.com/images/favicon/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="http://nflarrest.com/images/favicon/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="http://nflarrest.com/images/favicon/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="http://nflarrest.com/images/favicon/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="http://nflarrest.com/images/favicon/manifest.json">
    <link rel="shortcut icon" href="http://nflarrest.com/images/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="NFL Arrest">
    <meta name="application-name" content="NFL Arrest">
    <meta name="msapplication-TileColor" content="#e7b736">
    <meta name="msapplication-TileImage" content="http://nflarrest.com/images/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="http://nflarrest.com/images/favicon/browserconfig.xml">
    <meta name="theme-color" content="#e7b736">
		<style>
			a.button[href='javascript:showPlaceBet()'] {
				background-color:#888888;
                background-image:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACcElEQVRIS7WW4VUUQRCEqyJQI9CLQIlAjUCJAIxALwIxAiECJQIhAiUCjwjECNQI2veNPUvvsHfgD/q9e+92Z6arp6p6Zq0dERFPJL2S9ELSM0k8E1eSNpK+STq3zfNieOltRDyU9FHSYRm/yMS8Auh5GfssaW3795jvBkBEvJb0SRIgU9iezY2IGJKR/I3ts9m6+hARVEzyG3EHgL4GEHbUYqoqK/+yQxJ4rhr0/0tL9vtOGkCK+V3Sn+T9aOCYaZcpLP8R/OmQGY3eSYKiB5L2EL8DsKWDfIk7AKXix7iEhaNTsqjjdNmV7VWuA5xiT20fOif+SLshMMlZ+DZFm/iMCCqUbcZbRAS7fS/pxHYbjwjsi8tWAPASSx7bXi8BlkTsEu5JAM/NlhEBLfTLip2WAtcA9EHmspCgsdrkTNDdBV2NwiyoAwAKC3U9c84BYMEo2KVtuBxpOLL9Yck2W/JsABgbhvVNoAIAGNXhDqqGzhnQwMRUw50AkiY6G1A0w10cDVXsSvUMoNux7nxje28LFejztbouC1imumyNJqM66MCiVWTeY0WSICi/qVuL805yDjuDziZyt2lbUCaf2d7P6kjY6QEEsbtjlmxKP3HsNJt2i03CFh/TwVTV3UQxdO10Ym5ptOu+yAr7UfGSygoow0xG0NmlknNo0Nb9pcm6Rv+OiuIQEvzKhK3lh4Ca3mToNPVJmQf3AD5CJzr9f47rn2lP8nGyjs1Z65kf14Xj+7twCghbRBNsdt0wt1+Z7S7ZeWUWEJzFMczp2QNbdqEZR8wep3ln3H7p16rTKeyof7ZwRBDo0T9b6Jetny1/AQx4VidHdx4LAAAAAElFTkSuQmCC');     
				background-position:5px center;
				background-repeat:no-repeat;
				padding-left:34px !important;
				padding-right:7.5px !important;
			}
			#viewPopularButton {
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACEUlEQVRIS7VWzXHaQBT+3s54BnEJJeAKYo6IC64gSQWGCgIV2K7ApAJDBYEKTA6Io3EFcQnmIjHDjL7MriyitaRdcfCeNKv33vd+v7cCx+G21QXlG4AhKF0Irow4sYPwFcAawpX0D/q78kjVrTGcqlsIRi4HTv+IOVR6XwVUAmDU/g7iEYJOI+O5EPEGwVjCeFnUswC4bY1A9XiW4Y/Cko6lf5jn1ycA4znw222cv7L/8tPjxI88EgPwnvNnT1r2COIuDq0OqP46AXS6VNrTNckAorYO6cbj1ULC2BT9HHnJWtHjkclKepl3CbetIaievLXSOoyCCSAPntz/kTAZFmW4ae8g+OrRmwo3wRJihik75AqQna14XMrgaN2ZKFJlgQK8+mhLyp5wKmEy84ZfIVDKBrETRm2WZTmTMJmeA1I3QzUAhm/mMojHTUBcA1qRIquUawmTaxcIo2BWO3jES7nItrW9hHEtJ3lbnFy521QLDBJNIbXH2a6al9xe2B3FzYXZB8WWdaZID5pz9HnsaWN8RgdJcAvI5H1YZgiSe+nhzUGShlr+kx2VHqQvxVxIGOsIR0jVQ4kIM0KbSP+wqGh1Q4zaATddZ0vEvXiqZWy6PrHEZy6cE0i2eDR9W+lqMHB7ACPnyixEoin8rsGOyFUWkPSu0dK35jh7tuhHwBAwz5aMnokXgK9Q1At+7Xq2/APM7A1BxGqP8QAAAABJRU5ErkJggg==');
				background-position:6% center;
				background-repeat:no-repeat;
			}
			#yourBetsButton {
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABwUlEQVRIS7WV3VHbUBCFzyoEJoMl0gHXFQQqwFQQUkHMIxIz2BXEHTg8WLyaDnAFuASnAi8dKJZmMiQMh5EcYflPvmKwHqWj8+3u3bsrsHhML2kCvBLBUSonMASkr37tdtPvUiYwXX7GbnKfGy9qSfbx121rW6J1PuWAXnwngq9lQaQQDbzzygBzEzeEuN9UgqxkglO9cIertGszMBbR54YEb9X3mpUA9XASAXJglQGo6nv1ioCYNua5Zuy7K6uxtkT1cOsA+xKBfBgHnqlUoq0f8tbbNE3XJgsSAw3cs8oXLQOko2IvGQrwZZUBgV94rDXePCpeIbtJR4TN2b3gb1J+auB2NrXyyjY14eQMcA7wuD8oRmd6yRGcD5FefNKicaZ/BvXSGywClwAmnPQF8n06lqmg802D2mhdpHN6YqSBe1zUzgFML+6I4EdRQDKCOK3F2Z9lI+wK0JjX41oDt5W/ewWYmz9G+DQuH80YQRAtmi7vCTnOs54BwjjtlpNNh2bzPd146runqTYDVLlUNoDijpgCKsx+a8D/HSE2tbc1XToL2amLCZOWgN23mpQ3hZxPM3j+N4TI4btCyAc6Hxsv437PvsxCjhQAAAAASUVORK5CYII=');
				background-position:6% center;
				background-repeat:no-repeat;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<header>
    	<a href="http://nflarrest.com" class="logo"><img src="../images/logo-transparent.png" alt="NFL Arrest Logo" height="30" /></a>
			<a href="http://nflarrest.com"><h1>
                NFL<span>Arrest</span>.com
			</h1></a>
			<span>Make fantasy bets on NFL Arrests</span>
		</header>
			<section style="text-align:left !important;clear:both;">
<?php

if(isset($_GET['register'])){
    // show the register view (with the registration form, and messages/errors)
    include("views/register.php");
}else{
	getDBData(); // load full names and options of stuff
	// ... ask if we are logged in here:
	if ($login->isUserLoggedIn() == true) {
			// the user is logged in. you can do whatever you want here.
			// for demonstration purposes, we simply show the "you are logged in" view.

		if(isset($_GET['user']) && is_numeric($_GET['user'])){
			$userDetails = gather_results($db->query('SELECT user_id, user_name, user_email, balance, created, last_login, user_group FROM users WHERE user_id = '.$_GET['user']))[0];
			require("views/userProfile.php");
		}else{
			include("views/logged_in.php");
		}

	} else {
			// the user is not logged in. you can do whatever you want here.
			// for demonstration purposes, we simply show the "you are not logged in" view.
			if(isset($_GET['splittest']))
			{
				include("views/not_logged_in.php");
			}else{
				include("views/not_logged_in2.php");
			}
	}
	$db->disconnect();
}
?></section>
		</div>
</body>
</html>