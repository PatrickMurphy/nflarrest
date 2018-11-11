var dateRangeNFL,
    mainChartReturned = false;
var last_start_pos = 0,
    listsReturnCount = 0,
    listsReturned = false,
    ytdChart = false,
    mainChartStyleID = 0;

$( window ).load(function() {
	dateRangeController.init(function(newDateRange){
		nflLoadingBar.reset();
		dateRangeNFL = newDateRange;
                if(window.location.hash){
                   if(window.location.hash == "#ByYear"){
                      mainChartStyleID = 1;
                   }else if(window.location.hash == "#BySeason"){
                      mainChartStyleID = 2;
                   }else{
                      mainChartStyleID = 0;
                   }
                }
		changeTopChart();
		
		$('#bar_col, #stack_col').change(function(){
			setupChart();
		});
        
		$('#dateRangeJquery').on('dateRangeChanged', function (e){
			nflLoadingBar.showLoading();
			setupChart();
		});

	});
});

function loadTeamLinks(data){
	$.each(data,function(key,val){
		$('#bottomTeamLinks').append('<a href="team.html#'+val.Team+'"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -'+(val.Team_logo_id*20)+'px;background-size:100%;"></span> '+val.Team_preffered_name+'</a> ');
	});
}

function changeTopChart(){
	getOverallChartData(setupChart);	
}

function loadingFinished(){
	//setupArrestOMeter();
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

function getOverallChartData(callback){
    $.getJSON('http://nflarrest.com/api/overall/customStackedBar.php?bar_col='+$('#bar_col').val()+'&stack_col='+$('#stack_col').val()+'&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), callback);
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
		//if(listsReturned){
			loadingFinished();
		//}
  });
}