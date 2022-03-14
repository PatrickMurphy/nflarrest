var DetailPageInstance;
class TeamDetailPage extends DetailPage {
    constructor() {
        super('Team', [{
            type: 'donut',
            url: 'api/v1/team/topPlayers/',
            field: 'Name',
            targetElement: '#playerchart',
            title: 'Players'
            }, {
            type: 'donut',
            url: 'api/v1/team/topCrimes/',
            field: 'Crime_category',
            targetElement: '#crimechart',
            title: 'Crime Categories'
            }],{    targetElement: 'arrest_table',
                    targetElementMobile: 'arrest_cards',
                    targetElementTableContainer: 'arrest_details_container',
                    targetElementTitleIncidentCount: 'arrest_details_incident_count',
                    TitlePrefix: '',
                    RowLimit:15,
                    GoogleTrackingCategory: 'DetailPageArrests',
                    columns:[DATA_MODEL_DISPLAY_COLUMNS.getColumn('Date',1),
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Name',2),
                            DATA_MODEL_DISPLAY_COLUMNS.Crime_category,
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Description',4),
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Outcome',3)
                        ], 
                    RenderCardFn:(row) =>   {
                            var c = new ArrestCard(this, row);
                            return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Player, c.Dimension_Position);
                        }
                    });
    }
    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        self.data_controller.getArrests(this.FilterFunction, (data) => {
            if(data.length > 0){
                var titleHTMLAppend = ' <span style="display:inline-block;width:20px;height:20px;background:url(\'images/NFLTeamLogos.png\') 0px -' + data[0]['Team_logo_id'] * 20 + 'px;background-size:100%;"></span>';
                superChange(data[0].Team_preffered_name, self, titleHTMLAppend);
            }
        });
    }
}
$(window).load(function () {
    DetailPageInstance = new TeamDetailPage();
});