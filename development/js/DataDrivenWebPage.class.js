class DataDrivenWebPage extends WebPage {
    constructor(pageTitle, hideLoadingBar){
        super(pageTitle, hideLoadingBar);
        
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        
        // on filters (date range) change, re render view
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.renderView();
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
}