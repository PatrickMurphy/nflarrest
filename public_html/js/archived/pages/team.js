var dateRangeNFL,
		charts = [],
		pageID = undefined,
		callbackReturns = 0;

$( window ).load(function() {
		$('body').append('<div id="loading-bar">Loading...</div>');
		$('#loading-bar').fadeIn();
		update_hash();
		$(window).on('hashchange', function() {
			$('#loading-bar').fadeIn();
			update_hash();
			setupCharts();
			renderArrests();
		});

	dateRangeController.init(function(newDateRange){
		dateRangeNFL = newDateRange;
		setupCharts();
		renderArrests();
		console.log('init');
		$('#dateRangeJquery').on('dateRangeChanged', function (e){
			console.log('event caught');
			$('#loading-bar').fadeIn();
			setupCharts();
			renderArrests();
		});
	});
});

function getDonutData(url, param, callback){
	$.getJSON(url+'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), function(data){
		var theData = [];
		var index, i = 0;
		var otherArray = ['Other', 0];
		for(index in data){
			if(++i < 12){
				theData.push([data[index][param], data[index]['arrest_count']]);
			}else{
				otherArray[1] = parseInt(otherArray[1]) + parseInt(data[index]['arrest_count']);
			}
		}
		theData.push(otherArray);
		if(++callbackReturns == 3){
			callbackReturns = 0;
			$('#loading-bar').fadeOut();
			setupFacebook();
			setupTwitter();
		}
		callback(theData);
	});
}

function setupCharts(){
    var temp = {
    "CIN": "Bengals",
    "DEN": "Broncos",
    "MIN": "Vikings",
    "TB": "Buccaneers",
    "TEN": "Titans",
    "JAC": "Jaguars",
    "IND": "Colts",
    "CHI": "Bears",
    "KC": "Chiefs",
    "MIA": "Dolphins",
    "CLE": "Browns",
    "SD": "Chargers",
    "BAL": "Ravens",
    "PIT": "Steelers",
    "NO": "Saints",
    "SEA": "Seahawks",
    "GB": "Packers",
    "OAK": "Raiders",
    "WAS": "Redskins",
    "ATL": "Falcons",
    "ARI": "Cardinals",
    "CAR": "Panthers",
    "NE": "Patriots",
    "BUF": "Buffalo Bills",
    "DET": "Lions",
    "DAL": "Cowboys",
    "NYJ": "Jets",
    "PHI": "Eagles",
    "NYG": "NY Giants",
    "HOU": "Texans",
    "LA": "Rams",
    "FREE": "Free Agents",
    "SF": "FourtyNiners"
};
	getDonutData('api/team/topPlayers.php?id=' + pageID, 'Name', function(newData){
		var newChart = donutChart.init({
			data: newData,
			targetElement: '#playerchart',
			chartTitle: 'Players'
		});
 		charts.push(newChart);
  });
	getDonutData('api/team/topCrimes.php?id=' + pageID, 'Category', function(newData){
		var newChart = donutChart.init({
			data: newData,
			targetElement: '#crimechart',
			chartTitle: 'Crimes'
		});
 		charts.push(newChart);
  });
}

function renderArrests(){
	$.getJSON('api/team/arrests.php?id=' + pageID +'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), function(data){
		var row,
				items = ['<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>'];
        document.title = "NFL Arrest | "+ data[0]['Team_city'] + " " + data[0]['Team_name']+" | List of Player Arrests";
        $('#pageTitle').html("Team: " + data[0]['Team_city'] + " " + data[0]['Team_name']);
		for(row in data){
			row = data[row];
				items.push('<tr><td class="one column">'+moment(row['Date'], "YYYY-MM-DD").fromNow() +'</td><td class="two columns"><a href="player.html#!'+row['Name']+'">'+row['Name']+'</a></td><td class="one column"><a href="crime.html#!' + row['Category'] + '">'+row['Category']+'</a></td><td class="four columns">'+row['Description']+'</td><td class="four columns">'+row['Outcome']+'</td></tr>');
		}
		$('#arrest_table').html(items.join(""));
		if(++callbackReturns == 3){
			callbackReturns = 0;
			$('#loading-bar').fadeOut();
			setupFacebook();
			setupTwitter();
		}
	});
}
