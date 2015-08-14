var dateRangeController = {
	start_date: '2000-01-01',
	end_date: '',

	init: function(callback){
		if(typeof pageID !== 'undefined'){
			var hash = pageID || '#';
		}else{
			var hash = '#';
		}
		$('.container').append('<div class="dateRangeEditor four columns offset-by-eight"><form class="dateRangeForm"><span class="row"><label class="six columns">Start Date:</label>'+
					'<input class="six columns" type="date" id="dateRange_start" /></span><span class="row"><label class="six columns">End Date:</label><input class="six columns" type="date" id="dateRange_end" />' +
				'</span><span class="row"><button class="four columns" id="dateRangeCancelBtn">Cancel</button><button class="four columns" id="resetDateRangeBtn">Reset</button>'+
					'<button class="four columns button-primary" id="dateRangeSaveBtn">Save</button></span></form></div>');
		$('#changeDateRangeLink').attr('href', "#" + hash);
		$('#changeDateRangeLink').click(this.openDialog);
		$('#resetDateRangeBtn').click(this.resetTime);

		var today = new Date(),
				month, day;
		if(today.getMonth() < 9){
			month = '0' + (today.getMonth()+1);
		}else{
			month = today.getMonth()+1;
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

	resetTime: function(softReset){
		softReset = softReset || false;
		var today = new Date(),
				month, day;
		if(today.getMonth() < 9){
			month = '0' + (today.getMonth()+1);
		}else{
			month = today.getMonth()+1;
		}

		if(today.getDate() < 10){
			day = '0' + today.getDate();
		}else{
			day = today.getDate();
		}
		var start = '2000-01-01',
				end = today.getFullYear() + '-' + month + '-' + day;

		dateRangeController.setDates(start, end);
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

		dateRangeController.setDates(start, end);
	},

	setDates: function(start, end){
		dateRangeController.setCookie('start_date', start);
		dateRangeController.setCookie('end_date', end);
		dateRangeController.start_date = start;
		dateRangeController.end_date = end;

		$('#changeDateRangeLink').html(dateRangeController.start_date + ' - ' + dateRangeController.end_date);
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
