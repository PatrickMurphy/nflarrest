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
        return `<div class="filter-section-item">
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
        if(filter_element.charAt(0) === '#'){
            filter_element = filter_element.substring(1);
        }
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
        if(filter_element.charAt(0) === '#'){
            filter_element = filter_element.substring(1);
        }
        
        var HTMLReturn = `<select `;
        // if multi select enabled add multiple to select element
        if(this.getOption('multiple_select_enabled')){
            HTMLReturn += `multiple class="filter-chosen-multi" `;
        }
        
        // continue with select html without regard to multi
        HTMLReturn += `data-placeholder="${filter_placeholder}" id="${filter_element}">`;
        
        for(var i = 0; i < filter_data.length; i++){
            HTMLReturn += this.getSelectOptionHTML(filter_data[i]);
        }
        
        HTMLReturn += `</select>`; // todo add options

        return HTMLReturn;
    }
    
    getCheckBoxGroupHTML(){
        var filter_data = this.getOption('filter_data_options') || [];
        var return_data = `<div><fieldset class="filter-radio-group">`;
        if(filter_data.length > 0){
            for(var i = 0; i < filter_data.length; i++){
                return_data += this.getCheckBoxHTML(filter_data[i]);
            }
        } else {
            return_data += `<span><b>Error:</b> No filter_data parameter values exist.</span>`;
        }
        return_data += `</fieldset></div>`;
        
        return return_data;
    }
    
    getCheckBoxSingleHTML(){
        var filter_data = this.getOption('filter_data_options') || [];
        var return_data = `<div class="filter-radio-group">`;
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
        if(filter_element.charAt(0) === '#'){
            filter_element = filter_element.substring(1);
        }
        return `<div class=" dateRangeControl">
            <span class="title">Date Range:</span>
            <button id="${filter_element}" name="dateRangeJquery"></button>
        </div>`;  
    }
    
    getSelectOptionHTML(options) {
        var optHtml =   `<option value="${options.COLUMN_VALUE}">
                            ${options.COLUMN_DISPLAY_VALUE}
                        </option>`;
        return optHtml;
    }
    
    getCheckBoxHTML(options){
        options = options || {element: 'filter-UntitledCheckbox-input', title:'Untitled Checkbox'};
        options.element = options.element || 'filter-UntitledCheckbox-input';
        options.title = options.title || 'Untitled Checkbox';
        
        // remove hash if exists element
        if(options.element.charAt(0) === '#'){
            options.element = options.element.substring(1);
        }
        
        return `<label for="${options.column_value}">${options.COLUMN_DISPLAY_VALUE}</label>
                <input type="checkbox" name="${options.COLUMN_VALUE}" id="${options.COLUMN_VALUE}">`;
    }
    
    getIncludeButtonHTML() {
        if(this.getOption('required') !== true){
            return `<button class="filter-type-btn filter-include">Include</button>`;
        }else{
            return '';
        }
    }
}