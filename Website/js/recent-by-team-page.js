$(window).load(function () {
	loadRecentArrests();
	loadingFinished();
});

function loadingFinished() {
	setupFacebook();
	setupTwitter();
	$('#newsletterForm').submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: 'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
			type: 'POST',
			data: {
				'email': $('input[name=email]').val()
			}
		});
		$('#newsletterForm').html('<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>');
		googleTracking.sendTrackEvent('Email List', 'Subscribe');
	});
	$('#newsletterForm input[name=email]').focus(function () {
		googleTracking.sendTrackEvent('Email List', 'Focus');
	});
};

function loadRecentArrests() {
	var animate = true;
	var alltime;
	var arrest_view_mode = 0;
	if (mobileCheck())
		arrest_view_mode = 1; // if mobile use cards
	var items = [];
	$.getJSON('api/v1/lastArrestByTeam', function (data) {
		for (var id in data) {
			var row = data[id];
			if (arrest_view_mode == 0) {
				items.push(renderArrestRow(row));
			} else if (arrest_view_mode == 1) {
				items.push(renderArrestCard(row));
			}
		}
		if (arrest_view_mode == 0) {
			items.unshift(renderArrestTableHeader());
			items.unshift('<table id="recent-arrests-table">');
			items.push('</table>');
		}
		$('#recentArrestContainer').html(items.join());
	});
}

function renderArrestTableHeader() {
	return '<tr><th>Days Since:</th><th>Team:</th><th>Player Name:</th><th>Position:</th><th>Crime:</th><th>Description:</th></tr>';
}

function renderArrestCard(row) {
	var card = ['<div class="card arrest_card">'];
	card.push('<span class="date_item" title="' + row['Date'] + '">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</span>');
	card.push('<span class="name_item">' + row['Name'] + '</span>');
	card.push("<br />");
	card.push('<span class="crime_item" style="background-color:#' + row['Crime_category_color'] + '"><a href="crime/' + row['Category'] + '">' + row['Category'] + "</a> </span>");
	card.push('<span class="team_item ' + row['Team'] + '" style="background-color:#' + row['Team_hex_color'] + ';"><a href="team/' + row['Team'] + '" style="color:#' + row['Team_hex_alt_color'] + ';" >' + row['Team_preffered_name'] + '</a></span>');
	card.push('<br />');
	card.push('<span class="description_item">' + row['Description'] + '</span>'); // .substring(0,n)
	card.push('<span class="outcome_item">' + row['Outcome'] + '</span>');
	card.push('</div>');
	//var card2 = ;
	//console.log(card2);
	return card.join('');
}

function renderArrestRow(row) {
	var rowHTML = ['<tr>'];
	rowHTML.push('<td><span class="value-cell">' + row['DaysSince'] + '</span></td>');
	rowHTML.push('<td><a href="team/' + row['Team'] + '/">' + row['Team_name'] + '</a></td>');
	rowHTML.push('<td><a href="player/' + row['Name'] + '/">' + row['Name'] + '</a></td>');
	rowHTML.push('<td><a href="position/' + row['Position'] + '/">' + row['Position'] + '</a></td>');
	rowHTML.push('<td><a href="crime/' + row['Category'] + '/">' + row['Category'] + '</a></td>');
	rowHTML.push('<td>' + row['Description'] + '</td>');
	rowHTML.push('</tr>');
	return rowHTML.join();
}
