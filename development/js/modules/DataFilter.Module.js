class DataFilter extends Module {
    constructor(parent,options){
        super('filters-control-filter',parent,[],options);
    }
    
    setOptions(options){
        this.options = options || {};
        this.options.element = options.element || '#filter-untitled-input';
        this.options.type = options.type || {name:'undefined'};
        this.options.name = options.name || 'untitledInput';
        this.options.required = options.required || false;
        this.options.multiple_select_enabled = options.multiple_select_enabled || true;
    }
    
    getHTML(){
        var filter_section_item_attributes = 'class="filter-section-item"';
        if(this.getOption('isHidden')){
            filter_section_item_attributes += ' style="display:none;"';
        }
        return `<div ${filter_section_item_attributes}>
                    <span>${this.getOptions().title}</span>
                    <div class="control-group">
                        ${this.getControlGroupHTML()}
                    </div>
                </div>`;
    }
    
    getControlGroupHTML(){
        var filter_type = this.getOption('type') || {};
        var filter_data = this.getOption('filter_data_options') || [];
        var filter_placeholder = this.getOption('InputPlaceHolder') || 'Choose...';
        var filter_element = this.getOption('element') || 'filters-UndefinedElement-input';
        filter_element = this.util_removeHashChar(filter_element);
        // set empty
        var ControlGroupHTML = '';
        
        // if filter not required show include button
        ControlGroupHTML += this.getIncludeButtonHTML();
        
        // if filter type date range controller
        if(filter_type.name === 'dateRangeController'){
            ControlGroupHTML += this.getFilterDateRangeHTML();
        // if filter type select or multiselect
        }else if(filter_type.name === 'select'){
            ControlGroupHTML += this.getFilterSelect();
        // if filter type checkbox group
        }else if(filter_type.name === 'checkbox-group'){
            ControlGroupHTML += this.getCheckBoxGroupHTML();
        // if filter type checkbox
        }else if(filter_type.name === 'radio-group'){
            ControlGroupHTML += this.getRadioGroupHTML();
        // if filter type checkbox
        }else if(filter_type.name === 'checkbox'){
            ControlGroupHTML += this.getCheckBoxSingleHTML();
        }
        
        return ControlGroupHTML;
    }
    
    /* --- Get Control Group HTML Sub Functions --- */
    getFilterSelect(){
        var filter_data = this.getOption('filter_data_options') || [];
        var filter_type = this.getOption('type') || {};
        var filter_placeholder = this.getOption('InputPlaceHolder') || 'Choose...';
        var filter_element = this.getOption('element') || 'filters-UndefinedElement-input';
        filter_element = this.util_removeHashChar(filter_element);
        
        var HTMLReturn = `<select `;
        // if multi select enabled add multiple to select element
        if(this.getOption('multiple_select_enabled')){
            HTMLReturn += `multiple class="filter-chosen-multi" `;
        }
        
        // continue with select html without regard to multi
        HTMLReturn += `data-placeholder="${filter_placeholder}" id="${filter_element}">`;
        
        var selectedCount = 0;
        for(var i = 0; i < filter_data.length; i++){
            let tmpReturn = this.getSelectOptionHTML(filter_data[i]);
            HTMLReturn += tmpReturn;
            
            if(tmpReturn.indexOf('SELECTED')>-1){
                selectedCount++;
            }
        }
        
        HTMLReturn += `</select>`; // todo add options
        var maxSelectedCount = filter_data.length;
        HTMLReturn += ` <span class="data-filter-selected-count">${selectedCount} of ${maxSelectedCount}</span>`;
        return HTMLReturn;
    }
    
    getInputGroupHTML(forEachItem_Callback){
        var filter_data = this.getOption('filter_data_options') || [];
        var return_data = `<div class="filter-radio-group"><fieldset>`;
        return_data += `<legend>${this.getOption('title')}:</legend>`;
        if(filter_data.length > 0){
            for(var i = 0; i < filter_data.length; i++){
                return_data += forEachItem_Callback(filter_data[i]);
            }
        } else {
            return_data += `<span><b>Error:</b> No filter_data parameter values exist.</span>`;
        }
        return_data += `</fieldset></div>`;
        
        return return_data;
    }
    
    getCheckBoxGroupHTML(){
        return this.getInputGroupHTML(
            (item) => {
                return this.getCheckBoxHTML(item);
            }
        );
    }
    
    getRadioGroupHTML(){
       return this.getInputGroupHTML(
            (item) => {
                return this.getRadioHTML(item);
            }
        );
    }
    
    getCheckBoxSingleHTML(){
        var filter_data = this.getOption('filter_data_options') || [];
        var return_data = `<div class="filter-single-checkbox">`;
        if(filter_data.length >= 1){
            return_data += this.getCheckBoxHTML(filter_data[0]); // should always only have one element, but only select first
            if (filter_data.length > 1) {
                console.log(`More than 1 filter_data parameter values exist. Do you want to use a CheckBoxGroup?`);
            }
        }else{
            return_data += `<span><b>Error:</b> No filter_data parameter values exist.</span>`;
        }
        return_data += `</div>`;
        
        return return_data;
    }
    
    /* --- HTML Gen Sub Functions (no need for filter_data) --- */
    getFilterDateRangeHTML(){
        var filter_element = this.getOption('element') || 'filters-UndefinedElement-input';
        filter_element = this.util_removeHashChar(filter_element);
        return `<div class=" dateRangeControl">
            <span class="title">Date Range:</span>
            <button id="${filter_element}" name="dateRangeJquery"></button>
        </div>`;  
    }
    
    getSelectOptionHTML(options) {
        // default select all, but allow options to specifiy isSelected: false
        var selected = 'SELECTED';
        if(options.hasOwnProperty('isSelected')){
            if(!options.isSelected){
                selected = '';
            }
        }
        var optHtml =   `<option value="${options.COLUMN_VALUE}" ${selected}>
                            ${options.COLUMN_DISPLAY_VALUE}
                        </option>`;
        return optHtml;
    }
    
    getCheckBoxHTML(options){
        options = options || {element: 'filter-UntitledCheckbox-input', title:'Untitled Checkbox'};
        options.element = options.element || 'filter-UntitledCheckbox-input';
        options.title = options.title || 'Untitled Checkbox';
        
        var selected = 'checked';
        if(options.hasOwnProperty('isSelected')){
            if(!options.isSelected){
                selected = '';
            }
        }
        // remove hash if exists element
        options.element = this.util_removeHashChar(options.element);
        
        return `<label for="${this.getOption('name')+options.COLUMN_VALUE}">${options.COLUMN_DISPLAY_VALUE}</label>
                <input type="checkbox" name="${this.getOption('name')+options.COLUMN_VALUE}" id="${this.getOption('name')+options.COLUMN_VALUE}" ${selected}>`;
    }
    
    getRadioHTML(options){
        options = options || {element: 'filter-UntitledRadio-input', title:'Untitled Radio'};
        options.element = options.element || 'filter-UntitledRadio-input';
        options.title = options.title || 'Untitled Radio';
        
        // remove hash if exists element
        options.element = this.util_removeHashChar(options.element);
        
        return `<label for="${this.getOption('name')+options.COLUMN_VALUE}">${options.COLUMN_DISPLAY_VALUE}</label>
                <input type="radio" name="${this.getOption('name')}" id="${this.getOption('name')+options.COLUMN_VALUE}">`;
    }
    
    getIncludeButtonHTML() {
       // if(this.getOption('required') !== true){
         //   return `<button class="filter-type-btn filter-include">Include</button>`;
        //}else{
            return '';
        //}
    }
    
    util_removeHashChar(str){
        // remove hash if exists element
        if(str.charAt(0) === '#'){
            return str.substring(1);
        }else{
            return str;
        }
    }
}