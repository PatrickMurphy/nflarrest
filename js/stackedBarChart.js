var stackedBarChart = {
	stackedChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		targetExpandBtn: '#btnSelector',
		data: {},
		isExpanded: false
	},

	init: function(options){
		$.extend(true, this.options, options);

		var thisChart = this;
		console.log('Initialize Chart:  ' + this.options.targetElement);

		thisChart.options.$targetElement = $(this.options.targetElement);
		thisChart.options.$expandBtnElement = $(this.options.targetExpandBtn);

		stackedBarChart.options.$expandBtnElement.off('click');
		stackedBarChart.options.$expandBtnElement.click(function(){
			thisChart.toggleExpand(thisChart);
		});

		thisChart.renderChart();
	},

	renderChart: function(){
		stackedBarChart.stackedChart = c3.generate({
        bindto: stackedBarChart.options.targetElement,
        data: {
            x : 'x',
            columns: stackedBarChart.options.data.columns,
            groups: [
                stackedBarChart.options.data.groups
            ],
            type: 'bar',
            onclick: function (d, i) {
                // redirect to
                googleTracking.sendEvent('mainChart','teamLink');
				window.location.href = "team.html#"+stackedBarChart.options.data.columns[0][d['index']+1];
            }
        },
        axis: {
            x: {
                type: 'category'
            }
        },
			  color: {
					pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
				}
    });

	},

	toggleExpand: function(thisChart){
		// toggle sizing
		stackedBarChart.options.$targetElement.toggleClass('expanded');

		// toggle button state
		stackedBarChart.options.isExpanded = !stackedBarChart.options.isExpanded;

		// toggle button text
		if(stackedBarChart.options.isExpanded){
				stackedBarChart.options.$expandBtnElement.html('Collapse');
		}else{
				stackedBarChart.options.$expandBtnElement.html('Expand');
		}

		// re-render
		stackedBarChart.renderChart();
	}
};
