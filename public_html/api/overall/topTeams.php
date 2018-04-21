<?php
// cache
$tsstring = gmdate('D, d M Y H:i:s ', time() - (24 * 60 * 60)) . 'GMT';
$etag = $_GET['graph'] . $_GET['limit'] . $_GET['start_pos'] . $_GET['start_date'] . $_GET['end_date'];
$etag = md5($etag);

if(!isset($path_ext)){
    $path_ext = '../';
}

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

if(!isset($skip_cache)){
    $skip_cache = false;
}

$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
if($start == '2000-01-01' && $end == date('Y-m-d') && isset($_GET['graph']) && $skip_cache){
		$filename = 'cache.json';
		if (file_exists($filename)) {
			$modTime = filemtime($filename);
			$cacheAge = time() - $modTime;
			$cacheExpired = $cacheAge > 60;//(60*60)*23; // greater than 12 hours old
		}
		if(!isset($_GET['cache'])){
			if($cacheExpired){
				include('cachegraph.php');
				// continue to logic bellow to get fresh data from the database
			}else{
				$cachefile = file_get_contents('cache.json', true);
				die($cachefile);
			}
		}
	}

if(isset($restful)){
	require_once('api.php');
}else{
	require_once($path_ext.'api.php');
}

$limit = '';
$date_range = '';

// setup limit
if(isset($_GET['limit'])){
	$limit = ' LIMIT ';
	if(isset($_GET['start_pos'])){
		$limit .= $_GET['start_pos'] . ', ';
	}
	$limit .= $_GET['limit'];
}

// setup date parameters
if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$date_range = "WHERE Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

if(isset($_GET['graph'])){
// Settings

$bar_column = 'Team';
$measure = 'count(a.arrest_stats_id)';
$measure_column = 'arrest_count';
$stacks_column = 'Crime_category';
$order_by_column = 'arrest_count';
$order_by_direction = "DESC";

// create stacked bar chart data
// Pull main data from ArrestsDateView
$query                      = 'SELECT '.$bar_column.',a.'.$stacks_column.', '.$measure.' AS '.$measure_column.' FROM '. $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$bar_column.', a.'.$stacks_column.' ORDER BY '.$order_by_column.' '.$order_by_direction;
$legends_categories_query   = 'SELECT '.$stacks_column.', '.$measure.' AS '.$measure_column.' FROM '.                   $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$stacks_column.' ORDER BY '.$order_by_column.' '.$order_by_direction;
$bar_group_query            = 'SELECT '.$bar_column.', '.$measure.' AS '.$measure_column.' FROM '.                      $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$bar_column.' ORDER BY '.$order_by_column.' '.$order_by_direction.' ' . $limit;
$result = $db->query($query);

$stacks = [];
$bar_groups = [];

// add each stack value
foreach($result as $main_row){
	$bar_id = $main_row[$bar_column];
	$stack_id = $main_row[$stacks_column];
        $stacks[$bar_id][$stack_id] = $main_row[$measure_column];
}

// get legend categories
$legend_cats = $db->query($legends_categories_query);
foreach($legend_cats as $legend_row){
    if(!in_array($legend_row[$stacks_column], $bar_groups)){
        $bar_groups[] = $legend_row[$stacks_column];
    }
}

// get bars
$bar_groups_result = $db->query($bar_group_query);

//$teams = [];
$new_result = array();
$new_result['columns'][0][0] = 'x';


foreach($bar_groups as $cat){
    $new_result['columns'][$cat][0] = $cat;
}

foreach($bar_groups_result as $bar_row){
    //$teams[$bar_row[$bar_column]] = $bar_row[$measure_column];
    $new_result['columns'][0][] = $bar_row[$bar_column];
    foreach($bar_groups as $cat){
        $new_result['columns'][$cat][] = isset($stacks[$bar_row[$bar_column]][$cat]) ? $stacks[$bar_row[$bar_column]][$cat] : 0;
    }
}

// setup and send
$new_result['columns'] = array_values($new_result['columns']);
$new_result['groups'] = $bar_groups;
print json_encode($new_result);
}else{
    $query = 'SELECT Team, Team_preffered_name,Team_name, Team_city, Team_Conference, Team_Conference_Division, Team_logo_id, count(arrest_stats_id) AS arrest_count FROM '.$DB_MAIN_TABLE.' '. $date_range .' GROUP BY Team, Team_preffered_name,Team_name, Team_city, Team_Conference, Team_Conference_Division, Team_logo_id ORDER BY arrest_count DESC' . $limit;
    $result = $db->query($query);
    print json_encode(gather_results($result));
}
