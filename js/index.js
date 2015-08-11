$( document ).ready(function() {
	setupDateRange();
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
