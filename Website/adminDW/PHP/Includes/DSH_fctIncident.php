<h2>Manage Incidents</h2>
<h3>Add Incident</h3>
<form id="addForm" method="post" action="index.php">
	<div class="row">
		<div class="six columns">
			<label>Date</label>
			<input type="date" name="Date" />
		</div>
		<div class="six columns">
				<label>Team</label>
				<select name="Team">
						<?php print $team_options; ?>
				</select>
		</div>
	</div>
	<div class="row">
		<div class="six columns">
			<label>Name</label>
			<input type="text" name="Name" />
		</div>
		<div class="six columns">
			<label>Position</label>
			<input type="text" name="Position" />
		</div>
	</div>
	<div class="row">
		<div class="six columns">
			<label>Encounter</label>
			<input type="text" name="Encounter" value="Arrested" />
		</div>
		<div class="six columns">
			<label>Category</label>
			<input type="text" name="Category" />
		</div>
	</div>
	<div class="row">
		<div class="six columns">
			<label>Description</label>
			<textarea name="Description"></textarea>
		</div>
		<div class="six columns">
			<label>Outcome</label>
			<input type="text" name="Outcome" value="Resolution Undetermined." />
		</div>
	</div>
	<div class="row">
		<div class="six columns">
			<label>General Category</label>
			<select name="general_category_id">
				<?php print $crime_options; ?>
			</select>
		</div>
		<div class="six columns">
			<label>Legal Level</label>
				<select name="legal_level_id">
				<?php print $legal_options; ?>
			</select>
		</div>
	</div>
	<div class="row">
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