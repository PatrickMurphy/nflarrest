<?php
    ob_start();
    include "../templates/DetailPageRouter.php";
    $contents = ob_get_contents();
    ob_end_clean();
    // save the file
    $filename = '';
    switch($_GET['page_id']){
        case 'team':
            $filename = '../TeamCache.html';
            break;
        case 'player':
            $filename = '../PlayerCache.html';
            break;
        case 'crime':
            $filename = '../CrimeCache.html';
            break;
        case 'position':
            $filename = '../PositionCache.html';
            break;
    }

    if(file_put_contents ($filename , $contents)){
        print 'Success ' . $_GET['page_id'] . '   ' . $filename;
    }else{
        print 'error';
    }
?>
