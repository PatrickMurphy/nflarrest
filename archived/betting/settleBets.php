<?php
require_once('../api/PHP-Multi-SQL/classes/MySQL.class.php');

require_once('../api/db_config.php');

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

if($db == false){
	die('DB connection error.');
}
$today = (new DateTime())->getTimestamp();
//where active, time less than today, time != 0
$results = $db->select('bets','*', '`active` = 1 AND recordDate != 0 AND recordDate < '.$today);

if(count($results)>0){
print_r($results);
// give each user winnings
foreach($results as $row){
	print '<br/><br/><br/>---------------- user ';
	print $row['userid'].'---------------- <br />';
	print 'Odds: '.$row['odds'].'<br />';
	print 'Bet Amount: '.$row['amount'].'<br />';
	
	if($row['odds'] < 0){
		$winning = $row['amount']*((1/abs($row['odds'])+1));
	}else{
		$winning = $row['amount']*$row['odds'];
	}
	print 'Winnings: '.$winning;
	$db->query('UPDATE users SET balance = balance + '.$winning.' WHERE user_id = '.$row['userid']);
	
}

// update same set
$results = $db->update('bets',array('active'=>0), '`active` = 1 AND recordDate != 0 AND recordDate < '.$today);
print '<br/>Set Records inactive';
}
?>
