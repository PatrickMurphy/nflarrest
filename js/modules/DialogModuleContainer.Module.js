class DialogModuleContainer extends ModuleContainer {
    constructor(module_id, parent,data,options){
        super(module_id,parent,data,options);
    }
    
    show(){
        $(this.getOption('dialog_element_container')).show();
    }
    
    on(evt, handle, HTMLElement) {
        HTMLElement = HTMLElement || this.getOption('dialog_element');
        if (evt & handle) {
            $(HTMLElement).on(evt, handle);
        }
    }
    
    hide() {
        $(this.getOption('dialog_element_container')).hide();
    }
    
    // overrides module function
    setOptions(options){
        super.setOptions(options);
        // if ui elements not set, set
		this.options.dialog_element_container = options.dialog_element_container || '#module-dialog-container';
		this.options.dialog_element = options.dialog_element || '#module-dialog';
    }
}