<?php
require_once('../api.php');

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ' . $_GET['limit'];
}
$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$date_range = "WHERE Date BETWEEN '" . $start . "' AND '" . $end . "' ";
}

if(isset($_GET['graph'])){
    $query = 'SELECT Team, b.Category, count(a.arrest_stats_id) AS arrest_count FROM `arrest_stats` AS a, `general_category` AS b WHERE (Date BETWEEN \'' . $start . "' AND '" . $end . '\') AND a.general_category_id = b.general_category_id GROUP BY a.Team, b.Category ORDER BY Team, b.Category DESC';
}else{
    $query = 'SELECT Team, count(arrest_stats_id) AS arrest_count FROM `arrest_stats` '. $date_range .'GROUP BY Team ORDER BY arrest_count DESC' . $limit;
}
$result = $db->query($query);

if(isset($_GET['graph'])){
    $teams_stats = [];
    $categories = [];
    foreach($result as $row){
        if(!in_array($row['Category'], $categories)){
            $categories[] = $row['Category'];
        }
        $team_stats[$row['Team']][$row['Category']] = $row['arrest_count'];
    }
    // get teams
    $result2 = $db->query('SELECT Team, count(arrest_stats_id) AS arrest_count FROM `arrest_stats` '. $date_range .'GROUP BY Team ORDER BY arrest_count DESC' . $limit);

    $teams = [];
    $new_result['columns'][0][0] = 'x';
    foreach($categories as $cat){
        $new_result['columns'][$cat][0] = $cat;
    }
    foreach($result2 as $row2){
        $teams[$row2['Team']] = $row2['arrest_count'];
        $new_result['columns'][0][] = $row2['Team'];
        foreach($categories as $cat){
            $new_result['columns'][$cat][] = isset($team_stats[$row2['Team']][$cat])? $team_stats[$row2['Team']][$cat] : 0;
        }
    }
    $new_result['columns'] = array_values($new_result['columns']);
    $new_result['groups'] = $categories;
    print json_encode($new_result);
}else{
    print json_encode(gather_results($result));
}


