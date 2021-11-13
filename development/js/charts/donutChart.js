class DonutChart {
	constructor(opt) {
		this.chart = undefined;
		this.options = {
			targetElement: '#theElementSelector',
			chartTitle: 'default',
			data: {}
		};
		$.extend(true, this.options, opt);
		this.options.$targetElement = $(this.options.targetElement);

		this.renderChart();
	}

	renderChart() {
		var self = this;
		this.chart = c3.generate({
			bindto: self.options.targetElement,
			data: {
				columns: self.options.data,
				type: 'donut'
			},
			donut: {
				title: self.options.chartTitle
			},
			color: {
				pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
			}
		});
	}
}
