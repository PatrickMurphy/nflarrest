var isFirstHover = true;
var weatherMultiChart = {
	weatherChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		data: {},
		customLegend: false,
		zoomEnabled: true
	},

	init: function(options){
		$.extend(true, this.options, options);

		var thisChart = this;
		console.log('Initialize Chart:  ' + this.options.targetElement);

		thisChart.options.$targetElement = $(this.options.targetElement);

		thisChart.renderChart();
	},

	renderChart: function(){
		if($( document ).width() < 800){
			var bottomPadding = 20;
		}else{
			var bottomPadding = 6;
		}

		weatherMultiChart.weatherChart = c3.generate({
        bindto: weatherMultiChart.options.targetElement,
        data: {
            x : 'x',
            columns: weatherMultiChart.options.data.columns,
            //groups: [
            //    weatherMultiChart.options.data.groups
            //],
						order: 'asc',
            types: {
							High: 'area-spline',
							Low: 'area-spline',
							"Days of Frost": 'step'
						}
        },
				zoom: {
        	enabled: weatherMultiChart.options.zoomEnabled
    		},
				legend: {
					show: false
				},
					tooltip: {
						format: {
								value: function (value, ratio, id) {
										if(id === 'Avg Response Time'){
											var tempValue = value;
											return Math.round((tempValue*25/60) * 100) / 100 + ' min';
										}
										return value;
								}
		//            value: d3.format(',') // apply this format to both y and y2
						}
				},
			  padding: {
						bottom: bottomPadding
				},
        axis: {
            x: {
                type: 'category'
            }
        },
			  color: {
					pattern: ['#FF7F0E', '#1F77B4', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
				}
    });
		weatherMultiChart.renderCustomLegend();
	},
	renderCustomLegend: function(){
		// should probably try and remove the existing legend first if one exists
		$('.customLegend').remove();
			d3.select('.chart-container').insert('div', '.chart-options').attr('class', 'customLegend').selectAll('span')
			.data(weatherMultiChart.options.data.groups)
		.enter().append('span')
			.attr('data-id', function (id) { return id; })
			.attr('class', function (id) {
				var newID = id.replace('/', '');
				newID = newID.split(' ').join('');
				return 'customLegend-item customLegend-item-' + newID; })
			.html(function (id) { return "<span class=\"customLegend-item-color\" style=\"background-color:"+ weatherMultiChart.weatherChart.color(id) +";\"></span> " + id; })
			.on('mouseover', function (id) {
					weatherMultiChart.weatherChart.focus(id);
			})
			.on('mouseout', function (id) {
					weatherMultiChart.weatherChart.revert();
			})
			.on('click', function (id) {
					weatherMultiChart.weatherChart.toggle(id);
					var newID = id.replace('/', '');
					newID = newID.split(' ').join('');
					var legendItem = d3.select('.customLegend-item-'+newID);
					legendItem.classed("transparent", !legendItem.classed("transparent"));
			});
	}
};
