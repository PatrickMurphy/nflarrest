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
		this.Utilities = new Utilities();
		this.StyleManager = new StyleSheetManager();
		this.LoadingBar = new LoadingBarManager();
	}
    
    renderView(){
        // override
    }
    
    checkLoadingFinished() {
		// override
	}
    
    loadingFinished(){
        this.LoadingBar.hideLoading();
        this.Utilities.setupFacebook();
        this.Utilities.setupTwitter();
    }
    
    getDetailPageLink(page,value){
        return (page.charAt(0).toUpperCase() + page.slice(1)) + ".html#" + value;
    }

	getCrimeLink(EntityValue){
		return this.getDetailPageLink('Crime', EntityValue);
	}

	getPlayerLink(EntityValue){
		return this.getDetailPageLink('Player', EntityValue);
	}

	getTeamLink(EntityValue){
		return this.getDetailPageLink('Team', EntityValue);
	}

	getPositionLink(EntityValue){
		return this.getDetailPageLink('Position', EntityValue);
	}
}