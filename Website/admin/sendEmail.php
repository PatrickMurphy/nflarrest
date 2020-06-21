<?php
session_start();

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\SMTP;
require_once('PHPMailer/PHPMailer.php');
require_once('PHPMailer/Exception.php');
require_once('PHPMailer/OAuth.php');
//require_once('PHPMailer/POP3.php');
require_once('PHPMailer/SMTP.php');

error_reporting(E_STRICT | E_ALL);

if($_SESSION['auth'] != 1137){
    die('error');
}

date_default_timezone_set('Etc/UTC');

$mail = new PHPMailer;

$body = $_POST['mail_body'];

//$body = file_get_contents('contents.html');

$mail->isSMTP();
$mail->Host = 'mail.nflarrest.com';
$mail->SMTPAuth = true;
$mail->SMTPKeepAlive = true; // SMTP connection will not close after each email sent, reduces SMTP overhead
$mail->Port = 25;
$mail->Username = 'newsletter@nflarrest.com';
$mail->Password = 'FootballArrestSite';
$mail->setFrom('newsletter@nflarrest.com', 'NFLArrest.com');
$mail->addReplyTo('newsletter@nflarrest.com', 'NFLArrest.com');

$mail->Subject = $_POST['mail_subject'];

//Same body for all messages, so set this before the sending loop
//If you generate a different body for each recipient (e.g. you're using a templating system),
//set it inside the loop

//msgHTML also sets AltBody, but if you want a custom one, set it afterwards
$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!';

//Connect to the database and select the recipients from your mailing list that have not yet been sent to
//You'll need to alter this to match your database


require_once('db_config.php');

$mysql = mysqli_connect($db_info['host'], $db_info['user'], $db_info['password']);
mysqli_select_db($mysql, 'pmphotog_main');
$result = mysqli_query($mysql, 'SELECT DISTINCT email FROM `email_list` AS a JOIN `email_list_history` AS b ON a.id = b.id WHERE b.sent = FALSE LIMIT 50');

if(isset($_GET['test'])){
    $result = array();
    $result[0]['email'] = 'turnerp@cwu.edu';
}

foreach ($result as $row) {
    $mail->addAddress($row['email'], $row['email']);
    $mail->msgHTML($body . "\n<a href=\"http://nflarrest.com/EmailListUnsubscribe.php?token=".md5($row['email'])."\">Usubscribe from email list</a>");
    if (!$mail->send()) {
        echo "Mailer Error (" . str_replace("@", "&#64;", $row["email"]) . ') ' . $mail->ErrorInfo . '<br />';
        break; //Abandon sending
    } else {
        echo "Message sent to :" . $row['email'] . ' (' . str_replace("@", "&#64;", $row['email']) . ')<br />';
        //Mark it as sent in the DB
        mysqli_query(
            $mysql,
            "UPDATE email_list_history SET sent = TRUE WHERE email = '" .
            mysqli_real_escape_string($mysql, $row['email']) . "'"
        );
    }
    // Clear all addresses and attachments for next loop
    $mail->clearAddresses();
    $mail->clearAttachments();
}

if(count($result) == 0){
    print '<a href="sendEmail.php?reset_history=1">Reset all history records</a>';
}

if(isset($_GET['reset_history'])){
    $result = mysqli_query($mysql, 'UPDATE email_list_history SET sent = FALSE');    
}
?>