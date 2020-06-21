<h2>Add Record:</h2>
<form id="addForm" method="post" action="index.php">
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