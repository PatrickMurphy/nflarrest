class DataTableColumns extends Module {
    // construct object
    constructor(parent, data, options) {
        super('DataTableColumn', parent, data, (options || {columns:[
                {
                    column_id: 0,
                    column_title: 'Column Name',
                    column_data: 'col',
                    column_classes: '',
                    column_width: 2
                }
            ]}));
    }
    
    // 1-12 convert to one,two,... twelve for ui columns
    convertIntToWord(n){
        var nums = "zero one two three four five six seven eight nine ten eleven twelve".split(" ");
        if (n <= 12 && n > 0){
            return nums[n];
        }else{
            return nums[1];
        }
    };
    
    renderColumnAttributes(optCol){
        return this.renderColumnAttributeClass(optCol);    
    }

    renderColumnAttributeClass(optCol){
        var return_text = "";
        if(optCol.hasOwnProperty('column_width') || optCol.hasOwnProperty('column_classes')){
            return_text += ' class="'; // start class attribute
            if(optCol.hasOwnProperty('column_width')){
                var tmpInt = parseInt(optCol['column_width']);
                if(tmpInt > 0 && tmpInt <= 12){
                    return_text += this.convertIntToWord(tmpInt);
                    return_text += 'column';
                    if(tmpInt > 1){
                        return_text += 's'; // add pluaral
                    }
                }else{
                    // column width did not parse between expected range, default 1 col
                    return_text += 'one column';   
                }
            }else{
                // if column_width not set, default 1 col
                return_text += 'one column';
            }

            // if column_classes set include
            if(optCol.hasOwnProperty('column_classes')){
                return_text += ' ' + optCol['column_classes'];
            }
            return_text += '"'; // end class attribute
        }
        return return_text;
    }
    
    renderRowColumns(row){
        var displayTypeRowBool = !(row == 'header' || row == ['header'] || row == {header:true});
        var colElementType = displayTypeRowBool ? 'td' : 'th';
        
        var colList = this.getOption('columns');
        
        // start row element
        var return_text = '<tr>';
        // for each column element
        for(var i = 0; i < colList.length; i++){
            var optCol = colList[i];
            // add column td/th elemnent
            return_text += '<'+colElementType + this.renderColumnAttributes(optCol) + '>'; // start th tag
            // TODO: add custom display option to append cols etc
            if(displayTypeRowBool){
                return_text += optCol.hasOwnProperty('column_display_fn') ? optCol.column_display_fn(row) : row[optCol.column_data]; // row
            }else{
                return_text += optCol.column_title; // header
            }
            return_text += '</'+colElementType+'>';
        }
        return_text += '</tr>';
        return return_text;
    }
}