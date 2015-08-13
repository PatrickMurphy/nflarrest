<?php
require_once('../api.php');

$limit = '';
$date_range = '';

if(isset($_GET['limit'])){
	$limit = ' LIMIT ';
	if(isset($_GET['start_pos'])){
		$limit .= $_GET['start_pos'] . ', ';
	}
	$limit .= $_GET['limit'];
}

$start = isset($_GET['start_date']) ? $_GET['start_date'] : '2000-01-01';
	$end = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-d');
if(isset($_GET['start_date']) || isset($_GET['end_date'])){
	$date_range = "WHERE Date BETWEEN '" . $start . "' AND '" . $end . "' ";
	if($start == '2000-01-01' && $end == date('Y-m-d')){
		die('{"columns":[["x","MIN","DEN","CIN","TB","TEN","JAC","IND","CHI","KC","MIA","CLE","SD","BAL","PIT","NO","SEA","GB","SF","OAK","WAS","ATL","ARI","CAR","NE","BUF","DET","DAL","NYJ","PHI","NYG","HOU","STL","Free "],["DUI","17","11","9","10","10","7","8","10","10","8","6","9","7","2","7","10","2","12","6","8","4","4","6","3","4","5","3","3",0,"3","4","4",0],["Drugs","3","2","3","4","3","5","4","5","2","2","5","2","5","4",0,"2","7",0,"3","1","3","3","3","4","2","4","2","4","3","2","1","1",0],["Domestic Violence","3","11","5","4","4",0,"2","1","4","7","1","2","2","5","3","6","3","2","2","1","3","6","3","2",0,"3","1","2",0,0,"1","2",0],["Assault \/ Battery","8","4","8","3","3","1","1","7","3","7","3","6","4","1","2","1","2","1","2","1","1","1","3","3","1","1","1","2","2","1","1","2","1"],["Gun","2","3","4","4","1","4","5","2",0,0,"5","2",0,0,"1",0,"2","2","2","1",0,"1","3","1","1","1","1","3","1","1",0,0,0],["License \/ Traffic","1","4","1","1","5","5","1","3",0,"2","2","1",0,0,"4",0,0,0,0,"5","2",0,0,0,"3",0,"1","1",0,0,"1","1",0],["Alcohol","1","1","3","2","1","2","6",0,"3","2",0,"2","1","4","2",0,"1","2","2","3",0,0,0,0,0,"1","3",0,0,"1","1",0,0],["Disorderly conduct","3","3","3","3","1","4","3",0,"2",0,"2",0,"3","3",0,"2",0,"1",0,0,"1","1",0,"1","1",0,"1","1","2",0,0,0,"1"],["Obstruction\/Resisting","2",0,"2","1","1",0,0,"1",0,0,"1","1",0,"1","2",0,0,0,0,0,"1","1",0,"2","1","1",0,0,"1",0,"2",0,0],["Theft \/ Burglary",0,0,"2","1","1","1",0,"1","4",0,"1",0,0,0,"1","1",0,0,"1",0,"1","1",0,0,0,"2","1",0,0,0,"1",0,0],["Sex","5","1",0,"1","1",0,0,0,0,0,0,0,0,0,0,"1","2",0,"1","1",0,0,0,0,"1",0,0,"1",0,0,0,0,0],["Animal Abuse",0,0,0,0,0,0,0,0,0,0,0,0,"1",0,0,0,0,0,0,0,"3",0,0,0,0,0,0,0,"3","1",0,0,0],["Murder \/ Manslaughter",0,0,0,0,0,0,0,0,"1",0,"2",0,"1",0,"1",0,0,0,0,0,0,0,0,"1",0,0,"1",0,0,"1",0,0,0],["Other","3","5","3","1","3","3","2","1","1","2","1","1","1","4","1",0,"2","1","2",0,"1","1","1","1","4",0,"2",0,"3","4",0,"2","1"]],"groups":["DUI","Drugs","Domestic Violence","Assault \/ Battery","Gun","License \/ Traffic","Alcohol","Disorderly conduct","Obstruction\/Resisting","Theft \/ Burglary","Sex","Animal Abuse","Murder \/ Manslaughter","Other"]}');
	}
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
			$team_stats[$row['Team']][$row['Category']] = $row['arrest_count'];
	}

	$result3 = $db->query('SELECT b.Category, count(a.arrest_stats_id) AS arrest_count FROM `arrest_stats` AS a, `general_category` AS b WHERE (Date BETWEEN \'' . $start . "' AND '" . $end . '\') AND a.general_category_id = b.general_category_id GROUP BY b.Category ORDER BY arrest_count DESC');
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


