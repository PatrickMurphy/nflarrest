function loadCSS(url) {
    (function (d, t) {
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        g.href = url;
        g.rel = 'stylesheet';
        s.parentNode.insertBefore(g, s);
    }(document, 'LINK'));
}
loadCSS('css/styles.min.css');
loadCSS('http://fonts.googleapis.com/css?family=Raleway:400,300,500,600');
loadCSS('css/vendor/normalize.min.css');
loadCSS('css/vendor/skeleton.min.css');
loadCSS('css/vendor/c3.css');
loadCSS('css/vendor/jquery-ui.min.css');
loadCSS('css/vendor/jquery.comiseo.daterangepicker.css');
