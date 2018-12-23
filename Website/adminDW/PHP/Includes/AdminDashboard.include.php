<!-- Admin Dashboard HTML Include -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
<div class="row">
	<!-- Content Area -->
	<div class="nine columns" id="AdminTabs">
		<div id="tabs">
			<ul>
				<li><a href="#tabs-1">Manage Cache</a></li>
				<li><a href="#tabs-2">Manage Incidents</a></li>
				<!-- 
				<li><a href="#tabs-4">Manage Seasons</a></li>
				<li><a href="#tabs-5">Manage Infractions</a></li>
				<li><a href="#tabs-6">Manage Teams</a></li>
				<li><a href="#tabs-7">Manage Players</a></li>
				<li><a href="#tabs-7">Manage Positions</a></li>
				<li><a href="#tabs-8">Manage Dimensions</a></li>
				<li>Manage Outcome Categories</li>
				<li>Manage External Sources</li>
				-->
				<li><a href="#tabs-3">Email List</a></li>
			</ul>
			<div id="tabs-1">
				<?php 
					include('DSH_Cache.php');	
				?>
			</div>
			<div id="tabs-2">
				<?php 
					include('DSH_fctIncident.php');	
				?>
			</div>
			<div id="tabs-3">
				<?php
					include('DSH_Email.php');
				?>
			</div>
		</div>
	</div>

	<!-- Right Hand Info Column (News Email List) -->
	<div class="three columns" style="background-color:#f9f9f9; min-height:200px;">
		<h4>News</h4>
		<div id="newslist"></div>
		<div><a href="http://nflarrest.com/blog/admin.php" class="button">Blog Admin</a></div>
		<div id="email_list_stats">
			<h5>Email List:
				<?php print $email_count['total']; ?>
			</h5>
			<ol>
				<?php
					$folder_image = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBUlEQVQ4T33Te0hTURwH8O+9ZzvbJDdn9tgyQ5limQ8qpYToRQVGViQEGaL2soeuxx+LTDRTG7Q0bRUjRUMrKtEKI0XLzB6WkpoRlgah1SKtSOmx3d17Y8vd6J8OXA7n8Duf3/fcy2UwMQbKSDJEMci7/u/MMEOhWfxFdw3jLXxdymbPSiorcH4dBjc+ArnvFFBNIOS+08Gw5K9HCAbKNxwJMwqF/wAvS9ic2enX8kVBgAgB3NhH2N8PYXz0AxyzEqVeDCHof9p4c3DS6luCKNqlBH0n2dw5aZfzRI7zdGMYBgylsPf2ggnbAx+VCmqNRkriPni4piZDAnpOsPlzU2tyvIAHkctRUtGBu8QEPxWgDdAjPgRQq4CECBGmyspdEtBpZgtjUi8cFjin1IWVU9RebcCw3ginC/DRTkO4ToVQnQ4ztTwOnj+/WwKeFLLmmNRyE+/8CxBK8by9HbrFBR50hl6P2z0DWGAIhY+Cw36rdY8EPDzGWual2A7yToeUgFAFWi9lQRag8uwt3zqK+iddWBYZCSJjkGmxZEpAWx5bEptyZp9rAmAJwfcxO7rvWDEpSAORFxG76S1ONT9DiCEGy2a4sLOoKEsCmnPZ04uST+31AjKqQEeTGYELI8D//AZh/BuCV/bhREM3gkLmIyHUgbScHKMENGaz5+KTLRncRAI5VeBRiw2RG9fjy7shqB1voI67j+auLsRHR4NSisQdOw5IwA0TqViy5Xg65/zlua+cKtFclwvDUg0+DDqhFHlEbbbDXGzCdcc8LOgv6Gz/qC92A+43pKrOJLa124uSHL9+AhBBqRL11bnwj6QYfsWDcMCGo6Nou2EG97io9sEAKm2NfKsb0AKYbFxDjAkr4paERcXN1PhP9WMZBk0t92BYZ/UkmqbTeWIfyojv9/3U01J6iy8F8Fm6gruoai9JFEWs8gsIDA8Ojw2ua7jNl70wXCFK5Q8ik7ncNfzY2Mjnvr4q77f+B/Bunt1Go3jBlfDDwepMF13FAP78IH/G+MTjWfwGlP0V8yqU+zcAAAAASUVORK5CYII=" /> ';
					foreach($email_list as $email){
						$URL = strtolower($email['referrer']);
						$trimmedURL = str_replace("http://nflarrest.com",$folder_image,$URL);
						$trimmedURL = str_replace("http://www.nflarrest.com", $folder_image, $trimmedURL);
						print '<li>'.$trimmedURL . ': ' . $email['total'].'</li>';
					}
				?>
			</ol>
		</div>
	</div>
</div>
<!-- Get News Alerts -->
<script type="text/javascript" src="JS/AdminTabs.js"></script>
<script type="text/javascript" src="JS/AddButtons.js"></script>
<script type="text/javascript" src="JS/NewsFeed.js"></script>
<script type="text/javascript" src="JS/AdminDWDashboard.js"></script>
