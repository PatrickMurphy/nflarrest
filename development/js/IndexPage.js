// can these be removed? -----------------
var dateRangeNFL,
	mainChartReturned = false;
//last_start_pos = 0,
//listsReturnCount = 0,
//	listsReturned = false,
var ytdChart = false,
	mainChartStyleID = 0,
	detail_page_active = true;

// ----------------------------------------

var IndexPageInstance;

class IndexPage extends WebPage {
    constructor() {
        super('Index');
        
        // define class member variables
        //this.dateRangeNFL = undefined;
        this.data_controller = undefined;
        this.MeterOrRecent = Math.random() > .5;
        //this.last_start_pos = 0;
        this.detail_page_active = true; // option
        
        // load page specific css
        this.StyleManager.loadCSS('css/modules/styles-indexpage.css');
        
        // setup main chart
        this.MainChart = {
            ytdChart: false,
            StyleID:0,
            ReturnStatus: false,
            
            buttons: [{
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
                    ytdChart: true,
                    element: '#mainChartByConfBtn'
                }, {
                    title: 'By Division',
                    short_title: 'ByDivision',
                    id: 4,
                    ytdChart: true,
                    element: '#mainChartByConfDivBtn'
                }]
        };
        
        this.DateRangeControl = new DateRangeControl(this);// pass this as parent arg

        this.data_controller = new DataController(this.DateRangeControl, this);
        
        this.TopLists = new TopLists(this);

        this.evaluateHash();
        this.changeTopChart();
  
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.LoadingBar.showLoading();
            this.setupChart();
            this.TopLists.reload();
        });

        $('#loadMoreLists').click(this.TopLists.jQuery_Handler);

        if(this.detail_page_active){
            this.data_controller.getTeams(this.RenderTeamLinks);
        }else{
            $('#bottomTeamLinks').hide();
        }

        this.addChartButtonListeners();
        
        this.TopLists.fixTopListLinks();
    }
    
    checkLoadingFinished(){
        if (this.MainChart.ReturnStatus === true && this.TopLists.Lists.ReturnStatus === true) {
            this.TopLists.Lists.ReturnStatus = false;
            this.MainChart.ReturnStatus = false;
            var d = this.MeterOrRecent;

            this.setupArrestOMeter(d);
            this.setupRecentArrestCard(!d);
            
            this.loadingFinished();
        }
    }
    
    RenderTeamLinks(data){
        $.each(data, (key, val) => {
            //var teamlink = this.getPageLink("team", val.Team);
            var page = "team";
            var value = val.Team;
            var teamlink = (page.charAt(0).toUpperCase() + page.slice(1)) + ".html#" + value;
            $('#bottomTeamLinks').append('<a href="' + teamlink + '"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (val.Team_logo_id * 20) + 'px;background-size:100%;"></span> ' + val.Team_preffered_name + '</a> ');
        });
    }
    
    /* ---==== Chart Methods ====--- */
    // jquery handler function that calls class function
    setMainChartHandler(event){
       IndexPageInstance.setMainChart(event.data.btn);
    }
    
    // class function to set necessary vars to change top chart
    setMainChart(theBtn){
        this.MainChart.ytdChart = theBtn.ytdChart;
        this.MainChart.StyleID = theBtn.id;   
        this.Utilities.SetHash(theBtn.short_title);
        this.changeTopChart();
        this.Utilities.googleTracking.sendTrackEvent('mainChart', 'switchTo'+theBtn.short_title);
    }
    
    addChartButtonListeners(){
        // loop through, add the button listeners
        for(var i = 0; i<this.MainChart.buttons.length; i++){
            $(this.MainChart.buttons[i].element).click({btnID: i, btn: this.MainChart.buttons[i]}, this.setMainChartHandler);
        }
    }
    
    changeTopChart(){
        this.setupChart();
        this.changeChartButtonStyle();
    }
    
    changeChartButtonStyle(){
        if (this.MainChart.StyleID == 1) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByYearBtn').addClass('button-primary');
        } else if (this.MainChart.StyleID == 0) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByTeamBtn').addClass('button-primary');
        } else if (this.MainChart.StyleID == 2) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartBySeasonBtn').addClass('button-primary');
        } else if (this.MainChart.StyleID == 3) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByConfBtn').addClass('button-primary');
        } else if (this.MainChart.StyleID == 4) {
            $('.mainChartBtn').removeClass('button-primary');
            $('#mainChartByConfDivBtn').addClass('button-primary');
        }
    }
    
    setupChart(){
        // todo stacked bar es6
        //this.charts[0] = stackedBarChart;
        
        // if set destroy
        if(this.charts.length > 0)
            if(typeof (this.charts[0]) != "undefined")
                if(this.charts[0].hasOwnProperty('stackedChart'))
                    if (typeof (this.charts[0].stackedChart) != "undefined")
                        this.charts[0].stackedChart.destroy();
        
        this.getOverallChartData((newData) => {
            this.charts[0] = new StackedBarChart({
                data: newData,
                targetElement: '#chart',
                targetExpandBtn: '#details_summary_btn',
                hideBtn: '#hideAll_btn',
                showBtn: '#showAll_btn'
            },this);
            
            this.MainChart.ReturnStatus = true;
            this.checkLoadingFinished();
        });
    }
    
    getOverallChartData(callback){
        if (this.MainChart.StyleID == 0) {
            this.data_controller.getOverallChart("Crime","Team Code", "Team Code", "DESC", callback);
        } else if (this.MainChart.StyleID == 1) {
            this.data_controller.getOverallChart("Crime","Year", "Year", "ASC", callback);
        } else if (this.MainChart.StyleID == 3) {
            this.data_controller.getOverallChart("Crime","Day", "DayOrder", "ASC", callback);
        } else if (this.MainChart.StyleID == 2) {
            this.data_controller.getOverallChart("SeasonState","Season", "Season", "ASC", callback);
        } else if (this.MainChart.StyleID == 4) {
            this.data_controller.getOverallChart("Division","Year", "Year", "ASC", callback);
        }
    }
    /* ---==== End Chart Methods ====--- */
    
    
    /* ---==== Setter/Getter Methods ====--- */
    setMainChartYTD(ytd){
        this.MainChart.ytdChart = ytd;
    }
    setMainChartStyleID(id){
        this.MainChart.StyleID = id;
    }
    
    /* ---==== Other Methods ====--- */
    evaluateHash(){
        // if hash set, set chart type
        if (window.location.hash) {
            if (window.location.hash == "#ByYear") {
                this.MainChart.StyleID = 1;
            } else if (window.location.hash == "#BySeason") {
                this.MainChart.StyleID = 2;
            } else if (window.location.hash == "#ByDayOfWeek") {
                this.MainChart.StyleID = 3;
            } else if (window.location.hash == "#ByDivision") {
                this.MainChart.StyleID = 4;
            } else {
                this.MainChart.StyleID = 0;
            }
        }
    }
    
    setupArrestOMeter(d){
        var animate = true;
        this.data_controller.getArrestMeter(function (data) {
            var daysSince = data['current']['daysSince'],
                recordAlltime = data['alltime']['record'],
                recordAvg = data['alltime']['average'],
                percent = parseInt(daysSince) / recordAlltime;
            
            // update html
            $('#arrest_meter_text').html('It has been <b>' + daysSince + '</b> Days since the last arrest.</p>');
            $('#arrest_meter_subtext').html('Average: <b>' + recordAvg + '</b> Days | Record W/O arrest: <b>' + recordAlltime + '</b> Days');
            $('.recordHolder').html(recordAlltime);
            $('.avgRecord').html(recordAvg).css({left:((parseInt(recordAvg)/parseInt(recordAlltime)) * 100) + '%'});
            
            // animate
            if (animate) {
                $('.meter-fg').animate({
                    width: (percent * 100) + '%'
                }, 1750);
            } else {
                $('.meter-fg').width((percent * 100) + '%');
            }

            // if random display, hide or google track
            if(!d){
                $('#arrest-o-meter').hide();
            }else{            
                //set arrestometerorrecent
                ga('set', 'dimension1', "Recent");
            }
        });
    }
    
    setupRecentArrestCard(d){
        this.data_controller.getMostRecentArrest((row) => {
            var card = new ArrestCard(this, row,{showName:true,standalone:true});
            $('#mostRecentArrestCard').html(card.getHTML());
        });
        
        // display based on random
        if(!d){
            $('#recent-arrest-card').hide();
        }else{            
            //set arrestometerorrecent
            ga('set', 'dimension1', "ArrestOMeter");
        }
    }
}

$(window).load(function () {
    IndexPageInstance = new IndexPage();
});