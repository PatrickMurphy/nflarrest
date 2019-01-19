<?php
    ob_start();
    include "../templates/CompareTeamsTemplate.php";
    $contents = ob_get_contents();
    ob_end_clean();
    // save the file
    $filename = '../CompareTeamsCache.html';

    if(file_put_contents ($filename , $contents)){
        print 'Success Compare Teams Cached:   ' . $filename;
    }else{
        print 'error';
    }
?>
