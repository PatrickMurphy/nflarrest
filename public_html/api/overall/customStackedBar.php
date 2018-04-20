<?php
// cache
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


// Settings

// column options
$column_options['Year'] = 'Year';
$column_options['Month'] = 'Month';
$column_options['Day'] = 'Day_of_Week';
$column_options['DayOrder'] = 'Day_of_Week_int';
$column_options['Team'] = 'Team_preffered_name';
$column_options['Team Code'] = 'Team';
$column_options['Conference'] = 'Team_Conference';
$column_options['Division'] = 'Team_Conference_Division';
$column_options['Position'] = 'Position';
$column_options['Crime'] = 'Crime_category';
$column_options['Season'] = 'Season';
$column_options['SeasonState'] = 'ArrestSeasonState';
$column_options['Measure'] = 'arrest_count';
// for sorting
$direction_options['ASC'] = 'ASC';
$direction_options['DESC'] = 'DESC';

$measure = 'count(arrest_stats_id)';
$measure_column = 'arrest_count';
$bar_column = $column_options['Year'];
$stacks_column = $column_options['Division'];
$order_by_column = $column_options['Year'];
$order_by_direction = $direction_options['ASC'];
$bar_order_by_column = $order_by_column;
$bar_order_by_direction = $order_by_direction;
$legend_order_by_column = $order_by_column;
$legend_order_by_direction =  $direction_options['DESC'];

if(isset($_GET['measure_col']) && in_array($_GET['measure_col'],array_keys($column_options))){
	$measure = 'count('.$column_options[$_GET['measure_col']].')';
	$measure_column = $_GET['measure_col'] . "_count";
	$column_options['Measure'] = $measure_column;
}

if(isset($_GET['bar_col']) && in_array($_GET['bar_col'],array_keys($column_options))){
	$bar_column = $column_options[$_GET['bar_col']];
}

if(isset($_GET['stack_col']) && in_array($_GET['stack_col'],array_keys($column_options))){
	$stacks_column = $column_options[$_GET['stack_col']];
}

if(isset($_GET['order_col']) && in_array($_GET['order_col'],array_keys($column_options))){
	
	$order_by_column = $column_options[$_GET['order_col']];
}

if(isset($_GET['order_dir']) && in_array($_GET['order_dir'],array_keys($direction_options))){
	$order_by_direction = $direction_options[$_GET['order_dir']];
}

if(isset($_GET['bar_order_col']) && in_array($_GET['bar_order_col'],array_keys($column_options))){
	$bar_order_by_column = $column_options[$_GET['bar_order_col']];
}

if(isset($_GET['bar_order_dir']) && in_array($_GET['bar_order_dir'],array_keys($direction_options))){
	$bar_order_by_direction = $direction_options[$_GET['bar_order_dir']];
}

if(isset($_GET['legend_order_col']) && in_array($_GET['legend_order_col'],array_keys($column_options))){
	$legend_order_by_column = $column_options[$_GET['legend_order_col']];
}

if(isset($_GET['legend_order_dir']) && in_array($_GET['legend_order_dir'],array_keys($direction_options))){
	$legend_order_by_direction = $direction_options[$_GET['legend_order_dir']];
}


// create stacked bar chart data
// Pull main data from ArrestsDateView
// create stacked bar chart data
// Pull main data from ArrestsDateView
$query                      = 'SELECT '.$bar_column.',a.'.$stacks_column.', '.$measure.' AS '.$measure_column.' FROM '. $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$bar_column.', a.'.$stacks_column.' ORDER BY '.$order_by_column.' '.$order_by_direction;
$legends_categories_query   = 'SELECT '.$stacks_column.', '.$measure.' AS '.$measure_column.' FROM '.                   $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$stacks_column.' ORDER BY '.$legend_order_by_column.' '.$legend_order_by_direction;
$bar_group_query            = 'SELECT '.$bar_column.', '.$measure.' AS '.$measure_column.' FROM '.                      $DB_MAIN_TABLE.' AS a '. prepare_filters() .' GROUP BY '.$bar_column.' ORDER BY '.$bar_order_by_column.' '.$bar_order_by_direction.' ' . $limit;
$result = $db->query($query);
$bar_groups_result = $db->query($bar_group_query);
$legend_cats = $db->query($legends_categories_query);

$stacks = [];
$bar_groups = [];

// add each stack value
foreach($result as $main_row){
	$bar_id = $main_row[$bar_column];
	$stack_id = $main_row[$stacks_column];
        $stacks[$bar_id][$stack_id] = $main_row[$measure_column];
}

// get legend categories
foreach($legend_cats as $legend_row){
    if(!in_array($legend_row[$stacks_column], $bar_groups)){
        $bar_groups[] = $legend_row[$stacks_column];
    }
}


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
