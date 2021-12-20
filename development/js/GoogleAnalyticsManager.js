class GoogleAnalyticsManager {
	constructor(){
		// initialize and load external

		// set page hash and path var
		this.hashervar = window.location.hash || '',
		this.pagePath = window.location.pathname + this.hashervar;

		this.loadScript();

		// init google analytics
		ga('create', 'UA-66360026-1', 'auto');
		// send page view request
		this.ping();
	}

	loadScript(){
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	}

	ping(){
		ga('send', 'pageview', this.pagePath);
	}


	sendTrackEvent(category, action) {
		if (arguments.length < 3) {
			ga('send', 'event', category, action);
		}
	}
}
