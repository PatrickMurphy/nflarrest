<?php
session_start();
if(isset($_SESSION['attempts'])){
    $_SESSION['attempts']++;
}else{
    $_SESSION['attempts'] = 1;
}


    if(!isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
       $ip = $_SERVER['REMOTE_ADDR'] . "\t" . 'not set';
    }else{
        $ip = $_SERVER['REMOTE_ADDR'] . "\t" . $_SERVER['HTTP_X_FORWARDED_FOR'];
    }

if(isset($_GET['id'])){
	$id = $_GET['id'];
}else{
	$id = 'homepage';
}

    $message1 = str_replace('TAB', "\t", urldecode($id));
    $message = date(DATE_ATOM, time()) . "\t" . $ip . "\t" . $message1 . "\t" . 'Try: '. $_SESSION['attempts'] . "\n";
 file_put_contents("user.log", $message, FILE_APPEND);
