var dateRangeNFL,
		charts = [],
		pageID = undefined,
		callbackReturns = 0;

$( document ).ready(function() {
		$('#loading_div').fadeIn();
		update_hash();
		$(window).on('hashchange', function() {
			$('#loading_div').fadeIn();
			update_hash();
			setupCharts();
			renderArrests();
		});

	dateRangeController.init(function(newDateRange){
		dateRangeNFL = newDateRange;
		setupCharts();
		renderArrests();
		console.log('init');
		$('.dateRangeEditor').on('dateRangeChanged', function (e){
			console.log('event caught');
			$('#loading_div').fadeIn();
			setupCharts();
			renderArrests();
		});
	});
});

function update_hash(){
	pageID = window.location.hash || '#ID Not Set';
	pageID = pageID.replace('#', '');
	$('#pageTitle').append(pageID);
}

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
		if(++callbackReturns == 4){
			callbackReturns = 0;
			$('#loading_div').fadeOut();
		}
		callback(theData);
	});
}

function setupCharts(){
	getDonutData('api/crime/topTeams.php?id=' + pageID, 'Team', function(newData){
		var newChart = donutChart.init({
			data: newData,
			targetElement: '#teamchart',
			chartTitle: 'Teams'
		});
 		charts.push(newChart);
  });
	getDonutData('api/crime/topPlayers.php?id=' + pageID, 'Name', function(newData){
		var newChart = donutChart.init({
			data: newData,
			targetElement: '#playerchart',
			chartTitle: 'Players'
		});
 		charts.push(newChart);
  });
	getDonutData('api/crime/topPositions.php?id=' + pageID, 'Position', function(newData){
		var newChart = donutChart.init({
			data: newData,
			targetElement: '#poschart',
			chartTitle: 'Positions'
		});
 		charts.push(newChart);
  });
}

function renderArrests(){
	$.getJSON('api/crime/arrests.php?id=' + pageID +'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), function(data){
		var row,
				items = ['<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Team:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>'];
		for(row in data){
			row = data[row];
				items.push('<tr><td class="one column">'+moment(row['Date'], "YYYY-MM-DD").fromNow() +'</td><td class="two columns">'+row['Name']+'</td><td class="one column">'+row['Team']+'</td><td class="four columns">'+row['Description']+'</td><td class="four columns">'+row['Outcome']+'</td></tr>');
		}
		$('#arrest_table').html(items.join(""));
		if(++callbackReturns == 4){
			callbackReturns = 0;
			$('#loading_div').fadeOut();
		}
	});
}
