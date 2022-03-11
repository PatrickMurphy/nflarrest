var IndexPageInstance;

class IndexPage extends WebPage {
    constructor() {
        super('Index');
        
        // load page specific css
        this.StyleManager.loadCSS('css/modules/styles-indexpage.css');
        this.StyleManager.loadCSS('css/vendor/pagination.css');
        
        // define class member variables
        this.MeterOrRecent = Math.random() > 0.5; // use arrest meter or most recent arrest card on page bool
        this.detail_page_active = true; // option to use detail page or not, always set to true now that they are active
        
        this.DateRangeControl = new DateRangeControl(this);
        this.data_controller = new DataController(this.DateRangeControl, this);
        var data_table_cols = [{
                    column_id: 0,
                    column_title: 'Date:',
                    column_data: 'Date',
                    column_display_fn: (row) => {
                        return moment(row['Date'], "YYYY-MM-DD").fromNow();
                    },
                    //column_classes: '',
                    column_tooltip: 'Date', // TODO: make this work
                    column_width: 2
                },
                {
                    column_id: 1,
                    column_title: 'Player:',
                    column_data: 'Name',
                    column_display_fn: (row) => {
                        return '<a href="Player.html#' + row['Name'] + '">'+row['Name']+'</a>';
                    },
                    column_width: 2
                },
                {
                    column_id: 2,
                    column_title: 'Crime Category:',
                    column_data: 'Crime_category',
                    column_display_fn: (row) => {
                        return '<a href="CrimeCategory.html#' + row['Crime_category'] + '">'+row['Crime_category']+'</a>';
                    },
                    column_width: 2
                },
                {
                    column_id: 3,
                    column_title: 'Team:',
                    column_data: 'Team',
                    column_display_fn: (row) => {
                        return '<a href="Team.html#' + row['Team'] + '"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (row['Team_logo_id'] * 20) + 'px;background-size:100%;"></span> ' + row['Team'] + '</a>';
                    },
                    column_width: 1
                },
                {
                    column_id: 4,
                    column_title: 'Description:',
                    column_data: 'Description',
                    column_width: 5
                }];
        var dataTableOptions = {targetElement:'arrest_table',
                                TitlePrefix:'Latest ', 
                                columns:data_table_cols, 
                                RowLimit:5,
                                GoogleTrackingCategory:'IndexPageArrests'
                               };
        
        dataTableOptions['RenderCardFn'] = (row) => {
            var c = new ArrestCard(this, row);
            return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Team,c.Dimension_Player);
        };
        this.DataTable_ModuleID = this.addModule(new DataTable(this,[],dataTableOptions));
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
            this.data_controller.getTeams((data)=>{this.RenderTeamLinks(data)});
        }else{
            $('#bottomTeamLinks').hide();
        }
        /*
        var tbl = this.getModule(this.DataTable_ModuleID);

        tbl.setRenderCardFn((row) => {
            var c = new ArrestCard(this, row);
            return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Team,c.Dimension_Player);
        });
        tbl.renderView();
*/
        $('#dateRangeJquery').on('dateRangeChanged', (e) => {
            this.renderView();
        });
    }
    
    renderView(){
        this.LoadingBar.showLoading();
        this.MainChart.setupChart();
        this.TopLists.reload();
        this.renderModules();
        var getTeamsCallbackFn = (data) => {this.RenderTeamLinks(data);};
        this.data_controller.getTeams(getTeamsCallbackFn);
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
                // if both objects defined, check return statuses
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
                //console.log('ERROR: TopLists Not Defined');
            }
        }else{
            //console.log('ERROR: MainChart Not Defined');
        }
    }
    RenderTeamLinks(data){
        $('#bottomTeamLinks').html('<h4>Teams</h4>');
        $('#bottomTeamLinks').append('<div id="bottomTeamLinksNFC" class="row"><div id="division_NFC_West" class="three columns"><h5>NFC West</h5></div><div id="division_NFC_North" class="three columns"><h5>NFC North</h5></div><div id="division_NFC_South" class="three columns"><h5>NFC South</h5></div><div id="division_NFC_East" class="three columns"><h5>NFC East</h5></div></div>');
        $('#bottomTeamLinks').append('<div id="bottomTeamLinksAFC" class="row"><div id="division_AFC_West" class="three columns"><h5>AFC West</h5></div><div id="division_AFC_North" class="three columns"><h5>AFC North</h5></div><div id="division_AFC_South" class="three columns"><h5>AFC South</h5></div><div id="division_AFC_East" class="three columns"><h5>AFC East</h5></div></div>');
        $.each(data, (key, val) => {
            //var teamlink = this.getPageLink("team", val.Team);
            var page = "team";
            var value = val.Team;
            var teamlink = (page.charAt(0).toUpperCase() + page.slice(1)) + ".html#" + value;
            var listID = '#division_'+val.Team_Conference+'_'+val.Team_Division; //'#bottomTeamLinks';
            var teamLinkDisplay = val.Team_preffered_name; // example = 'Seattle Seahawks'
            if(this.arrest_view_mode == 1){ // if mobile decrease screen realestate needed for team links
                teamLinkDisplay = val.Team + ' ' + val.Team_name; // example = 'SEA Seahawks'
            }
            $(listID).append('<a href="' + teamlink + '"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (val.Team_logo_id * 20) + 'px;background-size:100%;"></span> ' + teamLinkDisplay + ' <b>' + val.Team_Arrest_Count + '</b></a> ');
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
                $('#arrest-meter').hide();
            }else{            
                //set arrestometerorrecent
                ga('set', 'dimension1', "Recent");
            }
        });
    }
    
    setupRecentArrestCard(d){
        this.data_controller.getMostRecentArrest((row) => {
            var card = new ArrestCard(this, row,{standalone:true});
            $('#mostRecentArrestCard').html(card.getHTML(card.Dimension_Crime_Category,card.Dimension_Team,card.Dimension_Player));
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