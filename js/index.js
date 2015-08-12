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
			$.getJSON('api/team/topCrimes.php?id='+value['Team'], function(crime_response){
				var TeamData = handleTeam(crime_response);
				var crimeName, crimeName2;
				// add missing to team
				for(crimeName in data){
					if(!TeamData.hasOwnProperty(crimeName)){
						TeamData[crimeName] = 0;
					}
				}
				for(crimeName2 in TeamData){
					if(data.hasOwnProperty(crimeName2)){
						// add existing to data
						//console.log('update crime '+ crimeName2);
						data[crimeName2].push(TeamData[crimeName2]);
					}else{
						// add missing to data
						//console.log('new crime ' + crimeName2);
						var tempArray = [crimeName2];
						var i;
						// add zeros for prev teams
						for(i = 0; i <= team_num-1; i++){
							tempArray.push(0);
						}
						// this teams
						tempArray.push(TeamData[crimeName2]);
						data[crimeName2] = tempArray;
					}
				}

				console.log($.extend(true,{},data));
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
