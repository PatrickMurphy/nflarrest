var thechart,
    dataStore,
    expand_status = false;
$( document ).ready(function() {
	//setupDateRange();
    load_top_lists();
    $('#changeDateRangeLink').click(function(){
        alert('You will soon beable to edit the date range');
    });
    $('#details_summary_btn').click(function(){
        $('#chart').toggleClass('expanded');
        expand_status = !expand_status;
        if(expand_status){
            $('#details_summary_btn').html('Collapse');
        }else{
            $('#details_summary_btn').html('Expand');
        }
        generateChart();
        console.log('click');
    });
	setupChart();
});

function setupDateRange(){
	var today = new Date();
	// change todays date value
	$('#dateRange_end').val(today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear());

	// add click handler
	$('#changeDateRange').click(changeDateRange);
}

function changeDateRange(){
	var start = $('#dateRange_start').val(),
			end = $('#dateRange_end').val();

	// save to php session
	console.log(start);
	console.log(end);
}

function handleTeam(response){
	var return_list = {};
	$.each(response, function(crime_num, value){
		return_list[value.Category] = value.arrest_count;
	});
	return return_list;
};

function adjustCrimes(data, team_num){
	var expected_length = team_num + 2; // one for title element one for added element
	var crime;

	for(crime in data){
		if(data[crime].length < expected_length){
			data[crime].push(0); // add zero if this team has none
		}
	}
	console.log(data);
	return data;
}

function getOverallChartData(callback){
	$.getJSON('api/overall/topTeams.php?graph=true', callback);
}

function setupChart(){
	getOverallChartData(function(newData){
       dataStore = newData;
	   generateChart();
    });
}

function generateChart(){
    thechart = c3.generate({
        bindto: '#chart',
        data: {
            x : 'x',
            columns: dataStore.columns,
            groups: [
                dataStore.groups
            ],
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category' // this needed to load string x value
            }
        }
    });
}

function load_top_list(url, prefix, list, values){
	$.getJSON(url, function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			items.push( "<li id='" + prefix + key + "'>"+ val[values[0]] +" <span>"+ val[values[1]] +"</span></li>" );
		});

		$(list).html(items.join(""));
	});
}

function load_top_crimes_list(){
	load_top_list("api/overall/topCrimes.php?limit=5", 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count']);
}
function load_top_players_list(){
	load_top_list("api/overall/topPlayers.php?limit=5", 'top_player_', '#top_players_list', ['Name', 'arrest_count']);
}
function load_top_positions_list(){
	load_top_list("api/overall/topPositions.php?limit=5", 'top_pos_', '#top_positions_list', ['Position', 'arrest_count']);
}

function load_top_lists(){
	load_top_crimes_list();
	load_top_players_list();
	load_top_positions_list();
}
