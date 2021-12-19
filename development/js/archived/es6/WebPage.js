/*-------------------------------------------------
Base Webpage Object
Dependencies:
	- Utilities.js
	- LoadCSS.js
	- nflLoadingBar.js
	- google-tracking.js
-------------------------------------------------*/

class WebPage {
	constructor(){
		this.utilities = new Utilities();
		this.StyleManager = new StyleSheetManager();
		this.LoadingBar = new LoadingBarManager();
	}
}