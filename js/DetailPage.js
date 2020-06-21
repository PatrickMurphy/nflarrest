class DetailPage {
	constructor(pageID, pageTitle, chartOptions, arrestsUrl) {
		this.pageID = pageID; // SEA
		this.pageTitle = pageTitle; // Team
		this.arrestsUrl = arrestsUrl; // api/team/arrests.php?id=
		this.chartOptions = chartOptions; // [{url:'',field:'',targetElement:'',title:''}]
		this.arrest_view_mode = 0; // 0 = table, 1 = card (Mobile Default)
		this.data_controller;

		this.callbackReturns = 0;
		this.charts = [];

		var self = this;

		if (mobileCheck())
			this.arrest_view_mode = 1; // if mobile use cards

		$('body').append('<div id="loading-bar">Loading...</div>');
		$('#loading-bar').fadeIn();
		$(window).on('hashchange', function () {
			self.renderView()
		});

		dateRangeController.init(function (newDateRange) {
			DataController.init(function (newDataController) {
				self.data_controller = newDataController;
				self.dateRangeNFL = newDateRange;

				var page_dimension = self.pageTitle.toLowerCase();
				var filters_options = {
					presets: {},
					date_range_object: self.dateRangeNFL
				};
				filters_options['presets'][page_dimension] = {};
				filters_options['presets'][page_dimension][page_dimension] = self.pageID;
				self.FilterControl = new FiltersControl(filters_options);
				$(self.FilterControl.options.dialog_element).on('FilterDialogChanged', function () {
					console.log('render view filter');
					// todo not working, using the hash change global for now
					self.renderView();
				});

				self.renderView();
			})
		});
	}

	changeTitle(newTitle, s) {
		var self = s || this;
		document.title = "NFL Arrest | " + newTitle + " | List of Player Arrests";
		$('#pageTitle').html(self.pageTitle + ": " + newTitle);
	}

	renderView() {
		$('#loading-bar').fadeIn();
		this.pageID = update_hash(this.pageID);
		this.changeTitle();
		this.setupCharts();
		this.renderArrests();
	}

	checkLoadingFinished() {
		if (++this.callbackReturns == (1 + this.chartOptions.length)) { // 1 for arrests plus each chart
			this.callbackReturns = 0;
			$('#loading-bar').fadeOut();
			setupFacebook();
			setupTwitter();
		}
	}

	renderArrests() {
		var self = this;
		self.data_controller.getArrests(function(row){
				/*//this.arrestsUrl + this.pageID + '?' + this.FilterControl.getQueryString();
				var filterValueSet = self.FilterControl.getFilterValues();
				// copy presets to value set
				filterValueSet = Object.assign(filterValueSet, self.FilterControl.options.presets);

				// build query string
				var querystring_return = [];
				for (var filterKey in filterValueSet) {
					for (var filterSubKey in filterValueSet[filterKey]) {
						if (Array.isArray(filterValueSet[filterKey][filterSubKey])) {
							var returnVal = false;
							for (var filterSubSubKey in filterValueSet[filterKey][filterSubKey]) {
								if(row[filterSubKey] == filterValueSet[filterKey][filterSubKey][filterSubSubKey]){
									returnVal = true;
								}
								//querystring_return.push(filterSubKey + '=' + filterValueSet[filterKey][filterSubKey][filterSubSubKey]);
							}
							if(returnVal === false){
								return false;
							}
						} else {
							if(row[filterSubKey] != filterValueSet[filterKey][filterSubKey]){
								return false;
							}
							//querystring_return.push(filterSubKey + '=' + filterValueSet[filterKey][filterSubKey]);
						}
					}
				}

				return true;
				*/
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
			}, function (data) {
				var row,
					items = [];

				$('body > div.container > section > div > h4').html(data.length + ' Incidents:');
				if (self.arrest_view_mode == 0) {
					items.push(self.renderArrestRowHeader());
				}

				for (var rowID in data) {
					row = data[rowID];
					if (self.arrest_view_mode == 0) {
						items.push(self.renderArrestRow(row));
					} else if (self.arrest_view_mode == 1) {
						items.push(self.renderArrestCard(row));
					}
				}

				$('#arrest_table').html(items.join(""));
				self.checkLoadingFinished();
		});
	}

	// should be overloaded
	renderArrestRowHeader() {
		return '<tr><th class="one column">Date:</th><th class="one column">Team:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="four columns">Description:</th><th class="three columns">Outcome:</th></tr>';
	}


	// should be overloaded
	renderArrestRow(row) {
		return '<tr><td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td><td class="one column">' + row['Team'] + '</td><td class="two columns"><a href="player/' + row['Name'] + '/">' + row['Name'] + '</a></td><td class="one column"><a href="crime/' + row['Category'] + '/">' + row['Category'] + '</a></td><td class="four columns">' + row['Description'] + '</td><td class="three columns">' + row['Outcome'] + '</td></tr>';
	}

	renderArrestCard(row) {
		var card = ['<div class="card arrest_card">'];
		card.push('<span class="date_item" title="' + row['Date'] + '">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</span>');
		card.push('<span class="name_item">' + row['Name'] + '</span>');
		card.push("<br />");
		card.push('<span class="crime_item" style="background-color:#' + row['Crime_category_color'] + '"><a href="crime/' + row['Category'] + '">' + row['Category'] + "</a> </span>");
		card.push('<span class="team_item ' + row['Team'] + '" style="background-color:#' + row['Team_hex_color'] + ';"><a href="team/' + row['Team'] + '" style="color:#' + row['Team_hex_alt_color'] + ';" >' + row['Team_preffered_name'] + '</a></span>');
		card.push('<br />');
		card.push('<span class="description_item">' + row['Description'] + '</span>'); // .substring(0,n)
		card.push('<span class="outcome_item">' + row['Outcome'] + '</span>');
		card.push('</div>');
		var card2 = card.join('');
		//console.log(card2);
		return card2;
	}

	getDonutData(url, param, chartID, callback) {
		var self = this;
		$.getJSON(url + '?' + this.FilterControl.getQueryString(), function (data) {
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
		});
	}

	setupCharts() {
		var self = this;
		for (var chartID in this.chartOptions) {
			var chartOption = self.chartOptions[chartID];
			this.getDonutData(chartOption.url + self.pageID, chartOption.field, chartID, function (newData, cID) {
				self.charts.push(new DonutChart({
					data: newData,
					targetElement: self.chartOptions[cID].targetElement,
					chartTitle: self.chartOptions[cID].title
				}));
			});
		}
	}

}
