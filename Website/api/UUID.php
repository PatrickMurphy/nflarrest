<?php
session_start();
//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header( "Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS" );
print'[]';
/*require_once('googleMeasurementProtocol.php');
if(!array_key_exists('UUIDCID', $_SESSION)){
    $_SESSION['UUIDCID'] = gaGenUUID();
}
print json_encode(array("UUID"=>$_SESSION['UUIDCID']));

if(isset($_GET['debug']))
	print GetClientIP(TRUE);
*/
?>
