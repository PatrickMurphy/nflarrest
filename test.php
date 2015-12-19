$results2 = gather_results($db->query('SELECT `team_code`,`teams_full_name`,`city` FROM `teams` WHERE `teams_id` < 36 ORDER BY `team_code`'));
	$team_options = '';
	$team_json = '{';
	foreach($results2 as $team){
		$team_options .= '<option value="'.$team['team_code'].'" title="'.$team['team_code'].'" >'.$team['team_code'].' - '.$team['teams_full_name'].'</option>';
		$team_json .= $team['team_code'].':"'.$team['teams_full_name'].'",';
	}
	$team_json = rtrim($team_json, ",");
	$team_json .= '}';
