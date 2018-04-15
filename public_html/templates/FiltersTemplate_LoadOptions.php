<?php
require_once('PHP-Multi-SQL/classes/MySQL.class.php');
require_once('db_config.php'); 

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

if($db == false){
	die('DB connection error.'); 
}

function gather_results($result){ 
	$return_array = []; 
	for($i = 0; $i < $result->num_rows; $i++){
		$return_array[] = $result->fetch_assoc();
	}
	return $return_array; 
}

 //sets the table that standard queries pull from 
$DB_MAIN_TABLE = 'ArrestsCacheTable';

$crimes_result = $db->query('SELECT * FROM general_category');
$crime_categories = gather_results($crimes_result);
$crime_options = "";
foreach($crime_categories as $crime){
	$crime_options .= '<option value="'.$crime['general_category_id'].'">'.$crime['general_category_id'].' - '.$crime['Category'].'</option>';
}


$teams_result = $db->query('SELECT * FROM Team_details_view ORDER BY team_code ASC');
$teams_list = gather_results($teams_result);
$team_options = "";
foreach($teams_list as $team){
	$team_options .= '<option style="color:#'.$team['Team_hex_alt_color'].';background-color:#'.$team['Team_hex_color'].';" value="'.$team['team_code'].'">'.$team['team_code'].' - '.$team['Team_preffered_name'].'</option>';
}


$legal_result = $db->query('SELECT * FROM legal_level');
$legal_list = gather_results($legal_result);
$legal_options = "";
foreach($legal_list as $legal){
	$legal_options .= '<option value="'.$legal['legal_level_id'].'">'.$legal['legal_level_id'].' - '.$legal['Category'].'</option>';
}


$outcome_result = $db->query('SELECT * FROM resolution_category');
$outcome_list = gather_results($outcome_result);
$outcome_options = "";
foreach($outcome_list as $outcome){
	$outcome_options .= '<option value="'.$outcome['resolution_category_id'].'">'.$outcome['resolution_category_id'].' - '.$outcome['Category'].'</option>';
}
?>

	<div class="row">
		<div class="eight columns">
			<div class="twelve columns">
				<h3>Add Record:</h3>
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
				</form>
