<?php
	require('views/components/logged_in_menu_header.php');

?>
<div class="five columns">

	<h4>Bets</h4>
	<ul id="betList">
	</ul>
</div>
<div class="four columns" style="margin-left:2vw;">
		<!-- Array
(
    [0] => Array
        (
            [user_id] => 1
            [user_name] => PatrickMurphyPhoto
            [user_email] => turnerp@cwu.edu
            [balance] => 25.50
            [created] => 2015-11-30 14:17:53
            [last_login] => 1450556252
            [user_group] => 3
        )

)
 -->
	<?php
switch($userDetails['user_group']){
	case 1:
		$userType = 'Member';
	break;
	case 2:
		$userType = 'Moderator';
	break;
	case 3:
		$userType = 'Admin';
	break;
}
	?>
	<h4><?php print $userDetails['user_name']; ?></h4>
	<p><?php print $userType . '<br/>Balance: $' .$userDetails['balance'].'<br />User Since: '.$userDetails['created']; ?></p>
</div>
<div class="seven columns offset-by-one" id="comments"></div>
<?php require('views/components/logged_in_footer.php'); ?>
<script src="js/comments.js" defer></script>
<script>
var crimeNames = <?php echo $crime_json; ?>;
var crimeOdds = <?php echo $crime_odds_json; ?>;
var teamNames = <?php echo $team_json; ?>;
	function loadBetList(){
		$('#betList').html('');
		$.getJSON('http://nflarrest.com/api/v1/bets/list?user_id=<?php echo $userDetails['user_id'];?>', function(data){
			if(data.length <= 0){
				$('#betList').html('<li><?php print $userDetails['user_name']; ?> Has no bets placed!</li>');
			}else{
				for(var key in data){
					var bet = data[key];
					var betTitle = "";
					var sep = "";
                    if(bet.recordDate > 0){
                        var tempDate = new Date(bet.recordDate*1000);
                        betTitle = 'no arrests until after <b>' + (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear() + '</b>';
                    }else{
                        if(bet.crime>0){
                            betTitle += "crime <b>"+crimeNames[bet.crime]+"</b>";
                            var sep = " and ";
                        }
                        if(bet.player !== "no-choice"){
                            betTitle += sep+"player <b>"+bet.player+"</b>";
                            var sep = " and ";
                        }
                        if(bet.team !== "no-choice"){
                            betTitle += sep+"team <b>"+teamNames[bet.team]+"</b>";
                            var sep = " and ";
                        }
                        if(bet.position !== "no-choice"){
                            betTitle += sep+"position <b>"+bet.position+"</b>";
                        }
                    }
					var prize = 0;
					if(bet.odds > 0){
						// odds are odds - 1
						prize = (bet.odds*bet.amount);
					}else{
						// odds are 1 - odds
						$tempOdds = (1/Math.abs(bet.odds))+1;
						prize = ($tempOdds * bet.amount);
					}
					$('#betList').append("<li><?php print $userDetails['user_name']; ?> bet <b>$"+bet.amount+"</b> on "+betTitle+" and could win <b>$"+prize+"</b></li>");
				}
			}
		});
	}
	$(document).ready(function(){
		loadBetList();
	});
</script>
