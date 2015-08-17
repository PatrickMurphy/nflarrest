var dateRangeNFL,
		mainChartReturned = false;
var last_start_pos = 0,
		listsReturnCount = 0,
		listsReturned = false;

$( document ).ready(function() {
	dateRangeController.init(function(newDateRange){
		nflLoadingBar.init();
		dateRangeNFL = newDateRange;
		load_top_lists();
		$('#loadMoreLists').click(load_top_lists);
		setupChart();
        if ($(window).width() >= 800) {
           $('#tooltip').fadeIn();
        }
        // on resize

		$('.dateRangeEditor').on('dateRangeChanged', function (e){
			nflLoadingBar.showLoading();
			console.log('event caught');
			reload_top_lists();
			setupChart();
		});
	});
});

function setupArrestOMeter(){
	$.getJSON('api/overall/daysSinceArrest.php', function(data){
		var daysSince = data.pop()['daysSinceArrest'];
		console.log('daysSince');
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
			targetExpandBtn: '#details_summary_btn'
		});
		mainChartReturned = true;
		if(listsReturned){
			nflLoadingBar.hideLoading();
			listsReturned = false;
			mainChartReturned = false;
		}
  });
}

function load_top_list(url, page, prefix, list, values, replace){
	replace = replace || false;
	if(replace){
		last_start_pos = 0;
	}
	// add date
	url = url + '&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd();
	$.getJSON(url, function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			var link = "<a href=\""+page+".html#"+val[values[0]]+"\">";
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
		if(++listsReturnCount == 3){
			listsReturned = true;
			listsReturnCount = 0;
			last_start_pos = last_start_pos + 5;
			if(mainChartReturned === true){
					nflLoadingBar.hideLoading();
					listsReturned = false;
					mainChartReturned = false;
			}
		}
	});
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
	load_top_list("api/overall/topPositions.php?limit=5&start_pos="+last_start_pos, '', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);
}

function load_top_lists(){
	load_top_crimes_list();
	load_top_players_list();
	load_top_positions_list();
}
function reload_top_lists(){
	load_top_crimes_list(true);
	load_top_players_list(true);
	load_top_positions_list(true);
}
