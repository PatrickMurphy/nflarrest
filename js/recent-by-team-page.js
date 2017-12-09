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
	var alltime;
	$.getJSON('api/v1/lastArrestByTeam', function(data){
		for(var id in data){
			$('#recent-arrests-table').append('<tr><td><span class="value-cell">'+ data[id]['DaysSince'] +'</span></td><td><a href="team/'+data[id]['Team']+'/">'+ data[id]['Team_name'] +'</a></td><td><a href="player/'+data[id]['Name']+'/">'+ data[id]['Name'] +'</a></td><td><a href="position/'+data[id]['Position']+'/">'+ data[id]['Position'] +'</a></td><td><a href="crime/'+data[id]['Category']+'/">'+ data[id]['Category'] +'</a></td><td>'+ data[id]['Description'] +'</td></tr>');
		}
	});
}
