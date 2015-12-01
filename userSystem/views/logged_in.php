<h1>NFLArrest Betting!</h1>
<div class="row">
	<p>
		Welcome, <b><?php echo $_SESSION['user_name']; ?></b> you have <span style="color:green;font-weight:bold;"><?php echo $_SESSION['balance']; ?></span> coins.
	</p>
</div>
<div class="row">
	<aside class="three columns">
		<h3>Menu</h3>
		<ul>
			<li><a href="#">Place a New Bet!</a></li>
			<br/>
			<li><a href="http://nflarrest.com">NFL Arrest Home</a></li>
			<li><a href="index.php?logout">Logout</a></li>
		</ul>
	</aside>
	<div class="five columns">
		<h3>Your Bets</h1>
		<ul id="betList">
		</ul>
	</div>
	<div style="four columns">
		<h3>Leaderboard</h1>
		<ol id="leaderboard">
		</ol>
	</div>
</div>
<script>
	$(document).ready(function(){
		$.getJSON('http://nflarrest.com/api/v1/bets/leaderboard', function(data){
			for(var key in data){
				var leader = data[key];
				$('#leaderboard').append("<li><a href=\"user.php?userid="+leader.user_id+"\">"+leader.user_name+"</a>&nbsp;&nbsp;&nbsp;&nbsp;$"+leader.balance+"</li>");
			}
		});
		$.getJSON('http://nflarrest.com/api/v1/bets/list', function(data){
			if(data.length <= 0){
				$('#betList').html('<li>No Bets! Use the <a href="#">Place a New Bet</a> link to the left!</li>');
			}else{
				for(var key in data){
					var bet = data[key];
					var betTitle = "On ";
					var sep = "";
					if(bet.crime>0){
						betTitle += "crime <b>"+bet.crime+"</b>";
						var sep = " and ";
					}
					if(bet.player !== "no-choice"){
						betTitle += sep+"player <b>"+bet.player+"</b>";
						var sep = " and ";
					}
					if(bet.team !== "no-choice"){
						betTitle += sep+"team <b>"+bet.team+"</b>";
						var sep = " and ";
					}
					if(bet.position !== "no-choice"){
						betTitle += sep+"position <b>"+bet.position+"</b>";
					}
					var prize = (bet.odds*bet.amount)+parseInt(bet.amount);
					$('#betList').append("<li><b>$"+bet.amount+"</b> on "+betTitle+" could win <b>$"+prize+"</b></li>");
				}
			}
		});
	});
</script>
