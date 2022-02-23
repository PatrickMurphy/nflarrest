class DataTable extends Module {
    // construct object
    constructor(parent, data, options) {
        super('DataTable', parent, data, (options || {
            targetElement: 'arrest_table',
            targetElementMobile: 'arrest_cards',
            TitlePrefix: '',
            RowLimit:15,
            GoogleTrackingCategory: 'DetailPageArrests'
        }));

        this.renderRowFn = undefined;
        this.renderRowHeaderFn = undefined;
        this.renderCardFn = undefined;
        this.displayDataFilterFn = undefined;
        this.displayPaginationTemplateFn = undefined;
        this.displayDataCallbackFn = undefined;
        
        this.data_all = data;

        this.current_page = 0;
        this.row_limit = 15;

        // default to desktop view
        this.view_mobile = false;

        // if the device is mobile use mobile view style
        if (this.parent.Utilities.mobileCheck()) {
            this.view_mobile = true;
        }

        // render view first time
        this.renderView();
    }
    
    // TODO move to main module or datadrivenmodule class
    getData(){
        return this.data_all;
    }
    
    validateDataFormat(newData){
        //return Array.isArray(newData);
        // TODO: Fix
        return true;
    }

    // ======= Sortinfg Methods =======
    sortData(columnInt, directionFlag) {
        // use Array.sort() fucntion
        this.data.sort(function (a, b) {
            if (directionFlag)
                return a[columnInt] > b[columnInt];
            else
                return a[columnInt] < b[columnInt];
        });
    }
/*
    // ======= Pagination Methods =======
    setPage(intPage) {
        intPage = intPage || this.current_page;
        this.current_page = intPage;
    }

    setRowLimit(intRowLimit) {
        intRowLimit = intRowLimit || 15;
        this.row_limit = intRowLimit;
    }

    nextPage() {
        this.current_page++;
    }

    previousPage() {
        this.current_page--;
    }
*/
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
				} else if (self.pageTitle == 'Crime Category') {
                    if (row['Crime_category'] != self.pageID) {
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
                var row = self.data_all[thisDataIndex];
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
            self.data_all = data;
            
            //reset html of arrest details container
            $('#arrest_details_container').html('<h4 id="arrest_details_incident_count" style="text-align:left;"># Incidents:</h4>');
            
            // update incident count title
            var incidentSelector = '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
            var h4Prefix = this.getOption('TitlePrefix') || '';
            $(incidentSelector).html(h4Prefix + data.length + ' Incidents:');

            // if add html elements for each display mode
            if (self.view_mobile == 1) {
                $(incidentSelector).after('<div id="'+self.getOption('targetElementMobile')+'"></div>');
                $('#'+self.getOption('targetElementMobile')).after('<div id="pagination-control"></div>');
            } else {
                $(incidentSelector).after('<table id="'+self.getOption('targetElement')+'"></table>');
                $('#'+self.getOption('targetElement')).after('<div id="pagination-control"></div>');
            }
            
            $('#pagination-control').pagination({
                dataSource: Array.from(self.data_all.keys()),
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
            });
            // notify check Loading Finished
            self.parent.checkLoadingFinished();
		});
        
        // TODO: extract to parent
		self.parent.data_controller.getArrests(filterFunction, callbackData);
    }
    
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
            return this.renderRowHeaderFn();
        }else{
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
            return this.renderRowFn(row);
        }else{
            var return_text = '<tr>';
            return_text += '<td class="one column" '+this.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>';
            return_text += '<td class="one column">' + row['Team'] + '</td>';
            return_text += '<td class="two columns"><a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a></td>';
            return_text += '<td class="one column"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + '</a></td>';
            return_text += '<td class="four columns">' + row['Description'] + '</td>';
            return_text += '<td class="three columns">' + row['Outcome'] + '</td>';
            return_text += '</tr>';

            return return_text;
        }
    }
    
    // function to return the tooltip attribute html for date display elements
    // expects [row] parameter, a js object that contains a date property formatted as a string, if it contains T (Date Format to add time)
    // return type: string
    getHTMLDateTitleAttribute(row,datecol){
        var date_column = datecol || 'Date';
        if(row.hasOwnProperty(date_column)){
            return 'title="'+row[date_column].split('T')[0]+'"';
        }else{
            console.error('DataTable Module > getHTMLDateTitleAttribute: Row did not contain ['+date_column+'].');
        }
    }
    
}