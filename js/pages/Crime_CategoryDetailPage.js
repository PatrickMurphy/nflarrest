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
            }],{    targetElement: 'arrest_table',
                    targetElementMobile: 'arrest_cards',
                    targetElementTableContainer: 'arrest_details_container',
                    targetElementTitleIncidentCount: 'arrest_details_incident_count',
                    TitlePrefix: '',
                    RowLimit:15,
                    GoogleTrackingCategory: 'DetailPageArrests',
                    columns:[DATA_MODEL_DISPLAY_COLUMNS.Date,
                            DATA_MODEL_DISPLAY_COLUMNS.Name,
                            DATA_MODEL_DISPLAY_COLUMNS.Category,
                            DATA_MODEL_DISPLAY_COLUMNS.Team,
                            DATA_MODEL_DISPLAY_COLUMNS.Description
                    ], 
                    RenderCardFn:(row) =>   {
                                                var c = new ArrestCard(this, row);
                                                return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Team,c.Dimension_Player);
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
    DetailPageInstance = new CrimeCategoryDetailPage();
});