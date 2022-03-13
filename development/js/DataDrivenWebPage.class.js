class DataDrivenWebPage extends WebPage {
    constructor(pageTitle, hideLoadingBar){
        super(pageTitle, hideLoadingBar);
        
        // set default filter function, date range
        this.FilterFunction = (row) => {
            if(!this.data_controller.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
                return false;
            }
            return true;
        };
        
        // setup date range control filter & pass it to new data controller object
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        
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
    
    renderView(filterFn){
        this.getDataController().getFilteredDataCount((data_count)=>{
            if(data_count <= 0){
                this.DateRangeControl.setDates(moment('2000-01-01'), moment()); // reset dates
                this.displayDialogBox('error-dialog', '<strong>Warning!</strong> No Data Returned with current Filter Selection. Dates set to default.', 'Date Range Error');
            }
        }, filterFn);
    }
}