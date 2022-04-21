class RadioGroupDataFilter extends DataFilter {
    constructor(parent,options){
        super(parent,options);
        this.name = 'radio-group';
        this.library = 'JQuery-UI';
        this.description = 'a group of discrete options';
        this.default_val = 'all';
    }
    getValue(FCObj, item) {
        var group_settings = [];

        $(item.element).map(function (item2, el) {
            if (!$(el).prop('checked')) {
                group_settings.push('1');
            } else {
                group_settings.push('0');
            }
        });

        return group_settings.join('');
    }
    isActive(FCObj, item) {
        var group_count = 0;
        $(item.element).map(function (item2, el) {
            if (!$(el).prop('checked')) {
                group_count++;
            }
        });
        return group_count > 0;
    }
    compare(FCObj, item, rowValue){
        var is_true = false;
        $(item.element).map(function (item2, el) {
            if ($(el).prop('checked')) {
                is_true = $(el).attr('id') == rowValue;
            }
        });
        return is_true;
    }
}