var html_string = [];

html_string.push('<!doctype html>' +
				'<html lang="en">' +
'<head>' +
'	<meta charset="utf-8">' +
'	<title>NFL Arrest |' +
//		<?php echo $page_details['title']; ?> Details</title>
//	<meta name="description" content="<?php echo $page_details['description']; ?>">
'	<meta name="author" content="Patrick Murphy">' +
'	<meta name="viewport" content="width=device-width, initial-scale=1">' +
'	<base href="http://www.nflarrest.com/">' +
'	<link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-touch-icon-57x57.png">' +
'	<link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-touch-icon-60x60.png">' +
'	<link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-touch-icon-72x72.png">' +
'	<link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-touch-icon-76x76.png">' +
'	<link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-touch-icon-114x114.png">' +
'	<link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-touch-icon-120x120.png">' +
'	<link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-touch-icon-144x144.png">' +
'	<link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-touch-icon-152x152.png">' +
'	<link rel="icon" type="image/png" href="/images/favicon/favicon-32x32.png" sizes="32x32">' +
'	<link rel="icon" type="image/png" href="/images/favicon/favicon-194x194.png" sizes="194x194">' +
'	<link rel="icon" type="image/png" href="/images/favicon/favicon-96x96.png" sizes="96x96">' +
'	<link rel="icon" type="image/png" href="/images/favicon/android-chrome-192x192.png" sizes="192x192">' +
'	<link rel="icon" type="image/png" href="/images/favicon/favicon-16x16.png" sizes="16x16">' +
'	<link rel="manifest" href="/images/favicon/manifest.json">' +
'	<link rel="shortcut icon" href="/images/favicon/favicon.ico">' +
'	<meta name="apple-mobile-web-app-title" content="NFL Arrest">' +
'	<meta name="application-name" content="NFL Arrest">' +
'	<meta name="msapplication-TileColor" content="#e7b736">' +
'	<meta name="msapplication-TileImage" content="/images/favicon/mstile-144x144.png">' +
'	<meta name="msapplication-config" content="/images/favicon/browserconfig.xml">' +
'	<meta name="theme-color" content="#e7b736">' +
'</head>');

html_string.push('<body>' +
'	<div class="container">' +
'		<header>' +
'			<a href="http://nflarrest.com" class="logo">' +
'				<img src="images/logo-transparent.png" alt="NFL Arrest Logo" height="30" /></a>' +
'			<a href="http://nflarrest.com">' +
'				<h1 style="margin-top:0px;">' +
'					NFL<span>Arrest</span>.com' +
'				</h1>' +
'			</a>' +
'			<a href="https://twitter.com/share" class="twitter-share-button twitter_Btn" data-url="http://nflarrest.com" data-text="Explore the arrest records of Football Players, find the most common crimes for your football team.">Tweet</a>' +
'			<div class="fb-share-button fb_Btn" data-href="http://NFLArrest.com" data-layout="button_count"></div>' +
'			<div class="dateRangeControl">' +
'				<button id="filters-open-button">F</button><span class="title">Date Range:</span> <input id="dateRangeJquery" name="dateRangeJquery">' +
'			</div>' +
'		</header>' +
'		<br class="clear" />' +
'		<h3 id="pageTitle" class="eight columns">Team: </h3>');
		//<?php
          //  if($page_details['show_share_buttons']){ ?>
			//<span class="single_share three columns">Share this team: <a href="https://twitter.com/share" class="twitter-share-button" data-text="Explore the arrest records of Football Players, find the most common crimes for your football team.">Tweet</a><div class="fb-share-button fb_Btn"  data-layout="button_count"></div></span>
			//<?php } ?>
			<br class="clear" />
			<section>
				<aside>
			//		<?php 
              //          echo $page_details['chartsHTML'];
                //    ?>
				</aside>
				<br class="clear" />
				<div style="width:98%; margin-left:1%;">
					<h4 style="text-align:left;">Incidents:</h4>
					<table id="arrest_table">
					</table>
				</div>
			</section>
			<br class="clear" />
			<footer>&copy; 2016 <a href="http://resume.patrickmurphyphoto.com">Patrick Murphy</a> | <a href="http://www.usatoday.com/sports/nfl/arrests/">Data Source</a> |
				<form action="https://www.paypal.com/cgi-bin/webscr" class="donate" method="post" target="_top">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="hosted_button_id" value="G8DZ4DLRQVD8Y">
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
					<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
				</form>
			</footer>
	</div>
	<div id="filter-dialog-container"></div>

	<!-- Include Javascript Logic -->
	<script type="text/javascript" src="js/loadCSS.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="js/vendor/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/google-tracking.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
	<script type="text/javascript" src="js/vendor/d3.min.js"></script>
	<script type="text/javascript" src="js/vendor/c3.js"></script>
	<script type="text/javascript" src="js/vendor/jquery.comiseo.daterangepicker.min.js"></script>
	<script type="text/javascript" src="js/vendor/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/model/FiltersModel.js"></script>
	<script type="text/javascript" src="js/FiltersControl.js"></script>
	<script type="text/javascript" src="js/charts/donutChart.js"></script>
	<?php 
        if(count($page_details['javascript'])>1){
            foreach($page_details['javascript'] as $key => $var){
                if($key != 'main'){
                    echo '    <script src="'.$var.'"></script>';
                }                
            }
        }
    ?>
	<script src="js/dateRangeController.js"></script>
	<script src="js/Utilities.js"></script>
	<script src="js/DetailPage.js"></script>
	<script src="<?php echo $page_details['javascript']['main']; ?>"></script>
</body>

</html>
