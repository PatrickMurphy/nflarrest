class DataTable extends Module {
    // construct object
    constructor(parent, data, options) {
        super('DataTable', parent, data, (options || {
            targetElement: 'arrest_table',
            targetElementMobile: 'arrest_cards',
            targetElementTableContainer: 'arrest_details_container',
            targetElementTitleIncidentCount: 'arrest_details_incident_count',
            TitlePrefix: '',
            RowLimit:15,
            GoogleTrackingCategory: 'DetailPageArrests'
        }));

        // optional render functions set undefined until set at runtime
        this.renderRowFn = undefined;
        this.renderRowHeaderFn = undefined;
        this.renderCardFn = undefined;
        
        // display functions
        this.displayDataFilterFn = undefined;
        this.displayPaginationTemplateFn = undefined;
        this.displayDataCallbackFn = undefined;
        
        this.setupDefaultFunctions();
        
        // if the device is mobile use mobile view style (true), else desktop (false)
        this.view_mobile = this.parent.Utilities.mobileCheck() ? true : false;
        
        this.DataTableColumns = undefined;
        
        if(this.getOptionExists('columns')){
            this.DataTableColumns = new DataTableColumns(this, this.getOption('columns'), {columns: this.getOption('columns')});
        }
        
        // render view first time
        this.renderView();
    }
    
    setupDefaultFunctions(){
        var self = this;
        this.defaultFunctions = {};
        this.defaultFunctions.displayDataFilterFn = ((row) => {
				if(self.parent.pageTitle == 'Team'){
					if(row['Team'] != self.parent.pageID){
						return false;
					}
				}else if(self.parent.pageTitle == 'Position'){
					if(row['Position'] != self.parent.pageID){
						return false;
					}
				}else if(self.parent.pageTitle == 'Player'){
					if(row['Name'] != self.parent.pageID){
						return false;
					}
				}else if(self.parent.pageTitle == 'Crime'){
					if(row['Category'] != self.parent.pageID){
						return false;
					}
				}else if(self.parent.pageTitle == 'Crime Category') {
                    if (row['Crime_category'] != self.parent.pageID) {
                        return false;
                    }
                }
            
				return true;
			});
        this.defaultFunctions.displayPaginationTemplateFn = ((data, pagination) => {
            // for each data item display row or card
            var items = [];
            
            // if desktop add table header rows
            if (!self.view_mobile) {
                items.push(self.renderRowHeader());
            }
            
            // add rows or cards
            for (var rowID in data) {
                var thisDataIndex = data[rowID];
                var row = self.getData()[thisDataIndex];
                if (self.view_mobile) {
                    items.push(self.renderCard(row));
                } else {
                    items.push(self.renderRow(row));
                }
            }
            
            if (self.view_mobile) {
                // mobile
                $('#'+self.getOption('targetElementMobile')).html(items.join(""));
            }else{
                // desktop
                $('#'+self.getOption('targetElement')).html(items.join(""));
            } 
        });
        this.defaultFunctions.displayDataCallbackFn = ((data) => {
            self.setupContainerElements(data);
            self.parent.checkLoadingFinished();
		});
    }
    
    
    // setupContainerTitle function resets the html of the table container and adds a title
    setupContainerTitle(data){
        console.log('setup container title');
        var tableContainer = this.getOption('targetElementTableContainer') || '#arrest_details_container';
        var incidentSelector = this.getOption('targetElementTitleIncidentCount') || '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
        var h4Prefix = this.getOption('TitlePrefix') || '';
        
        // add empty h4 element as only element in container
        $(tableContainer).html('<h4 id="arrest_details_incident_count" style="text-align:left;"># Incidents:</h4>');
        $(incidentSelector).html(h4Prefix + data.length + ' Incidents:');
        
        console.log($(tableContainer).html());
    }
    
    // setupContainerElements Function adds the table element or card container to the table container after the h4 heading. 
    //      -- It also adds the pagination control element after the previous. 
    //      -- the container HTML is reset each render to just the h4 element as contents
    setupContainerElements(data){
        var incidentSelector = this.getOption('targetElementTitleIncidentCount') || '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
        // if add html elements for each display mode
        if (this.view_mobile) {
            console.log('setup container elements', this.view_mobile, incidentSelector);
            // add arrest cards container
            $(incidentSelector).after('<div id="'+this.getOption('targetElementMobile')+'"></div>');
            // add pagination control
            $('#'+this.getOption('targetElementMobile')).after('<div id="pagination-control"></div>');
        } else {
            console.log('setup container elements', this.view_mobile, incidentSelector);
            // add table
            $(incidentSelector).after('<table id="'+this.getOption('targetElement')+'"></table>');
            // add pagination control
            $('#'+this.getOption('targetElement')).after('<div id="pagination-control"></div>');
        }
    }
    
    setupPagination(data){
        $('#pagination-control').pagination({
            dataSource: Array.from(this.getData().keys()),
            callback: this.displayPaginationTemplateFn || this.defaultFunctions.displayPaginationTemplateFn,
            afterRender: () => {
                this.parent.Utilities.googleTracking.sendTrackEvent(this.getOption('GoogleTrackingCategory'), 'Change Page');
            },
            autoHidePrevious: true,
            autoHideNext: true,
            showNavigator: true,
            className: 'paginationjs-theme-yellow paginationjs-big',
            pageSize: this.view_mobile ? 5 : this.getOption('RowLimit'), // 15 for desktop, 5 mobile
            pageRange: this.view_mobile ? 1 : 2
        });
    }
    
    validateDataFormat(newData){
        //return Array.isArray(newData);
        // TODO: Fix
        return true;
    }

    // ======= Sorting Methods =======
    sortData(columnInt, directionFlag) {
        // use Array.sort() fucntion
        this.data.sort(function (a, b) {
            if (directionFlag)
                return a[columnInt] > b[columnInt];
            else
                return a[columnInt] < b[columnInt];
        });
    }
    
    // ======= View Methods =======
    renderView() {
        var self = this;
        
        var filterFunction = self.displayDataFilterFn || self.defaultFunctions.displayDataFilterFn;
        
        var paginationTemplateFunc = self.displayPaginationTemplateFn || self.defaultFunctions.displayPaginationTemplateFn;
        
        var runTimeCallback = (data) => {
            self.setData(data);
            self.setupContainerTitle(data);
            var callbackData = self.displayDataCallbackFn || self.defaultFunctions.displayDataCallbackFn;
            var callbackRuntimeNow = (data) => {
                callbackData(data);
            };
            callbackRuntimeNow(data);
            self.setupPagination(data);
        };
        
        // TODO: extract to parent
		self.parent.data_controller.getArrests(filterFunction, runTimeCallback);
    }
    
    renderCard(row){
        if(this.renderCardFn){
            return this.renderCardFn(row);
        }else{
            var c = new ArrestCard(this.parent, row);
            return c.getHTML();
        }
    }
    
    // should be overloaded
    renderRowHeader() {
        if(this.renderRowHeaderFn){
            // if render row header override function set then use that to render table header row
            return this.renderRowHeaderFn();
        } else if (this.DataTableColumns){
            // if options columns set then use that to render table header row
            return this.DataTableColumns.renderRowColumns('header');
        }else{
            // use default columns otherwise
            // TODO: Remove this direct reference to arrests, replace with generate column definition from data supplied
            var return_text = '<tr>';
            return_text += '<th class="one column">Date:</th>';
            return_text += '<th class="one column">Team:</th>';
            return_text += '<th class="two columns">Player:</th>';
            return_text += '<th class="one column">Crime:</th>';
            return_text += '<th class="four columns">Description:</th>';
            return_text += '<th class="three columns">Outcome:</th>';
            return_text += '</tr>';

            return return_text;
        }
    }

    // should be overloaded
    renderRow(row) {
        if(this.renderRowFn){
            // if render row override function set then use that to render table row
            return this.renderRowFn(row);
        } else if (this.DataTableColumns){
            // if options columns set then use that to render table row
            return this.DataTableColumns.renderRowColumns(row);
        }else{
            // use default columns otherwise
            // TODO: Remove this direct reference to arrests, replace with generate column definition from data supplied
            var return_text = '<tr>';
            return_text += '<td class="one column" '+this.parent.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>';
            return_text += '<td class="one column">' + row['Team'] + '</td>';
            return_text += '<td class="two columns"><a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a></td>';
            return_text += '<td class="one column"><a href="CrimeCategory.html#' + row['Crime_category'] + '">' + row['Crime_category'] + '</a></td>';
            return_text += '<td class="four columns">' + row['Description'] + '</td>';
            return_text += '<td class="three columns">' + row['Outcome'] + '</td>';
            return_text += '</tr>';

            return return_text;
        }
    }
    
    // ========== Getter & Setter Methods ===========
    setDataFilterFn(fn){
        this.displayDataFilterFn = fn;
    }
    
    setRenderRowHeaderFn(fn){
        this.renderRowHeaderFn = fn;
    }
    
    setRenderRowFn(fn){
        this.renderRowFn = fn;
    }
    
    setRenderCardFn(fn){
        this.renderCardFn = fn;
    }
    
    setDataCallbackFn(fn){
        this.displayDataCallbackFn = fn;
    }
    
    setColumns(cols){
        if(this.getOptionExists('columns') || cols){
            var colsVal = cols || this.getOption('columns');
            this.DataTableColumns = new DataTableColumns(this, colsVal, {columns: colsVal});
        }
    }
    
}