<?php
$tsstring = gmdate('D, d M Y H:i:s ', time() - (24 * 60 * 60)) . 'GMT';
$etag = $_GET['graph'] . $_GET['limit'] . $_GET['start_pos'] . $_GET['start_date'] . $_GET['end_date'];
$etag = md5($etag);

$if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false;

$if_none_match = isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] : false;
if(is_string($if_none_match)){
	$if_none_match = substr($if_none_match, 1, strlen($if_none_match) - 2);
}

$etagMatches = (($if_none_match && $if_none_match == $etag) || (!$if_none_match));

$timeTolerance = ($if_modified_since && ((strtotime($if_modified_since) - strtotime($tsstring)) < (12*60*60)));

if ($etagMatches && $timeTolerance)
{
    header('HTTP/1.1 304 Not Modified');
    exit();
}
else
{
		header('Content-Type: application/json');
    header("Last-Modified: $tsstring");
    header("ETag: \"{$etag}\"");
}
$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');

// Check if Restful API or Direct File query
if(isset($restful)){
	require_once('api.php');
}else{
	require_once('../api.php');
}

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ';
	if(isset($_GET['start_pos'])){
		$limit .= $_GET['start_pos'] . ', ';
	}
	$limit .= $_GET['limit'];
}

if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$date_range = "WHERE Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

if(isset($_GET['graph'])){
    $query = 'SELECT Year, Category, count(a.arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY a.Year, Category ORDER BY Year, Category DESC';
}else{
    $query = 'SELECT Year, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. prepare_filters() .' GROUP BY Year ORDER BY arrest_count DESC' . $limit;
}
$result = $db->query($query);

if(isset($_GET['graph'])){
	$teams_stats = [];
	$categories = [];

	foreach($result as $row){
			$team_stats[$row['Year']][$row['Category']] = $row['arrest_count'];
	}

	$result3 = $db->query('SELECT Category, count(a.arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY Category ORDER BY arrest_count DESC');
	$addOther = false;
	foreach($result3 as $row3){
		if(!in_array($row3['Category'], $categories)){
				if($row3['Category'] != 'Other'){
					$categories[] = $row3['Category'];
				}else{
					$addOther = true;
				}
			}
	}
	if($addOther){
		$categories[] = 'Other';
	}

    // get teams
    $result2 = $db->query('SELECT Year, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. $date_range .' GROUP BY Year ORDER BY arrest_count DESC' . $limit);

    $teams = [];
    $new_result['columns'][0][0] = 'x';
    foreach($categories as $cat){
        $new_result['columns'][$cat][0] = $cat;
    }
    foreach($result2 as $row2){
        $teams[$row2['Year']] = $row2['arrest_count'];
        $new_result['columns'][0][] = $row2['Year'];
        foreach($categories as $cat){
            $new_result['columns'][$cat][] = isset($team_stats[$row2['Year']][$cat])? $team_stats[$row2['Year']][$cat] : 0;
        }
    }
    $new_result['columns'] = array_values($new_result['columns']);
    $new_result['groups'] = $categories;
    print json_encode($new_result);
}else{
    print json_encode(gather_results($result));
}
