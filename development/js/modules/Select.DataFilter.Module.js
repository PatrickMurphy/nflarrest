class SelectDataFilter extends DataFilter {
    constructor(parent,options){
        super(parent,options);
        this.name = 'select';
        this.library = 'Chosen';
        this.description = 'multi select field for filters, contains an array of values';
        this.default_val = null;
    }
    getValue(FCObj, item) {
        return $(item.element).val();
    }
    isActive(FCObj, item) {
        return $(item.element).val() != this.default_val;
    }
    compare(FCObj, item, rowValue){
        return $(item.element).val().indexOf(rowValue)>0;
    }
}