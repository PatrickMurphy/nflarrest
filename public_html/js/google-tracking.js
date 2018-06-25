// set page hash and path var
var hashervar = window.location.hash || '',
	pagePath = window.location.pathname + hashervar;

// load analytics JS from google
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

// init google analytics
ga('create', 'UA-66360026-1', 'auto');
// send page view request
ga('send', 'pageview', pagePath);

// google tracking pre es6 class
var googleTracking = {
	tracker: undefined,
	initialize: function (track) {
		googleTracking.tracker = track;
	},
	sendTrackEvent: function sendTrackEvent(category, action) {
		if (arguments.length < 3) {
			ga('send', 'event', category, action);
		}
	}
};
// init google analytics pre es6 class
googleTracking.initialize(ga);

// add click handler to donate button on page load
$(document).ready(function () {
	$('.donate').click(function () {
		googleTracking.sendTrackEvent('Donate', 'Click');
	});
});
