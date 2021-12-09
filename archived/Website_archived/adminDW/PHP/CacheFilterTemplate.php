<?php
    ob_start();
    include "../templates/FiltersTemplate_LoadOptions.php";
    $contents = ob_get_contents();
    ob_end_clean();
    // save the file
    $filename = '../templates/FiltersTemplateCache.html';

    if(file_put_contents ($filename , $contents)){
        print 'Success Filter Page Values Cached:   ' . $filename;
    }else{
        print 'error';
    }
?>
