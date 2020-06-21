var dateRangeNFL,
		charts = [],
		pageID = undefined,
		callbackReturns = 0,
		removedCategories = [],
		useSimple = false;

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

function loadingFinished(){
	setupFacebook();
	setupTwitter();
	callbackReturns = 0;
	$('#loading-bar').fadeOut();
}

function getDonutData(url, param, callback){
	var andSimple = '';
	if(useSimple){
		andSimple = '&simple=true';
	}
	$.getJSON(url+'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd()+andSimple, function(data){
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
			loadingFinished();
		}
		callback(theData);
	});
}

function setupTimeline(){
	var theUrl,
			subUrl = '/api/crime/timeline.php',
			andSimple = '';
	if(useSimple){
		andSimple = '&simple=true';
		subUrl += '?simple=true';
		theUrl = '/api/crime/timeline.php?simple=true&';
	}else{
		theUrl = '/api/crime/timeline.php?';
	}
	$.getJSON(theUrl + 'id='+ pageID +'&start_date='+ dateRangeController.getStart() +'&end_date='+ dateRangeController.getEnd(), function(data1){
			charts.push(timeSeriesChart.init({
				targetElement: '#comparechart',
				compareToBtn: '#compare_to_btn',
				ajaxURL: subUrl,
				data: data1,
				initColumnID: pageID
			}));
		});

	// fill select
	$.getJSON('/api/overall/topCrimes.php?start_date='+ dateRangeController.getStart() +'&end_date='+ dateRangeController.getEnd() + andSimple, function(data){
		$('#resetChartBtn').hide();
		var index;
		var $chooseElement = $('#chooseCrime');
		for(index in data){
			if(data[index]['Category'] != pageID){
				$chooseElement.append('<option value="'+data[index]['Category']+'">'+data[index]['Category']+'</option>');
			}
		}
	});
	 // if not set
	 //on click
	$('#compare_to_btn').click(function(){
		// get value of select
		$('#resetChartBtn').show();
		var $chooseElement = $('#chooseCrime');
		var value = $chooseElement.val();

		// remove that value from list
		removedCategories.push(value);
		$("#chooseCrime option[value='"+value+"']").remove();

		// add column
		timeSeriesChart.addColumn(value);
	});

	$('#resetChartBtn').click(function(){
		googleTracking.sendTrackEvent('TimeChart', 'reset compare chart');
		$('#resetChartBtn').hide();
		timeSeriesChart.timeChart.unload({
        ids: removedCategories
    });
		var index,
				$chooseElement = $('#chooseCrime');
		for(index in removedCategories){
			$chooseElement.append('<option value="' + removedCategories[index] + '">' + removedCategories[index] + '</option>')
		}
	});
}

function setupCharts(){
	setupTimeline();
    document.title = "NFL Arrest | "+pageID+" | Crime Details" 
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
		});
 		charts.push(newChart);
  });
}

function renderArrests(){
	var andSimple = '';
	if(useSimple){
		andSimple = '&simple=true';
	}
	$.getJSON('api/crime/arrests.php?id=' + pageID +'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd() + andSimple, function(data){
		var row,
				items = ['<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Team:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>'];
		$('body > div.container > section > div > h4').html(data.length+' Incidents:');
		for(row in data){
			row = data[row];
				items.push('<tr><td class="one column">'+moment(row['Date'], "YYYY-MM-DD").fromNow() +'</td><td class="two columns"><a href="player/'+row['Name']+'/">'+row['Name']+'</a></td><td class="one column"><a href="/team/'+row['Team']+'/">'+row['Team']+'</a></td><td class="four columns">'+row['Description']+'</td><td class="four columns">'+row['Outcome']+'</td></tr>');
		}
		$('#arrest_table').html(items.join(""));
		if(++callbackReturns == 4){
			loadingFinished();
		}
	});
}
