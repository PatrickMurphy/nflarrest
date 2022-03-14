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
        this.option_HideLoadingBar = hideLoadingBar === true ? true : false;
        
        this.arrest_view_mode = 0; // 0 = table, 1 = card (Mobile Default)
		// if mobile use cards
		if (this.Utilities.mobileCheck()){
			this.arrest_view_mode = 1;
            moment.locale('en', {
                relativeTime : {
                    future: "in %s",
                    past:   "%s ago",
                    s  : 'a few secs',
                    ss : '%d secs',
                    m:  "a min",
                    mm: "%d mins",
                    h:  "an hr",
                    hh: "%d hrs",
                    d:  "a day",
                    dd: "%d day",
                    w:  "a wk",
                    ww: "%d wks",
                    M:  "a mth",
                    MM: "%d mths",
                    y:  "a yr",
                    yy: "%d yrs"
                }
            });
        }
        
        // if default hide loading bar parameter is set/true, hide by default
        if(this.option_HideLoadingBar){
            this.LoadingBar.hideLoading();
        }
        
        // add charts array collection
        this.charts = [];
        this.Modules_HashMap = {};
        
        // Add Update Date / Version information to page footer
        this.RenderUpdateDate();    
	}
    
    renderView(){
        this.renderModules();
    }
    
    RenderUpdateDate(){
        // using global lastUpdate built in build script and included in index.min.js and detailpage.min.js
        var displayUpdateDate = lastUpdate.split(',')[0];
        // included in min file is lastUpdate var
        $("#updateDateFooter").html("Updated: " + displayUpdateDate + ' <a href="BuildHistory.html">v' + lastVersion + "</a>");
    }
    
    checkLoadingFinished() {
		// override
        console.warn('Default WebPage.js checkLoadingFinished() function called, should be overriden within a subclass');
        // default assume page loaded, no logical test
        this.loadingFinished();
	}
    
    loadingFinished(){
        this.LoadingBar.hideLoading();
        
        // setup items not necessary for initial display to decrease time for user content load
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
        
        $(this.FilterControl.options.dialog_element).on('FilterDialogChanged', () => {this.renderView();});
    }
    
    // ================ Modules ================ //
    getModuleCount(){
        return Object.keys(this.Modules_HashMap).length;
    }
    
    getModules(){
        return this.Modules_HashMap;
    }
    
    getModule(moduleID){
        if(this.Modules_HashMap.hasOwnProperty(moduleID)){
            return this.Modules_HashMap[moduleID];
        }else{
            console.error('No Module with the moduleID: ' + moduleID);
            return false;
        }
    }
    
    setModules(modulesObj){
        if(Object.isObject(mObj)){
            this.Modules_HashMap = mObj;
        }else{
            console.warn('WebPage.setModules(mObj): Expected Parameter(mObj) to be of type Object that should be formatted as a HashMap eg: [{"Key": ModuleInstance, "Key2": ModuleInstance2}].');
        }
    }
    
    addModule(module, moduleID){
        moduleID = moduleID || ("Module_" + module.getModuleID() + '_' + this.getModuleCount())
        this.Modules_HashMap[moduleID] = module;
        return moduleID;
    }
    
    removeModule(moduleID){
        if(this.Modules_HashMap[moduleID]){
            delete this.Modules_HashMap[moduleID];
        }else{
            console.warn('No such module found', moduleID);
        }
    }
    
    renderModules(){
        if(this.getModuleCount() > 0){
            var moduleIDs = Object.keys(this.Modules_HashMap);
            for(var i = 0; i < moduleIDs.length; i++){
                this.Modules_HashMap[moduleIDs[i]].renderView();
            }
        }
    }
    // function to return the tooltip attribute html for date display elements
    // expects [row] parameter, a js object that contains a date property formatted as a string, if it contains T (Date Format to add time)
    // return type: string
    getHTMLDateTitleAttribute(row,datecol) {
        if (typeof row !== 'undefined') {
            var date_column = datecol || 'Date';
            if(row.hasOwnProperty(date_column)) {
                return 'title="' + row[date_column].split('T')[0] + '"';
            } else {
                console.error('WebPage > getHTMLDateTitleAttribute: Row did not contain ['+date_column+'].');
                return '';
            }
        } else {
            return '';
        }
    }
    
    // extract to non framework class
    getDetailPageLink(page,value){
        return (page.charAt(0).toUpperCase() + page.slice(1)) + ".html#" + value;
    }

	getCrimeLink(EntityValue){
		return this.getDetailPageLink('CrimeCategory', EntityValue);
	}
    
    getCrimeSubCategoryLink(EntityValue){
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
    
    displayDialogBox(elementID, dialog_msg, dialog_title, dialog_options){
        var dialog_id = elementID || 'error-dialog';
        var dialog_msg = dialog_msg || 'Error! No Message found.';
        var dialog_title = dialog_title || 'Error';
        var dialog_options = dialog_options || {modal: true};
        
        // if page does not already contain the dialog object, add it to end of body
        if ($('#'+dialog_id).length === 0) {
            $('body').append('<div id="'+dialog_id+'" title="'+dialog_title+'">'+dialog_msg+'</div>');
        }
        $("#"+dialog_id).dialog(dialog_options);
        this.Utilities.googleTracking.sendTrackEvent('PageDialogOpen', dialog_title);
    }
}