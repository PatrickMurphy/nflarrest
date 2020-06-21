var PositionPage;
class PositionDetailPage extends DetailPage {
    constructor(pageID) {
        super(pageID, 'Position', [{
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
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        $.getJSON('api/v1/position/arrests/' + this.pageID + '?limit=1', function (data) {
            superChange(data[0].Position_name, self);
        });
    }

    // Override DetailPage method
    renderArrestRowHeader() {
        return '<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>';
    }

    // Override DetailPage method
    renderArrestRow(row) {
        return '<tr><td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td><td class="two columns"><a href="player/' + row['Name'] + '/">' + row['Name'] + '</a></td><td class="one column"><a href="crime/' + row['Category'] + '/">' + row['Category'] + '</a></td><td class="four columns">' + row['Description'] + '</td><td class="four columns">' + row['Outcome'] + '</td></tr>';
    }
    
    renderArrestCard(row) {
        var card = ['<div class="card arrest_card">'];
        card.push('<span class="date_item" title="' + row['Date'] + '">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</span>');
        card.push('<span class="name_item">' + row['Name'] + '</span>');
        card.push("<br />");
        card.push('<span class="crime_item" style="background-color:#bbb;"><a href="player/' + row['Name'] + '">' + row['Name'] + "</a> </span>");
        card.push('<span class="team_item ' + row['Team'] + '" style="background-color:#' + row['Team_hex_color'] + ';"><a href="team/' + row['Team'] + '" style="color:#' + row['Team_hex_alt_color'] + ';" >' + row['Team_preffered_name'] + '</a></span>');
        card.push('<br />');
        card.push('<span class="description_item">Crime: <a href="crime/' + row['Category'] + '">' + row['Category'] + '</a></span>'); // .substring(0,n)
        card.push('<br />');
        card.push('<span class="description_item">' + row['Description'] + '</span>');
        card.push('<span class="outcome_item">' + row['Outcome'] + '</span>');
        card.push('</div>');
        var card2 = card.join('');
        return card2;
    }

}
$(window).load(function () {
    PositionPage = new PositionDetailPage(update_hash());
});