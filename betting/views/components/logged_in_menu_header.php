<div class="row">
	<p>
		Welcome, <b><?php echo $_SESSION['user_name']; ?></b> you have <span style="color:green;font-weight:bold;"><?php echo $_SESSION['balance']; ?></span> coins.
	</p>
</div>
<div class="row">
	<aside class="three columns">
		<h4>Menu</h4>
		<ul>
			<li><a href="javascript:showPlaceBet()" class="button primary-button button-primary">Place a New Bet!</a></li>
			<br/>
			<li><a href="http://nflarrest.com">NFL Arrest Home</a></li>
			<li><a href="index.php?logout">Logout</a></li>
		</ul>
	</aside>
