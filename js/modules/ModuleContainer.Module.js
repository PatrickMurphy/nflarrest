class ModuleContainer extends Module {
    constructor(module_id, parent,data,options){
        super(module_id,parent,data,options);
        this.setSubModules([]);
    }
    
    // add on, hide, show
    
    addSubModule(module){
        // todo if type of module
        return this.sub_modules.push(module);
    }
    
    setSubModules(arr_modules){
        this.sub_modules = arr_modules;
        return this.sub_modules;
    }
    
    getSubModules(){
        return this.sub_modules;
    }
    
    getSubModule(index){
        return this.sub_modules[index];
    }
    
    getSubModulesHTML(){
        var return_html = '';
        for(var i = 0; i < this.sub_modules.length; i++){
            return_html += this.sub_modules[i].getHTML();
        }
        return return_html;
    }
    
    getHTML(){
        // default if not set in child class
        return this.getSubModulesHTML();
    }
}