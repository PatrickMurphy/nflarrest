class DialogWindowColumn extends ModuleContainer {
    constructor(parent,data,options){
        super('DialogWindowColumn',parent,data,options);
        
        if(this.getOptionExists('sections')){
            this.setupSubModules();
        }
        
    }
    
    setOptions(options){
        this.options = options || {};
        this.options.element = options.element || 'filter-column-untitled';
        //this.options.contents = options.contents || '<span><b>Error:</b> No Data Filter Column Contents supplied</span>';
        this.options.wordColumnWidth = options.wordColumnWidth ||  'six';
    }
    
    setupSubModules(sections){
        var sections_arr = sections || this.getOption('sections') || [];
        for(var i = 0; i < sections_arr.length; i++){
            this.addSubModule(new DataFilterSection(this, sections_arr[i]));
        }
    }
    
    getHTML(){
        // set id default val
        var element_id = this.getOption('element') || 'filter-column-untitled';
        var wordColumnWidth = this.getOption('wordColumnWidth') || 'six';
        var contents = this.getOption('contents') || '<span><b>Error:</b> No Data Filter Column Contents supplied</span>';
        
        if(this.getSubModules().length > 0){
            // generate sub modules
            contents = this.getSubModulesHTML();
        }
        
        if(element_id.charAt(0) === '#'){
            // if first char of id string is # then remove it
            element_id = element_id.substring(1);
        }
        
        wordColumnWidth = this.getWordColumnWidth(wordColumnWidth);

        // return structure
        return `<div id="${element_id}" class="${wordColumnWidth} columns filter-column">
                    ${contents}
                </div>`;
    }
    
    getWordColumnWidth(w){
        // only accept listed word options, otherwise default to six (one half), set default val
        var w = w || 'six';
        var wordColumnWidthOptions = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
        if(wordColumnWidthOptions.indexOf(w.toLowerCase()) <= -1){
            w = 'six';
        }
        
        return w;
    }
}