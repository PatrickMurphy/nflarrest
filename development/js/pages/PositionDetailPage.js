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
            field: 'Category',
            targetElement: '#crimechart',
            title: 'Crimes'
            }], 'api/v1/position/arrests/');
        
        var tbl = this.getModule(this.DataTable_ModuleID);
        tbl.setRenderRowHeaderFn(() => {
            return '<tr><th class="one column">Date:</th>'
            + '<th class="two columns">Player:</th>'
            + '<th class="two columns">Crime:</th>'
            + '<th class="one column">Team:</th>'
            + '<th class="six columns">Description:</th>'
            + '</tr>';});
        tbl.setRenderRowFn((row) => {
            if(typeof row !== 'undefined'){
                return '<tr><td class="one column" '+this.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() 
                        + '</td><td class="two columns"><a href="' + this.getPlayerLink(row['Name']) + '">' + row['Name'] 
                        + '</a></td><td class="two columns"><a href="' + this.getCrimeLink(row['Crime_category']) + '">' + row['Crime_category'] 
                        + '</a></td><td class="one column"><a href="' + this.getTeamLink(row['Team']) + '">' + row['Team']
                        + '</a></td><td class="five columns">' + row['Description'] 
                        + '</td></tr>';
            }else{ 
                console.warn('Module DataTable: undefined row rendered');
                return '';
            }
        });
        
        tbl.setRenderCardFn((row) => {
            var c = new ArrestCard(this, row);
            return c.getHTML(c.Dimension_Player, c.Dimension_Team, c.Dimension_Crime_Category);
        });
        tbl.renderView();
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        self.data_controller.getArrests((row) => {
            if(self.pageTitle == 'Team'){
                if(row['Team'] != self.pageID){
                    return false;
                }
            }else if(self.pageTitle == 'Position'){
                if(row['Position'] != self.pageID){
                    return false;
                }
            }else if(self.pageTitle == 'Player'){
                if(row['Name'] != self.pageID){
                    return false;
                }
            }else if(self.pageTitle == 'Crime'){
                if(row['Category'] != self.pageID){
                    return false;
                }
            }

            return true;
        }, (data) => {
            superChange(data[0].Position_name, self);
        });
    }
}

$(window).load(function () {
    DetailPageInstance = new PositionDetailPage();
});