<?php
session_start();
$error = false;
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
	//{"userid":,"amount":"10","odds":"0.03125","crime":"-1","player":"no-choice","team":"min","position":"no-choice","active":"1","date_placed":"2015-11-30 20:23:43"}

	// set userid and check balance
	$newBet['userid'] = $_SESSION['user_id'];
	$queryUser = "SELECT user_id, user_name, balance, user_group FROM users WHERE user_id = " . $newBet['userid'];
	$userResult = $db->query($queryUser);

	$theUser = $userResult->fetch_assoc();
	$_SESSION['balance'] = $theUser['balance'];

	// check amount param
	if(isset($_POST['amount'])){
		if($_SESSION['balance']>=(int)$_POST['amount']){
			$newBet['amount'] = (int)$_POST['amount'];
		}else{
			die('not enough money');
		}
	}else{
		$error = 'The amount must be set as an integer, You might not have enough funds to place that bet.';
		die($error);
	}
	$additionalColumns = "";
	$additionalValues = "";
	$crime_set = false;
	$player_set = false;
	$team_set = false;
	$pos_set = false;
	$newBet['odds'] = 1;
	if(isset($_POST['crime'])){
		$newBet['odds'] = (14/1 + 1);
		$crime_set = true;
		$newBet['crime'] = $_POST['crime'];
		$additionalColumns = ",crime";
		$additionalValues = ",".$newBet['crime'];
	}
	if(isset($_POST['player'])){
		$player_set = true;
		$newBet['player'] = $_POST['player'];
		$additionalColumns .= ",player";
		$additionalValues .= ",".$newBet['player'];
		$newBet['odds'] *= (1700/1 + 1);
	}else if(isset($_POST['team'])){
		if(!$player_set){// can't guess team if you know the player
			$team_set = true;
			$newBet['team'] = $_POST['team'];
			$additionalColumns .= ",team";
		$additionalValues .= ",'".$newBet['team']."'";
		$newBet['odds'] *= (32/1 + 1);
		}
	}else if(isset($_POST['position'])){
		if(!$player_set){ // can't guess position if you know the player
			$pos_set = true;
			$newBet['position'] = $_POST['position'];
			$additionalColumns .= ",position";
			$additionalValues .= ",".$newBet['position'];
			$newBet['odds'] *= (25/1 + 1);
		}
	}
	$newBet['odds'] = floor($newBet['odds']);

$query2 = 'INSERT INTO bets (userid,amount,odds'.$additionalColumns.') VALUES ('.$newBet['userid'].','. $newBet['amount'].','. $newBet['odds'] . $additionalValues.')';
		$_SESSION['balance'] -= $_POST['amount'];
	print $query2;
		$result = $db->query($query2);
		$balResult = $db->query('UPDATE users SET balance='. $_SESSION['balance'] .' WHERE user_id='. $newBet['userid']);
		print '{"submit":true}';
}else{
	$error = 'not authorized';
	print '{"submit":false,"error":"'.$error.'"}';
}
