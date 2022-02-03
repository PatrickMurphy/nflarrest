class StyleSheetManager {
	constructor() {
		this.stylesheets = ['css/styles.min.css'
							//,'//fonts.googleapis.com/css?family=Raleway:400,300,500,600'
							,'css/vendor/normalize.min.css'
							,'css/vendor/skeleton.min.css'
							,'css/vendor/c3.css'
							,'css/vendor/jquery-ui.min.css'
                            ,'css/vendor/jquery.comiseo.daterangepicker.css'];

		this.loadStylesheets();
	}

    // method to create a link element refrencing css url in page before first link element
	loadCSS(url) {
	    (function (d, t) {
	        var g = d.createElement(t),
	            s = d.getElementsByTagName(t)[0];
	        g.href = url;
	        g.rel = 'stylesheet';
	        s.parentNode.insertBefore(g, s);
	    }(document, 'LINK'));
        
        return true;
	}

    // load all css in an a passed array
	loadStylesheets(styleSheet_Array){
        // default variable assignment
		var stylelist = styleSheet_Array || (this.stylesheets || []);
        // assume success until error
		var success = true;
        
        // for each stylesheet in list, call loadCSS method
		for(var i = 0; i < stylelist.length; i++){
			success = this.loadCSS(stylelist[i]);
		}

		return success;
	}
}

var StyleSheetManagerInstance = new StyleSheetManager();
