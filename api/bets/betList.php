<?php
	if(isset($restful)){
		$mod = '';
	}else{
		// in sub folder inlcude stuff from one up
		$mod = '../';
	}

		require_once($mod.'api.php');
		require_once($mod."../userSystem/config/db.php");
		require_once($mod."../userSystem/classes/Login.php");

$login = new Login();

if ($login->isUserLoggedIn() == true) {

	$limit = '';
	if(isset($_GET['limit'])){
		$limit = ' LIMIT ';
		if(isset($_GET['start_pos'])){
			$limit .= $_GET['start_pos'] . ', ';
		}
		$limit .= $_GET['limit'];
	}
	$active = 1;
	if(isset($_GET['active'])){
		if($_GET['active'] == 0 || $_GET['active'] == 1){
			$active = $_GET['active'];
		}
	}

	if((isset($_GET['showAll']) || isset($_GET['userid'])) && $_SESSION['user_group']>=2){
		// show all
		if(isset($_GET['userid'])){
			$query = "SELECT * FROM bets WHERE userid=".$_GET['userid']." AND active=". $active . $limit;
		}else{
			$query = "SELECT * FROM bets WHERE active=". $active . $limit;
		}
	}else{
		// show personal
		$query = "SELECT * FROM bets WHERE userid=".$_SESSION['user_id']." AND active=".$active." ORDER BY date_placed DESC" . $limit;
	}

	$result = $db->query($query);

	print json_encode(gather_results($result));
}else{
	print '{"error":"not authorized"}';
}
