$( document ).ready(function() {
	//setupDateRange();
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

function handleTeam(team_num, response, data, groups){
	var count = response.length;
	$.each(response, function(crime_num, value){
		// for each dist list add respective crime
		if(data.hasOwnProperty(value.Category)){
			// already has this category add value
			data[value.Category].push(value.arrest_count);
		}else{
			// new category
			groups.push(value.Category);
			// first value should be the category name
			var temp_array = [value.Category];
			for(var i = 0; i < team_num-1; i++){
				temp_array.push(0);
			}
			temp_array.push(value.arrest_count);
			data[value.Category] = temp_array;
		}
		if(--count == 0){
			// after all teams loaded
			return adjustCrimes(data, team_num);
		}
	});
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

function getOverallChartData(){
	var team_array = ['x'];
	var data = {};
	var tempdata = ['Arrests'];
	var groups = ['Arrests'];
	// load list of teams
	$.getJSON('api/overall/topTeams.php?limit=5', function(response){
		var count = response.length;
		$.each(response, function(team_num, value){
			var teamdata = {};
			team_array.push(value['Team']);
			// for each team look up distribution of crimes
			$.getJSON('api/team/topCrimes.php?limit=5&id='+value['Team'], function(crime_response){
				var TeamData = handleTeam(team_num, crime_response, teamdata, groups);
			});
		});
	});

	console.log(tempdata);
	console.log(team_array);
	console.log(groups);

	var newData = {
		columns: [team_array,tempdata],
		groups: groups
	};
	return newData;
}

function setupChart(){
	var newData = getOverallChartData();
	var chart = c3.generate({
		bindto: '#chart',
    data: {
        x : 'x',
        columns: newData.columns,
        groups: [
            newData.groups
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

load_top_lists();
