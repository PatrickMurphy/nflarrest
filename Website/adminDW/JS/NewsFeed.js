class NewsFeed {
	constructor(){
		this.newsFeedURL = 'https://api.rss2json.com/v1/api.json?rss_url=';
		this.newsFeedURL += 'https%3A%2F%2Fwww.google.com%2Falerts%2Ffeeds%2F10878572914104303077%2F17435386549487357803';
		
		this.setupNewsFeed();
	}
	
	renderNewsItem(item){
		var this_html = '<div class="newsItem">';
		this_html += '<a href="' + item.link + '">' + item.title + '</a><br />';
		this_html += '<b>' + item.pubDate + '</b><br />';
		this_html += '<p>' + item.description + '</p>';
		this_html += '</div>';

		return this_html;
	}

	renderNewsItems(data){
		var cards = [];
		for (var i in data.items) {
			cards.push(this.renderNewsItem(data.items[i]));
		}
		$('#newslist').html(cards.join(''));
	}

	setupNewsFeed(){
		$.getJSON(this.newsFeedURL, this.renderNewsItems);
	}

}