class DonutChart extends Chart {
	constructor(opt,parent) {
        super(opt,'donut',parent);
		this.renderChart();
	}

	renderChart() {
		var chartObj = {
			bindto: this.options.targetElement,
			data: {
				columns: this.options.data,
				type: this.chartType
			},
            donut: {title: this.options.chartTitle},
			color: {
				pattern: this.defaultColorPattern
			}
		};
        
		this.chart = c3.generate(chartObj);
	}
}
