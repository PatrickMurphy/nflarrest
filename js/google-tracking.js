  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-66360026-1']);
var hashervar = window.location.hash || '';
  _gaq.push(['_trackPageview', window.location.pathname + hashervar]);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
