<?php
$inputs = array();
/*
types:
	date
	select
	text
	textarea
	hidden
	submit
name
value
options

  `DateID` int(11) NOT NULL COMMENT 'Date Key',
  `TeamID` int(11) NOT NULL COMMENT 'Team Key',
  `PlayerID` int(11) NOT NULL COMMENT 'Player Key',
  `PositionID` int(11) NOT NULL COMMENT 'Position Key',
  `InfractionID` int(11) NOT NULL COMMENT 'Infraction Key',
*/
?>

<h2>Manage Incidents</h2>
<h3>Add Incident</h3>
<form id="addForm">
	<div class="row">
		<div class="three columns">
			<label>Date</label>
			<input type="date" name="DateID" />
		</div>
		<div class="five columns" id="addTeam">
			<label>Team</label>
			<span class="add_icon"> </span>
			<select name="TeamID">
				<optgroup label="Teams">
					<?php print $Team_options; ?>
				</optgroup>
				<optgroup label="New">
					<option>Create New Team</option>
				</optgroup>
				</select>
		</div>
		<div class="four columns" id="addPosition">
			<label>Position</label>
			<span class="add_icon"> </span>
			<select name="PositionID">
				<optgroup label="Positions">
					<?php print $Position_options; ?>
				</optgroup>
				<optgroup label="New">
					<option>Create New Position</option>
				</optgroup>
			</select>
		</div>
	</div>
	<div class="row">
		<div class="five columns" id="addPlayer">
			<label>Player</label> 
			<span class="add_icon"> </span>
			<select name="PlayerID">
				<optgroup label="Players">
					<?php print $Player_options; ?>
				</optgroup>
				<optgroup label="New">
					<option>Create New Player</option>
				</optgroup>
			</select>
		</div>
		<div class="seven columns" id="addInfraction">
			<label>Infraction</label>
			<span class="add_icon"> </span>
			<select name="InfractionID">
				<optgroup label="Infractions">
					<?php print $Infraction_options; ?>
				</optgroup>
				<optgroup label="New">
					<option>Create New Infraction</option>
				</optgroup>
			</select>
		</div>
	</div>
	<!--<div class="row">
		<div class="three columns">
			<label>Infraction</label>
		</div>
		<div class="nine columns">
			<select name="InfractionID">
				<optgroup label="Infractions">
					<?php print $Infraction_options; ?>
				</optgroup>
				<optgroup label="New">
					<option>Create New Infraction</option>
				</optgroup>
			</select>
		</div>
	</div>-->
	<div class="row">
		<div class="three columns" id="addIncidentNote">
			<label class="noteLabel">Incident Note</label>
			<span class="add_icon multi"> </span>
			<ol id="addIncidentNoteList">
			</ol>
		</div>
		<div class="nine columns" id="addIncidentNoteForm" style="display: none;">
			<input type="text" name="incidentNoteTitle" placeholder="Note Title" />
			<textarea name="incidentNote" class="noteInput" placeholder="Note"></textarea>
		</div>
	</div>
	<div class="row">
		<div class="three columns" id="addIncidentSource">
			<label class="noteLabel">Incident Source</label>
			<span class="add_icon multi"> </span>
			<ol id="addIncidentSourceList">
			</ol>
		</div>
		<div class="nine columns" id="addIncidentSourceForm" style="display: none;">
			<input type="text" name="incidentSourceURL" placeholder="Source URL" />
			<select name="incidentExternalSource"><option selected>Other External Source</option></select>
		</div>
	</div>
	<br />
	<input type="hidden" name="form_action" value="add_incident" />
	<input type="submit" name="submit" value="Add Incident" class="button-primary" />
	<br />
</form>
<div id="status"></div>

<!-- ======================
	Dialogs forms
======================= -->
<div id="addPlayerForm" class="dialogBox" title="Add Player" style="display: none;">
	<form>
		<div class="row">
			<div class="nine columns">
				<label>Player Name</label>
				<input type="text" name="addPlayerDesc" placeholder="FirstName LastName" maxlength="127" />
			</div>
			<div class="three columns">
				<label>Player Birthdate</label>
				<input type="date" name="addPlayerBirthDate">
			</div>
		</div>
	</form>
</div>

<div id="addTeamForm" class="dialogBox" title="Add Team" style="display: none;">
	<form>
		<div class="row">
			<div class="four columns">
				<label>Team Code</label>
				<input type="text" name="TeamCode" placeholder="" maxlength="5" />
			</div>
			<div class="four columns">
				<label>Team Name</label>
				<input type="text" name="TeamDesc" placeholder="" maxlength="127" />
			</div>
			<div class="four columns">
				<label>Team Full Name</label>
				<input type="text" name="TeamFullName" placeholder="" maxlength="127" />
			</div>
		</div>
		<div class="row">
			<div class="four columns">
				<label>Team City</label>
				<input type="text" name="City" placeholder="" maxlength="127" />
			</div>
			<div class="four columns">
				<label>Team State</label>
				<input type="text" name="State" placeholder="" maxlength="127" />
			</div>
			<div class="four columns">
				<label>Team Stadium Name</label>
				<input type="text" name="Stadium" placeholder="" maxlength="127" />
			</div>
		</div>
	</form>
</div>
<div id="addPositionForm" class="dialogBox" title="Add Position" style="display: none;">
	<form>
		<div class="row">
			<div class="three columns">
				<label>Position Code</label>
				<input type="text" name="PositionCode" placeholder="" />
			</div>
			<div class="nine columns">	
				<label>Position Description</label>
				<input type="text" name="PositionDesc" placeholder="" />
			</div>
		</div>
		<div class="row">
			<div class="twelve columns">
				<label>Position Type</label>
				<select name="PositionTypeID">
					<option value="" disabled selected hidden>Please Choose...</option>
					<option value="1">Offense</option>
					<option value="2">Defense</option>
					<option value="3">Special Teams</option>
				</select>
			</div>
		</div>
	</form>
</div>
<div id="addInfractionForm" class="dialogBox" title="Add Infraction" style="display: none;">
	<form>
		<label>Infraction Code</label>
		<input type="text" name="InfractionCode" placeholder="" maxlength="5" />
		<label>Infraction Description</label>
		<input type="text" name="InfractionDesc" placeholder="" maxlength="127" />
		<label>Infraction Color</label>
		<input type="text" name="InfractionColor" placeholder="000000" maxlength="6" />
		<label>Infraction Category</label>
		<select name="InfractionCategoryID">
			<option value="" disabled selected hidden>Please Choose...</option>
		</select>
	</form>
</div>