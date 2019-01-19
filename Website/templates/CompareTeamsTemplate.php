<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Compare Arrest Records by Team - NFLarrest.com</title>
    <meta property="og:url" content="http://NFLArrest.com/RecentArrestsByTeam.html" />
    <meta property="og:title" content="How many days has it been since each NFL team has had an NFL Player arrested?" />
    <meta property="og:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NFL Arrest" />
    <meta property="og:image" content="http://nflarrest.com/images/preview.png?cache=710" />
    <meta name="description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!">
    <meta name="author" content="Patrick Murphy">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@nfl_arrest">
    <meta name="twitter:creator" content="@patrickmurphoto">
    <meta name="twitter:title" content="NFL Arrest Statistics">
    <meta name="twitter:description" content="Explore the arrest records of NFL Players, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!">
    <meta name="twitter:image" content="http://nflarrest.com/images/preview.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="image_src" href="http://nflarrest.com/images/preview.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/favicon/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="images/favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="images/favicon/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="images/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="images/favicon/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="images/favicon/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="images/favicon/manifest.json">
    <link rel="shortcut icon" href="images/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="NFL Arrest">
    <meta name="application-name" content="NFL Arrest">
    <meta name="msapplication-TileColor" content="#e7b736">
    <meta name="msapplication-TileImage" content="images/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="images/favicon/browserconfig.xml">
    <meta name="theme-color" content="#e7b736">
</head>

<body>
    <div id="fb-root"></div>
    <div class="container">
        <header>
            <a href="http://nflarrest.com" class="logo"><img src="images/logo-transparent.png" alt="NFL Arrest Logo" height="30" /></a>
            <a href="http://nflarrest.com">
				<h1>NFL<span>Arrest</span>.com</h1>
			</a>
            <span>The Database of NFL Arrest Statistics</span>
        </header>
        <br class="clear" />
        <section>
            <style>
                .value-cell {
					background-color: rgb(3, 143, 239);
					box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.58);
					padding: 1px 8px;
					border-radius: 10px;
					line-height: 24px;
					margin-top: 4px;
					color: #fff !important;
				}
				.compare-kpi {
					border-radius: 6px;
				}
				.compare-kpi-text {
					font-weight: bold;
					font-size:2rem;
				}
				.compare-kpi img {
					max-width: 150px;
				}
				.compare-chart {
					border:1px solid #ddd;
					border-radius: 4px;
				}
				.compare-chart h5 {
					border-bottom: 1px solid #efefef;
				}
			</style>
            <div class="row">
                <div class="dateRangeControl">
                    <span class="title">Date Range:</span> <input id="dateRangeJquery" name="dateRangeJquery">
                </div>
                <h4>Compare Teams:</h4>
            </div>
            <div class="row">
                <div class="five columns compare-kpi teamKPI-1">
                    <img src="images/TeamLogos/NFL.gif" id="teamImg-1" class="six columns" />
                    <div class="six columns">
                        <span><select id="teamSelect-1"><option style="color:#FFCD00;background-color:#9B2743;" value="ARI">ARI - Arizona Cardinals</option><option style="color:#101820;background-color:#A6192E;" value="ATL">ATL - Atlanta Falcons</option><option style="color:#D0B240;background-color:#280353;" value="BAL">BAL - Baltimore Ravens</option><option style="color:#C60C30;background-color:#00338D;" value="BUF">BUF - Buffalo Bills</option><option style="color:#101820;background-color:#0085CA;" value="CAR">CAR - Carolina Panthers</option><option style="color:#DC4405;background-color:#051C2C;" value="CHI">CHI - Chicago Bears</option><option style="color:#000000;background-color:#FB4F14;" value="CIN">CIN - Cincinnati Bengals</option><option style="color:#EB3300;background-color:#382F2D;" value="CLE">CLE - Cleveland Browns</option><option style="color:#7F9695;background-color:#041E42;" value="DAL">DAL - Dallas Cowboys</option><option style="color:#0C2340;background-color:#FC4C02;" value="DEN">DEN - Denver Broncos</option><option style="color:#A2AAAD;background-color:#0069B1;" value="DET">DET - Detroit Lions</option><option style="color:#FFB81C;background-color:#175E33;" value="GB">GB - Green Bay Packers</option><option style="color:#B31B34;background-color:#02253A;" value="HOU">HOU - Houston Texans</option><option style="color:#FFFFFF;background-color:#003B7B;" value="IND">IND - Indianapolis Colts</option><option style="color:#9E792C;background-color:#000000;" value="JAC">JAC - Jacksonville Jaguars</option><option style="color:#FFB81C;background-color:#C8102E;" value="KC">KC - Kansas City Chiefs</option><option style="color:#866D4B;background-color:#041E42;" value="LA">LA - Los Angeles Rams</option><option style="color:#FFB81C;background-color:#0C2340;" value="LAC">LAC - Los Angeles Chargers</option><option style="color:#F5811F;background-color:#008DB7;" value="MIA">MIA - Miami Dolphins</option><option style="color:#FFB81C;background-color:#512D6D;" value="MIN">MIN - Minnesota Vikings</option><option style="color:#C8102E;background-color:#0C2340;" value="NE">NE - New England Patriots</option><option style="color:#101820;background-color:#A28D5B;" value="NO">NO - New Orleans Saints</option><option style="color:#A6192E;background-color:#001E62;" value="NYG">NYG - New York Giants</option><option style="color:#FFFFFF;background-color:#0C371D;" value="NYJ">NYJ - New York Jets</option><option style="color:#A5ACAF;background-color:#101820;" value="OAK">OAK - Oakland Raiders</option><option style="color:#869397;background-color:#004C54;" value="PHI" >PHI - Philadelphia Eagles</option><option style="color:#101820;background-color:#FFB81C;" value="PIT">PIT - Pittsburgh Steelers</option><option style="color:#4DFF00;background-color:#001433;" value="SEA">SEA - Seattle Seahawks</option><option style="color:#D1A472;background-color:#9B2743;" value="SF">SF - San Francisco 49ers</option><option style="color:#FF8200;background-color:#C8102E;" value="TB">TB - Tampa Bay Buccaneers</option><option style="color:#0D254C;background-color:#648FCC;" value="TEN">TEN - Tennessee Titans</option><option style="color:#FFCD00;background-color:#862833;" value="WAS">WAS - Washington Redskins</option></select></span><br />
                        <span style="color:#041E42;" id="teamKPI-arrests-1" class="kpi-value-large">#</span>
                        <span class="kpi-description-smaller">Arrests</span>
                        <!---span style="color:#041E42;" class="kpi-value-large">2.09%</span>
            			<span class="kpi-description-smaller">Of Entire NFL</span>-->
                    </div>
                </div>
                <div class="five columns compare-kpi teamKPI-2">
                    <img src="images/TeamLogos/NFL.gif" id="teamImg-2" class="six columns" />
                    <div class="six columns">
                        <span><select id="teamSelect-2"><option style="color:#FFCD00;background-color:#9B2743;" value="ARI">ARI - Arizona Cardinals</option><option style="color:#101820;background-color:#A6192E;" value="ATL">ATL - Atlanta Falcons</option><option style="color:#D0B240;background-color:#280353;" value="BAL">BAL - Baltimore Ravens</option><option style="color:#C60C30;background-color:#00338D;" value="BUF">BUF - Buffalo Bills</option><option style="color:#101820;background-color:#0085CA;" value="CAR">CAR - Carolina Panthers</option><option style="color:#DC4405;background-color:#051C2C;" value="CHI">CHI - Chicago Bears</option><option style="color:#000000;background-color:#FB4F14;" value="CIN">CIN - Cincinnati Bengals</option><option style="color:#EB3300;background-color:#382F2D;" value="CLE">CLE - Cleveland Browns</option><option style="color:#7F9695;background-color:#041E42;" value="DAL" >DAL - Dallas Cowboys</option><option style="color:#0C2340;background-color:#FC4C02;" value="DEN">DEN - Denver Broncos</option><option style="color:#A2AAAD;background-color:#0069B1;" value="DET">DET - Detroit Lions</option><option style="color:#FFB81C;background-color:#175E33;" value="GB">GB - Green Bay Packers</option><option style="color:#B31B34;background-color:#02253A;" value="HOU">HOU - Houston Texans</option><option style="color:#FFFFFF;background-color:#003B7B;" value="IND">IND - Indianapolis Colts</option><option style="color:#9E792C;background-color:#000000;" value="JAC">JAC - Jacksonville Jaguars</option><option style="color:#FFB81C;background-color:#C8102E;" value="KC">KC - Kansas City Chiefs</option><option style="color:#866D4B;background-color:#041E42;" value="LA">LA - Los Angeles Rams</option><option style="color:#FFB81C;background-color:#0C2340;" value="LAC">LAC - Los Angeles Chargers</option><option style="color:#F5811F;background-color:#008DB7;" value="MIA">MIA - Miami Dolphins</option><option style="color:#FFB81C;background-color:#512D6D;" value="MIN">MIN - Minnesota Vikings</option><option style="color:#C8102E;background-color:#0C2340;" value="NE">NE - New England Patriots</option><option style="color:#101820;background-color:#A28D5B;" value="NO">NO - New Orleans Saints</option><option style="color:#A6192E;background-color:#001E62;" value="NYG">NYG - New York Giants</option><option style="color:#FFFFFF;background-color:#0C371D;" value="NYJ">NYJ - New York Jets</option><option style="color:#A5ACAF;background-color:#101820;" value="OAK">OAK - Oakland Raiders</option><option style="color:#869397;background-color:#004C54;" value="PHI">PHI - Philadelphia Eagles</option><option style="color:#101820;background-color:#FFB81C;" value="PIT">PIT - Pittsburgh Steelers</option><option style="color:#4DFF00;background-color:#001433;" value="SEA">SEA - Seattle Seahawks</option><option style="color:#D1A472;background-color:#9B2743;" value="SF">SF - San Francisco 49ers</option><option style="color:#FF8200;background-color:#C8102E;" value="TB">TB - Tampa Bay Buccaneers</option><option style="color:#0D254C;background-color:#648FCC;" value="TEN">TEN - Tennessee Titans</option><option style="color:#FFCD00;background-color:#862833;" value="WAS">WAS - Washington Redskins</option></select></span><br />
                        <span style="color:#004C54;" id="teamKPI-arrests-2" class="kpi-value-large">#</span>
                        <span class="kpi-description-smaller">Arrests</span>
                        <!--<span style="color:#041E42;" class="kpi-value-large">1.54%</span>
            			<span class="kpi-description-smaller">Of Entire NFL</span>-->
                    </div>
                </div>
                <div class="two columns compare-kpi">
                    <span class="kpi-description-smaller">Delta</span>
                    <span class="kpi-value-large" id="compareDelta">+0.00%</span>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="six columns compare-chart">
                    <h5>Arrests Over Time</h5>
                    <div id="overtimechart"></div>
                </div>
                <div class="six columns compare-chart">
                    <h5>Arrests by Month</h5>
                    <div id="monthchart"></div>
                </div>
            </div>
            <!--
            <div style="width:100%; height: 200px;border:1px solid #000;line-height: 200px;">Over Time Chart</div>	
            <div class="row">
                <div class="six columns">
                    <a href="http://nflarrest.com/" style="text-decoration:none;">
						<h5 style="text-decoration:underline;">Visit our homepage!</h5>
						<p style="text-align:center;">
							<img src="images/preview.png" alt="Preview of the nflarrest homepage" style="width:70%;margin:auto;" /><br/> Visit our homepage for many more graphs, explore 15 years of NFL arrest records, find the most common crimes for your rival football team. Find out what players have the most arrests and read the details of each incident!</p>
					</a>
                </div>
                <div class="six columns share_buttons">
                    <h5 style="text-decoration:underline;">Mailing List:</h5>
                    <form id="newsletterForm">
                        <span>Be the first to know about NFL Arrests! Sign up for our newsletter!</span>
                        <div><input type="email" style="width:85%;display:inline-block;" placeholder="e@mail.com" name="email"><input type="submit" name="submit" style="padding:0px;width:15%;background:#c77522;color:#242424;display:inline-block;" value="Go!"></div>
                    </form>
                    <div class="fb-share-button fb_Btn" data-href="http://www.nflarrest.com/ArrestMeter.html">
                    </div>
                    <a href="https://twitter.com/share" class="twitter-share-button twitter_Btn" data-url="http://nflarrest.com/ArrestMeter.html" data-text="Explore the arrest records of Football Players, find the most common crimes for your football team.">Tweet</a>
                    <script type="text/javascript" src="//www.redditstatic.com/button/button1.js"></script>
                    <br /> Want to embed the arrest-o-meter on your site, blog, or subreddit? The Below is an image that can be embeded anywhere that will automatically update every day!
                    <img src="http://nflarrest.com/sidebar.png" alt="nfl arrest meter automatic streak image" /><br />Get the code: <input type="text" value='<img src="http://nflarrest.com/sidebar.png" />'>
                </div>
            </div>-->
        </section>
        <br class="clear" />
        <footer>Made By <a href="http://resume.patrickmurphyphoto.com" title="Want to see my Resume?">Patrick Murphy</a> | <a href="http://nflarrest.com/api/">Open API</a> | <a href="http://nflarrest.com/">Homepage</a><span class="new-super">More Stats!</span> </footer>
    </div>
    <script>
    function loadCSS(url) {
        (function(d, t) {
            var g = d.createElement(t),
                s = d.getElementsByTagName(t)[0];
            g.href = url;
            g.rel = 'stylesheet';
            s.parentNode.insertBefore(g, s);
        }(document, 'LINK'));
    }

    loadCSS('css/styles.min.css');
    loadCSS('//fonts.googleapis.com/css?family=Raleway:400,300,500,600');
    loadCSS('css/vendor/normalize.min.css');
    loadCSS('css/vendor/skeleton.min.css');
    loadCSS('css/vendor/jquery-ui.min.css');
    loadCSS('css/vendor/c3.css');
    </script>

    <!-- Include Javascript Logic -->
    <!--<script type="text/javascript" src="js/common.js" async></script>-->
    <script type="text/javascript" src="js/Utilities.js" async></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/vendor/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/google-tracking.js" async></script>

    <script type="text/javascript" src="js/common.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
    <script src="js/vendor/jquery.comiseo.daterangepicker.min.js"></script>
    <script type="text/javascript" src="js/dateRangeController.js"></script>
    <script type="text/javascript" src="js/vendor/d3.min.js"></script>
    <script type="text/javascript" src="js/vendor/c3.min.js"></script>
    <script type="text/javascript" src="js/charts/simpleLineChart.js"></script>
    <script type="text/javascript" src="js/charts/stackedBarChart.js"></script>
    <script type="text/javascript" src="js/pages/CompareTeamPage.js" defer></script>
</body>
</html>