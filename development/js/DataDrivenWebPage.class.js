class DataDrivenWebPage extends WebPage {
    constructor(pageTitle, hideLoadingBar){
        super(pageTitle, hideLoadingBar);
        
        // set default filter function, date range
        this.FilterFunction = (row) => {
            return this.data_controller.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd());
        };
        
        // setup date range control filter & pass it to new data controller object
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        
        this.setupEvents();
    }
    
    setupFilters(){
        var page_dimension = this.pageTitle.toLowerCase();
        var filters_options = {
            presets: {},
            date_range_object: this.dateRangeNFL
        };

        filters_options['presets'][page_dimension] = {};
        filters_options['presets'][page_dimension][page_dimension] = this.pageID;
        this.FilterControl = new FiltersControl(this,[],filters_options);
        
        $(this.FilterControl.options.dialog_element).on('FilterDialogChanged', () => {this.renderView();});
    }
    
    setupEvents(){
        // on filters (date range) change, re-render view
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.renderView(this);
        });
    }
    
    getDataFilters(){
        return [this.DateRangeControl];
    }
    
    getDataController(){
        return this.data_controller;
    }
    
    setDataController(DataController_Class){
        this.data_controller = DataController_Class;
    }
    
    checkForZeroRecords(){
        // check to make sure filters return at least one row, else display dialog and reset date
        var callbackFn = (data_count)=>{
            if(data_count <= 0){
                this.DateRangeControl.setDates(moment('2000-01-01'), moment()); // reset dates
                this.DateRangeControl.renderView(); // update ui to reflect new dates
                this.displayDialogBox('error-dialog', '<strong>Warning!</strong> No Data Returned with current Filter Selection. Date Filter Set to default.', 'Date Range Error');
            }
        };
        this.getDataController().getFilteredDataCount(callbackFn, this.FilterFunction);
    }
    
    renderView(){
        this.checkForZeroRecords();
        this.LoadingBar.showLoading();
        super.renderView(); // render modules
    }
}