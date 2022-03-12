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
        this.getDataController().getFilteredDataCount((data_count)=>{
            console.log("Record Count: "+data_count);
            if(data_count <= 0){
                this.DateRangeControl.setDefaultDate(); // reset dates
                //console.log(this.DateRangeControl.start_date,this.DateRangeControl.end_date);
                console.log('No Data Returned with current Filter Selection.');
                // continue after reset dates
            }
        });
    }
}