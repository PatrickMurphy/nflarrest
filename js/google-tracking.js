var hashervar = window.location.hash || '',
    pagePath =  window.location.pathname + hashervar;

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-66360026-1', 'auto');
ga('send', 'pageview', pagePath);

var googleTracking = {
    tracker: undefined,
    initialize: function(track){
        this.tracker = track;
    },
    sendEvent: function(category, action){
        this.tracker('send', 'event', category, action);
    }
};
googleTracking.initialize(ga);
