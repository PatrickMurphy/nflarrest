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
            }],{}, 'api/v1/team/arrests/');
        
        var tbl = this.getModule(this.DataTable_ModuleID);
        tbl.setRenderRowHeaderFn(() => {
            return '<tr><th class="one column">Date:</th><th class="two columns">Player:</th><th class="two columns">Crime Category:</th><th class="four columns">Description:</th><th class="three columns">Outcome:</th></tr>';});
        tbl.setRenderRowFn((row) => {
            if(typeof row !== 'undefined'){
                return '<tr>' 
                        + '<td class="one column" ' + this.getHTMLDateTitleAttribute(row) + '>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>'
                        + '<td class="two columns">' 
                            + '<a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a>'
                        + '</td>'
                        + '<td class="two columns">'
                            + '<a href="CrimeCategory.html#' + row['Crime_category'] + '">' + row['Crime_category'] + '</a>'
                        + '</td>'
                        + '<td class="four columns">' + row['Description'] + '</td>'
                        + '<td class="three columns">' + row['Outcome'] + '</td>'
                    + '</tr>';
            }else{ 
                console.warn('Module DataTable: undefined row rendered');
                return '';
            }
        });
        
        tbl.setRenderCardFn((row) => {
            var c = new ArrestCard(this, row);
            return c.getHTML(c.Dimension_Crime_Category, c.Dimension_Player, c.Dimension_Position);
        });
        tbl.renderView();
    }
    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        self.data_controller.getArrests((row) => {
            if (self.pageTitle == 'Team') {
                if (row['Team'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Position') {
                if (row['Position'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Player') {
                if (row['Name'] != self.pageID) {
                    return false;
                }
            } else if (self.pageTitle == 'Crime') {
                if (row['Category'] != self.pageID) {
                    return false;
                }
            }

            return true;
        }, (data) => {
            var titleHTMLAppend = ' <span style="display:inline-block;width:20px;height:20px;background:url(\'images/NFLTeamLogos.png\') 0px -' + data[0]['Team_logo_id'] * 20 + 'px;background-size:100%;"></span>';
            superChange(data[0].Team_preffered_name, self, titleHTMLAppend)
        });
    }
}
$(window).load(function () {
    DetailPageInstance = new TeamDetailPage();
});