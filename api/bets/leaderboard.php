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

// create a login object. when this object is created, it will do all login/logout stuff automatically
// so this single line handles the entire login process. in consequence, you can simply ...
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

	$query = "SELECT user_id, user_name, balance, created FROM users ORDER BY balance DESC" . $limit;

	$result = $db->query($query);

	print json_encode(gather_results($result));
}else{
	print '{"error":"not authorized"}';
}
