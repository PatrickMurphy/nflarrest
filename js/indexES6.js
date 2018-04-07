var IndexPage;
class IndexPage {
	constructor() {
		this.dateRangeNFL;
		this.mainChartReturned = false;
		this.last_start_pos = 0;
		this.listsReturnCount = 0;
		this.listsReturned = false;
		this.ytdChart = false;
		this.mainChartStyleID = 0;

		this.MainChartOptions = {
			buttons: [{
				title: 'By Team',
				short_title: 'ByTeam',
				id: 0,
				ytdChart: false,
				element: '#mainChartByTeamBtn'
            }, {
				title: 'By Year',
				short_title: 'ByYear',
				id: 1,
				ytdChart: true,
				element: '#mainChartByYearBtn'
            }, {
				title: 'By Season',
				short_title: 'BySeason',
				id: 2,
				ytdChart: false,
				element: '#mainChartBySeasonBtn'
            }, {
				title: 'By Day',
				short_title: 'ByDayOfWeek',
				id: 3,
				ytdChart: true,
				element: '#mainChartByConfBtn'
            }, {
				title: 'By Division',
				short_title: 'ByDivision',
				id: 4,
				ytdChart: true,
				element: '#mainChartByConfDivBtn'
            }]
		};
		var self = this;
		// loop through, add the button listeners
		for (var i in this.MainChartOptions.buttons) {
			var but = self.MainChartOptions.buttons[i];
			$(but.element).click(function () {
				ytdChart = but.ytdChart;
				mainChartStyleID = but.id;
				window.location.hash = but.short_title;
				changeTopChart();
				googleTracking.sendTrackEvent('mainChart', 'changeTo' + but.short_title);
			});

		}

		this.renderActivePlayerArrests();

		dateRangeController.init(function (newDateRange) {
			self.dateRangeNFL = newDateRange;
			self.renderView();
			$('#dateRangeJquery').on('dateRangeChanged', function () {
				self.renderView();
			});
		});

		// add click listener to li so that entire element is clickable rather than just the link
		$(".top-list ol li").click(function () {
			window.location = $(this).find("a").attr("href");
			return false;
		});
	}

	renderView() {
		nflLoadingBar.showLoading();
		this.setupChart();
		this.reload_top_lists();
		this.renderTeamLinks();
		this.changeTopChart();
		this.load_top_lists('first');


		$('#loadMoreLists').click(this.load_top_lists);


		// button for mobile to show the newsletter form
		$('#newsletterDisplayBtn').click(function () {
			$('#newsletterContainer').css('display', 'block');
			$('#newsletterDisplayBtn').css('display', 'none');
			googleTracking.sendTrackEvent('Email List', 'MobileShowForm');
		});
	}

	renderTeamLinks() {
		$.getJSON('http://nflarrest.com/api/v1/team', function (data) {
			$.each(data, function (key, val) {
				$('#bottomTeamLinks').append('<a href="team/' + val.Team + '/"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (val.Team_logo_id * 20) + 'px;background-size:100%;"></span> ' + val.Team_preffered_name + '</a> ');
			});
		});

	}

	renderActivePlayerArrests() {
		$.getJSON('http://nflarrest.com/api/overall/activePlayerArrests.php', function (data) {
			var html_text = '<span class="kpi">' +
				'<span class="kpi-value-large">' + (data[0].percent * 100).toFixed(2) + '%</span>' +
				'<span class="kpi-description-smaller">Active Players Arrested</span>' +
				'<span>' +
				'<span style="display:inline-block;"><span class="kpi-value-small">' + data[0].arrested + '</span>' +
				'<span class="kpi-description-x-small">arrested</span></span>' +
				'<span style="display:inline-block;margin-left:.5em;"><span class="kpi-value-small">' + data[0].active + '</span>' +
				'<span class="kpi-description-x-small">active</span>' +
				'</span></span>';

			$('#activePlayerArrestRate').html(html_text);
		});
	}

	loadingFinished() {
		this.setupArrestOMeter();
		nflLoadingBar.hideLoading();
		this.listsReturned = false;
		this.mainChartReturned = false;
		setupFacebook();
		setupTwitter();
		$('#newsletterForm').submit(function (e) {
			e.preventDefault();
			$.ajax({
				url: 'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
				type: 'POST',
				data: {
					'email': $('input[name=email]').val()
				}
			});
			$('#newsletterForm').html('<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>');
			googleTracking.sendTrackEvent('Email List', 'Subscribe');
		});
		$('#newsletterForm input[name=email]').focus(function () {
			googleTracking.sendTrackEvent('Email List', 'Focus');
		});
	}

	setupArrestOMeter() {
		var animate = true;
		$.getJSON('http://nflarrest.com/api/v1/meter', function (data) {
			var daysSince = data['current']['daysSince'],
				recordAlltime = data['alltime']['record'],
				recordAvg = data['alltime']['average'],
				percent = parseInt(daysSince) / recordAlltime;
			$('#arrest_meter_text').html('It has been <b>' + daysSince + '</b> Days since the last arrest.</p>');
			$('#arrest_meter_subtext').html('Average: <b>' + recordAvg + '</b> Days | Record W/O arrest: <b>' + recordAlltime + '</b> Days');
			$('.recordHolder').html(recordAlltime);
			$('.avgRecord').html(recordAvg);
			if (animate) {
				$('.meter-fg').animate({
					width: (percent * 100) + '%'
				}, 1750);
			} else {
				$('.meter-fg').width((percent * 100) + '%');
			}
			//$('#arrest-o-meter').append('<ul id="record_history_list"></ul>');
			//for(var record in data['history']){
			//	$('#record_history_list').append('<li>'+data['history'][record]['date']+'<span>'+data['history'][record]['record']+'</span></li>');
			//}
		});
	}

	changeTopChart() {
		this.setupChart();
		if (this.mainChartStyleID == 1) {
			$('.mainChartBtn').removeClass('button-primary');
			$('#mainChartByYearBtn').addClass('button-primary');

		} else if (this.mainChartStyleID == 0) {
			$('.mainChartBtn').removeClass('button-primary');
			$('#mainChartByTeamBtn').addClass('button-primary');
		} else if (this.mainChartStyleID == 2) {
			$('.mainChartBtn').removeClass('button-primary');
			$('#mainChartBySeasonBtn').addClass('button-primary');
		} else if (this.mainChartStyleID == 3) {
			$('.mainChartBtn').removeClass('button-primary');
			$('#mainChartByConfBtn').addClass('button-primary');
		} else if (this.mainChartStyleID == 4) {
			$('.mainChartBtn').removeClass('button-primary');
			$('#mainChartByConfDivBtn').addClass('button-primary');

		}
	}

	getOverallChartData(callback) {
		if (this.mainChartStyleID == 1) {
			$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Year&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=Year&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
		} else if (this.mainChartStyleID == 0) {
			$.getJSON("http://nflarrest.com/api/overall/topTeams.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
		} else if (this.mainChartStyleID == 2) {
			$.getJSON("http://nflarrest.com/api/v1/ArrestsSeasonState?start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
		} else if (this.mainChartStyleID == 3) {
			$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Day&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=DayOrder&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
		} else if (this.mainChartStyleID == 4) {
			$.getJSON("http://nflarrest.com/api/overall/conferenceDivisionByYear.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
		}
	}

	setupChart() {
		if (typeof (stackedBarChart.stackedChart) != "undefined")
			stackedBarChart.stackedChart.destroy();
		this.getOverallChartData(function (newData) {
			stackedBarChart.init({
				data: newData,
				targetElement: '#chart',
				targetExpandBtn: '#details_summary_btn',
				hideBtn: '#hideAll_btn',
				showBtn: '#showAll_btn'
			});
			this.mainChartReturned = true;
			if (this.listsReturned) {
				this.loadingFinished();
			}
		});
	}

	load_top_list(data, page, prefix, list, values, replace) {
		replace = replace || false;
		if (replace) {
			last_start_pos = 0;
		}
		var items = [];
		if (data.length > 0) {
			$.each(data, function (key, val) {
				var link = "<a href=\"" + page + "/" + val[values[0]] + "/\">";
				var link_end = '</a>';
				if (page == '') {
					link = '';
					link_end = '';
				}
				items.push("<li id='" + prefix + key + "'>" + link + "<span>" + val[values[0]] + "</span><span class='value-cell'>" + val[values[1]] + "</span>" + link_end + "</li>");
			});
		} else {
			if (replace) {
				items.push('<li class="list-no-data-msg-item">No Data Available for this Date Range</li>');
			}
		}
		if (replace) {
			$(list).html(items.join(""));
		} else {
			$(list).append(items.join(""));
		}
	}

	load_top_crimes_list(replace) {
		replace = replace || false;
		load_top_list("http://nflarrest.com/api/overall/topCrimes.php?limit=5&start_pos=" + last_start_pos, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
	}

	load_top_players_list(replace) {
		replace = replace || false;
		load_top_list("http://nflarrest.com/api/overall/topPlayers.php?limit=5&start_pos=" + last_start_pos, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
	}

	load_top_positions_list(replace) {
		replace = replace || false;
		load_top_list("http://nflarrest.com/api/overall/topPositions.php?limit=5&start_pos=" + last_start_pos, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);
	}

	load_top_lists(first, replace) {
		first = first || 'not first';
		replace = replace || false;

		$('.list-no-data-msg-item').remove();

		if (first != 'first') {
			googleTracking.sendTrackEvent('TopLists', 'Load Next Page');
		}
		var url = 'http://nflarrest.com/api/overall/topLists.php?limit=5&start_pos=' + last_start_pos + '&start_date=' + dateRangeNFL.getStart() + '&end_date=' + dateRangeNFL.getEnd();
		$.getJSON(url, function (data) {
			var crimes_list = data[0],
				players_list = data[1],
				positions_list = data[2];

			if ((crimes_list.length + players_list.length + positions_list.length) <= 0 && last_start_pos == 0) {
				console.log('no data returned');

				// create error
			}

			load_top_list(crimes_list, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
			load_top_list(players_list, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
			load_top_list(positions_list, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);

			// set returns
			listsReturned = true;
			listsReturnCount = 0;
			last_start_pos = last_start_pos + 5;
			if (mainChartReturned === true) {
				loadingFinished();
			}
		});
	}

	reload_top_lists() {
		last_start_pos = 0;
		load_top_lists('not first', true);
	}

}
$(window).load(function () {
	IndexPage = new IndexPage();
});
