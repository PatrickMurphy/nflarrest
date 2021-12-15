class ArrestMeterPage extends WebPage {
	constructor(){
		// call webpage constructor
		super();
		this.setupArrestOMeter();
		this.setupArrestHistogram();
		this.loadingFinished();
	}

	loadingFinished(){
		this.utilities.setupFacebook();
		this.utilities.setupTwitter();
		var parent = this;
		$('#newsletterForm').submit(function(e){
	    e.preventDefault();
	    $.ajax({
	        url:'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
	        type:'POST',
	        data:{'email':$('input[name=email]').val()}
	    });
		$('#newsletterForm').html('<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>');
			parent.utilities.gaEvent('Email List','Subscribe');
		});
		$('#newsletterForm input[name=email]').focus(function(){
			parent.utilities.gaEvent('Email List','Focus');
		});
	}

	setupArrestHistogram(){
		$.getJSON('api/overall/arrestHistogram.php', function(d){
			console.log(d);
		      histogramChart.init({targetElement: '#histogram-arrests',data: d});
		});
	}

	setupArrestOMeter(){
		var animate = true;
		var alltime;
		$.getJSON('api/NewMeter.php?limit=3', function(data){
			var daysSince = data['current']['daysSince'],
					recordAlltime = data['alltime']['record'],
					recordAvg = data['alltime']['average'],
					percent = parseInt(daysSince) / recordAlltime;
					alltime = recordAlltime;
		        $('#arrest_meter_odds').html('The odds of reaching '+ daysSince + ' days without arrest are <b>' + data['current']['odds']+' : 1</b>');
			$('#arrest_meter_text').html('It has been <b>'+ daysSince +'</b> Days since the last arrest.</p>');
			$('#arrest_meter_subtext').html('Average: <b>'+recordAvg+'</b> Days <br/>Record W/O arrest: <b>'+recordAlltime+'</b> Days');
			$('#aomRecord').html(recordAlltime);
			/*for(var brokenKey in data['broken']){
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
				var thisOdds = historyObj['odds'];
				var displayOdds = "";
				if(historyObj['odds'] == 1 ){
					thisOdds = 8-(alltime - historyObj.record);
					displayOdds = "1 : "+thisOdds;
				}else{
					displayOdds = thisOdds+" : 1";
				}
				historyOutput = "<b>"+historyObj.record + "</b> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+month+"-"+day+"-"+tempDate.getFullYear() + " to " + historyObj.date + " Odds: <b>" +displayOdds+ "</b>";
				$('#arrest_meter_upcoming').append("<li>"+historyOutput+"</li>");
			}*/
	                var theWidth = (percent*100);
			if(theWidth > 100){
				theWidth = 100;
			}
			if(animate){
				$('.meter-fg').animate({
	        width: theWidth + '%'},{
	        complete: function(){
	        	setTimeout(function(){$('.meter-fg').css('background-color', 'green')}, 3500);
	        	console.log('hey');
	        }
	    	}, 1750 );


			}else{
				$('.meter-fg').width( theWidth + '%');
			}
		});
	}

}

var pageObj;
$( window ).load(function() {
	pageObj = new ArrestMeterPage();
});
