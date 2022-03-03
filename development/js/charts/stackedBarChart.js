class StackedBarChart extends Chart {
    constructor(opt,parent){
        super(opt,'bar',parent);
        this.isFirstHover = true;
        
		this.options.$targetElement = $(this.options.targetElement);
        
        this.renderChart();
    }
    
    getBottomPadding(){
        var bottomPadding = 0;
        if($( document ).width() < 800){
            bottomPadding = 20;
		}else{
			bottomPadding = 6;
		}
        return bottomPadding;
    }
    
    renderCustomLegend(){
        $('.customLegend').remove();
        d3.select('.chart-container').insert('div', '.chart-options').attr('class', 'customLegend').selectAll('span')
            .data(this.options.data.groups)
            .enter().append('span')
			.attr('data-id', function (id) { return id; })
			.attr('class', function (id) {
				var newID = id.replace('/', '');
				newID = newID.split(' ').join('');
				return 'customLegend-item customLegend-item-' + newID; })
			.html(function (id) { return "<span class=\"customLegend-item-color\" style=\"background-color:"+ this.chart.color(id) +";\"></span> " + id; })
			.on('mouseover', function (id) {
                this.chart.focus(id);
                if(this.isFirstHover){
                    this.isFirstHover = false;
                    this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'legendMouseover');
                }
			})
			.on('mouseout', function (id) {
                this.chart.revert();
			})
			.on('click', (id) => {
                this.chart.toggle(id);
                var newID = id.replace('/', '');
                newID = newID.split(' ').join('');
                var legendItem = d3.select('.customLegend-item-'+newID);
                //console.log(legendItem);
                legendItem.classed("transparent", !legendItem.classed("transparent"));
                this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'legendClick');
        });
    }
    
    renderChart(){
        var bottomPadding = this.getBottomPadding();
        
        var chartObj = {
            bindto:this.options.targetElement,
            data: {
                empty: { label: { text: "No Data Available for this Date Range" }   },
                x : 'x',
                columns: this.options.data.columns,
                groups: [this.options.data.groups],
                order: 'asc',
                type: 'bar',
                onclick: (d, i) => {
                    // redirect to
                    if(typeof this.parent.MainChart.StyleID != "undefined"){
                        if(this.parent.MainChart.StyleID == 0 && this.parent.detail_page_active){
                            this.parent.Utilities.googleTracking.sendTrackEvent('mainChart','teamLink');
                            setTimeout(()=>{
                                window.location.href = "Team.html#"+this.options.data.columns[0][d['index']+1];
                            }, 100);
                        }
                    }
                }
            },
            zoom: {
                enabled: this.options.zoomEnabled
            },
            padding: {
                bottom: bottomPadding
            },
            legend: {
                show: !this.options.customLegend
            },
            axis: {
                x: {
                    type: 'category'
                }
            },
            tooltip: {
                contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                    console.log(d);
                    if (d[1].value > 0) {
                        // Use default rendering
                        return this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color);
                    } else {
                        // no render if value less than equal 0
                        return '';
                    }
                },  
            },
            color: {
                pattern: ["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F","#BCBD22","#17BECF","#154F78","#B0580A","#248224","#7D1717"]
            }
        };
		this.chart = c3.generate(chartObj);
		if(this.options.customLegend){
			this.renderCustomLegend();
		}
    }
}