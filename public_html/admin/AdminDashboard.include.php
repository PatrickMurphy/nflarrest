<!-- Admin Dashboard HTML Include -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="AdminDashboard.css" />
<div class="row">
	<!-- Content Area -->
	<div class="eight columns">
		<div id="tabs">
			<ul>
				<li><a href="#tabs-1">Caches</a></li>
				<li><a href="#tabs-2">Add Arrest</a></li>
				<li><a href="#tabs-3">Email List</a></li>
			</ul>
			<div id="tabs-1">
				<h2>Caches</h2>
				<form id="addForm" method="post" action="admin/index.php">
					<input type="submit" name="form_action" value="Cache SeasonState" /> >
					<input type="submit" name="form_action" value="Cache Arrests View" /> >
					<input type="submit" name="form_action" value="Cache Last Arrests" />
				</form>

				<h3>Cache Files</h3>
				<p>
					<a href="admin/CacheDetailPages.php?page_id=team" class="button">Team HTML</a> <a href="admin/CacheDetailPages.php?page_id=crime" class="button">Crime HTML</a> <a href="admin/CacheDetailPages.php?page_id=position" class="button">
Position HTML</a> <a href="admin/CacheDetailPages.php?page_id=player" class="button">Player HTML</a> <a href="admin/CacheJSON.php?page_id=topTeams&fast=32" class="button">Graph JSON</a> <a href="admin/CacheJSON.php?page_id=topLists&fast=32" class="button">Top List JSON</a>
				</p>
			</div>
			<div id="tabs-2">
				<h2>Add Record:</h2>
				<form id="addForm" method="post" action="admin/index.php">
					<div class="row">
						<label>Date</label>
						<input type="date" name="Date" />
						<label>Team</label>
						<select name="Team">
					<?php print $team_options; ?>
					</select>
					</div>
					<div class="row">
						<label>Name</label>
						<input type="text" name="Name" />
						<label>Position</label>
						<input type="text" name="Position" />
					</div>
					<div class="row">
						<label>Encounter</label>
						<input type="text" name="Encounter" value="Arrested" />
						<label>Category</label>
						<input type="text" name="Category" />
					</div>
					<div class="row">
						<label>Description</label>
						<textarea name="Description"></textarea>
						<label>Outcome</label>
						<input type="text" name="Outcome" value="Resolution Undetermined." />
					</div>
					<div class="row">
						<label>General Category</label>
						<select name="general_category_id">
					<?php print $crime_options; ?>
					</select>
						<label>Legal Level</label>
						<select name="legal_level_id">
						<?php print $legal_options; ?>
					</select>
						<label>Outcome Category</label>
						<select name="resolution_category_id">
						<?php print $outcome_options; ?>
					</select>
					</div>
					<br />
					<input type="hidden" name="form_action" value="add_arrest" />
					<input type="submit" name="submit" value="Add Arrest" class="button-primary" />
					<br />
				</form>
			</div>
			<div id="tabs-3">
				<h2>Email List</h2>
				<div>
					<form action="admin/sendEmail.php" method="post" id="emailComposeForm">
						<input type="text" name="mail_subject" value="NFL Arrest Update: " />
						<textarea name="mail_body"></textarea>
						<input type="submit" name="form_action" value="Send Email" />
					</form>
				</div>
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
<script type="text/javascript" src="AdminDashboard.js" />
