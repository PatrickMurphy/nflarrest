<?php
	if(isset($restful)){
		$mod = '';
	}else{
		// in sub folder inlcude stuff from one up
		$mod = '../';
	}

		require_once($mod.'api.php');
//		require_once($mod."../betting/config/db.php");
//		require_once($mod."../betting/classes/Login.php");

// create a login object. when this object is created, it will do all login/logout stuff automatically
// so this single line handles the entire login process. in consequence, you can simply ...
//$login = new Login();

//if ($login->isUserLoggedIn() == true) {
	$returnArray = array();
	$limit = '';
	if(isset($_GET['limit'])){
		$limit = ' LIMIT ';
		if(isset($_GET['start_pos'])){
			$limit .= $_GET['start_pos'] . ', ';
		}
		$limit .= $_GET['limit'];
	}

	$teamQuery = "SELECT Count(*) as count, teams.teams_full_name FROM `bets` INNER JOIN teams ON team = teams.team_code WHERE team != 'no-choice' GROUP BY team ORDER BY count DESC" . $limit;
	$teamResult = $db->query($teamQuery);
	$returnArray['team'] = gather_results($teamResult);

	$crimeQuery = "SELECT Count(*) as count, general_category.Category FROM `bets` INNER JOIN general_category ON crime = general_category.general_category_id WHERE crime > 0 GROUP BY crime ORDER BY count DESC" . $limit;
	$crimeResult = $db->query($crimeQuery);
	$returnArray['crime'] = gather_results($crimeResult);

	$posQuery = "SELECT Count(*) as count, position.position_title FROM `bets` INNER JOIN position ON position = position.position_tag WHERE position != 'no-choice' GROUP BY position ORDER BY count DESC" . $limit;
	$posResult = $db->query($posQuery);
	$returnArray['position'] = gather_results($posResult);

	$timeQuery = "SELECT FLOOR(AVG(recordDate)) as `avg_date` FROM `bets` WHERE recordDate > 0 AND active = 1";
	$timeResult = $db->query($timeQuery);
	$returnArray['time'] = gather_results($timeResult);

	$statsQuery = "SELECT FLOOR(SUM(amount)) as `total_amount` FROM `bets` WHERE active = 1";
	$statsResult = $db->query($statsQuery);
	$statsQuery2 = "SELECT Count(Distinct userid) as `total_users` FROM `bets` WHERE active = 1";
	$statsResult2 = $db->query($statsQuery2);

	$stats = gather_results($statsResult);
	$tempArray = gather_results($statsResult2);
	$stats[0]['total_users'] = $tempArray[0]['total_users'];

	$returnArray['betStats'] = $stats;

	print json_encode($returnArray);
//}else{
//	print '{"error":"not authorized"}';
//}
