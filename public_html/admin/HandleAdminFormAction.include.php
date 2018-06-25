<?php
require_once('AdminDatabaseSetup.include.php');
if(isset($_POST['form_action'])){
	switch($_POST['form_action']){
		case 'add_arrest':
			$dataArray = array();
			$dataArray['Date'] = $_POST['Date'];
			$dataArray['Team'] = $_POST['Team'];
			$dataArray['Name'] = $_POST['Name'];
			$dataArray['Position'] = $_POST['Position'];
			$dataArray['Encounter'] = $_POST['Encounter'];
			$dataArray['Category'] = $_POST['Category'];
			$dataArray['Description'] = $_POST['Description'];
			$dataArray['Outcome'] = $_POST['Outcome'];
			$dataArray['general_category_id'] = $_POST['general_category_id'];
			$dataArray['legal_level_id'] = $_POST['legal_level_id'];
			$dataArray['resolution_category_id'] = $_POST['resolution_category_id'];

			$wasInsertSuccessful = $db->insert('arrest_stats', $dataArray);

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
