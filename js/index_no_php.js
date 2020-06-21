var dateRangeNFL,
	mainChartReturned = false;

var last_start_pos = 0,
	listsReturnCount = 0,
	listsReturned = false,
	ytdChart = false,
	mainChartStyleID = 0
	detail_page_active = true;

//removed for es6 var nflLoadingBar;

// controller to load data from DB or pre-queried json
detail_page_active = false;
var data_controller;

$(window).load(function () {
	//removed for es6 nflLoadingBar = new LoadingBarManager();
	nflLoadingBar.init();
	dateRangeController.init(function (newDateRange) {
		DataController.init(function (newDataController) {
			//nflLoadingBar.reset();
			data_controller = newDataController;
			dateRangeNFL = newDateRange;

			evaluateHash();
			changeTopChart();

			// first load of top lists
			load_top_lists('first');

			$('#dateRangeJquery').on('dateRangeChanged', function (e) {
				nflLoadingBar.showLoading();
				setupChart();
				reload_top_lists();
			});

			$('#loadMoreLists').click(load_top_lists);

			// remove for static
			//renderActivePlayerArrests();
			
			if(detail_page_active){
				data_controller.getTeams(loadTeamLinks);
			}else{
				$('#bottomTeamLinks').hide();
			}

			addChartButtonListeners();

			// button for mobile to show the newsletter form
			$('#newsletterDisplayBtn').click(function () {
				$('#newsletterContainer').css('display', 'block');
				$('#newsletterDisplayBtn').css('display', 'none');
				googleTracking.sendTrackEvent('Email List', 'MobileShowForm');
			});
		});
	});

	// add click listener to li so that entire element is clickable rather than just the link
	if(detail_page_active){
		$(".top-list ol li").click(function () {
			window.location = $(this).find("a").attr("href");
			console.log($(this).find("a").attr("href"));
			return false;
		});
	}
});

function addChartButtonListeners() {
	// Settup chart buttons
	$('#mainChartByTeamBtn').click(function () {
		ytdChart = false;
		mainChartStyleID = 0;
		window.location.hash = "ByTeam";
		changeTopChart();
		googleTracking.sendTrackEvent('mainChart', 'switchToByTeam');
	});
	$('#mainChartByYearBtn').click(function () {
		ytdChart = true;
		mainChartStyleID = 1;
		window.location.hash = "ByYear";
		changeTopChart();
		googleTracking.sendTrackEvent('mainChart', 'switchToByYear');
	});
	$('#mainChartBySeasonBtn').click(function () {
		ytdChart = false;
		mainChartStyleID = 2;
		window.location.hash = "BySeason";
		changeTopChart();
		googleTracking.sendTrackEvent('mainChart', 'switchToBySeason');
	});
	$('#mainChartByConfBtn').click(function () {
		ytdChart = true;
		mainChartStyleID = 3;
		window.location.hash = "ByDayOfWeek";
		changeTopChart();
		googleTracking.sendTrackEvent('mainChart', 'switchToByDayOfWeek');
	});
	$('#mainChartByConfDivBtn').click(function () {
		ytdChart = true;
		mainChartStyleID = 4;
		window.location.hash = "ByDivision";
		changeTopChart();
		googleTracking.sendTrackEvent('mainChart', 'switchToByDivision');
	});
}

function renderActivePlayerArrests() {
	//$.getJSON('http://nflarrest.com/api/overall/activePlayerArrests.php', function (data) {
	data_controller.getActivePlayerArrests(function(data){
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

function loadTeamLinks(data) {
	$.each(data, function (key, val) {
		$('#bottomTeamLinks').append('<a href="team/' + val.Team + '/"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (val.Team_logo_id * 20) + 'px;background-size:100%;"></span> ' + val.Team_preffered_name + '</a> ');
	});
}

function loadingFinished() {
	console.log('loadfinish');
	setupArrestOMeter();
	nflLoadingBar.hideLoading();
	listsReturned = false;
	mainChartReturned = false;
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

function setupArrestOMeter() {
	var animate = true;
	//$.getJSON('http://nflarrest.com/api/v1/meter', function (data) {
	data_controller.getArrestMeter(function (data) {
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

function evaluateHash(){
	// if hash set, set chart type
	if (window.location.hash) {
		if (window.location.hash == "#ByYear") {
			mainChartStyleID = 1;
		} else if (window.location.hash == "#BySeason") {
			mainChartStyleID = 2;
		} else {
			mainChartStyleID = 0;
		}
	}
}

function changeChartButtonStyle(){
	if (mainChartStyleID == 1) {
		$('.mainChartBtn').removeClass('button-primary');
		$('#mainChartByYearBtn').addClass('button-primary');
	} else if (mainChartStyleID == 0) {
		$('.mainChartBtn').removeClass('button-primary');
		$('#mainChartByTeamBtn').addClass('button-primary');
	} else if (mainChartStyleID == 2) {
		$('.mainChartBtn').removeClass('button-primary');
		$('#mainChartBySeasonBtn').addClass('button-primary');
	} else if (mainChartStyleID == 3) {
		$('.mainChartBtn').removeClass('button-primary');
		$('#mainChartByConfBtn').addClass('button-primary');
	} else if (mainChartStyleID == 4) {
		$('.mainChartBtn').removeClass('button-primary');
		$('#mainChartByConfDivBtn').addClass('button-primary');
	}
}

function changeTopChart() {
	setupChart();
	changeChartButtonStyle();
}

function getOverallChartData(callback) {
	if (mainChartStyleID == 0) {
		data_controller.getOverallChart("Crime","Team Code", "Team Code", "DESC", callback);
		//$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Year&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=Year&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
	} else if (mainChartStyleID == 1) {
		data_controller.getOverallChart("Crime","Year", "Year", "ASC", callback);
		//$.getJSON("http://nflarrest.com/api/overall/topTeams.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
	} else if (mainChartStyleID == 3) {
		data_controller.getOverallChart("Crime","Day", "Day", "ASC", callback);
		//$.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Day&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=DayOrder&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
	} else if (mainChartStyleID == 2) {
		data_controller.getOverallChart("SeasonState","Season", "Season", "ASC", callback);
		//$.getJSON("http://nflarrest.com/api/v1/ArrestsSeasonState?start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
	} else if (mainChartStyleID == 4) {
		data_controller.getOverallChart("Division","Year", "Year", "ASC", callback);
		//$.getJSON("http://nflarrest.com/api/overall/conferenceDivisionByYear.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
	}
}

function setupChart() {
	if (typeof (stackedBarChart.stackedChart) != "undefined")
		stackedBarChart.stackedChart.destroy();
	getOverallChartData(function (newData) {
		stackedBarChart.init({
			data: newData,
			targetElement: '#chart',
			targetExpandBtn: '#details_summary_btn',
			hideBtn: '#hideAll_btn',
			showBtn: '#showAll_btn'
		});
		mainChartReturned = true;
		if (listsReturned === true && mainChartReturned === true) {
			mainChartReturned = false;
			listsReturned = false;
			loadingFinished();
		}
	});
}

function load_top_list(data, page, prefix, list, values, replace) {
	replace = replace || false;
	if (replace) {
		last_start_pos = 0;
	}
	var items = [];
	if (data.length > 0) {
		$.each(data, function (key, val) {
			var link = "<a href=\"" + page + "/" + val[values[0]] + "/\">";
			var link_end = '</a>';
			if (page == '' || !detail_page_active) {
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

function load_top_lists(first, replace) {
	first = first || 'not first';
	replace = replace || false;

	$('.list-no-data-msg-item').remove();

	if (first != 'first') {
		googleTracking.sendTrackEvent('TopLists', 'Load Next Page');
	}
	var url = 'http://nflarrest.com/api/overall/topLists.php?limit=5&start_pos=' + last_start_pos + '&start_date=' + dateRangeNFL.getStart() + '&end_date=' + dateRangeNFL.getEnd();
	//$.getJSON(url, function (data) {
	data_controller.getTopLists(last_start_pos, dateRangeNFL.getStart(), dateRangeNFL.getEnd(), function (data) {
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
		if (mainChartReturned === true && listsReturned === true) {
			mainChartReturned = false;
			listsReturned = false;
			loadingFinished();
		}
	});
}

function reload_top_lists() {
	last_start_pos = 0;
	load_top_lists('not first', true);
}
