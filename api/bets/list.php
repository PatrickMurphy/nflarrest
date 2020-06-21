<?php
	if(isset($restful)){
		$mod = '';
	}else{
		// in sub folder inlcude stuff from one up
		$mod = '../';
	}

		require_once($mod.'api.php');
		require_once($mod."../betting/config/db.php");
		require_once($mod."../betting/classes/Login.php");

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

	if(isset($_GET['showAll']) && $_SESSION['user_group']>=2){
		// show all
		$query = "SELECT * FROM bets WHERE active=1" . $limit;
	}else{
		// show personal or one
		if(isset($_GET['user_id']) && is_numeric($_GET['user_id'])){
			$theID = $_GET['user_id'];
		}else{
			$theID = $_SESSION['user_id'];
		}
		$query = "SELECT * FROM bets WHERE userid=".$theID." AND active=1 ORDER BY date_placed DESC" . $limit;
	}

	$result = $db->query($query);

	print json_encode(gather_results($result));
}else{
	print '{"error":"not authorized"}';
}
