<div class="row">
	<p>
		Welcome, <b><a href="index.php?user=<?php echo $_SESSION['user_id']; ?>"><?php echo $_SESSION['user_name']; ?></a></b> you have <span style="color:green;font-weight:bold;"><?php echo $_SESSION['balance']; ?></span> coins.
	</p>
</div>
<div class="row">
	<aside class="three columns">
		<h4>Menu</h4>
		<ul>
			<li style="list-style:none;"><a href="javascript:showPlaceBet()" class="button primary-button button-primary">Place a New Bet!</a></li>
			<br/>
			<li><a href="http://nflarrest.com/betting/">Betting Home</a></li>
			<li><a href="index.php?logout">Logout</a></li>
		</ul>
	</aside>
