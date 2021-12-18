var DetailPageInstance;
class CrimeDetailPage extends DetailPage {
    constructor(pageID) {
        super(pageID, 'Crime', [{
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
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        superChange(this.pageID, self);
    }

    // Override DetailPage method
    renderArrestRowHeader() {
        return '<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Team:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>';
    }

    // Override DetailPage method
    renderArrestRow(row) {
        return '<tr><td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td>'
            + '<td class="two columns"><a href="' + this.getPlayerLink(row['Name']) + '">' + row['Name'] + '</a></td>'
            + '<td class="one column"><a href="' + this.getTeamLink(row['Team']) + '">'
                + '<span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;'
                    +'background:url(\'images/NFLTeamLogos.png\') 0px -'+(row['Team_logo_id']*20)+'px;background-size:100% !important;"></span>'
                        + row['Team'] + '</a></td>'
            + '<td class="four columns">' + row['Description'] + '</td>'
            + '<td class="four columns">' + row['Outcome'] + '</td></tr>';
    }


    renderArrestCard(row) {
        /*var card = ['<div class="card arrest_card">'];
        card.push('<span class="date_item" title="' + row['Date'] + '">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</span>');
        card.push('<span class="name_item">' + row['Name'] + '</span>');
        card.push("<br />");
        card.push('<span class="crime_item" style="opacity: 0.8;background-color:#'+row['Crime_category_color']+';"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + "</a> </span>");
        card.push('<span class="team_item ' + row['Team'] + '" style="background-color:#' + row['Team_hex_color'] + ';opacity: 0.8;"><a href="Team.html#' + row['Team'] + '" style="color:#' + row['Team_hex_alt_color'] + ';" >' + row['Team_preffered_name'] + '</a></span>');
        card.push('<br />');
        card.push('<span class="description_item">Player: <a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a></span>'); // .substring(0,n)
        card.push('<br />');
        card.push('<span class="description_item">' + row['Description'] + '</span>');
        card.push('<span class="outcome_item">' + row['Outcome'] + '</span>');
        card.push('</div>');
        var card2 = card.join('');*/
        var c = new ArrestCard(row);
        return c.getHTML();
    }

}
$(window).load(function () {
    DetailPageInstance = new CrimeDetailPage(update_hash());
    DetailPageInstance.resizeCharts();
});