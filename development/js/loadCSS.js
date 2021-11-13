/*----------------------
Old Code Replaced with ES6
-----------------------*/

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
//loadCSS('//fonts.googleapis.com/css?family=Raleway:400,300,500,600');
loadCSS('css/vendor/normalize.min.css');
loadCSS('css/vendor/skeleton.min.css');
loadCSS('css/vendor/c3.css');
loadCSS('css/vendor/jquery-ui.min.css');
loadCSS('css/vendor/jquery.comiseo.daterangepicker.css');

/*
class StyleSheetManager {
	constructor() {
		this.stylesheets = ['css/styles.min.css'
							,'//fonts.googleapis.com/css?family=Raleway:400,300,500,600'
							,'css/vendor/normalize.min.css'
							,'css/vendor/skeleton.min.css'
							,'css/vendor/c3.css'
							,'css/vendor/jquery-ui.min.css'];

		this.loadStylesheets();
	}

	loadCSS(url) {
	    (function (d, t) {
	        var g = d.createElement(t),
	            s = d.getElementsByTagName(t)[0];
	        g.href = url;
	        g.rel = 'stylesheet';
	        s.parentNode.insertBefore(g, s);
	    }(document, 'LINK'));
	}

	loadStylesheets(stlshe){
		var stylelist = stlshe || (this.stylesheets || []);
		var success = true;
		for(var i = 0; i < stylelist.length; i++){
			console.log(stylelist[i] + ' Loaded');
			success = this.loadCSS(stylelist[i]);
		}

		return success;
	}
}

var StyleSheetManagerInst = new StyleSheetManager();*/