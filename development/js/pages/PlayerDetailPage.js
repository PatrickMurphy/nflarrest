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
            }], 'api/v1/player/arrests/');
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        superChange(this.pageID, self);
    }

    // Override DetailPage method
    renderArrestRowHeader() {
        return '<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="one column">Team:</th><th class="four columns">Description:</th><th class="three columns">Outcome:</th></tr>';
    }

    // Override DetailPage method
    renderArrestRow(row) {
        return '<tr><td class="one column" '+this.getHTMLDateTitleAttribute(row)+'>' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>'
        + '<td class="two columns">' + row['Name'] + '</td>'
        + '<td class="one columns"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + '</a></td>'
        + '<td class="one column"><a href="Team.html#' + row['Team'] + '"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -'+(row['Team_logo_id']*20)+'px;background-size:100%;"></span> ' + row['Team'] + '</a></td>'
        + '<td class="four columns">' + row['Description'] + '</td>'
        + '<td class="three columns">' + row['Outcome'] + '</td></tr>';
    }

}
$(window).load(function () {
    DetailPageInstance = new PlayerDetailPage();
});