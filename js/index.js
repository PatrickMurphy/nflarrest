var dateRangeNFL,
    mainChartReturned = false;
var last_start_pos = 0,
    listsReturnCount = 0,
    listsReturned = false,
    ytdChart = false,
    mainChartStyleID = 0;

$(window).load(function () {
    dateRangeController.init(function (newDateRange) {
        nflLoadingBar.init();
        dateRangeNFL = newDateRange;
        if (window.location.hash) {
            if (window.location.hash == "#ByYear") {
                mainChartStyleID = 1;
            } else if (window.location.hash == "#BySeason") {
                mainChartStyleID = 2;
            } else {
                mainChartStyleID = 0;
            }
        }
        changeTopChart();
        load_top_lists('first');

        $('#dateRangeJquery').on('dateRangeChanged', function (e) {
            nflLoadingBar.showLoading();
            setupChart();
            reload_top_lists();
        });

        $('#loadMoreLists').click(load_top_lists);

        renderActivePlayerArrests();

        $.getJSON('http://nflarrest.com/api/v1/team', loadTeamLinks);
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
        //$('#mainChartByConfBtn').click(function(){
        //    ytdChart = true;
        //    mainChartStyleID = 3;
        //    window.location.hash = "ByConference";
        //   changeTopChart();
        //    googleTracking.sendTrackEvent('mainChart','switchToByConference');
        //});
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
        //if ($(window).width() >= 800) {
        //	 $('#tooltip').fadeIn();
        //}
        //$( document ).tooltip();
    });
});

function renderActivePlayerArrests() {
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

function loadTeamLinks(data) {
    $.each(data, function (key, val) {
        $('#bottomTeamLinks').append('<a href="team/' + val.Team + '/"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (val.Team_logo_id * 20) + 'px;background-size:100%;"></span> ' + val.Team_preffered_name + '</a> ');
    });
}

function loadingFinished() {
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
};

function setupArrestOMeter() {
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

function changeTopChart() {
    setupChart();
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

function getOverallChartData(callback) {
    if (mainChartStyleID == 1) {
        $.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Year&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=Year&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
    } else if (mainChartStyleID == 0) {
        $.getJSON("http://nflarrest.com/api/overall/topTeams.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
    } else if (mainChartStyleID == 2) {
        $.getJSON("http://nflarrest.com/api/v1/ArrestsSeasonState?start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
    } else if (mainChartStyleID == 3) {
        $.getJSON("http://nflarrest.com/api/overall/customStackedBar.php?bar_col=Day&stack_col=Crime&bar_order_dir=ASC&order_dir=DESC&bar_order_col=DayOrder&legend_order_col=Measure&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
    } else if (mainChartStyleID == 4) {
        $.getJSON("http://nflarrest.com/api/overall/conferenceDivisionByYear.php?graph=true&start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), callback);
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
        if (listsReturned) {
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

function load_top_crimes_list(replace) {
    replace = replace || false;
    load_top_list("http://nflarrest.com/api/overall/topCrimes.php?limit=5&start_pos=" + last_start_pos, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
}

function load_top_players_list(replace) {
    replace = replace || false;
    load_top_list("http://nflarrest.com/api/overall/topPlayers.php?limit=5&start_pos=" + last_start_pos, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
}

function load_top_positions_list(replace) {
    replace = replace || false;
    load_top_list("http://nflarrest.com/api/overall/topPositions.php?limit=5&start_pos=" + last_start_pos, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);
}

function load_top_lists(first, replace) {
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

function reload_top_lists() {
    last_start_pos = 0;
    load_top_lists('not first', true);
}
