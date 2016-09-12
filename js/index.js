var dateRangeNFL,
    mainChartReturned = false;
var last_start_pos = 0,
    listsReturnCount = 0,
    listsReturned = false,
    ytdChart = false;

$( window ).load(function() {
	dateRangeController.init(function(newDateRange){
		nflLoadingBar.init();
		dateRangeNFL = newDateRange;
		setupChart();
		load_top_lists('first');

		$('#dateRangeJquery').on('dateRangeChanged', function (e){
			nflLoadingBar.showLoading();
			setupChart();
			reload_top_lists();
		});

		$('#loadMoreLists').click(load_top_lists);

        $.getJSON('http://nflarrest.com/api/v1/team', function(data){
            $.each(data,function(key,val){
                $('#bottomTeamLinks').append('<a href="team.html?utm_source=onsite&utm_medium=teambotlinks&utm_term='+val.Team+'&utm_campaign=TeamBotLinkAddition#'+val.Team+'">'+val.Team_city +' '+val.Team_name+'</a> ');
            });
        });
        $('#mainChartByTeamBtn').click(function(){
            ytdChart = false;
            changeTopChart();
            googleTracking.sendTrackEvent('mainChart','switchToByTeam');
        });
        $('#mainChartByYearBtn').click(function(){
            ytdChart = true;
            changeTopChart();
            googleTracking.sendTrackEvent('mainChart','switchToByYear');
        });
        $('#mainChartByTeamBtn').addClass('button-primary');
		//if ($(window).width() >= 800) {
		//	 $('#tooltip').fadeIn();
		//}
		//$( document ).tooltip();
	});
});

function loadingFinished(){
	setupArrestOMeter();
	nflLoadingBar.hideLoading();
	listsReturned = false;
	mainChartReturned = false;
	setupFacebook();
	setupTwitter();
	$('#newsletterForm').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
        type:'POST',
        data:{'email':$('input[name=email]').val()}
    });
		$('#newsletterForm').html('<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>');
		googleTracking.sendTrackEvent('Email List','Subscribe');
});
		$('#newsletterForm input[name=email]').focus(function(){
			googleTracking.sendTrackEvent('Email List','Focus');
		});
};

function setupArrestOMeter(){
	var animate = true;
	$.getJSON('http://nflarrest.com/api/meter.php?limit=0', function(data){
		var daysSince = data['current']['daysSince'],
				recordAlltime = data['alltime']['record'],
				recordAvg = data['alltime']['average'],
				percent = parseInt(daysSince) / recordAlltime;
		$('#arrest_meter_text').html('It has been <b>'+ daysSince +'</b> Days since the last arrest.</p>');
		$('#arrest_meter_subtext').html('Average: <b>'+recordAvg+'</b> Days | Record W/O arrest: <b>'+recordAlltime+'</b> Days');
        $('.recordHolder').html(recordAlltime);
        $('.avgRecord').html(recordAvg);
		if(animate){
			$('.meter-fg').animate({
        width: (percent*100) + '%'
    	}, 1750 );
		}else{
			$('.meter-fg').width((percent*100) + '%');
		}
		//$('#arrest-o-meter').append('<ul id="record_history_list"></ul>');
		//for(var record in data['history']){
		//	$('#record_history_list').append('<li>'+data['history'][record]['date']+'<span>'+data['history'][record]['record']+'</span></li>');
		//}
	});
}

function changeTopChart(){
    setupChart();
    if(ytdChart){
        $('#mainChartByTeamBtn').removeClass('button-primary');
        $('#mainChartByYearBtn').addClass('button-primary');
    }else{
        $('#mainChartByTeamBtn').addClass('button-primary');
        $('#mainChartByYearBtn').removeClass('button-primary');
    }
}

function getOverallChartData(callback){
	if(!ytdChart){
        $.getJSON('http://nflarrest.com/api/overall/topTeams.php?graph=true&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), callback);
    }else{
        $.getJSON('http://nflarrest.com/api/overall/arrestsYTD.php?start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), callback);
    }
}

function setupChart(){
    if (typeof(stackedBarChart.stackedChart) != "undefined")
        stackedBarChart.stackedChart.destroy();
	getOverallChartData(function(newData){
 		stackedBarChart.init({
			data: newData,
			targetElement: '#chart',
			targetExpandBtn: '#details_summary_btn',
			hideBtn: '#hideAll_btn',
			showBtn: '#showAll_btn'
		});
		mainChartReturned = true;
		if(listsReturned){
			loadingFinished();
		}
  });
}

function load_top_list(data, page, prefix, list, values, replace){
	replace = replace || false;
	if(replace){
		last_start_pos = 0;
	}
		var items = [];
    if(data.length > 0){
            $.each( data, function( key, val ) {
                var link = "<a href=\""+page+".html#!"+val[values[0]]+"\">";
                var link_end = '</a>';
                if(page == ''){
                    link = '';
                    link_end = '';
                }
                items.push( "<li id='" + prefix + key + "'>"+link+"<span>"+ val[values[0]] +"</span><span class='value-cell'>"+ val[values[1]] +"</span>"+link_end+"</li>" );
            });
    }else{
        if(replace){
            items.push('<li class="list-no-data-msg-item">No Data Available for this Date Range</li>');
        }
    }


		if(replace){
			$(list).html(items.join(""));
		}else{
			$(list).append(items.join(""));
		}
}

function load_top_crimes_list(replace){
	replace = replace || false;
	load_top_list("http://nflarrest.com/api/overall/topCrimes.php?limit=5&start_pos="+last_start_pos, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
}
function load_top_players_list(replace){
	replace = replace || false;
	load_top_list("http://nflarrest.com/api/overall/topPlayers.php?limit=5&start_pos="+last_start_pos, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
}
function load_top_positions_list(replace){
	replace = replace || false;
	load_top_list("http://nflarrest.com/api/overall/topPositions.php?limit=5&start_pos="+last_start_pos, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);
}

function load_top_lists(first, replace){
	first = first || 'not first';
	replace = replace || false;

    $('.list-no-data-msg-item').remove();

	if(first != 'first'){
		googleTracking.sendTrackEvent('TopLists','Load Next Page');
	}
	var url = 'http://nflarrest.com/api/overall/topLists.php?limit=5&start_pos='+last_start_pos+'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd();
	$.getJSON(url, function( data ) {
		var crimes_list = data[0],
				players_list = data[1],
				positions_list = data[2];

        if((crimes_list.length + players_list.length + positions_list.length) <= 0 && last_start_pos == 0){
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
			if(mainChartReturned === true){
				loadingFinished();
			}
	});
}
function reload_top_lists(){
	last_start_pos = 0;
	load_top_lists('not first', true);

}
