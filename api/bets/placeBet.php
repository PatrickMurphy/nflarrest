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
		require_once($mod."../betting/config/db.php");
		require_once($mod."../betting/classes/Login.php");
global $db;
$login = new Login();

function guessBet($inputArray){
	global $db;
    // takes in post
    // returns new bet odds, additional columns and values
    $additionalColumns = "";
	$additionalValues = "";
	$crime_set = false;
	$player_set = false;
	$team_set = false;
	$pos_set = false;
	$tempOdds = 1;

	if(isset($inputArray['crime']) && $inputArray['crime'] != 'no-choice'){
		$countResult = $db->query('SELECT COUNT(arrest_stats_id) AS `total`, (SELECT COUNT(arrest_stats_id) FROM '.$DB_MAIN_TABLE.' WHERE general_category_id = '.$inputArray['crime'].') as `cat_total` FROM '.$DB_MAIN_TABLE.'');
		$countResult = $countResult->fetch_assoc();
		$newOdds = 1/($countResult['cat_total']/$countResult['total']);
		$tempOdds = ($newOdds/1 + 1);
		$crime_set = true;
		$newBet['crime'] = $inputArray['crime'];
		$additionalColumns = ",crime";
		$additionalValues = ",".$newBet['crime'];
	}

	if(isset($inputArray['player']) && $inputArray['player'] != 'no-choice'){
		$player_set = true;
		$newBet['player'] = $inputArray['player'];
		$additionalColumns .= ",player";
		$additionalValues .= ",".$newBet['player'];
		$tempOdds *= (1700/1 + 1);
	}

	if(isset($inputArray['team']) && $inputArray['team'] != 'no-choice'){
		if(!$player_set){// can't guess team if you know the player
			$team_set = true;
			$newBet['team'] = $inputArray['team'];
			$additionalColumns .= ",team";
			$additionalValues .= ",'".$newBet['team']."'";
			$tempOdds *= (32/1 + 1);
		}
	}

    if(isset($inputArray['position']) && $inputArray['position'] != 'no-choice'){
		if(!$player_set){ // can't guess position if you know the player
			$pos_set = true;
			$newBet['position'] = $inputArray['position'];
			$additionalColumns .= ",position";
			$additionalValues .= ",'".$newBet['position']."'";
			$tempOdds *= (23/1 + 1);
		}
	}

	$tempOdds = floor($tempOdds);

    return array('cols'=>$additionalColumns, 'vals'=>$additionalValues, 'odds'=>$tempOdds);
}

function recordBet($inputData){
    $additionalColumns = "";
	$additionalValues = "";
    $tempOdds = 1;

    if(isset($inputData['recordDays'])){
        // how many days between now and date
        $days = $inputData['recordDays'];
        $recordDate = date_add(new DateTime(), date_interval_create_from_date_string($days.' days'));

         if ($days > 7){
            $prob = exp((($days)*(0-1))/7.16);
            $tempOdds = floor(1/$prob);
         }else{
            $tempOdds = 8-$days; // 1 day = 1-7 odds, 7 days out = 1-1 odds
            $tempOdds = 0 - $tempOdds; // make negative for database storage
         }

        $additionalColumns = ',recordDate';
        $additionalValues = ", "."'".$recordDate->getTimestamp()."'";

        return array('cols'=>$additionalColumns, 'vals'=>$additionalValues, 'odds'=>$tempOdds);
    }else{
        die('error');
    }
}

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

    if(isset($_POST['recordDays'])){
        $returnValues = recordBet($_POST);
    }else{
        $returnValues = guessBet($_POST);
    }

    $addColumns = $returnValues['cols'];
    $addValues = $returnValues['vals'];
    $newBet['odds'] = $returnValues['odds'];
$query2 = 'INSERT INTO bets (userid,amount,odds'.$addColumns.') VALUES ('.$newBet['userid'].','. $newBet['amount'].','. $newBet['odds'] . $addValues.')';
		$_SESSION['balance'] -= $_POST['amount'];
		$result = $db->query($query2);
		if($result > 0 && $result != false){
			$balResult = $db->query('UPDATE users SET balance='. $_SESSION['balance'] .' WHERE user_id='. $newBet['userid']);
			print '{"submit":true}';
		}else{
			print '{"submit":false, error:"undefined error, could not process query"}';
		}

}else{
	$error = 'not authorized';
	print '{"submit":false,"error":"'.$error.'"}';
}
