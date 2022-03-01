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
        
        // if the device is mobile use mobile view style (true), else desktop (false)
        this.view_mobile = this.parent.Utilities.mobileCheck() ? true : false;
        
        this.DataTableColumns = undefined;
        
        if(this.getOptionExists('columns')){
            this.DataTableColumns = new DataTableColumns(this, this.getOption('columns'), {columns: this.getOption('columns')});
        }
        
        // render view first time
        this.renderView();
    }
    
    setContainerTitle(){
        // update incident count title
        var tableContainer = this.getOption('targetElementTableContainer') || '#arrest_details_container';
        var incidentSelector = this.getOption('targetElementTitleIncidentCount') || '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
        var h4Prefix = this.getOption('TitlePrefix') || '';
        
        //reset html of arrest details container
        $(tableContainer).html('<h4 id="arrest_details_incident_count" style="text-align:left;"># Incidents:</h4>');
        $(incidentSelector).html(h4Prefix + data.length + ' Incidents:');
    }
    
    setupPagination(){
        $('#pagination-control').pagination({
            dataSource: Array.from(this.getData().keys()),
            callback: this.displayPaginationTemplateFn,
            afterRender: () => {
                this.parent.Utilities.googleTracking.sendTrackEvent(this.getOption('GoogleTrackingCategory'), 'Change Page');
            },
            autoHidePrevious: true,
            autoHideNext: true,
            showNavigator: true,
            className: 'paginationjs-theme-yellow paginationjs-big',
            pageSize: this.view_mobile == 0 ? this.getOption('RowLimit') : 5, // 15 for desktop, 5 mobile
            pageRange: this.view_mobile == 0 ? 2 : 1
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
    
    setColumns(cols){
        if(this.getOptionExists('columns') || cols){
            var colsVal = cols || this.getOption('columns');
            this.DataTableColumns = new DataTableColumns(this, colsVal, {columns: colsVal});
        }
    }
    
    // ======= View Methods =======
    renderView() {
        var self = this;
        
        var filterFunction = self.displayDataFilterFn || ((row) => {
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
        
        var paginationTemplateFunc = self.displayPaginationTemplateFn || ((data, pagination) => {
            // for each data item display row or card
            var items = [];
            
            // if desktop add table header rows
            if (self.view_mobile == 0) {
                items.push(self.renderRowHeader());
            }
            
            // add rows or cards
            for (var rowID in data) {
                var thisDataIndex = data[rowID];
                var row = self.getData()[thisDataIndex];
                if (self.view_mobile == 0) {
                    items.push(self.renderRow(row));
                } else if (self.view_mobile == 1) {
                    items.push(self.renderCard(row));
                }
            }
            
            if (self.view_mobile == 0) {
                // desktop
                $('#'+self.getOption('targetElement')).html(items.join(""));
            } else if (self.view_mobile == 1) {
                // mobile
                $('#'+self.getOption('targetElementMobile')).html(items.join(""));
            }
        });
        
        var callbackData = self.displayDataCallbackFn || ((data) => {
            self.setData(data);
            this.setContainerTitle();
            
            
            var incidentSelector = this.getOption('targetElementTitleIncidentCount') || '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
            // if add html elements for each display mode
            if (self.view_mobile == 1) {
                $(incidentSelector).after('<div id="'+self.getOption('targetElementMobile')+'"></div>');
                $('#'+self.getOption('targetElementMobile')).after('<div id="pagination-control"></div>');
            } else {
                $(incidentSelector).after('<table id="'+self.getOption('targetElement')+'"></table>');
                $('#'+self.getOption('targetElement')).after('<div id="pagination-control"></div>');
            }
            
            /*$('#pagination-control').pagination({
                dataSource: Array.from(self.getData().keys()),
                callback: paginationTemplateFunc,
                afterRender: function() {
                    self.parent.Utilities.googleTracking.sendTrackEvent(self.getOption('GoogleTrackingCategory'), 'Change Page');
                },
                autoHidePrevious: true,
                autoHideNext: true,
                showNavigator: true,
                className: 'paginationjs-theme-yellow paginationjs-big',
                pageSize: self.view_mobile == 0 ? self.getOption('RowLimit') : 5, // 15 for desktop, 5 mobile
                pageRange: self.view_mobile == 0 ? 2 : 1
            });*/
            self.setupPagination();
            // notify check Loading Finished
            self.parent.checkLoadingFinished();
		});
        
        // TODO: extract to parent
		self.parent.data_controller.getArrests(filterFunction, callbackData);
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
    
}