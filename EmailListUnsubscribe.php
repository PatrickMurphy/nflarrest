<?php 

if(isset($_GET['token'])){
    require_once('db_config.php');

    $mysql = mysqli_connect($db_info['host'], $db_info['user'], $db_info['password']);
    mysqli_select_db($mysql, 'pmphotog_main');
    $result = mysqli_query($mysql, "UPDATE email_list SET subscribed = 0 WHERE md5(email) = '" . mysqli_real_escape_string($mysql, $_GET['token']) . "'");
    print 'Unsubscribed!';
    die();
}
print 'token not set';