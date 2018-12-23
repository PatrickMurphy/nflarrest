<?php
require_once('API.php');
//sets the table that standard queries pull from
$DB_MAIN_TABLE = 'fctIncidents';
$data = json_decode($_POST['postData']);
print_r(json_encode($data));


if(isset($data['form_action'])){
	switch($data['form_action']){
		case 'add_incident':
			$dataArray = array();
			$dataArray['Date'] = $data['Date'];
			$dataArray['TeamID'] = $data['TeamID'];
			$dataArray['PlayerID'] = $data['PlayerID'];
			$dataArray['PositionID'] = $data['PositionID'];
			$dataArray['InfractionID'] = $data['InfractionID'];
			
			$wasInsertSuccessful = $db->insert('fctIncidents', $dataArray);

			print json_encode(gather_results($wasInsertSuccessful));
			// add notes
			// add sources

			$SuggestedEmail = '';
		break;
	}
}
