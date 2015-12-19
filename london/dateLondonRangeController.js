var dateLondonRangeController = {
	start_date: {month: '01', year: '2009'},
	end_date: {month: '10', year: '2015'},
	default:{
		start_date: {month: '01', year: '2009'},
		end_date: {month: '10', year: '2015'}
	},

	init: function(callback){
		if(typeof pageID !== 'undefined'){
			var hash = pageID || '';
			hash = '#!' + hash;
		}else{
			var hash = '#!';
		}

		function createInput(id){
			id = id + '';
			id.toLowerCase();
			return '<span class="row">'+
			'<label class="six columns">'+ id.charAt(0).toUpperCase() + id.slice(1) +' Date:</label>'+
			'<span class="six columns">'+
				'<input type="number" max="12" min="1" maxlength="2" id="dateRange_'+id+'_month" /> / '+
				'<select id="dateRange_'+id+'_year">'+
					'<option>2009</option>'+
					'<option>2010</option>'+
					'<option>2011</option>'+
					'<option>2012</option>'+
					'<option>2013</option>'+
					'<option>2014</option>'+
					'<option>2015</option>'+
				'</select>'+
			'</span>'+
		'</span>';
		}

		$('.container').append(
			'<div class="dateRangeEditor four columns offset-by-eight">'+
				'<form class="dateRangeForm">'+
					createInput('start')+ createInput('end') +
					'<span class="row">'+
						'<button class="four columns" id="dateRangeCancelBtn">Cancel</button>'+
						'<button class="four columns" id="resetDateRangeBtn">Reset</button>'+
						'<button class="four columns button-primary" id="dateRangeSaveBtn">Save</button>'+
					'</span>'+
				'</form>'+
			'</div>');
		$('#changeDateRangeLink').attr('href', hash);
		$('#changeDateRangeLink').click(this.openDialog);
		$('#resetDateRangeBtn').click(this.resetTime);


		this.start_date = this.setStart(this.getCookie('start_date') || dateLondonRangeController.start_date);
		this.end_date = this.setEnd(this.getCookie('end_date') || dateLondonRangeController.end_date);

		$('#changeDateRangeLink').html(this.getStartString() + ' - ' + this.getEndString());

		//$('#dateRange_start').val(this.start_date);
		//$('#dateRange_end').val(this.end_date);
		$('#dateRange_start_month').val(this.start_date.month);
		$('#dateRange_end_month').val(this.end_date.month);

		$('#dateRange_start_year').val(this.start_date.year);
		$('#dateRange_end_year').val(this.end_date.year);

		$('#dateRangeCancelBtn').click(this.closeDialog);
		$('#dateRangeSaveBtn').click(this.changeDateRange);

		callback(this);
	},

	resetTime: function(){
		googleTracking.sendTrackEvent('LondonDateRange','Reset');

		var start = dateLondonRangeController.default.start_date,
				end = dateLondonRangeController.default.end_date;

		dateLondonRangeController.setDates(start, end);
	},

	getStartString: function(){
		return this.start_date.month+'/'+this.start_date.year;
	},

	getEndString: function(){
		return this.end_date.month+'/'+this.end_date.year;
	},

	getStart: function(){
		return this.start_date;
	},

	getEnd: function(){
		return this.end_date;
	},

	setStart: function(start){
		if(start.hasOwnProperty('month') && start.hasOwnProperty('year')){
			start.month = parseInt(start.month);
			if(start.month < 9){
					start.month = '0' + start.month;
			}
			start.year = parseInt(start.year);
			if(start.year > 2015){
				start.year = 2015 + '';
			}
			if(start.year < 2009){
				start.year = 2009+'';
			}

			dateLondonRangeController.start_date.month = start.month;
			dateLondonRangeController.start_date.year = start.year;
		}
	},

	setEnd: function(end){
		if(end.hasOwnProperty('month') && end.hasOwnProperty('year')){
			end.month = parseInt(end.month);
			if(end.month < 9){
					end.month = '0' + end.month;
			}
			end.year = parseInt(end.year);
			if(end.year > 2015){
				end.year = 2015 + '';
			}
			if(end.year < 2009){
				end.year = 2009+'';
			}

			dateLondonRangeController.end_date.month = end.month;
			dateLondonRangeController.end_date.year = end.year;
		}
	},

		// used when form is submitted
	changeDateRange: function(){
		var start = {month: $('#dateRange_start_month').val(), year: $('#dateRange_start_year').val()},
		end = {month: $('#dateRange_end_month').val(), year: $('#dateRange_end_year').val()};

		if(start.month < 9){
			start.month = '0' + start.month;
		}
		if(end.month < 9){
			end.month = '0' + end.month;
		}

		// switch dates if in wrong order
		if(new Date(start.year+'-'+start.month) > new Date(end.year+'-'+end.month)){
			var temp = start; // temp for swap
			start = end;
			end = temp;
		}
		dateLondonRangeController.setDates(start, end);
	},

	setDates: function(start, end){
		googleTracking.sendTrackEvent('LondonDateRange','DateChanged');
		if(start.month < 9){
			start.month = '0' + start.month;
		}
		if(end.month < 9){
			end.month = '0' + end.month;
		}
		dateLondonRangeController.setCookie('start_date', start);
		dateLondonRangeController.setCookie('end_date', end);
		dateLondonRangeController.start_date = dateRangeController.setStart(start);
		dateLondonRangeController.end_date = dateRangeController.setEnd(end);

		$('#changeDateRangeLink').html(dateLondonRangeController.getStartString()+'-'+dateLondonRangeController.getEndString());
		if(window.CustomEvent){
			var event = new Event('dateRangeChanged');
			dateLondonRangeController.closeDialog();
			$('.dateRangeEditor').trigger('dateRangeChanged');
		}
	},

	openDialog: function(){
		$('.dateRangeEditor').toggleClass('show');
		googleTracking.sendTrackEvent('LondonDateRange','OpenDialog');
	},

	closeDialog: function(){
		$('.dateRangeEditor').removeClass('show');
	},

	setCookie: function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		exdays = exdays || 0.5;

		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();

		cvalue = [cvalue.month,cvalue.year].join();

		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	getCookie: function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0){
					var cook = c.substring(name.length,c.length);
					var cookdata = cook.split(',');
					return {month:cookdata[0],year:cookdata[1]};
				};
		}
		return '';
	}
}
