<?php

require_once('AdminDatabaseSetup.include.php');

// GET HTML Select Options For Crimes, Teams, Legal Levels, Resolution_Categories
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
