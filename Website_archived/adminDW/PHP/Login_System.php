<?php
session_start();

require('PHP/Login_System_Settings.php');

function isLoggedIn() {
	global $login_system_settings;
	return $_SESSION['auth'] == $login_system_settings['values']['auth_code'];
}

function formFieldsSet(){
	global $login_system_settings;
	return (isset($_POST['username']) && isset($_POST['password']));
}

function isValidLogin() {
	global $login_system_settings;
	return (strtolower($_POST['username']) == $login_system_settings['values']['username'] && $_POST['password'] == $login_system_settings['values']['password']);
}

function tryLogin(){
	global $login_system_settings;
	if(isLoggedIn() || isValidLogin()){
		$_SESSION['auth'] = $login_system_settings['values']['auth_code']; // set flag for logged in
		require('PHP/Includes/Authenticated.include.php'); // require page for already logged in
	}else{ // else invalid password attempt, use alert
		print $login_system_settings['errors']['invalid_login'];
		require('PHP/Includes/login.include.php');
	}
}

function displayLoginForm(){
	global $login_system_settings;
	require('PHP/Includes/login.include.php');
}
?>
