var DetailPageInstance;
class TeamDetailPage extends DetailPage {
    constructor(pageID) {
        super(pageID, 'Team', [{
            type: 'donut',
            url: 'api/v1/team/topPlayers/',
            field: 'Name',
            targetElement: '#playerchart',
            title: 'Players'
            }, {
            type: 'donut',
            url: 'api/v1/team/topCrimes/',
            field: 'Category',
            targetElement: '#crimechart',
            title: 'Crimes'
            }], 'api/v1/team/arrests/');
    }

    changeTitle() {
        var superChange = super.changeTitle;
        var self = this;
        self.data_controller.getArrests(function(row){
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
            }, function (data) {
                superChange(data[0].Team_preffered_name + ' <span style="display:inline-block;width:20px;height:20px;background:url(\'images/NFLTeamLogos.png\') 0px -'+data[0]['Team_logo_id']*20+'px;background-size:100%;"></span>', self)
            });
        //$.getJSON('api/v1/team/arrests/' + this.pageID + '?limit=1', function (data) {
          //  superChange(data[0].Team_preffered_name + ' <span style="display:inline-block;width:20px;height:20px;background:url(\'images/NFLTeamLogos.png\') 0px -'+data[0]['Team_logo_id']*20+'px;background-size:100%;"></span>', self);
        //});
    }

    // Override DetailPage method
    renderArrestRowHeader() {
        return '<tr><th class="one column">Date:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="four columns">Description:</th><th class="four columns">Outcome:</th></tr>';
    }

    // Override DetailPage method
    renderArrestRow(row) {
        return '<tr><td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td><td class="two columns">'
            +'<a href="Player.html#' + row['Name'] + '">' + row['Name'] + '</a></td>'
            +'<td class="one column"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + '</a>'
            +'</td><td class="four columns">' + row['Description'] + '</td><td class="four columns">' + row['Outcome'] + '</td></tr>';
    }

    renderArrestCard(row) {
        var card = ['<div class="card arrest_card">'];
        card.push('<span class="date_item" title="' + row['Date'] + '">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</span>');
        card.push('<span class="name_item">' + row['Name'] + '</span>');
        card.push("<br />");
        card.push('<span class="crime_item" style="background-color:#'+row['Crime_category_color']+';"><a href="Crime.html#' + row['Category'] + '">' + row['Category'] + "</a> </span>");
        card.push('<span class="team_item" style="background-color:#' + row['Team_hex_color'] + ';"><a href="Player.html#' + row['Name'] + '" style="color:#' + row['Team_hex_alt_color'] + ';" >' + row['Name'] + '</a></span>');
        card.push('<br />');
        //card.push('<span class="description_item">Crime: <a href="crime/' + row['Category'] + '">' + row['Category'] + '</a></span>'); // .substring(0,n)
        card.push('<br />');
        card.push('<span class="description_item">' + row['Description'] + '</span>');
        card.push('<span class="outcome_item">' + row['Outcome'] + '</span>');
        card.push('</div>');
        var card2 = card.join('');
        return card2;
    }


}
$(window).load(function () {
    DetailPageInstance = new TeamDetailPage(update_hash());
    DetailPageInstance.resizeCharts();
});