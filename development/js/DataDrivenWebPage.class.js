class DataDrivenWebPage extends WebPage {
    constructor(pageTitle, hideLoadingBar){
        super(pageTitle, hideLoadingBar);
        
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        
        // on filters (date range) change, re render view
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.renderView(this);
        });
    }
    
    getDataFilters(){
        var return_arr = [];
        return_arr.push(this.DateRangeControl);
        return return_arr;
    }
    
    getDataController(){
        return this.data_controller;
    }
    
    setDataController(DataController_Class){
        this.data_controller = DataController_Class;
    }
    
    renderView(filterFn){
        this.getDataController().getFilteredDataCount((data_count)=>{
            console.log("Record Count: "+data_count);
            if(data_count <= 0){
                this.DateRangeControl.setDates(moment('2000-01-01'),moment()); // reset dates
                if ($('#error-dialog').length === 0) {
                    $('body').append('<div id="error-dialog" title="Date Range Error"><strong>Warning!</strong> No Data Returned with current Filter Selection. Dates set to default.</div>');
                }
                $("#error-dialog").dialog({modal: true});
                console.log('No Data Returned with current Filter Selection. Dates set to default.');
            }
        }, filterFn);
    }
}