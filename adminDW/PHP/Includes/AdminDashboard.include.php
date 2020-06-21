<!-- Admin Dashboard HTML Include -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
<link rel="stylesheet" href="CSS/AdminDashboard.css" />
<div class="row">
	<!-- Content Area -->
	<div class="eight columns">
		<div id="tabs">
			<ul>
				<li><a href="#tabs-1">Manage Cache</a></li>
				<li><a href="#tabs-2">Manage Incidents</a></li>
				<li>><a href="#tabs-4">Manage Seasons</a></li>
				<li>><a href="#tabs-5">Manage Infractions</a></li>
				<li>><a href="#tabs-6">Manage Teams</a></li>
				<li>><a href="#tabs-7">Manage Players</a></li>
				<li>><a href="#tabs-7">Manage Positions</a></li>
				<li><a href="#tabs-8">>Manage Other Dimensions</a></li>
				<!-- 
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
	<div class="four columns" style="background-color:#f9f9f9; min-height:200px;">
		<h4>News</h4>
		<div id="newslist"></div>
		<div><a href="http://nflarrest.com/blog/admin.php" class="button">Blog Admin</a></div>
		<div id="email_list_stats">
			<h5>Email List:
				<?php print $email_count['total']; ?>
			</h5>
			<ol>
				<?php
	foreach($email_list as $email){
		print '<li>'.$email['referrer'] . ': ' . $email['total'].'</li>';
	}
	?>
			</ol>
		</div>
	</div>
</div>
<!-- Get News Alerts -->
<script type="text/javascript" src="JS/AdminDashboard.js"></script>
