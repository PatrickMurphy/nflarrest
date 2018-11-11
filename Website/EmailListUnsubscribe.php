<?php 

if(isset($_GET['token'])){
    require_once('admin/db_config.php');

    $mysql = mysqli_connect($db_info['host'], $db_info['user'], $db_info['password']);
    mysqli_select_db($mysql, 'pmphotog_main');
	$query = "UPDATE email_list SET subscribed = 0 WHERE md5(email) = '";
	$query .=  mysqli_real_escape_string($mysql, $_GET['token']) . "'";
    $result = mysqli_query($mysql, $query);
    print 'Unsubscribed!';
    die();
}
print 'token not set';
