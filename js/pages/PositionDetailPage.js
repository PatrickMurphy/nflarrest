var DetailPageInstance;
class PositionDetailPage extends DetailPage {
    constructor() {
        super('Position', [{
            type: 'donut',
            url: 'api/v1/position/topTeams/',
            field: 'Team',
            targetElement: '#teamchart',
            title: 'Teams'
            }, {
            type: 'donut',
            url: 'api/v1/position/topCrimes/',
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
                            DATA_MODEL_DISPLAY_COLUMNS.Team,
                            DATA_MODEL_DISPLAY_COLUMNS.getColumn('Description',6)
                    ], 
                    RenderCardFn:(row) =>   {
                            var c = new ArrestCard(this, row);
                            return c.getHTML(c.Dimension_Player, c.Dimension_Team, c.Dimension_Crime_Category);
                        }
                    });
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        self.data_controller.getArrests(this.FilterFunction, (data) => {
            if(data.length > 0){
                superChange(data[0].Position_name, self);
            }
        });
    }
}

$(window).load(function () {
    DetailPageInstance = new PositionDetailPage();
});