class Chart {
	constructor(opt,type,parent) {
		this.chart = undefined;
        this.parent = parent;
		this.options = {
			targetElement: '#theElementSelector',
			chartTitle: 'default',
			data: {}
		};
        this.defaultColorPattern = ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717'];
		$.extend(true, this.options, opt);
        
        this.chartType = type || 'donut';
        
		this.options.$targetElement = $(this.options.targetElement);

		this.renderChart();
	}

	renderChart() {
        console.warn('WARNING: Using default render chart');
        var chartObj = {
			bindto: this.options.targetElement,
			data: {
				columns: this.options.data,
				type: this.chartType
			},
			color: {
				pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
			}
		};
        
        if(this.chartType == 'donut'){
            chartObj['donut'] = {title: this.options.chartTitle};
        }
           
		this.chart = c3.generate(chartObj);
	}
}
