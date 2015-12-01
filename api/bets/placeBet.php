<?php
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
	$queryUser = "SELECT user_id, user_name, balance, user_group FROM users WHERE user_id = " + $newBet['userid'];
	$userResult = $db->query($queryUser);
	$theUser = $userResult->fetch_assoc();
	$_SESSION['balance'] = $theUser['balance'];

	// check amount param
	if(isset($_POST['amount']) && $_SESSION['balance']>=$_POST['amount']){
		$newBet['amount'] = $_POST['amount'];
		$_SESSION['balance'] -= $_POST['amount'];
	}else{
		$error = 'The amount must be set as an integer, You might not have enough funds to place that bet.';
	}
	$additionalColumns = "";
	$additionalValues = "";
	$crime_set = false;
	$player_set = false;
	$team_set = false;
	$pos_set = false;
	if(isset($_POST['crime'])){
		$crime_set = true;
		$newBet['crime'] = $_POST['crime'];
		$additionalColumns = ",crime";
		$additionalValues = ","+$newBet['crime'];
	}
	if(isset($_POST['player'])){
		$player_set = true;
		$newBet['player'] = $_POST['player'];
		$additionalColumns = ",player";
		$additionalValues = ","+$newBet['player'];
	}else if(isset($_POST['team'])){
		if(!$player_set){// can't guess team if you know the player
			$team_set = true;
			$newBet['team'] = $_POST['team'];
			$additionalColumns = ",team";
		$additionalValues = ","+$newBet['team'];
		}
	}else if(isset($_POST['position'])){
		if(!$player_set){ // can't guess position if you know the player
			$pos_set = true;
			$newBet['position'] = $_POST['position'];
			$additionalColumns = ",position";
			$additionalValues = ","+$newBet['position'];
		}
	}



	$query = "INSERT INTO bets (userid,amount,odds"+$additionalColumns+") VALUES ("+$newBet['userid']+","+$newBet['amount']+","+$newBet['odds']+$additionalValues");";
	if(!$error){
		$result = $db->query($query);
		$balResult = $db->query('UPDATE users SET balance='+ $_SESSION['balance'] +' WHERE user_id='+ $newBet['userid']);
		print '{"submit":true}';
	}else{
		print '{"error":"'+$error+'"}';
	}
}else{
	$error = 'not authorized';
	print '{"submit":false,"error":"'+$error+'"}';
}
