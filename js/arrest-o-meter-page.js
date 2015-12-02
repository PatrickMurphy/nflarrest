$( window ).load(function() {
		setupArrestOMeter();
		loadingFinished();
});

function loadingFinished(){
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
	$.getJSON('api/meter.php?limit=3', function(data){
		var daysSince = data['current']['daysSince'],
				recordAlltime = data['alltime']['record'],
				recordAvg = data['alltime']['average'],
				percent = parseInt(daysSince) / recordAlltime;
	        $('#arrest_meter_odds').html('The odds of reaching '+ daysSince + ' days without arrest are <b>' + data['current']['odds']+' : 1</b>');
		$('#arrest_meter_text').html('It has been <b>'+ daysSince +'</b> Days since the last arrest.</p>');
		$('#arrest_meter_subtext').html('Average: <b>'+recordAvg+'</b> Days <br/>Record W/O arrest: <b>'+recordAlltime+'</b> Days');
		for(var brokenKey in data['broken']){
			var brokenObj = data['broken'][brokenKey];
			var brokenOutput;
			var dateParts = brokenObj.date.split("-");
			var tempDate = new Date(dateParts[2]+"-"+dateParts[0]+"-"+dateParts[1]);
			var timeDiff = tempDate.getTime() - (brokenObj.record * 24 * 60 * 60 * 1000);
			tempDate = new Date(timeDiff);
			var month = (tempDate.getMonth()+1) > 9 ? (tempDate.getMonth()+1) : "0"+(tempDate.getMonth()+1);
			var day = tempDate.getDay() > 9 ? tempDate.getDay() : "0"+tempDate.getDay();
			brokenOutput = "<b>"+brokenObj.record + "</b> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+month+"-"+day+"-"+tempDate.getFullYear() + " to " + brokenObj.date;
			$('#arrest_meter_upcoming').append("<li style=\"text-decoration:strike-through;\"><STRIKE>"+brokenOutput+"</STRIKE></li>");
		}
		for(var historyKey in data['history']){
			var historyObj = data['history'][historyKey];
			var historyOutput;
			var dateParts = historyObj.date.split("-");
			var tempDate = new Date(dateParts[2]+"-"+dateParts[0]+"-"+dateParts[1]);
			var timeDiff = tempDate.getTime() - (historyObj.record * 24 * 60 * 60 * 1000);
			tempDate = new Date(timeDiff);
			var month = (tempDate.getMonth()+1) > 9 ? (tempDate.getMonth()+1) : "0"+(tempDate.getMonth()+1);
			var day = tempDate.getDay() > 9 ? tempDate.getDay() : "0"+tempDate.getDay();
			historyOutput = "<b>"+historyObj.record + "</b> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+month+"-"+day+"-"+tempDate.getFullYear() + " to " + historyObj.date + " Odds: <b>" + historyObj['odds']+" : 1</b>";
			$('#arrest_meter_upcoming').append("<li>"+historyOutput+"</li>");
		}
		if(animate){
			$('.meter-fg').animate({
        width: (percent*100) + '%'
    	}, 1750 );
		}else{
			$('.meter-fg').width((percent*100) + '%');
		}
		//$('#arrest-o-meter').append('<ul id="record_history_list"></ul>');
		//for(var record in data['history']){
		//	$('#record_history_list').append('<li>'+data['history'][record]['date']+'<span>'+data['history'][record]['record']+'</span></li>');
		//}
	});
}
