var DetailPageInstance;
class CrimeDetailPage extends DetailPage {
    constructor() {
        super('Crime', [{
            type: 'donut',
            url: 'api/v1/crime/topTeams/',
            field: 'Team',
            targetElement: '#teamchart',
            title: 'Teams'
            }, {
            type: 'donut',
            url: 'api/v1/crime/topPlayers/',
            field: 'Name',
            targetElement: '#playerchart',
            title: 'Players'
            }, {
            type: 'donut',
            url: 'api/v1/crime/topPositions/',
            field: 'Position',
            targetElement: '#poschart',
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
                            DATA_MODEL_DISPLAY_COLUMNS.Team,
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Description',4),
                            DATA_MODEL_DISPLAY_COLUMNS.Outcome
                    ], 
                    RenderCardFn:(row) =>   {
                            var c = new ArrestCard(this, row);
                            return c.getHTML(c.Dimension_Team, c.Dimension_Player,c.Dimension_Position);
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
    DetailPageInstance = new CrimeDetailPage();
});