var DEBUG = false;
class DetailPage extends WebPage {
	constructor(pageTitle, chartOptions, arrestsUrl) {
        super();
		this.data_controller;
        
        this.pageID = this.Utilities.update_hash(); // SEA
		this.pageTitle = pageTitle; // Team
		this.arrestsUrl = arrestsUrl; // api/team/arrests.php?id=
		this.chartOptions = chartOptions; // [{url:'',field:'',targetElement:'',title:''}]
		this.arrest_view_mode = 0; // 0 = table, 1 = card (Mobile Default)
		
		this.callbackReturns = 0;
        
        this.arrest_data_all = [];

		var self = this;

        // if mobile use cards
		if (this.Utilities.mobileCheck())
			this.arrest_view_mode = 1; 
        
        this.StyleManager.loadCSS('css/modules/styles-detailpage.css');
        this.StyleManager.loadCSS('css/vendor/pagination.css');

		$(window).on('hashchange', () => {this.renderView(this)});

        this.DateRangeControl = new DateRangeControl(this);// pass this as parent arg
        this.data_controller = new DataController(this.DateRangeControl, this);
        
        //this.setupFilters();
        
        $('#dateRangeJquery').on('dateRangeChanged', ()=> {this.renderView(this)});
        
        // resize charts after everything loaded
        setTimeout(() => {
            this.resizeCharts();
        },1500);
        
        this.renderView(this);
        this.RenderUpdateDate();
	}

	changeTitle(newTitle, s) {
		var self = s || this;
		document.title = "NFL Arrest | " + newTitle + " | List of Player Arrests";
		$('#pageTitle').html(self.pageTitle + ": " + newTitle);
	}

	renderView(self) {
		self.LoadingBar.showLoading();
        self.pageID = this.Utilities.update_hash(self.pageID);
		self.changeTitle();
		self.setupCharts();
		self.renderArrests();
        self.resizeCharts();
	}
    
    RenderUpdateDate(){
        // included in min file is lastUpdate var
        $("#updateDateFooter").text("Updated: " + lastUpdate);
    }
    
    resizeCharts(){
        for(var i = 0; i < this.charts.length; i++){
            this.charts[i].chart.resize();
        }
    }

	checkLoadingFinished() {
		if (++this.callbackReturns == (1 + this.chartOptions.length)) { // 1 for arrests plus each chart
			this.callbackReturns = 0;
			this.loadingFinished();
		}
	}

	renderArrests() {
		var self = this;
        
        var filterFunction = (row) => {
				if(self.pageTitle == 'Team'){
					if(row['Team'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Position'){
					if(row['Position'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Player'){
					if(row['Name'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Crime'){
					if(row['Category'] != self.pageID){
						return false;
					}
				}
				return true;
			};
        
        var paginationTemplateFunc = (data, pagination) => {
            // for each data item display row or card
            var items = [];
            
            // if arrest view desktop add table header rows
            if (self.arrest_view_mode == 0) {
                items.push(self.renderArrestRowHeader());
            }
            
            for (var rowID in data) {
                var thisDataIndex = data[rowID];
                var row = self.arrest_data_all[thisDataIndex];
                if (self.arrest_view_mode == 0) {
                    items.push(self.renderArrestRow(row));
                } else if (self.arrest_view_mode == 1) {
                    items.push(self.renderArrestCard(row));
                }
            }
            
            if (self.arrest_view_mode == 0) {
                $('#arrest_table').html(items.join(""));
            } else if (self.arrest_view_mode == 1) {
                $('#arrest_cards').html(items.join(""));
            }
        };
        
        var callbackData = (data) => {
            self.arrest_data_all = data;
            //var row,
              //  items = [];

            // update incident count title
            var incidentSelector = '#arrest_details_incident_count'; //'body > div.container > section > div > h4'
            $(incidentSelector).html(data.length + ' Incidents:');

            // if add html elements for each display mode
            if (self.arrest_view_mode == 0) {
                $(incidentSelector).after('<div id="pagination-control1"></div>');
                $('#pagination-control1').after('<table id="arrest_table"></table>');// add arrest table
                $('#arrest_table').after('<div id="pagination-control"></div>');
                //$('#arrest_table').html(items.join(""));
            } else if (self.arrest_view_mode == 1) {
                $(incidentSelector).after('<div id="pagination-control1"></div>');
                $('#pagination-control1').after('<div id="arrest_cards"></div>');
                $('#arrest_cards').after('<div id="pagination-control"></div>');
            }
            
            $('#pagination-control, #pagination-control1').pagination({
                dataSource: Array.from(self.arrest_data_all.keys()),
                callback: paginationTemplateFunc,
                className: 'paginationjs-theme-yellow paginationjs-big'
            });
            // notify check Loading Finished
            self.checkLoadingFinished();
		};
        
		self.data_controller.getArrests(filterFunction, callbackData);
	}

	// should be overloaded
	renderArrestRowHeader() {
		var return_text = '<tr>';
		return_text += '<th class="one column">Date:</th>';
		return_text += '<th class="one column">Team:</th>';
		return_text += '<th class="two columns">Name:</th>';
		return_text += '<th class="one column">Crime:</th>';
		return_text += '<th class="four columns">Description:</th>';
		return_text += '<th class="three columns">Outcome:</th>';
		return_text += '</tr>';

		return return_text;
	}


	// should be overloaded
	renderArrestRow(row) {
		var return_text = '<tr>';
		return_text += '<td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>';
		return_text += '<td class="one column">' + row['Team'] + '</td>';
		return_text += '<td class="two columns"><a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a></td>';
		return_text += '<td class="one column"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + '</a></td>';
		return_text += '<td class="four columns">' + row['Description'] + '</td>';
		return_text += '<td class="three columns">' + row['Outcome'] + '</td>';
		return_text += '</tr>';

		return return_text;
	}

	renderArrestCard(row) {
        var c = new ArrestCard(row);
		return c.getHTML();
	}

	getDonutData(url, param, chartID, callback) {
		var self = this;

		var filterFunction = (row) => {
				if(self.pageTitle == 'Team'){
					if(row['Team'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Position'){
					if(row['Position'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Player'){
					if(row['Name'] != self.pageID){
						return false;
					}
				}else if(self.pageTitle == 'Crime'){
					if(row['Category'] != self.pageID){
						return false;
					}
				}

				return true;
			};

		var callbackFunc = (data) => {
				var theData = [];
				var index, i = 0;
				var otherArray = ['Other', 0];
				for (index in data) {
					if (++i < 12) {
						theData.push([data[index][param], data[index]['arrest_count']]);
					} else {
						otherArray[1] = parseInt(otherArray[1]) + parseInt(data[index]['arrest_count']);
					}
				}
				theData.push(otherArray);
				self.checkLoadingFinished();
				callback(theData, chartID);
			};			

		self.data_controller.getDonutChart(param, filterFunction, callbackFunc);
	}

	setupCharts() {
		var self = this;
		for (var chartID in self.chartOptions) {
			var chartOption = self.chartOptions[chartID];
			self.getDonutData(chartOption.url + self.pageID, chartOption.field, chartID, (newData, cID) => {
				self.charts.push(new DonutChart({
					data: newData,
					targetElement: self.chartOptions[cID].targetElement,
					chartTitle: self.chartOptions[cID].title
				},self));
			});
		}
	}
}