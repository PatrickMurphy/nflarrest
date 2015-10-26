var dateRangeNFL,
		mainChartReturned = false;
var last_start_pos = 0,
		listsReturnCount = 0,
		listsReturned = false;

$( window ).load(function() {
	dateRangeController.init(function(newDateRange){
		nflLoadingBar.init();
		dateRangeNFL = newDateRange;
		setupChart();
		load_top_lists('first');
		$('.dateRangeEditor').on('dateRangeChanged', function (e){
			nflLoadingBar.showLoading();
			setupChart();
			reload_top_lists();
		});

		$('#loadMoreLists').click(load_top_lists);
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
	$.getJSON('api/overall/daysSinceArrest.php', function(data){
		var daysSince = data.pop()['daysSinceArrest'],
				percent = parseInt(daysSince) / 64;
		$('#arrest_meter_text').html('It has been <b>'+ daysSince +'</b> Days since the last arrest.</p>');
		if(animate){
			$('.meter-fg').animate({
        width: (percent*100) + '%'
    	}, 1750 );
		}else{
			$('.meter-fg').width((percent*100) + '%');
		}
	});
}

function getOverallChartData(callback){
	$.getJSON('api/overall/topTeams.php?graph=true&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), callback);
}

function setupChart(){
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
		$.each( data, function( key, val ) {
			var link = "<a href=\""+page+".html#!"+val[values[0]]+"\">";
			var link_end = '</a>';
			if(page == ''){
				link = '';
				link_end = '';
			}
			items.push( "<li id='" + prefix + key + "'>"+link+"<span>"+ val[values[0]] +"</span><span class='value-cell'>"+ val[values[1]] +"</span>"+link_end+"</li>" );
		});

		if(replace){
			$(list).html(items.join(""));
		}else{
			$(list).append(items.join(""));
		}
}

function load_top_crimes_list(replace){
	replace = replace || false;
	load_top_list("api/overall/topCrimes.php?limit=5&start_pos="+last_start_pos, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
}
function load_top_players_list(replace){
	replace = replace || false;
	load_top_list("api/overall/topPlayers.php?limit=5&start_pos="+last_start_pos, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
}
function load_top_positions_list(replace){
	replace = replace || false;
	load_top_list("api/overall/topPositions.php?limit=5&start_pos="+last_start_pos, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);
}

function load_top_lists(first, replace){
	first = first || 'not first';
	replace = replace || false;

	if(first != 'first'){
		googleTracking.sendTrackEvent('TopLists','Load Next Page');
	}
	var url = 'api/overall/topLists.php?limit=5&start_pos='+last_start_pos+'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd();
	$.getJSON(url, function( data ) {
		var crimes_list = data[0],
				players_list = data[1],
				positions_list = data[2];

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
	//load_top_crimes_list(true);
	//load_top_players_list(true);
	//load_top_positions_list(true);

}
