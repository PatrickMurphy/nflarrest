<?php
require_once('PHP/Includes/AdminDatabaseSetup.include.php');
if(isset($_POST['form_action'])){
	switch($_POST['form_action']){
		case 'add_arrest':
			$dataArray = array();
			$dataArray['Date'] = $_POST['Date'];
			$dataArray['TeamID'] = $_POST['TeamID'];
			$dataArray['PlayerID'] = $_POST['PlayerID'];
			$dataArray['PositionID'] = $_POST['PositionID'];
			$dataArray['InfractionID'] = $_POST['InfractionID'];
			
			$wasInsertSuccessful = $db->insert('fctIncidents', $dataArray);

			// add notes
			// add sources

			$SuggestedEmail = '';
		break;
		case 'Cache SeasonState':
			$bool = $db->query('CALL `CacheArrestSeasonStateByArrest`();');
			print_r($bool);
		break;
		case 'Cache Arrests View':
			$bool = $db->query('CALL `CacheArrestsDateView`();');
		break;
		case 'Cache Last Arrests':
			$bool = $db->query('CALL `CacheLastArrests`();');
		break;
		case 'Send Email':
			$email_result = $db2->query('SELECT * FROM email_list');
			$email_list = gather_results($legal_result);
			foreach($email_list as $rcp) {
			   mail($rcp['email'], $_POST['email_subject'], $_POST['email_msg']);
			   sleep(rand(0,10));
			}
		break;
		default:
		break;
	}
}

?>
