<?php
session_start();
$error = false;
	if(isset($restful)){
		$mod = '';
	}else{
		// in sub folder inlcude stuff from one up
		$mod = '../';
	}

		require_once($mod.'api.php');
		require_once($mod."../betting/config/db.php");
		require_once($mod."../betting/classes/Login.php");

$login = new Login();

if ($login->isUserLoggedIn() == true) {
	//{"userid":,"amount":"10","odds":"0.03125","crime":"-1","player":"no-choice","team":"min","position":"no-choice","active":"1","date_placed":"2015-11-30 20:23:43"}

    if(isset($_POST['comment'])){
        // set userid and check balance
        $newComment['comment_sender'] = $_SESSION['user_id'];

        //if(isset($_POST['type'])){    }

        if(strlen($_POST['comment'])<=1000){
            $newComment['comment_msg'] = $_POST['comment'];    
        }else{
            $error = '{"submit":false, error:"Comment was to long, 1000 char. limit"}';
            die($error);
        }

        // check amount param
        if(isset($_POST['target']) && is_numeric($_POST['target'])){
            $newComment['comment_target'] = $_POST['target'];
        }else{
            $error = '{"submit":false, error:"No target was set"}';
            die($error);
        }
		$result = $db->insert('comments', $newComment);
        
		if($result > 0 && $result != false){
			print '{"submit":true}';
		}else{
			print '{"submit":false, error:"undefined error, could not process query"}';
		}
    }else if(isset($_GET['target']) && is_numeric($_GET['target'])){
        // return comments
        $commentResult = $db->query('SELECT comment_id, comment_sender, users.user_name, users.user_group, comment_msg, comment_date FROM `comments` LEFT JOIN `users` ON comments.comment_sender = users.user_id WHERE comment_target='.$_GET['target']);
        // comments joined at the sender profile
        print json_encode(gather_results($commentResult));
    }else{
        print '{"error": "No target supplied"}';        
    }
}else{
	$error = 'not authorized';
	print '{"submit":false,"error":"'.$error.'"}';
}