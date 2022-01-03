var timeSeriesChart = {
	timeChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		compareToBtn: '#btnSelector',
		initColumnID: '',
		data: {},
		isExpanded: false,
		showAccumulation: false,
		ajaxURL: '/api/'
	},

	init: function(options,parent){
		$.extend(true, this.options, options);
        this.parent = parent;

		var thisChart = this;
		//console.log('Initialize Chart:  ' + this.options.targetElement);

		thisChart.options.$targetElement = $(this.options.targetElement);
		thisChart.options.$expandBtnElement = $(this.options.targetExpandBtn);

		timeSeriesChart.options.$expandBtnElement.off('click');
		timeSeriesChart.options.$expandBtnElement.click(function(){
			thisChart.toggleExpand(thisChart);
		});

		thisChart.renderChart();
	},

	renderChart: function(){
		if($( document ).width() < 800){
			var bottomPadding = 20;
		}else{
			var bottomPadding = 6;
		}

		timeSeriesChart.timeChart = c3.generate({
        bindto: timeSeriesChart.options.targetElement,
        data: {
						x: 'x',
						//xFormat: '%m/%Y',
						columns: [
							timeSeriesChart.getXDates(),
							timeSeriesChart.fillDates(timeSeriesChart.options.initColumnID,timeSeriesChart.options.data)
							//['x', '9/2014', '10/2014', '11/2014', '12/2014', '1/2015', '2/2015', '3/2015', '4/2015', '5/2015', '6/2015', '7/2015', '8/2015']
						]
				},
				axis: {
						x: {
								type: 'timeseries',
								tick: {
										format: '%m/%y'
								}
						}
				},
			  padding: {
						bottom: bottomPadding
				},
			  color: {
					pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
				}
    });

	},

	buildAjaxURL: function(dataID, param){
		param = param || {};
		var params = {
			id: dataID,
			start_date: dateRangeController.getStart(),
			end_date: dateRangeController.getEnd()
		}
		$.extend(params, param);
		if(timeSeriesChart.options.ajaxURL.indexOf('?') < 0){
			var queryString = '?';
		}else{
			var queryString = '&'; 
		}
		for(var index in params){
			queryString += index+'='+params[index]+'&'
		}
		queryString = queryString.substring(0,queryString.length-1);
		return timeSeriesChart.options.ajaxURL + queryString;
	},

	addColumn: function(id){
		this.parent.Utilities.googleTracking.sendTrackEvent('TimeChart', 'addCompare ' + id);
		var url = timeSeriesChart.buildAjaxURL(id);
		$.getJSON(url, function(data){
			var formattedData = timeSeriesChart.fillDates(id, data),
					keyXS = formattedData[0];
			//timeSeriesChart.timeChart.xs({keyXS: 'x'});
			timeSeriesChart.timeChart.load({
        columns: [formattedData]
			});
		});
	},
	fillDates: function(id, dataRow){
		id = id || '';
		dataRow = dataRow || [];
		dataRow = dataRow.reverse();
		var start = new Date(dateRangeController.getStart()),
				end = new Date(dateRangeController.getEnd()),
				numMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

		var currentYear = start.getFullYear(),
				currentMonth = start.getMonth() + 1;
		var i,
				newDataRow = [id.toString()],
				accumTotal = 0;

		var nextDataPoint = dataRow.pop();
		for(i = numMonths; i > 0; i--){
			if(nextDataPoint !== undefined){

				//  change month and years
				currentMonth++;
				if(currentMonth > 12){
					// next year
					currentYear++;
					currentMonth = currentMonth % 12;
				}

				// if the date and the next data point match
				if(nextDataPoint.Year == currentYear.toString()
					&& nextDataPoint.Month == currentMonth.toString()){
					var newVal;
					if(timeSeriesChart.options.showAccumulation){
						accumTotal = accumTotal + parseInt(nextDataPoint.arrest_count);
						newVal = accumTotal;
					}else{
						newVal = parseInt(nextDataPoint.arrest_count);
					}
					newDataRow.push(newVal);
					if(dataRow.length > 0){
						nextDataPoint = dataRow.pop();
					}
				}else{
					var defaultVal;
					if(timeSeriesChart.options.showAccumulation){
						defaultVal = accumTotal; // use total to not dip the line again
					}else{
						defaultVal = 0;
					}
					newDataRow.push(defaultVal);
				}
			}else{
				newDataRow.push(0);
			}
		}
		return newDataRow;
	},
	getXDates: function(){
		var xDates = ['x'];
		var start = new Date(dateRangeController.getStart()),
				end = new Date(dateRangeController.getEnd()),
				numMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

		var currentYear = start.getFullYear(),
				currentMonth = start.getMonth() + 1;
		var i;

		for(i = numMonths-1; i > 0; i--){
			currentMonth++;
			if(currentMonth > 12){
				// next year
				currentYear++;
				currentMonth = currentMonth % 12;
			}
			if(currentMonth < 10){
				var dispMonth = '0'+currentMonth;
			}else{
				var dispMonth = currentMonth;
			}
			xDates.push(currentYear + '-' + dispMonth + '-01');
		}
		return xDates;
	},

	toggleExpand: function(thisChart){
		// toggle sizing
		timeSeriesChart.options.$targetElement.toggleClass('expanded');

		// toggle button state
		timeSeriesChart.options.isExpanded = !timeSeriesChart.options.isExpanded;

		// toggle button text
		if(timeSeriesChart.options.isExpanded){
				timeSeriesChart.options.$expandBtnElement.html('Collapse');
		}else{
				timeSeriesChart.options.$expandBtnElement.html('Expand');
		}

		this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'expand toggle');
		// re-render
		timeSeriesChart.renderChart();
	}
};
