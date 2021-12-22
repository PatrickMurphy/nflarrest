var DEBUG = false;
var dateRangeNFL,
	mainChartReturned = false;

var last_start_pos = 0,
	listsReturnCount = 0,
	listsReturned = false,
	ytdChart = false,
	mainChartStyleID = 0,
	detail_page_active = true;

var data_controller;


var IndexPageInstance;
class IndexPage extends WebPage {
    constructor() {
        super();
        
        // define class member variables
        this.data_controller = undefined;
        this.dateRangeNFL = undefined;
        this.last_start_pos = 0;
        this.detail_page_active = true; // option
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
        this.Lists = {
            ReturnStatus: false
        };
        
        // run constructor logic
        dateRangeController.init((newDateRange) => {
            this.dateRangeNFL = newDateRange;
            dateRangeNFL = newDateRange; // backup adapter
            DataController.init(dateRangeNFL, (newDataController) => {
                //nflLoadingBar.reset();
                this.data_controller = newDataController;
                data_controller = newDataController; // backup adapter
                this.evaluateHash();
                this.changeTopChart();
                // first load of top lists
                this.load_top_lists('first');
                this.RenderUpdateDate();    
                
                $('#dateRangeJquery').on('dateRangeChanged', (e) => {
                    this.LoadingBar.showLoading();
                    this.setupChart();
                    this.reload_top_lists();
                });

                $('#loadMoreLists').click(this.load_top_lists_Handler);

                if(this.detail_page_active){
                    this.data_controller.getTeams(this.RenderTeamLinks);
                }else{
                    $('#bottomTeamLinks').hide();
                }

                this.addChartButtonListeners();
                this.setupNewsletter();
            });
        });
        
        this.fixTopListLinks();
    }
    
    RenderUpdateDate(){
        // included in min file is lastUpdate var
        $("#updateDateFooter").text("Updated: " + lastUpdate);
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
    
    // jquery handler function that calls class function
    load_top_lists_Handler(event){
       IndexPageInstance.load_top_lists('not first', false);
    }
    
    load_top_list(data, page, prefix, list, values, replace) {
        replace = replace || false;
        if (replace) {
            this.last_start_pos = 0;
        }
        var items = [];
        if (data.length > 0) {
            $.each(data, (key, val) => {
                var link = "<a href=\"" + this.getDetailPageLink(page, val[values[0]]) + "\">";
                var link_end = '</a>';
                if (page == '' || !this.detail_page_active) {
                    link = '';
                    link_end = '';
                }
                items.push("<li id='" + prefix + key + "'>" + link + "<span>" + val[values[0]] + "</span><span class='value-cell'>" + val[values[1]] + "</span>" + link_end + "</li>");
            });
        } else {
            if (replace) {
                items.push('<li class="list-no-data-msg-item">No Data Available for this Date Range</li>');
            }
        }
        if (replace) {
            $(list).html(items.join(""));
        } else {
            $(list).append(items.join(""));
        }
    }
        
    load_top_lists(first, replace) {
        first = first || 'not first';
        replace = replace || false;

        $('.list-no-data-msg-item').remove();
        
        //var ref = IndexPageInstance;

        if (first != 'first') {
            this.Utilities.googleTracking.sendTrackEvent('TopLists', 'Load Next Page');
        }
        
        //console.log(this, this.last_start_pos);
        this.data_controller.getTopLists(this.last_start_pos, dateRangeNFL.getStart(), dateRangeNFL.getEnd(), (data) => {
            var crimes_list = data[0],
                players_list = data[1],
                positions_list = data[2];

            if ((crimes_list.length + players_list.length + positions_list.length) <= 0 && this.last_start_pos == 0) {
                console.warn('no data returned');
            }

            this.load_top_list(crimes_list, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
            this.load_top_list(players_list, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
            this.load_top_list(positions_list, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);

            // set returns
            this.Lists.ReturnStatus = true;
            this.Lists.ReturnCount = 0;
            this.last_start_pos = this.last_start_pos + 5;
            
            this.checkLoadingFinished();
        });
    }
    
    reload_top_lists() {
        this.last_start_pos = 0;
        this.load_top_lists('not first', true);
    }
    
    checkLoadingFinished(){
        if (this.MainChart.ReturnStatus === true && this.Lists.ReturnStatus === true) {
            this.Lists.ReturnStatus = false;
            this.MainChart.ReturnStatus = false;
            var d = Math.random() > .5;

            this.setupArrestOMeter(d);
            this.setupRecentArrestCard(!d);
            
            this.loadingFinished();
        }
    }
    
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
    
    /* ---==== Chart Methods ====--- */
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
        if(this.charts.length > 0)
            if(this.charts[0] !== null)
                if(this.charts[0].hasOwnProperty('stackedChart'))
                    if (typeof (this.charts[0].stackedChart) != "undefined")
                        this.charts[0].stackedChart.destroy();
        
        this.getOverallChartData((newData) => {
            this.charts[0] = stackedBarChart.init({
                data: newData,
                targetElement: '#chart',
                targetExpandBtn: '#details_summary_btn',
                hideBtn: '#hideAll_btn',
                showBtn: '#showAll_btn'
            });
            
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
            this.data_controller.getOverallChart("Crime","Day", "Day", "ASC", callback);
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
        this.data_controller.getMostRecentArrest(function (row) {
            var card = new ArrestCard(row,{showName:true,standalone:true});
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
    
    setupNewsletter(){
        $('#newsletterForm').submit((e) => {
            e.preventDefault();
            $.ajax({
                url: 'http://patrickmurphywebdesign.com/Projects/emails/emailList.php',
                type: 'POST',
                data: {
                    'email': $('input[name=email]').val()
                }
            });
            $('#newsletterForm').html('<p>Thanks for Subscribing! Expect Emails when Players are arrested or when records are broken!</p>');
            this.Utilities.googleTracking.sendTrackEvent('Email List', 'Subscribe');
        });
        $('#newsletterForm input[name=email]').focus(() => {
            this.Utilities.googleTracking.sendTrackEvent('Email List', 'Focus');
        });
        
        // button for mobile to show the newsletter form
        $('#newsletterDisplayBtn').click(() => {
            $('#newsletterContainer').css('display', 'block');
            $('#newsletterDisplayBtn').css('display', 'none');
            this.Utilities.googleTracking.sendTrackEvent('Email List', 'MobileShowForm');
        });
    }
    
    fixTopListLinks(){
        // add click listener to li so that entire element is clickable rather than just the link
        if(detail_page_active){
            $(".top-list ol li").click(function () {
                window.location = $(this).find("a").attr("href");
                return false;
            });
        }
    }
}

$(window).load(function () {
    IndexPageInstance = new IndexPage();
});