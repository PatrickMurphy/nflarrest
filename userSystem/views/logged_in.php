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
			<li><a href="#">View your bets!</a></li>
			<li><a href="#">Leaderboards!</a></li>
			<br/>
			<li><a href="http://nflarrest.com">NFL Arrest Home</a></li>
			<li><a href="index.php?logout">Logout</a></li>
		</ul>
	</aside>
	<div class="five columns">
		<h3>Your Bets</h1>
		<ul>
			<li>No Bets! Use the <a href="#">Place a New Bet</a> link to the left!</li>
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
	});
</script>
