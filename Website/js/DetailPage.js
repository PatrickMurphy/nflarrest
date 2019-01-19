class DetailPage {
	constructor(pageID, pageTitle, chartOptions, arrestsUrl) {
		this.pageID = pageID; // SEA
		this.pageTitle = pageTitle; // Team
		this.arrestsUrl = arrestsUrl; // api/team/arrests.php?id=
		this.chartOptions = chartOptions; // [{url:'',field:'',targetElement:'',title:''}]
		this.arrest_view_mode = 0; // 0 = table, 1 = card (Mobile Default)

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
			self.dateRangeNFL = newDateRange;
			self.renderView();
			$('#dateRangeJquery').on('dateRangeChanged', function () {
				self.renderView();
			});
		});
	}

	changeTitle(newTitle, s) {
		var self = s || this;
		document.title = "NFL Arrest | " + newTitle + " | List of Player Arrests";
		$('#pageTitle').html(self.pageTitle + ": " + newTitle);
	}

	renderView() {
		$('#loading-bar').fadeIn();
		this.pageID = update_hash();
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
		$.getJSON(this.arrestsUrl + this.pageID + '&start_date=' + this.dateRangeNFL.getStart() + '&end_date=' + this.dateRangeNFL.getEnd(), function (data) {
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
		$.getJSON(url + '&start_date=' + this.dateRangeNFL.getStart() + '&end_date=' + this.dateRangeNFL.getEnd(), function (data) {
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
