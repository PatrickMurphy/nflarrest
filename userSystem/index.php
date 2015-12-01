<?php

/**
 * Uses PHP SESSIONS, modern password-hashing and salting and gives the basic functions a proper login system needs.
 */

// checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
    // if you are using PHP 5.3 or PHP 5.4 you have to include the password_api_compatibility_library.php
    // (this library adds the PHP 5.5 password hashing functions to older versions of PHP)
    require_once("libraries/password_compatibility_library.php");
}

// include the configs / constants for the database connection
require_once("config/db.php");

?>
<!doctype html>
<html lang="en">
	<head>
		<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
		<meta charset="utf-8">
		<title>NFL Arrest Bet</title>
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/styles.min.css" />
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/vendor/normalize.min.css" />
		<link rel="stylesheet" type="text/css" href="http://nflarrest.com/css/vendor/skeleton.min.css" />

		<meta property="og:url" content="http://NFLArrest.com" />
    <meta property="og:title" content="NFL Arrest Statistics" />
    <meta property="og:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident! Checkout our Arrest-o-Meter and findout how many days it's been since the last NFL Arrest." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NFL Arrest"/>
    <meta property="og:image" content="http://nflarrest.com/images/preview.png?cache=710" />
    <meta name="description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident! Checkout our Arrest-o-Meter and findout how many days it's been since the last NFL Arrest.">
    <meta name="author" content="Patrick Murphy">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@nfl_arrest">
		<meta name="twitter:creator" content="@patrickmurphoto">
		<meta name="twitter:title" content="NFL Arrest Statistics">
		<meta name="twitter:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!">
		<meta name="twitter:image" content="http://nflarrest.com/images/preview.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
		<div class="container">
<?php
if(isset($_GET['register'])){
	require_once("classes/Registration.php");

	// create the registration object. when this object is created, it will do all registration stuff automatically
	// so this single line handles the entire registration process.
	$registration = new Registration();

	// show the register view (with the registration form, and messages/errors)
	include("views/register.php");
}else{
	// load the login class
	require_once("classes/Login.php");

	// create a login object. when this object is created, it will do all login/logout stuff automatically
	// so this single line handles the entire login process. in consequence, you can simply ...
	$login = new Login();

	// ... ask if we are logged in here:
	if ($login->isUserLoggedIn() == true) {
			// the user is logged in. you can do whatever you want here.
			// for demonstration purposes, we simply show the "you are logged in" view.
			include("views/logged_in.php");

	} else {
			// the user is not logged in. you can do whatever you want here.
			// for demonstration purposes, we simply show the "you are not logged in" view.
			include("views/not_logged_in.php");
	}
}
?>
		</div>
</body>
</html>
