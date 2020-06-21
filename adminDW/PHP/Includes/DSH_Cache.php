<h2>Caches</h2>
<form id="addForm" method="post" action="index.php">
	<input type="submit" name="form_action" value="Cache SeasonState" /> >
	<input type="submit" name="form_action" value="Cache Arrests View" /> >
	<input type="submit" name="form_action" value="Cache Last Arrests" />
</form>

<h3>Cache Files</h3>
<p>
	<a href="PHP/CacheDetailPages.php?page_id=team" class="button">Team HTML</a>
	<a href="PHP/CacheDetailPages.php?page_id=crime" class="button">Crime HTML</a>
	<a href="PHP/CacheDetailPages.php?page_id=position" class="button">Position HTML</a>
	<a href="PHP/CacheDetailPages.php?page_id=player" class="button">Player HTML</a>
	<a href="PHP/CacheJSON.php?page_id=topTeams&fast=32" class="button">Graph JSON</a>
	<a href="PHP/CacheJSON.php?page_id=topLists&fast=32" class="button">Top List JSON</a>
</p>