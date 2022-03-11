var DetailPageInstance;
class CrimeCategoryDetailPage extends DetailPage {
    constructor() {
        super('Crime Category', [{
            type: 'donut',
            url: 'api/v1/crime/topTeams/',
            field: 'Team',
            targetElement: '#teamchart',
            title: 'Teams'
            }, {
            type: 'donut',
            url: 'api/v1/crime/topPositions/',
            field: 'Category',
            targetElement: '#crimechart',
            title: 'Crime Sub-Category'
            }, {
            type: 'donut',
            url: 'api/v1/crime/topPlayers/',
            field: 'Name',
            targetElement: '#playerchart',
            title: 'Players'
            }],{ targetElement: 'arrest_table',
                                targetElementMobile: 'arrest_cards',
                                targetElementTableContainer: 'arrest_details_container',
                                targetElementTitleIncidentCount: 'arrest_details_incident_count',
                                TitlePrefix: '',
                                RowLimit:15,
                                GoogleTrackingCategory: 'DetailPageArrests',
                                columns:[{
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
                                    column_title: 'Crime Sub-Category:',
                                    column_data: 'Category',
                                    column_display_fn: (row) => {
                                        return '<a href="Crime.html#' + row['Category'] + '">'+row['Category']+'</a>';
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
                                }], 
                                RenderCardFn:(row) =>   {
                                                            var c = new ArrestCard(this, row);
                                                            return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Team,c.Dimension_Player);
                                                        }
                                });
        
        /*
        //this.DataTable_ModuleID = this.addModule(new DataTable(this));
        var tbl = this.getModule(this.DataTable_ModuleID);
        tbl.setRenderRowHeaderFn(() => {return '<tr><th class="two columns">Date:</th>' 
                                            + '<th class="two columns">Player:</th>'
                                            + '<th class="two columns">Crime Sub-Category:</th>'
                                            + '<th class="one column">Team:</th>'
                                            + '<th class="five columns">Description:</th></tr>';});
        tbl.setRenderRowFn((row) => {
            if(typeof row !== 'undefined'){
                return '<tr><td class="two columns" '+this.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>'
                    // getDimensionLink methods from webpage.js
                    + '<td class="two columns"><a href="' + this.getPlayerLink(row['Name']) + '">' + row['Name'] + '</a></td>'  
                    + '<td class="two columns"><a href="' + this.getCrimeSubCategoryLink(row['Category']) + '">' + row['Category'] + '</a></td>'
                    + '<td class="one column"><a href="' + this.getTeamLink(row['Team']) + '">'
                        + '<span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;'
                            +'background:url(\'images/NFLTeamLogos.png\') 0px -'+(row['Team_logo_id']*20)+'px;background-size:100% !important;"></span>'
                                + row['Team'] + '</a></td>'
                    + '<td class="five columns">' + row['Description'] + '</td>'
                    //+ '<td class="three columns">' + row['Outcome'] + '</td>'
                    + '</tr>';
            }else{ 
                console.warn('Module DataTable: undefined row rendered');
                return '';
            }
        });
        tbl.setRenderCardFn((row) => {
            var c = new ArrestCard(this, row);
            return c.getHTML(c.Dimension_Team, c.Dimension_Player, c.Dimension_Crime);
        });
        tbl.renderView();*/
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        superChange(this.pageID, self);
    }
}
$(window).load(function () {
    DetailPageInstance = new CrimeCategoryDetailPage();
});