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

	$("#tabs").tabs(); //.addClass("ui-tabs-vertical ui-helper-clearfix");
	//$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
});
