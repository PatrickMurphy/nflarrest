<?php
    if(isset($_GET['page_id'])){
        ob_start();
        $filename = '';
        $path_ext = '../api/'; // used in these files to allow this override of folder
        if($_GET['page_id']=='topLists'){
            include "../api/overall/topLists.php";
            $filename = '../api/overall/Cache/topLists.json';
        }else if($_GET['page_id']=='topTeams'){
            $_GET['graph'] = true;
            $_GET['cache'] = "false";
            $skip_cache = true;
            include "../api/overall/topTeams.php";
            $filename = '../api/overall/Cache/topTeams.json';
        }

        $contents = ob_get_contents();
        ob_end_clean();
        // save the file
        if(file_put_contents ($filename , $contents)){
            print 'Success ' . $_GET['page_id'] . '   ' . $filename;
        }else{
            print 'error';
        }
    }else{
        print 'Error: page_id(topTeams,topLists) not set';
    }
?>