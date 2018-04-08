<?php
require('Login_System.php');
?>
<!doctype html>

<html lang="en">

<head>
	<meta charset="utf-8">
	<title>NFL Arrest - Football Arrest Record Database &amp; Statistics</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<base href="http://nflarrest.com/">
	<link rel="image_src" href="http://nflarrest.com/images/preview.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="/images/favicon/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="/images/favicon/favicon-194x194.png" sizes="194x194">
	<link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="/images/favicon/android-chrome-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="/images/favicon/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="/images/favicon/manifest.json">
	<link rel="shortcut icon" href="/images/favicon/favicon.ico">
	<meta name="apple-mobile-web-app-title" content="NFL Arrest">
	<meta name="application-name" content="NFL Arrest">
	<meta name="msapplication-TileColor" content="#e7b736">
	<meta name="msapplication-TileImage" content="/images/favicon/mstile-144x144.png">
	<meta name="msapplication-config" content="/images/favicon/browserconfig.xml">
	<meta name="theme-color" content="#e7b736">
	<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="js/vendor/jquery-ui.min.js"></script>
</head>

<body>
	<div class="container">
		<header>
			<a href="http://nflarrest.com" class="logo"><img src="images/logo-transparent.png" alt="NFL Arrest Logo" height="30" /></a>
			<a href="http://nflarrest.com">
				<h1 style="line-height:1.2;">
					NFL<span>Arrest</span>.com
				</h1>
			</a>
			<span>The Database of NFL Arrest Statistics</span>
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
		<footer>Made By <a href="http://resume.patrickmurphyphoto.com" title="Want to see my Resume?">Patrick Murphy</a> | <a href="http://nflarrest.com/api/">Open API</a> | <a href="PrivacyPolicy.html">Privacy Policy</a></footer>
	</div>
	<!-- Include Javascript Logic -->
	<script src="js/vendor/d3.min.js" async></script>
	<script src="js/vendor/c3.min.js" async></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js" async></script>
	<script src="js/vendor/jquery.comiseo.daterangepicker.min.js" async></script>
	<script src="js/common.js" async></script>
	<script src="js/loadCSS.js" async></script>
</body>

</html>
