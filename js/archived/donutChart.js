var donutChart = {
	chart: undefined,
	options: {
		targetElement: '#theElementSelector',
		chartTitle: 'default',
		data: {}
	},

	init: function(options){
		$.extend(true, this.options, options);

		var thisChart = this;
		console.log('Initialize Chart:  ' + this.options.targetElement);
		thisChart.options.$targetElement = $(this.options.targetElement);

		thisChart.renderChart();
	},

	renderChart: function(){
		donutChart.chart = c3.generate({
        bindto: donutChart.options.targetElement,
    data: {
        columns: donutChart.options.data,
        type : 'donut'
    },
    donut: {
        title: donutChart.options.chartTitle
    },
			  color: {
					pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
				}
    });
	}
};
