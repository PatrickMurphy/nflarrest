var isFirstHover = true;
var histogramChart = {
	histChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		data: {},
		customLegend: false,
		zoomEnabled: false
	},

	init: function(options){
        this.options.data = {};
		$.extend(true, this.options, options);

		var thisChart = this;
		//console.log('Initialize Chart:  ' + this.options.targetElement);

		thisChart.options.$targetElement = $(this.options.targetElement);

		thisChart.renderChart();
	},

	renderChart: function(){
		if($( document ).width() < 800){
			var bottomPadding = 20;
		}else{
			var bottomPadding = 6;
		}

		histogramChart.histChart = c3.generate({
        bindto: histogramChart.options.targetElement,
        data: {
            empty: { label: { text: "No Data Available for this Date Range" }   },
            columns: histogramChart.options.data,
            type: 'bar',
            
        },
				zoom: {
        	enabled: histogramChart.options.zoomEnabled
    		},
			  padding: {
						bottom: bottomPadding
				},
				legend: {
					show: !histogramChart.options.customLegend
				},
			  color: {
					pattern: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#154F78', '#B0580A', '#248224', '#7D1717']
              }
    });
		if(histogramChart.options.customLegend){
			histogramChart.renderCustomLegend();
		}

	},

	renderCustomLegend: function(){
		// should probably try and remove the existing legend first if one exists
		$('.customLegend').remove();
			d3.select('.chart-container').insert('div', '.chart-options').attr('class', 'customLegend').selectAll('span')
			.data(histogramChart.options.data.groups)
		.enter().append('span')
			.attr('data-id', function (id) { return id; })
			.attr('class', function (id) {
				var newID = id.replace('/', '');
				newID = newID.split(' ').join('');
				return 'customLegend-item customLegend-item-' + newID; })
			.html(function (id) { return "<span class=\"customLegend-item-color\" style=\"background-color:"+ histogramChart.histChart.color(id) +";\"></span> " + id; })
			.on('mouseover', function (id) {
					histogramChart.histChart.focus(id);
					if(isFirstHover){
						isFirstHover = false;
						googleTracking.sendTrackEvent('mainChart', 'legendMouseover');
					}
			})
			.on('mouseout', function (id) {
					histogramChart.histChart.revert();
			})
			.on('click', function (id) {
					histogramChart.histChart.toggle(id);
					var newID = id.replace('/', '');
					newID = newID.split(' ').join('');
					var legendItem = d3.select('.customLegend-item-'+newID);
					//console.log(legendItem);
					legendItem.classed("transparent", !legendItem.classed("transparent"));
					googleTracking.sendTrackEvent('mainChart', 'legendClick');
			});
	}
};
