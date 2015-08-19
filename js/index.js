var dateRangeNFL,
		mainChartReturned = false;
var last_start_pos = 0,
		listsReturnCount = 0,
		listsReturned = false;

$( document ).ready(function() {
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
		if ($(window).width() >= 800) {
			 $('#tooltip').fadeIn();
		}
		setupSearchBoxes();
		 $( "#search-dialog" ).dialog({
      autoOpen: false,
      modal: true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
    });
		//$( document ).tooltip();
	});
});

function loadingFinished(){
	setupArrestOMeter();
	nflLoadingBar.hideLoading();
	listsReturned = false;
	mainChartReturned = false;
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
				loadingFinished();
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

function load_top_lists(first){
	first = first || 'not first';
	if(first != 'first'){
		googleTracking.sendTrackEvent('TopLists','Load Next Page');
	}
	load_top_crimes_list();
	load_top_players_list();
	load_top_positions_list();
}
function reload_top_lists(){
	last_start_pos = 0;
	load_top_crimes_list(true);
	load_top_players_list(true);
	load_top_positions_list(true);
}

function setupSearchBoxes(){
	$( "#playerSearch" ).autocomplete({
      source: "api/player/search.php",
      minLength: 2,
      select: function( event, ui ) {
				googleTracking.sendTrackEvent('PlayerSearch','Click AutoComplete Result');
				window.location.href = '/player.html#' + ui.item.Name;
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.Name + "  " + item.Position + "</a>" )
        .appendTo( ul );
    };
	$( "#teamSearch" ).autocomplete({
      source: "api/team/search.php",
      minLength: 2,
      select: function( event, ui ) {
				googleTracking.sendTrackEvent('TeamSearch','Click AutoComplete Result');
				window.location.href = '/team.html#' + ui.item.team_code;
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.teams_full_name + " from " + item.city + "</a>" )
        .appendTo( ul );
    };

	$('#playerSearchBtn').click(function(){
		googleTracking.sendTrackEvent('PlayerSearch','Click Search Button');
		var query = $('#playerSearch').val();
		$.getJSON('api/player/search.php?term='+query, function(resp){
            console.log(resp);
            if(resp.length > 0){
                var items = ['<tr><th>Name</th><th>Position</th><td>Arrests</th></tr>'];
                for(var index in resp){
                    items.push("<tr><td><a href=\"player.html#" + resp[index]['Name'] + "\">" + resp[index]['Name'] + "</a></td><td>" + resp[index]['Position'] + "</td><td>" + resp[index]['arrest_count'] + "</td></tr>");
                }
            }else{
                var items = ['<tr><th>Could not find any results, we only display players with arrest records, you may want to check your spelling.</th></tr>'];
            }
			$('#search-dialog table').html(items.join(""));
			$("#search-dialog").dialog( "open" );
		});
    });
	$('#teamSearchBtn').click(function(){
		googleTracking.sendTrackEvent('TeamSearch','Click Search Button');
		var query = $('#teamSearch').val();
		$.getJSON('api/team/search.php?term='+query, function(resp){
			var items = ['<tr><th>Name</th><th>City</th><td>Code</th></tr>'];
			for(var index in resp){
                if(resp.length > 0){
				    items.push("<tr><td><a href=\"player.html#" + resp[index]['teams_full_name'] + "\">" + resp[index]['Name'] + "</a></td><td>" + resp[index]['city'] + "</td><td>" + resp[index]['team_code'] + "</td></tr>");
                }else{
                    items = ['<tr><th>Could not find any results, you may also want to check your spelling.</th></tr>'];
                }
            }
			$('#search-dialog table').html(items.join(""));
			$("#search-dialog").dialog( "open" );
		});
	});
    $("#playerSearch").keyup(function(event){
        if(event.keyCode == 13){
            $("#playerSearchBtn").click();
        }
    });
    $("#teamSearch").keyup(function(event){
        if(event.keyCode == 13){
            $("#teamSearchBtn").click();
        }
    });
}
