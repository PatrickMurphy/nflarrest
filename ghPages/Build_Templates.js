 //sets the table that standard queries pull from 
$DB_MAIN_TABLE = 'ArrestsCacheTable';

$crimes_categories_result = $db->query('SELECT * FROM general_category');
$crime_categories = gather_results($crimes_categories_result);
$crime_category_options ="";
foreach($crime_categories as $crime){
	// value="'.$crime['general_category_id'].'"
	$crime_category_options .= '<option>'.$crime['Category'].'</option>';
}


$crimes_result = $db->query('SELECT DISTINCT Category FROM ' . $DB_MAIN_TABLE );
$crime_names = gather_results($crimes_result);
$crime_options ="";
foreach($crime_names as $crime){
	$crime_options .= '<option value="'.$crime['Category'].'">'.$crime['Category'].'</option>';
}

$teams_result = $db->query('SELECT * FROM Team_details_view ORDER BY team_code ASC');
$teams_list = gather_results($teams_result);
$team_options ="";
foreach($teams_list as $team){
	$team_options .= '<option style="color:#'.$team['Team_hex_alt_color'].';background-color:#'.$team['Team_hex_color'].';" value="'.$team['team_code'].'">'.$team['Team_preffered_name'].'</option>';
}

//season
$season_result = $db->query('SELECT DISTINCT Season FROM ' . $DB_MAIN_TABLE . ' ORDER BY Season DESC');
$season_list = gather_results($season_result);
$season_options ="";
foreach($season_list as $row){
	$season_options .= '<option value="'.$row['Season'].'">'.$row['Season'].'</option>';
}

// position
$position_result = $db->query('SELECT DISTINCT Position, Position_name FROM ' . $DB_MAIN_TABLE);
$position_list = gather_results($position_result);
$position_options ="";
foreach($position_list as $row){
	$position_options .= '<option value="'.$row['Position'].'">'.$row['Position_name'].'</option>';
}

// player
$player_result = $db->query('SELECT DISTINCT Name FROM ' . $DB_MAIN_TABLE . ' ORDER BY Name ASC');
$player_list = gather_results($player_result);
$player_options ="";
foreach($player_list as $row){
	$player_options .= '<option value="'.$row['Name'].'">'.$row['Name'].'</option>';
}
?>

	<div id="filter-dialog">
		<div class="row">
			<div class="ten columns">
				<h4>Filter Arrests</h4>
			</div>
			<button id="filters-close-button" class="one columns">X</button>
		</div>
		<div class="row">
			<div id="filter-time-period-column" class="six columns filter-column">
				<div id="filter-date-section" class="filter-section">
					<div class="filter-section-title">
						Date Filters<span>0/4</span>
					</div>
					<div class="filter-section-content">
						<div class="filter-section-item" style="display:none;"><span>Date Range</span>
							<div class=" dateRangeControl">
								<span class="title">Date Range:</span>
								<button id="filter-daterange-input" name="dateRangeJquery"></button>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Month</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" id="filter-month-input" data-placeholder="Choose Months...">
							<option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Day of Week</span>
							<div class="filter-section-item">
								<div class="control-group">
									<div class="filter-radio-group">
										<label for="filter-dayofweek-input-mon">Mon</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-mon">
										<label for="filter-dayofweek-input-tues">Tues</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-tues">
										<label for="filter-dayofweek-input-wed">Wed</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-wed">
										<label for="filter-dayofweek-input-thur">Thurs</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-thur">
										<label for="filter-dayofweek-input-fri">Fri</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-fri">
										<label for="filter-dayofweek-input-sat">Sat</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-sat">
										<label for="filter-dayofweek-input-sun">Sun</label>
										<input type="checkbox" name="dayofweek" checked id="filter-dayofweek-input-sun">
									</div>
								</div>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Year to Date</span>
							<div class="control-group">
								<div class="filter-radio-group">
									<label for="filter-yeartodate-input">Year to Date</label>
									<input type="checkbox" name="filter-yeartodate-input" id="filter-yeartodate-input">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="filter-season-section" class="filter-section">
					<div class="filter-section-title">
						Season Filters<span>0/3</span>
					</div>
					<div class="filter-section-content">
						<div class="filter-section-item">
							<span>Season</span>
							<!--<div id="filter-season-slider"></div>-->
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Seasons..." id="filter-season-input">
							<?php print $season_options; ?>
						</select>
							</div>
						</div>
						<div class="filter-section-item"><span>On / Off Season</span>
							<div class="control-group">
								<div class="filter-radio-group">
									<label for="filter-seasonStatusOff-input">Off Season</label>
									<input type="checkbox" name="seasonStatus" checked id="filter-seasonStatusOff-input">
									<label for="filter-seasonStatusOn-input">Within Season</label>
									<input type="checkbox" name="seasonStatus" checked id="filter-seasonStatusOn-input">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="filter-attribute-column" class="six columns filter-column">
				<div id="filter-team-section" class="filter-section">
					<div class="filter-section-title">
						Team Filters
						<span>0/3</span>
					</div>
					<div class="filter-section-content">

						<div class="filter-section-item">
							<span>Team</span>.
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Teams..." id="filter-team-input">
							<?php print $team_options; ?>
						</select>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Conference</span>
							<div class="control-group">
								<div class="filter-radio-group">
									<label for="filter-conference-AFC-input">AFC</label>
									<input type="checkbox" name="filter-conference-input" checked id="filter-conference-AFC-input">
									<label for="filter-conference-NFC-input">NFC</label>
									<input type="checkbox" name="filter-conference-input" checked id="filter-conference-NFC-input">
								</div>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Division</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Divisions..." id="filter-division-input">
							<option>AFC East</option>
							<option>AFC North</option>
							<option>AFC South</option>
							<option>AFC West</option>
							<option>NFC East</option>
							<option>NFC North</option>
							<option>NFC South</option>
							<option>NFC West</option>
						</select>
							</div>
						</div>
					</div>
				</div>
				<div id="filter-crime-section" class="filter-section">
					<div class="filter-section-title">
						Crime Filters
						<span>0/2</span>
					</div>
					<div class="filter-section-content">
						<div class="filter-section-item">
							<span>Category</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Crime Categories..." id="filter-crime-category-input">
							<?php print $crime_category_options; ?>
						</select>
							</div>
						</div>
						<div class="filter-section-item">
							<span>Crimes</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Crimes..." id="filter-crime-input">
							<?php print $crime_options; ?>
						</select>
							</div>
						</div>
					</div>
				</div>
				<div id="filter-position-section" class="filter-section">
					<div class="filter-section-title">
						Position Filters<span>0/2</span>
					</div>
					<div class="filter-section-content">
						<div class="filter-section-item"><span>Position</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Choose Positions..." id="filter-position-input">
							<?php print $position_options; ?>
						</select>
							</div>
						</div>
						<div class="filter-section-item" style="display:none;"><span>Position Type</span>
							<div class="control-group">
								<div class="filter-radio-group">
									<label for="filter-position-type-input-o">Offense</label>
									<input type="checkbox" checked name="filter-position-type-input" id="filter-position-type-input-o">
									<label for="filter-position-type-input-d">Defense</label>
									<input type="checkbox" checked name="filter-position-type-input" id="filter-position-type-input-d">
									<label for="filter-position-type-input-s">Special</label>
									<input type="checkbox" checked name="filter-position-type-input" id="filter-position-type-input-s">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="filter-player-section" class="filter-section">
					<div class="filter-section-title">
						Player Filter<span>0/1</span>
					</div>
					<div class="filter-section-content">
						<div class="filter-section-item"><span>Search Player</span>
							<div class="control-group">
								<button class="filter-type-btn filter-include">Include</button>
								<select multiple class="filter-chosen-multi" data-placeholder="Search Players..." id="filter-player-input">
							<?php print $player_options; ?>
						</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="twelve columns" id="filters-button-row">
				<button id="filters-apply-button" class="button-primary">Apply</button>
				<button id="filters-clear-button">Clear</button>
				<button id="filters-cancel-button">Cancel</button>
			</div>
		</div>
	</div>