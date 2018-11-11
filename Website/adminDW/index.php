<?php
require('PHP\Login_System.php');
?>
<!doctype html>

<html lang="en">

<head>
	<meta charset="utf-8">
	<title>NFL Arrest - Football Arrest Record Database &amp; Statistics</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="image_src" href="http://nflarrest.com/images/preview.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="http://nflarrest.com/images/favicon/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="http://nflarrest.com/images/favicon/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="http://nflarrest.com/images/favicon/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="http://nflarrest.com/images/favicon/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="http://nflarrest.com/images/favicon/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="http://nflarrest.com/images/favicon/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="http://nflarrest.com/images/favicon/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="http://nflarrest.com/images/favicon/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="http://nflarrest.com/images/favicon/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-194x194.png" sizes="194x194">
	<link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/android-chrome-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="http://nflarrest.com/images/favicon/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="http://nflarrest.com/images/favicon/manifest.json">
	<link rel="shortcut icon" href="http://nflarrest.com/images/favicon/favicon.ico">
	<meta name="apple-mobile-web-app-title" content="NFL Arrest">
	<meta name="application-name" content="NFL Arrest">
	<meta name="msapplication-TileColor" content="#e7b736">
	<meta name="msapplication-TileImage" content="http://nflarrest.com/images/favicon/mstile-144x144.png">
	<meta name="msapplication-config" content="http://nflarrest.com/images/favicon/browserconfig.xml">
	<meta name="theme-color" content="#e7b736">

	<link rel="stylesheet" href="../css/vendor/normalize.css" />
	<link rel="stylesheet" href="../css/vendor/skeleton.css" />
	<link rel="stylesheet" href="../css/styles.min.css" />
	<link rel="stylesheet" href="../css/vendor/c3.css" />
	<link rel="stylesheet" href="../css/vendor/jquery-ui.min.css" />
	<link rel="stylesheet" href="../css/vendor/jquery.comiseo.daterangepicker.css" />


	<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


</head>

<body>
	<div class="container">
		<header>
			<a href="http://nflarrest.com" class="logo"><img src="http://nflarrest.com/images/logo-transparent.png" alt="NFL Arrest Logo" height="30" /></a>
			<a href="http://nflarrest.com">
				<h1>
					NFL<span>Arrest</span>.com
				</h1>
			</a>
			<span>Data Warehouse Admin</span>
		</header>
		<br class="clear" />
		<section>

			<?php
				// IF already logged in or username and password have been entered try and validate, else display form
				if(isLoggedIn() || formFieldsSet()){
					// if password valid or already logged in
					tryLogin();
				}else{
					displayLoginForm();
				}
			?>
		</section>
		<br class="clear" />
		<footer>Made By <a href="http://resume.patrickmurphyphoto.com" title="Want to see my Resume?">Patrick Murphy</a> | <a href="http://nflarrest.com/api/">Open API</a> | <a href="http://nflarrest.com/PrivacyPolicy.html">Privacy Policy</a></footer>
	</div>
	<!-- Include Javascript Logic -->
	<script src="../js/vendor/d3.min.js" async></script>
	<script src="../js/vendor/c3.min.js" async></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js" async></script>
	<script src="../js/vendor/jquery.comiseo.daterangepicker.min.js" async></script>
	<script src="../js/Utilities.js" async></script>
</body>

</html>
