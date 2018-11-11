<?php
session_start();

require('PHP/Login_System_Settings.php');

function isLoggedIn() {
	global $login_system_settings;
	// is it set?
	$isValid = isset($_SESSION['auth']);
	if($isValid){
		// if set is it correct?
		$isValid = $_SESSION['auth'] == $login_system_settings['values']['auth_code'];
	}
	return $isValid;
}

function formFieldsSet(){
	global $login_system_settings;
	return (isset($_POST['username']) && isset($_POST['password']));
}

function isValidLogin() {
	global $login_system_settings;
	$isUsernameValid = strtolower($_POST['username']) == strtolower($login_system_settings['values']['username']);
	$isPasswordValid = $_POST['password'] == $login_system_settings['values']['password'];
	return ($isUsernameValid && $isPasswordValid);
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
