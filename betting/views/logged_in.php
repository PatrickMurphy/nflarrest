<?php include('views/components/logged_in_menu_header.php')?>
	<style>
		.value-cell{
		    background-color: #038fef;
			box-shadow: 0 1px 1px rgba(0,0,0,.58);
			padding: 1px 8px;
			border-radius: 10px;
			line-height: 24px;
			margin-top: 4px;
			float:right;
			color: #fff!important;
		}
		li:nth-child(even) {
			background-color: rgba(0,0,0,.055);
			border-radius:5px;
		}
	</style>
	<div class="five columns" style="height:70vh;">
		<div id="yourBetsDiv">
			<div class="row">
				<h4 class="seven columns">Your Bets</h4>
				<a href="#" id="viewPopularButton" class="five columns button">View Popular</a>
			</div>
			<ul id="betList"></ul>
		</div>
		<div id="popularDiv" style="display:none;">
			<div class="row">
				<h4 class="seven columns">Popular Bets</h4>
				<a href="#" id="yourBetsButton" class="five columns button">Your Bets</a>
			</div>
			<div class="row">
				<ol id="popTeams" class="six columns" start="0"><li style="list-style:none;font-weight:bold;">Teams:</li></ol>
				<ol id="popCrime" class="six columns" start="0"><li style="list-style:none;font-weight:bold;">Crimes:</li></ol>
			</div>
			<div class="row">
				<ol id="popPosition" class="six columns" start="0">
					<li style="list-style:none;font-weight:bold;">Postions:</li>
				</ol>
				<span id="popTime" class="six columns"></span>
			</div>
		</div>
	</div>
	<div class="four columns" style="margin-left:2vw;">
		<h4>Leaderboard</h4>
		<ol id="leaderboard">
		</ol>
	</div>
</div>
<div id="place_bet_window" style="position:absolute;width:46%;left:25%;padding:2%;padding-top:0px; top:10%; border-radius:5px;background:#bfbfbf;display:none;"><h4 style="border-radius:3px;width:100%; height:25px; line-height:25px; background:#4b4b4b; color:#fff;">Place Bet</h4>
	Choose a crime, team or position that you think the next NFL arrest will involve. Select 2 or 3 Criteria and you will could have a bigger pay out! Click the <b>Switch Bet Type</b> button to predict how many more days we will go without arrest.<br/><br/>
	<style type="text/css">
		#betform {
			margin-bottom:0px;
		}
		#betform span {
			font-weight:bold;
		}
		#betform select {
			width:100%;
		}
		#betform input[type='number'] {
			width:100%;
		}
	</style>
	<form id="betform">
		<div class="row">
			<div id="switchBetButton" class="button six columns offset-by-three" style="background:#dfdfdf;">Switch Bet Type</div>
		</div>
		<div class="row">
			<div class="seven columns">
				<span>Bet Amount: </span>
					<br />
					<input type="number" name="amount" value="0" id="amount" />
					<br/>
				<div id="guessBetForm">
				<span>Crime: </span>
					<br />
					<select name="crime" id="crime_select">
						<option value="no-choice">No Bet</option>
						<?php echo $crime_options; ?>
					</select>
					<br/>
				<span>Team: </span>
					<br />
					<select name="team" id="team_select">
						<option value="no-choice">No Bet</option>
						<?php echo $team_options; ?>
					</select>
					<br/>
				<span>Position: </span>
					<br />
					<select name="position" id="pos_select">
						<option value="no-choice">No Bet</option>
						<?php echo $pos_options; ?>
					</select>
					<br/>
			</div>
			<div style="display:none;" id="recordBetForm">
			<p style="margin-bottom:2px">Predict no arrests in the next <span style="font-weight:bold;" id="dayCountText">X number of</span> days.</p>
			<!-- <select id="recordDate" name="recordDays">
			</select> -->
            <span># of days: </span>
					<br />
			<input type="number" min="0" value="0" id="recordDays" name="recordDays" />
			</div>
			</div>

			<div class="five columns">
			<span>Results: </span>
					<br />
				Odds: <span id="place_bet_odds">??</span><br/>
				You could win: <span id="pot_winning">$0</span><br/>
			</div>
		</div>
		<div class="row">
			<input class="button six columns" style="background-color:#fff;border-color:#7b7b7b;" id="place_bet_cancel_btn" type="reset" value="Cancel" onClick="hidePlaceBet()"/>
			<input type="submit" name="sumbit" class="button button-primary six columns" id="submit_bet" value="Place Bet!" />
		</div>
	</form>
</div>
<script>
	var crimeNames = <?php echo $crime_json; ?>;
	var crimeOdds = <?php echo $crime_odds_json; ?>;
	var teamNames = <?php echo $team_json; ?>;
	var currCash = <?php echo $_SESSION['balance'];?>;

	var currBetType = true; // true == guess, false == record

	$('#switchBetButton').click(function(){
		currBetType = !currBetType;
		ga('send', 'event', 'betting', 'viewPlaceBetForm', 'switchType');
		if(currBetType){
			$('#guessBetForm').show();
			$('#recordBetForm').hide();
			// de select the record options

			$('#recordDays').val(0);
		}else{
			$('#guessBetForm').hide();
			$('#recordBetForm').show();
			$('#crime_select').val('no-choice');
			$('#team_select').val('no-choice');
			$('#pos_select').val('no-choice');
		}
		$('#place_bet_odds').html('??');
		$('#pot_winning').html('$'+($('#amount').val()));
	});

	function showPlaceBet(){
		//loadBetRecordDates();
		$('#place_bet_window').show();
        ga('send', 'event', 'betting', 'viewPlaceBetForm', 'showWindow');
	}

	function hidePlaceBet(){
		$('#place_bet_window').hide();
	}

	function calculateOdds(){
		if($('#amount').val() > currCash){
			$('#amount').val(currCash);
		}
		if($('#amount').val() <= 0){
			$('#amount').val(0);
		}
		if(currBetType){
			var odds = 1;
			if($('#crime_select').val() !== 'no-choice'){
				odds *= (14/1 + 1);
			}
			if($('#team_select').val() !== 'no-choice'){
				odds *= (32/1 + 1);
			}
			if($('#pos_select').val() !== 'no-choice'){
				odds *= (23/1 + 1);
			}
            if(odds == 1){
                odds = 0;
            }
			$('#place_bet_odds').html(odds + ' : 1');
			$('#pot_winning').html('$'+(odds * $('#amount').val()).toFixed(2));
		}else{
			var odds = 1;
			// calc record odds
			var days = $('#recordDays').val();
			if(days > 0){
			if (days > 7){
		            var prob = Math.exp(((days)*(0-1))/7.16);
		            odds = Math.floor(1/prob);
		            $('#place_bet_odds').html(odds + ' : 1');
		            $('#pot_winning').html('$'+(odds * $('#amount').val()).toFixed(2));
		         }else{
		            odds = 8-days; // 1 day = 1-7 odds, 7 days out = 1-1 odds
		            //tempOdds = 0 - tempOdds; // make negative for database storage
		            $('#place_bet_odds').html('1 : ' + odds);
		            $('#pot_winning').html('$'+(((1/odds)+1) * $('#amount').val()).toFixed(2));
		         }
		         }else{
		            $('#place_bet_odds').html('??');
		            $('#pot_winning').html('$0.00');
		         }

		}


	}

	function loadPopular(){
		$('#popCrime').html('<li style="list-style:none;font-weight:bold;">Crimes:</li>');
		$('#popTeams').html('<li style="list-style:none;font-weight:bold;">Teams:</li>');
		$('#popPosition').html('<li style="list-style:none;font-weight:bold;">Positions:</li>');
		$.getJSON('http://nflarrest.com/api/v1/bets/popular?limit=5', function(data){
			for(var teamid in data['team']){
				var team = data['team'][teamid];
				$('#popTeams').append("<li>"+team.teams_full_name+'<span class="value-cell">'+team.count+'</span></li>');
			}
			for(var crimeid in data['crime']){
				var crime = data['crime'][crimeid];
				$('#popCrime').append("<li>"+crime.Category+'<span class="value-cell">'+crime.count+'</span></li>');
			}
			for(var positionid in data['position']){
				var position = data['position'][positionid];
				$('#popPosition').append("<li>"+position.position_title+'<span class="value-cell">'+position.count+'</span></li>');
			}
			console.log(new Date(data['time'][0]['avg_date']*1000));
			console.log(data['time'][0]['avg_date']);
			var theDate = new Date(data['time'][0]['avg_date']*1000);
			$('#popTime').html('<b>Arrest Streak:</b><br />Average bet date: <b>'+(theDate.getMonth()+1)+'/'+theDate.getDate()+'/'+theDate.getFullYear()+'</b><br /><br /><b>Stats:</b><br />A total of <b>$'+data['betStats'][0]['total_amount']+'</b> has been bet by <b>' + data['betStats'][0]['total_users'] + '</b> Users.');
		});
	}
	function loadLeaders(){
		$.getJSON('http://nflarrest.com/api/v1/bets/leaderboard?limit=10', function(data){
			for(var key in data){
				var leader = data[key];
				$('#leaderboard').append("<li><a href=\"index.php?user="+leader.user_id+"\"><b>"+leader.user_name+"</b></a>&nbsp;&nbsp;&nbsp;&nbsp;$"+leader.balance+"</li>");
			}
		});
	}
	function loadBetRecordDates(){
		$.getJSON('http://nflarrest.com/api/v1/meter', function(data){
			//$('#recordDate').append("<option>No Selection</option>");
			for(var key in data){
				var leader = data[key];
				$('#recordDate').append("<option>No Selection</option>");
			}
		});
	}
	function loadBetList(){
		$('#betList').html('');
		$.getJSON('http://nflarrest.com/api/v1/bets/list', function(data){
			if(data.length <= 0){
				$('#betList').html('<li>No Bets! Use the <a href="javascript:showPlaceBet()" class="button button-primary">Place a New Bet</a> button to the left!</li>');
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
					$('#betList').append("<li><b>$"+bet.amount+"</b> on "+betTitle+" could win <b>$"+prize+"</b></li>");
				}
			}
		});
	}
	$(document).ready(function(){
		$('#amount').change(calculateOdds);
		$('#crime_select').change(calculateOdds);
		$('#team_select').change(calculateOdds);
		$('#pos_select').change(calculateOdds);
		$('#recordDays').change(function(){
            $('#dayCountText').html($('#recordDays').val());
            calculateOdds();
        });
		$('#betform').submit(function(e){
			e.preventDefault();
			function handle_response(resp){
				resp = $.parseJSON(resp);
				if(resp.submit == true){
					alert('bet placed');
					currCash -= $('#amount').val();
					hidePlaceBet();
					loadBetList();
					loadPopular();
                    ga('send', 'event', 'betting', 'placeBet', $('#amount').val());
				}else{
					alert('Bet could not be placed. Error: ' + resp.error);
				}
			}
			if($('#amount').val() > 0){
				if(currBetType){
					$.post('http://nflarrest.com/api/v1/bets/placeBet', {'amount':$('#amount').val(), 'crime':$('#crime_select').val(), 'team':$('#team_select').val(), 'position': $('#pos_select').val(), 'player':'no-choice'}, handle_response);
				}else{
					$.post('http://nflarrest.com/api/v1/bets/placeBet', {'amount':$('#amount').val(), 'recordDays':$('#recordDays').val()}, handle_response);
				}
			}else{
				alert('You did not wager any money!');
			}
		});

		$('#yourBetsButton').click(function(){
			$('#popularDiv').hide();
			$('#yourBetsDiv').show();
		});

		$('#viewPopularButton').click(function(){
			$('#yourBetsDiv').hide();
			$('#popularDiv').show();
		});

		loadBetList();
		loadLeaders();
		loadPopular();
	});
</script>
