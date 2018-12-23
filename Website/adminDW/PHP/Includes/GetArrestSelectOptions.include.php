<?php

require_once('PHP/Includes/AdminDatabaseSetup.include.php');

// GET HTML Select Options For Crimes, Teams, Legal Levels, Resolution_Categories

//team
$Team_list = gather_results($db3->query('SELECT * FROM dimTeam'));
$Team_options = "";
foreach($Team_list as $team){
	$Team_options .= '<option value="'.$team['TeamID'].'">'.$team['TeamCode'].' - '.$team['TeamDesc'].'</option>';
}
//player
$Player_list = gather_results($db3->query('SELECT * FROM dimPlayer'));
$Player_options = "";
foreach($Player_list as $row){
	$Player_options .= '<option value="'.$row['PlayerID'].'">'.$row['PlayerID'].' - '.$row['PlayerDesc'].'</option>';
}
//position
$Position_list = gather_results($db3->query('SELECT * FROM dimPosition'));
$Position_options = "";
foreach($Position_list as $row){
	$Position_options .= '<option value="'.$row['PositionID'].'">'.$row['PositionCode'].' - '.$row['PositionDesc'].'</option>';
}
//infraction
$Infraction_list = gather_results($db3->query('SELECT * FROM dimInfraction'));
$Infraction_options = "";
foreach($Infraction_list as $row){
	$Infraction_options .= '<option value="'.$row['InfractionID'].'">'.$row['InfractionCode'].' - '.$row['InfractionDesc'].'</option>';
}
?>
