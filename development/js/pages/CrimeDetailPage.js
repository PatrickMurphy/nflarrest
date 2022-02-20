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
            }], 'api/v1/crime/arrests/');
        
        //this.DataTable_ModuleID = this.addModule(new DataTable(this));
        var tbl = this.getModule(this.DataTable_ModuleID);
        tbl.setRenderRowHeaderFn(() => {return '<tr><th class="one column">Date:</th><th class="two columns">Player:</th><th class="one column">Team:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>';});
        tbl.setRenderRowFn((row) => {
            if(typeof row !== 'undefined'){
                return '<tr><td class="one column" '+this.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>' //'+this.getHTMLDateTitleAttribute(row)+'
                    + '<td class="two columns"><a href="' + this.getPlayerLink(row['Name']) + '">' + row['Name'] + '</a></td>' // getDimensionLink methods from webpage.js 
                    + '<td class="one column"><a href="' + this.getTeamLink(row['Team']) + '">'
                        + '<span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;'
                            +'background:url(\'images/NFLTeamLogos.png\') 0px -'+(row['Team_logo_id']*20)+'px;background-size:100% !important;"></span>'
                                + row['Team'] + '</a></td>'
                    + '<td class="four columns">' + row['Description'] + '</td>'
                    + '<td class="four columns">' + row['Outcome'] + '</td>'
                    + '</tr>';
            }else{ 
                console.warn('Module DataTable: undefined row rendered');
                return '';
            }
        });
        tbl.renderView();
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