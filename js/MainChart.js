class MainChart {
    constructor(parent){
        this.parent = parent;
        this.ReturnStatus = false;
        this.ytdChart = false;
        this.StyleID = 0;
        this.buttons = [{
                    title: 'By Team',
                    short_title: 'ByTeam',
                    id: 0,
                    ytdChart: false,
                    element: '#mainChartByTeamBtn'
                }, {
                    title: 'By Year',
                    short_title: 'ByYear',
                    id: 1,
                    ytdChart: true,
                    element: '#mainChartByYearBtn'
                }, {
                    title: 'By Season',
                    short_title: 'BySeason',
                    id: 2,
                    ytdChart: false,
                    element: '#mainChartBySeasonBtn'
                }, {
                    title: 'By Day',
                    short_title: 'ByDayOfWeek',
                    id: 3,
                    ytdChart: false,
                    element: '#mainChartByConfBtn'
                }, {
                    title: 'By Division',
                    short_title: 'ByDivision',
                    id: 4,
                    ytdChart: false,
                    element: '#mainChartByConfDivBtn'
                }];
        
        this.addChartButtonListeners();
        
        this.changeTopChart();
    }
    
    /* ---==== Chart Methods ====--- */
    // jquery handler function that calls class function
    setMainChartHandler(event){
       IndexPageInstance.MainChart.setMainChart(event.data.btn);
    }
    
    // class function to set necessary vars to change top chart
    setMainChart(theBtn){
        this.ytdChart = theBtn.ytdChart;
        this.StyleID = theBtn.id;   
        this.parent.Utilities.SetHash(theBtn.short_title);
        this.changeTopChart();
        this.parent.Utilities.googleTracking.sendTrackEvent('mainChart', 'switchTo'+theBtn.short_title);
    }
    
    addChartButtonListeners(){
        // loop through, add the button listeners
        for(var i = 0; i<this.buttons.length; i++){
            $(this.buttons[i].element).click({btnID: i, btn: this.buttons[i]}, this.setMainChartHandler);
        }
    }
    
    changeTopChart(){
        this.setupChart();
        this.changeChartButtonStyle();
    }
    
    changeChartButtonStyle(){
        if (this.StyleID == 1) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByYearBtn').addClass('button-primary');
        } else if (this.StyleID == 0) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByTeamBtn').addClass('button-primary');
        } else if (this.StyleID == 2) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartBySeasonBtn').addClass('button-primary');
        } else if (this.StyleID == 3) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByConfBtn').addClass('button-primary');
        } else if (this.StyleID == 4) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByConfDivBtn').addClass('button-primary');
        }
    }
    
    // if chart is set destroy, for using before rendering new chart
    destroyChart(){
        if(this.parent.charts.length > 0){
            if(typeof (this.parent.charts[0]) != "undefined") { // TODO: Fix assumption that main chart will be element 0 in parent charts collection
                if((this.parent.charts[0]).hasOwnProperty('stackedChart')) {
                    if (typeof (this.parent.charts[0].stackedChart) != "undefined") {
                        this.parent.charts[0].stackedChart.destroy();
                    }
                }
            }
        }
    }
    
    setupChart(){
        this.destroyChart();
        
        // render function stored for get data callback
        var renderNewChart = (newData) => {
            var chartSettings = {
                data: newData,
                targetElement: '#chart',
                targetExpandBtn: '#details_summary_btn',
                hideBtn: '#hideAll_btn',
                showBtn: '#showAll_btn'
            };
            
            // set parent charts object to new Stacked Bar class instance
            this.parent.charts[0] = new StackedBarChart(chartSettings,this);
            this.setReturnStatus(true);
            this.parent.checkLoadingFinished();
        };
        
        this.getOverallChartData(renderNewChart);
    }
    
    getOverallChartData(callback){
        if (this.StyleID == 0) {
            this.parent.data_controller.getOverallChart("Crime", "Team Code", "Team Code", "DESC", callback);
        } else if (this.StyleID == 1) {
            this.parent.data_controller.getOverallChart("YearToDate", "Year", "Year", "ASC", callback);
        } else if (this.StyleID == 3) {
            this.parent.data_controller.getOverallChart("Crime", "Day", "DayOrder", "ASC", callback);
        } else if (this.StyleID == 2) {
            this.parent.data_controller.getOverallChart("SeasonState", "Season", "Season", "ASC", callback);
        } else if (this.StyleID == 4) {
            this.parent.data_controller.getOverallChart("Crime", "Division", "Division", "ASC", callback);
        }
    }
    /* ---==== End Chart Methods ====--- */
    
    
    /* ---==== Setter/Getter Methods ====--- */
    setYTD(ytd){
        this.ytdChart = ytd;
    }
    getYTD(){
        return this.ytdChart;
    }
    setStyleID(id){
        this.StyleID = id;
        this.changeTopChart();
    }
    getStyleID(){
        return this.StyleID;
    }
    setReturnStatus(statusBool){
        this.ReturnStatus = statusBool;
    }
    getReturnStatus(){
        return this.ReturnStatus;
    }
}