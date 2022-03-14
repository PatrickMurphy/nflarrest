var DetailPageInstance;
class PlayerDetailPage extends DetailPage {
    constructor() {
        super('Player', [{
            type: 'donut',
            url: 'api/v1/player/topTeams/',
            field: 'Team',
            targetElement: '#teamchart',
            title: 'Teams'
            }, {
            type: 'donut',
            url: 'api/v1/player/topCrimes/',
            field: 'Category',
            targetElement: '#crimeschart',
            title: 'Crimes'
            }],{    targetElement: 'arrest_table',
                    targetElementMobile: 'arrest_cards',
                    targetElementTableContainer: 'arrest_details_container',
                    targetElementTitleIncidentCount: 'arrest_details_incident_count',
                    TitlePrefix: '',
                    RowLimit:15,
                    GoogleTrackingCategory: 'DetailPageArrests',
                    columns:[DATA_MODEL_DISPLAY_COLUMNS.getColumn('Date',1),
                            DATA_MODEL_DISPLAY_COLUMNS.Name,
                            DATA_MODEL_DISPLAY_COLUMNS.Crime_category,
                            DATA_MODEL_DISPLAY_COLUMNS.Team,
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Description',4),
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Outcome',2)
                    ], 
                    RenderCardFn:(row) =>   {
                            var c = new ArrestCard(this, row);
                            return c.getHTML(c.Dimension_Team, c.Dimension_Crime_Category, c.Dimension_Position);
                        }
                    });
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        superChange(this.pageID, self);
    }
}
$(window).load(function () {
    DetailPageInstance = new PlayerDetailPage();
});