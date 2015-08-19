var timeSeriesChart = {
	timeChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		targetExpandBtn: '#btnSelector',
		data: {},
		isExpanded: false,
		showAccumulation: true
	},

	init: function(options){
		$.extend(true, this.options, options);

		var thisChart = this;
		console.log('Initialize Chart:  ' + this.options.targetElement);

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
						xFormat: '%m/%Y',
						columns: [
								['x', '01/2013', '02/2013', '03/2013', '05/2013', '06/2013', '07/2013'],
								['SEA', 30, 200, 0, 400, 150, 250],
								['DEN', 130, 340, 200, 500, 250, 350]
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
				zoom: {
        	enabled: true
    		},
			  padding: {
						bottom: bottomPadding
				},
			  color: {
					pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
				}
    });

	},
	fillDates: function(dataRow){
		var start = new Date(dateRangeController.getStart()),
				end = new Date(dateRangeController.getEnd()),
				numMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

		var currentYear = start.getFullYear(),
				currentMonth = start.getMonth() + 1;
		var i,
				newDataRow = [],
				accumTotal = 0;

		var nextDataPoint = dataRow.pop();
		for(i = numMonths; i > 0; i--){
			currentMonth++;
			if(currentMonth > 12){
				// next year
				currentYear++;
				currentMonth = currentMonth % 12;
			}

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
					accumTotal = accumTotal + parseInt(nextDataPoint.arrest_count);
					defaultVal = accumTotal; // use total to not dip the line again
				}else{
					defaultVal = 0;
				}
				newDataRow.push();
			}
		}
		console.log(newDataRow);
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

		googleTracking.sendTrackEvent('mainChart', 'expand toggle');
		// re-render
		timeSeriesChart.renderChart();
	}
};
