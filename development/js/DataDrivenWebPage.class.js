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
    
    renderView(){
        this.data_controller.getFilteredDataCount((data_count)=>{
            console.log("Record Count: "+data_count);
            if(data_count <= 0){
                alert('No Data Returned with current Filter Selection.');
                this.DateRangeControl.setDates(); // reset dates
                // continue after reset dates
            }
        });
    }
}