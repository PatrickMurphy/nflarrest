<h2>Manage Caches</h2>
<h3>Cache Database</h3>
<form id="addForm" method="post" action="index.php">
	<input type="submit" name="form_action" value="Incident Season" /> >
	<input type="submit" name="form_action" value="Incident Report" /> >
	<input type="submit" name="form_action" value="Recent Incidents" />
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