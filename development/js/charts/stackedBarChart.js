var isFirstHover = true;
var stackedBarChart = {
	stackedChart: undefined,
	options: {
		targetElement: '#theElementSelector',
		targetExpandBtn: '#btnSelector',
		showBtn: '#btnSelector',
		hideBtn: '#btnSelector',
		data: {},
		isExpanded: false,
		customLegend: true,
		zoomEnabled: false
	},

	init: function(options,parent){
        this.parent = parent;
        this.options.data = {};
		$.extend(true, this.options, options);

		var thisChart = this;
		//console.log('Initialize Chart:  ' + this.options.targetElement);

		thisChart.options.$targetElement = $(this.options.targetElement);
		thisChart.options.$expandBtnElement = $(this.options.targetExpandBtn);
		thisChart.options.$showBtnElement = $(this.options.showBtn);
		thisChart.options.$hideBtnElement = $(this.options.hideBtn);

		stackedBarChart.options.$expandBtnElement.off('click');
		stackedBarChart.options.$expandBtnElement.click(thisChart.toggleExpand);
		stackedBarChart.options.$hideBtnElement.click(thisChart.hideAllCategories);
		stackedBarChart.options.$showBtnElement.click(thisChart.showAllCategories);

		thisChart.renderChart();
	},

	renderChart: function(){
		if($( document ).width() < 800){
			var bottomPadding = 20;
		}else{
			var bottomPadding = 6;
		}

		stackedBarChart.stackedChart = c3.generate({
        bindto: stackedBarChart.options.targetElement,
        data: {
            empty: { label: { text: "No Data Available for this Date Range" }   },
            x : 'x',
            columns: stackedBarChart.options.data.columns,
            groups: [
                stackedBarChart.options.data.groups
            ],
						order: 'asc',
            type: 'bar',
            onclick: function (d, i) {
                // redirect to
                if(typeof mainChartStyleID != "undefined"){
                    if(mainChartStyleID == 0 && detail_page_active){
                        this.parent.Utilities.googleTracking.sendTrackEvent('mainChart','teamLink');
                                        setTimeout(function(){
                        window.location.href = "Team.html#"+stackedBarChart.options.data.columns[0][d['index']+1];
                                        }, 100);
                    }
                }
            }
        },
				zoom: {
        	enabled: stackedBarChart.options.zoomEnabled
    		},
			  padding: {
						bottom: bottomPadding
				},
				legend: {
					show: !stackedBarChart.options.customLegend
				},
        axis: {
            x: {
                type: 'category'
            }
        },
			  color: {
					pattern: ["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F","#BCBD22","#17BECF","#154F78","#B0580A","#248224","#7D1717"]
                  // DUI Drugs Domestic Violence Assault / Battery Gun License / Traffic Alcohol Disorderly conduct Resisting Theft / Burglary Sex Animal Abuse Murder / Manslaughter Other
				//pattern: ["#57b9c5", "#75ed85","#cd7b66", "#7f2b04", "#1d413b", "#3f862d", "#b4d170", "#f8cac2", "#f2c029", "#304f9b","#e84675", "#8cabea","#e13219", "#5d1a79"]
              }
    });
		if(stackedBarChart.options.customLegend){
			stackedBarChart.renderCustomLegend();
		}

	},

	renderCustomLegend: function(){
		// should probably try and remove the existing legend first if one exists
		$('.customLegend').remove();
			d3.select('.chart-container').insert('div', '.chart-options').attr('class', 'customLegend').selectAll('span')
			.data(stackedBarChart.options.data.groups)
		.enter().append('span')
			.attr('data-id', function (id) { return id; })
			.attr('class', function (id) {
				var newID = id.replace('/', '');
				newID = newID.split(' ').join('');
				return 'customLegend-item customLegend-item-' + newID; })
			.html(function (id) { return "<span class=\"customLegend-item-color\" style=\"background-color:"+ stackedBarChart.stackedChart.color(id) +";\"></span> " + id; })
			.on('mouseover', function (id) {
					stackedBarChart.stackedChart.focus(id);
					if(isFirstHover){
						isFirstHover = false;
						this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'legendMouseover');
					}
			})
			.on('mouseout', function (id) {
					stackedBarChart.stackedChart.revert();
			})
			.on('click', function (id) {
					stackedBarChart.stackedChart.toggle(id);
					var newID = id.replace('/', '');
					newID = newID.split(' ').join('');
					var legendItem = d3.select('.customLegend-item-'+newID);
					//console.log(legendItem);
					legendItem.classed("transparent", !legendItem.classed("transparent"));
					this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'legendClick');
			});
	},

	toggleExpand: function(){
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

		this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'expand toggle');
		// re-render
		stackedBarChart.renderChart();
	},
	hideAllCategories: function(){
		stackedBarChart.stackedChart.hide();
        this.parent.Utilities.googleTracking.sendTrackEvent('mainChart','hideAll');
		$('.customLegend-item').addClass('transparent');
	},
	showAllCategories: function(){
		stackedBarChart.stackedChart.show();
        this.parent.Utilities.googleTracking.sendTrackEvent('mainChart','showAll');
		$('.customLegend-item').removeClass('transparent');
	}
};
