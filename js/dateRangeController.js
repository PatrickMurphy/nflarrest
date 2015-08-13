var dateRangeController = {
	start_date: '2000-01-01',
	end_date: '',

	init: function(callback){
		if(typeof pageID !== 'undefined'){
			var hash = pageID || '#';
		}else{
			var hash = '#';
		}
		$('#changeDateRangeLink').attr('href', "#" + hash);
		$('#changeDateRangeLink').click(this.openDialog);

		var today = new Date(),
				month, day;
		if(today.getMonth() < 10){
			month = '0' + today.getMonth();
		}else{
			month = today.getMonth();
		}

		if(today.getDate() < 10){
			day = '0' + today.getDate();
		}else{
			day = today.getDate();
		}

		var	todayDate = today.getFullYear() + '-' + month + '-' + day;

		this.start_date = this.getCookie('start_date') || '2000-01-01';
		this.end_date = this.getCookie('end_date') || todayDate;

		$('#changeDateRangeLink').html(this.start_date + ' - ' + this.end_date);

		$('#dateRange_start').val(this.start_date);
		$('#dateRange_end').val(this.end_date);

		$('#dateRangeCancelBtn').click(this.closeDialog);
		$('#dateRangeSaveBtn').click(this.changeDateRange);

		callback(this);
	},

	getStart: function(){
		return this.start_date;
	},

	getEnd: function(){
		return this.end_date;
	},

	changeDateRange: function(){
		var start = $('#dateRange_start').val(),
		end = $('#dateRange_end').val();

		// switch dates if in wrong order
		if(new Date(start) > new Date(end)){
			var temp = start;
			start = end;
			end = temp;
		}

		dateRangeController.setCookie('start_date', start);
		dateRangeController.setCookie('end_date', end);
		dateRangeController.start_date = start;
		dateRangeController.end_date = end;
		$('#changeDateRangeLink').html(dateRangeController.start_date + ' - ' + dateRangeController.end_date)

		if(window.CustomEvent){
			var event = new Event('dateRangeChanged');
			dateRangeController.closeDialog();
			$('.dateRangeEditor').trigger('dateRangeChanged');
		}
	},

	openDialog: function(){
		$('.dateRangeEditor').toggleClass('show');
	},

	closeDialog: function(){
		$('.dateRangeEditor').removeClass('show');
	},

	setCookie: function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		exdays = exdays || 30;

		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	getCookie: function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
}
