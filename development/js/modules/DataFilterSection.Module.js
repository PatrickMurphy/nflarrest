class DataFilterSection extends ModuleContainer {
    constructor(parent,options){
        super('filters-control-section', parent, [], options);
        if(this.getOptionExists('items')){
            this.setupSubModules();
        }
    }
    
    setOptions(options){
        this.options = options || {};
        this.options['title'] = options.title || 'Untitled Filter Section';
        this.options['element'] = options.element || '#filter-untitled-section';
        this.options['items'] = options.items || [];
    }
    
    setupSubModules(){
        // initialize item class objects
        for(var i = 0; i < this.getOptions().items.length; i++){
            var item = this.getOptions().items[i];
            this.addSubModule(new DataFilter(this, item));
        }
    }
    
    getHTML(){
        var items = this.getSubModulesHTML();
        var activeFilterCount = `<span>0/${this.getGetOptions().items.length}</span>`;
        var return_html = `<div id="${this.getGetOptions().element.substring(1)}" class="filter-section">
                                <div class="filter-section-title">
                                    ${this.getGetOptions().title}
                                    ${activeFilterCount}
                                </div>
                                <div class="filter-section-content">
                                    ${items}
                                </div>
                            </div>`;
        
        return return_html;
    }
}