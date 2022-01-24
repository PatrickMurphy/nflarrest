/*-------------------------------------------------
Base Webpage Object
Dependencies:
	- Utilities.js
	- LoadCSS.js
	- nflLoadingBar.js
	- google-tracking.js
-------------------------------------------------*/
var DEBUG = false;

class WebPage {
	constructor(pageTitle, hideLoadingBar){
		this.Utilities = new Utilities();
		this.StyleManager = new StyleSheetManager();
		this.LoadingBar = new LoadingBarManager();
        this.pageTitle = pageTitle || 'Default';
        
        if(hideLoadingBar){
            this.LoadingBar.hideLoading();
        }
        
        this.charts = [];
        
        this.RenderUpdateDate();    
	}
    
    renderView(){
        // override
    }
    
    RenderUpdateDate(){
        var displayUpdateDate = lastUpdate.split(',')[0];
        // included in min file is lastUpdate var
        $("#updateDateFooter").html("Updated: " + displayUpdateDate + ' <a href="BuildHistory.html">v' + lastVersion + "</a>");
    }
    
    checkLoadingFinished() {
		// override
	}
    
    loadingFinished(){
        this.LoadingBar.hideLoading();
        this.Utilities.setupFacebook();
        this.Utilities.setupTwitter();
    }
    
    setupFilters(){
        var page_dimension = this.pageTitle.toLowerCase();
        var filters_options = {
            presets: {},
            date_range_object: this.dateRangeNFL
        };

        filters_options['presets'][page_dimension] = {};
        filters_options['presets'][page_dimension][page_dimension] = this.pageID;
        this.FilterControl = new FiltersControl(filters_options);
        
        $(this.FilterControl.options.dialog_element).on('FilterDialogChanged', this.renderView);
    }
    
    // extract to non framework class
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