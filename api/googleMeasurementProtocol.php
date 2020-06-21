<?php
function sendGAHit ($params){

  $query_string = http_build_query($params);
  $url = "www.google-analytics.com/collect?". $query_string;

  // send hit to GA
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
  curl_setopt($ch, CURLOPT_POST,           1 );
  curl_setopt($ch, CURLOPT_POSTFIELDS,     $query_string ); 
  $response = curl_exec($ch);
  //$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
}

// Generate UUID v4 function - needed to generate a CID when one isn't available
function gaGenUUID() {
  return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    // 32 bits for "time_low"
    mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

    // 16 bits for "time_mid"
    mt_rand( 0, 0xffff ),

    // 16 bits for "time_hi_and_version",
    // four most significant bits holds version number 4
    mt_rand( 0, 0x0fff ) | 0x4000,

    // 16 bits, 8 bits for "clk_seq_hi_res",
    // 8 bits for "clk_seq_low",
    // two most significant bits holds zero and one for variant DCE1.1
    mt_rand( 0, 0x3fff ) | 0x8000,

    // 48 bits for "node"
    mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
  );
}

function GetClientIP($validate = False){
  $ipkeys = array(
  'REMOTE_ADDR', 
  'HTTP_CLIENT_IP', 
  'HTTP_X_FORWARDED_FOR', 
  'HTTP_X_FORWARDED', 
  'HTTP_FORWARDED_FOR', 
  'HTTP_FORWARDED', 
  'HTTP_X_CLUSTER_CLIENT_IP'
  );

  /*
  now we check each key against $_SERVER if contain such value
  */
  $ip = array();
  foreach($ipkeys as $keyword){
    if( isset($_SERVER[$keyword]) ){
      if($validate){
        if( ValidatePublicIP($_SERVER[$keyword]) ){
          $ip[] = $_SERVER[$keyword];
        }
      }else{
        $ip[] = $_SERVER[$keyword];
      }
    }
  }

  $ip = ( empty($ip) ? 'Unknown' : implode(", ", $ip) );
  return $ip;

}
function ValidatePublicIP($ip){
  if(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
    return true;
  }
  else {
    return false;
  }
} 
   
    ?>