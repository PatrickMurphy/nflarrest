class DateRangeDataFilter extends DataFilter {
    constructor(parent,options){
        super(parent,options);
        this.name = 'dateRangeController';
        this.library = 'NFLArrest';
        this.description = 'The NFL Date Range Controller Module, contains two values';
        this.default_val = ['2000-01-01', moment().format('YYYY-MM-DD')]; // should be given in model?
        
        // custom
        this.names = ['start_date', 'end_date'];
    }
    getValue(FCObj, item) {
        var arr = [];
        arr.push(FCObj.DateRangeFilterInstance.start_date);
        arr.push(FCObj.DateRangeFilterInstance.end_date);
        return arr;
    }
    isActive(FCObj, item) {
        var start_date_bool = FCObj.DateRangeFilterInstance.start_date != this.default_val[0];
        var end_date_bool = FCObj.DateRangeFilterInstance.end_date != this.default_val[1];
        return start_date_bool || end_date_bool;
    }
    compare(FCObj, item, rowValue){
        var values = this.getValue(FCObj, item); // returns: [start, end]
        if(new Date(rowValue) >= new Date(values[0]) && new Date(rowValue) <= new Date(values[1])){
            return true;
        }else{
            return false;
        }
    }
}