<?php
require_once('PHP-Multi-SQL/classes/MySQL.class.php');

require_once('db_config.php');

$db = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], $db_info['db_name']);

$db2 = new MySQL($db_info['host'], $db_info['user'], $db_info['password'], 'pmphotog_main');

if($db == false || $db2 == false){
	die('DB connection error.');
}

function gather_results($result){
	$return_array = [];
	for($i = 0; $i < $result->num_rows; $i++){
		$return_array[] = $result->fetch_assoc();
	}
	return $return_array;
}

if(isset($_POST['form_action'])){
	switch($_POST['form_action']){
		case 'add_arrest':
			$dataArray = array();
			$dataArray['Date'] = $_POST['Date'];
			$dataArray['Team'] = $_POST['Team'];
			$dataArray['Name'] = $_POST['Name'];
			$dataArray['Position'] = $_POST['Position'];
			$dataArray['Encounter'] = $_POST['Encounter'];
			$dataArray['Category'] = $_POST['Category'];
			$dataArray['Description'] = $_POST['Description'];
			$dataArray['Outcome'] = $_POST['Outcome'];
			$dataArray['general_category_id'] = $_POST['general_category_id'];
			$dataArray['legal_level_id'] = $_POST['legal_level_id'];
			$dataArray['resolution_category_id'] = $_POST['resolution_category_id'];
			
			$wasInsertSuccessful = $db->insert('arrest_stats', $dataArray);
			
			$SuggestedEmail = '';
		break;
		case 'Cache SeasonState':
			$bool = $db->query('CALL `CacheArrestSeasonStateByArrest`();');
			print_r($bool);
		break;
		case 'Cache Arrests View':
			$bool = $db->query('CALL `CacheArrestsDateView`();');
		break;
		case 'Cache Last Arrests':
			$bool = $db->query('CALL `CacheLastArrests`();');
		break;
		case 'Send Email':
			$email_result = $db2->query('SELECT * FROM email_list');
			$email_list = gather_results($legal_result);
			foreach($email_list as $rcp) {
			   mail($rcp['email'], $_POST['email_subject'], $_POST['email_msg']);
			   sleep(rand(0,10));
			}
		break;
		default:
		break; 
	}
}

//sets the table that standard queries pull from
$DB_MAIN_TABLE = 'ArrestsCacheTable';

$crimes_result = $db->query('SELECT * FROM general_category');
$crime_categories = gather_results($crimes_result);
$crime_options = "";
foreach($crime_categories as $crime){
	$crime_options .= '<option value="'.$crime['general_category_id'].'">'.$crime['general_category_id'].' - '.$crime['Category'].'</option>';
}


$teams_result = $db->query('SELECT * FROM Team_details_view ORDER BY team_code ASC');
$teams_list = gather_results($teams_result);
$team_options = "";
foreach($teams_list as $team){
	$team_options .= '<option style="color:#'.$team['Team_hex_alt_color'].';background-color:#'.$team['Team_hex_color'].';" value="'.$team['team_code'].'">'.$team['team_code'].' - '.$team['Team_preffered_name'].'</option>';
}


$legal_result = $db->query('SELECT * FROM legal_level');
$legal_list = gather_results($legal_result);
$legal_options = "";
foreach($legal_list as $legal){
	$legal_options .= '<option value="'.$legal['legal_level_id'].'">'.$legal['legal_level_id'].' - '.$legal['Category'].'</option>';
}


$outcome_result = $db->query('SELECT * FROM resolution_category');
$outcome_list = gather_results($outcome_result);
$outcome_options = "";
foreach($outcome_list as $outcome){
	$outcome_options .= '<option value="'.$outcome['resolution_category_id'].'">'.$outcome['resolution_category_id'].' - '.$outcome['Category'].'</option>';
}

$email_list_result = $db2->query('SELECT referrer, count(1) as `total` FROM `email_list` GROUP BY referrer ORDER BY `total` DESC');
$email_list = gather_results($email_list_result);

$email_count_result = $db2->query('SELECT COUNT(DISTINCT(`email`)) as `total` FROM `email_list`');
$email_count = $email_count_result->fetch_assoc();
?>
    <div class="row">
        <div class="eight columns">
            <h3>Add Record:</h3>
            <form id="addForm" method="post" action="admin/index.php">
                <label>Date</label>
                <input type="date" name="Date" />
                <label>Team</label>
                <select name="Team">
                    <?php print $team_options; ?>
                </select>
                <label>Name</label>
                <input type="text" name="Name" />
                <label>Position</label>
                <input type="text" name="Position" />
                <label>Encounter</label>
                <input type="text" name="Encounter" value="Arrested" />
                <label>Category</label>
                <input type="text" name="Category" />
                <label>Description</label>
                <textarea name="Description"></textarea>
                <label>Outcome</label>
                <input type="text" name="Outcome" value="Resolution Undetermined." />
                <label>General Category</label>
                <select name="general_category_id">
                    <?php print $crime_options; ?>
                </select>
                <label>Legal Level</label>
                <select name="legal_level_id">
                    <?php print $legal_options; ?>
                </select>
                <label>Outcome Category</label>
                <select name="resolution_category_id">
                    <?php print $outcome_options; ?>
                </select>
                <br />
                <input type="hidden" name="form_action" value="add_arrest" />
                <input type="submit" name="submit" value="Add Arrest" class="button-primary" />
                <br />
            </form>
            <div>
                <form id="addForm" method="post" action="admin/index.php">
                    <input type="submit" name="form_action" value="Cache SeasonState" /> >
                    <input type="submit" name="form_action" value="Cache Arrests View" /> >
                    <input type="submit" name="form_action" value="Cache Last Arrests" />
                </form>
            </div>

            <div>
                <form action="admin/sendEmail.php" method="post" id="emailComposeForm">
                    <input type="text" name="mail_subject" value="NFL Arrest Update: " />
                    <textarea name="mail_body"></textarea>
                    <input type="submit" name="form_action" value="Send Email" />
                </form>
            </div>
            <div class="four columns">
                <h3>Cache Files:</h3>
                <a href="admin/CacheDetailPages.php?page_id=team" class="button">Team HTML</a> <a href="admin/CacheDetailPages.php?page_id=crime" class="button">Crime HTML</a> <a href="admin/CacheDetailPages.php?page_id=position" class="button">
Position HTML</a> <a href="admin/CacheDetailPages.php?page_id=player" class="button">Player HTML</a> <a href="admin/CacheJSON.php?page_id=topTeams&fast=32" class="button">Graph JSON</a> <a href="admin/CacheJSON.php?page_id=topLists&fast=32" class="button">Top List JSON</a>
            </div>
        </div>
        <div class="four columns" style="background-color:#f9f9f9; min-height:200px;">
            <h4>News</h4>
            <div id="newslist"></div>
            <div><a href="http://nflarrest.com/blog/admin.php" class="button">Blog Admin</a></div>
            <div id="email_list_stats">
                <h5>Email List: <?php print $email_count['total']; ?></h5>
                <ol>
                    <?php
		foreach($email_list as $email){
			print '<li>'.$email['referrer'] . ': ' . $email['total'].'</li>';
		}
		?>
                </ol>
            </div>
        </div>

    </div>
    <script type="text/javascript">
        $(function () {
            $.getJSON('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.google.com%2Falerts%2Ffeeds%2F10878572914104303077%2F17435386549487357803', function (data) {
                var cards = [];
                for (var i in data.items) {
                    var this_html = '<div style="background-color:#fff;box-shadow:0px 2px 2px #bbb; margin-bottom:5px;border-radius:4px;">';
                    this_html += '<a href="' + data.items[i].link + '">' + data.items[i].title + '</a><br />';
                    this_html += '<b>' + data.items[i].pubDate + '</b><br />';
                    this_html += '<p>' + data.items[i].description + '</p>';
                    this_html += '</div>';
                    cards.push(this_html);
                }
                $('#newslist').html(cards.join(''));
            });
        });
    </script>
