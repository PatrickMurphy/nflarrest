var IndexPageInstance;

class IndexPage extends WebPage {
    constructor() {
        super('Index');
        
        // load page specific css
        this.StyleManager.loadCSS('css/modules/styles-indexpage.css');
        
        // define class member variables
        this.MeterOrRecent = Math.random() > .5; // use arrest meter or most recent arrest card on page bool
        this.detail_page_active = true; // option to use detail page or not, always set to true now that they are active
        
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        this.MainChart = new MainChart(this);
        this.TopLists = new TopLists(this);
        
        // if hash set, set chart type
        this.evaluateHash();

        // fix top links add link handler for whole element // TODO: Move to top lists class
        this.TopLists.fixTopListLinks();
        
        // add jquery load more lists button handler // TODO: Move to top lists class
        $('#loadMoreLists').click(this.TopLists.jQuery_Handler);
        
        // display team page links
        if(this.detail_page_active){
            this.data_controller.getTeams(this.RenderTeamLinks);
        }else{
            $('#bottomTeamLinks').hide();
        }
        
        // on user update date range - change date handler
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.LoadingBar.showLoading();
            this.MainChart.setupChart();
            this.TopLists.reload();
        });
    }
    
    evaluateHash(){
        // if hash set, set chart type
        if (window.location.hash) {
            if (window.location.hash == "#ByYear") {
                this.MainChart.setStyleID(1);
            } else if (window.location.hash == "#BySeason") {
                this.MainChart.setStyleID(2);
            } else if (window.location.hash == "#ByDayOfWeek") {
                this.MainChart.setStyleID(3);
            } else if (window.location.hash == "#ByDivision") {
                this.MainChart.setStyleID(4);
            } else {
                this.MainChart.setStyleID(0);
            }
        }else{
            this.MainChart.setStyleID(0);
        }
    }
    
    checkLoadingFinished(){
        if (typeof this.MainChart !== "undefined"){
            if(typeof this.TopLists !== "undefined"){
                if(this.MainChart.getReturnStatus() && this.TopLists.getReturnStatus()) {
                    // reset loading status
                    this.TopLists.setReturnStatus(false);
                    this.MainChart.setReturnStatus(false);

                    // update UI
                    this.setupArrestOMeter(this.MeterOrRecent);
                    this.setupRecentArrestCard(!this.MeterOrRecent);

                    this.loadingFinished(); // WebPage.js inherit
                }
            }else{
                console.log('ERROR: TopLists Not Defined');
            }
        }else{
            console.log('ERROR: MainChart Not Defined');
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
    
    /* ---==== Other Methods ====--- */
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