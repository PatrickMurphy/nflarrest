class CheckBoxDataFilter extends DataFilter {
    constructor(parent,options){
        super(parent,options);
        this.name = 'checkbox';
        this.library = 'JQuery-UI';
        this.description = 'a single binary option';
        this.default_val = true;
    }
    getValue(FCObj, item) {
        return $(item.element).prop('checked');
    }
    isActive(FCObj, item) {
        return $(item.element).prop('checked') != this.default_val;
    }
    compare(FCObj, item, rowValue) {
        return $(item.element).prop('checked') === rowValue;
    }
}