class Module {
    constructor(moduleID, parent, data, options){
        this.setModuleID(moduleID);
        this.setParent(parent);
        this.setData(data);
        this.setOptions(options);
    }
    
    setModuleID(newModuleID){
        this.moduleID = newModuleID;
    }
    
    getModuleID(){
        return this.moduleID;
    }
    
    setParent(newParent){
        this.parent = newParent;
    }
    
    getParent(){
        return this.parent;
    }
    
    // function that can be overwritten to provide a boolean 
    validateDataFormat(data){
        return true; // default data is valid
    }
    
    setData(newData){
        // if new data fits module defined data format, set it
        if(this.validateDataFormat(newData)){
            this.data = newData;
        }else{
            console.error('Invalid Data Format -- ' + this.getModuleID());
        }
    }
    
    getData(){
        return this.data;
    }
    
    setOptions(newOptions){
        this.options = newOptions;
    }
    
    getOptions(){
        return this.options;
    }
    
    // result functions ==========================================================================
    getHTML(){
        return "<!-- NO HTML Defined for Module: " + this.getModuleID() + " -->";
    }
    
    getCSSIncludes(){
        return "<!-- NO CSS Includes Defined for Module: " + this.getModuleID() + " -->";
    }
    
    getJSIncludes(){
        return "<!-- NO JS Includes Defined for Module: " + this.getModuleID() + " -->";
    }
}