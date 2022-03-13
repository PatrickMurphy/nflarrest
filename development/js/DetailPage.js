class DetailPage extends DataDrivenWebPage {
    // TODO: Remove arrestsUrl parameter
    constructor(pageTitle, chartOptions, tableOptions, arrestsUrl) {
        super(pageTitle);
        this.arrestsUrl = arrestsUrl || 'empty url'; // TODO: Remove this variable and all refrences // example value: api/team/arrests.php?id=
        tableOptions = tableOptions === undefined ? false : tableOptions;
        //this.data_controller; // todo remove this line?

        this.pageID = this.Utilities.update_hash(); // get hash value ex: SEA for team.html
        this.pageTitle = pageTitle; // Team
        this.chartOptions = chartOptions; // [{url:'',field:'',targetElement:'',title:''}]
        this.tableOptions = tableOptions;
        
        this.callbackReturns = 0;

        this.arrest_data_all = [];
        this.data_row_count = 0;
        
        var self = this;
        
        this.FilterFunction = (row) => {
            if(!this.data_controller.dateLimit(row,this.DateRangeControl.getStart(),this.DateRangeControl.getEnd())){
                return false;
            }
            if (self.pageTitle == 'Team') {
                if (row['Team'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Position') {
                if (row['Position'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Player') {
                if (row['Name'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Crime') {
                if (row['Category'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Crime Category') {
                if (row['Crime_category'] != self.pageID) {
                    return false;
                }
            }

            return true;
        };
        
        this.StyleManager.loadCSS('css/modules/styles-detailpage.css');
        this.StyleManager.loadCSS('css/vendor/pagination.css');

        //this.DateRangeControl = new DateRangeControl(this); // pass this as parent arg
        //this.data_controller = new DataController(this.DateRangeControl, this);
        if(tableOptions){
            this.DataTable_ModuleID = this.addModule(new DataTable(this,[],tableOptions));
        }else{
            this.DataTable_ModuleID = this.addModule(new DataTable(this));
        }

        //this.setupFilters();

        //$('#dateRangeJquery').on('dateRangeChanged', () => {
        //    this.renderView(this)
        //});

        $(window).on('hashchange', () => {
            this.renderView(this)
        });
        
        // resize charts after everything loaded
        setTimeout(() => {
            this.resizeCharts();
        }, 1000);

        this.renderView(this);
    }

    // ====================================== //
    // --- WebPage.js Overrides ------------- //
    // ====================================== //
    // function that determines if all runtime data has been loaded as well as define what to do when the page is ready to display
    checkLoadingFinished() {
        // chart count plus arrest table data pull
        var total_expected_returns = (1 + this.chartOptions.length);
        if (++this.callbackReturns == total_expected_returns) {
            this.callbackReturns = 0;
            this.loadingFinished();
        }
    }

    // TODO: change name to a new convention of action, not return functions
    renderView(self) {
        super.renderView(this.FilterFunction);
        self.LoadingBar.showLoading();
        self.pageID = this.Utilities.update_hash(self.pageID);
        self.changeTitle();
        self.setupCharts();
        self.renderModules();
        self.resizeCharts();
        var show_chart_arrest_limit = (self.arrest_view_mode == 0 ? 3 : 6);
        var arrest_count = self.getModule(self.DataTable_ModuleID).getData().length;
        if (arrest_count <= show_chart_arrest_limit) {
            $('aside').hide();
        } //else {
            //$('aside').show(); // TODO: Fix display after being hidden
        //}
    }

    // ============================ //
    // --- Render View Functions -- //
    // ============================ //

    // function used in render view to change the page document title and ui #pageTitle
    // expects [newTitle] parameter with the new text
    // optional [s] parameter that defines the instance of the page
    // no return
    // TODO: Rename from changeTitle to setPageTitle
    changeTitle(newTitle, thisRef, titleHTMLAppend) {
        var self = thisRef || this;
        titleHTMLAppend = titleHTMLAppend || '';
        document.title = "NFL Arrest | " + newTitle + " | List of Player Arrests";
        $('#pageTitle').html(self.pageTitle + ": " + newTitle + titleHTMLAppend);
    }

    // function that iterates through each chart elemet and resizes it
    // no parameters, no return
    resizeCharts() {
        for (var i = 0; i < this.charts.length; i++) {
            this.charts[i].chart.resize();
        }
    }

    // initialize charts
    setupCharts() {
        var self = this;
        for (var chartID in self.chartOptions) {
            var chartOption = self.chartOptions[chartID];
            self.getDonutData(chartOption.url + self.pageID, chartOption.field, chartID, (newData, cID) => {
                self.charts.push(new DonutChart({
                    data: newData,
                    targetElement: self.chartOptions[cID].targetElement,
                    chartTitle: self.chartOptions[cID].title
                }, self));
            });
        }
    }

    // getDonutData retrieves data for a donut/pie chart. called within setupCharts()
    getDonutData(url, param, chartID, callback) {
        var self = this;

        /*var filterFunction = (row) => {
            if (self.pageTitle == 'Team') {
                if (row['Team'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Position') {
                if (row['Position'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Player') {
                if (row['Name'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Crime') {
                if (row['Category'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Crime Category') {
                if (row['Crime_category'] != self.pageID) {
                    return false;
                }
            }

            return true;
        };*/

        var callbackFunc = (data) => {
            self.data_row_count += data.length;
            var theData = [];
            var index, i = 0;
            var otherArray = ['Other', 0];
            var categoryLimit = 12;
            for (index in data) {
                if (++i < categoryLimit) {
                    theData.push([data[index][param], data[index]['arrest_count']]);
                } else {
                    otherArray[1] = parseInt(otherArray[1]) + parseInt(data[index]['arrest_count']);
                }
            }
            if(data.length >= categoryLimit){
                theData.push(otherArray);
            }
            self.checkLoadingFinished();
            callback(theData, chartID);
        };

        self.data_controller.getDonutChart(param, this.FilterFunction, callbackFunc);
    }
    // --=== End Render View Functions ===-- // 
}