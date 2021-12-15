class ArrestCard {
    constructor(row,options){
        this.row = row;
        this.options = options || {showName:false};
        if(!this.row.hasOwnProperty('Team_preffered_name')){
            throw "error: incorrect row definition";
        }
    }
    getHTML(){
        var showNameVal = this.options.showName ? ' style="display:inline-block; visibility:visible;"' : '';
        var card = ['<div class="card arrest_card">'];
		card.push('<span class="date_item" title="' + this.row['Date'] + '">' + this.row['DaysSince'] + ' days ago</span>');
		card.push('<span class="name_item"'+showNameVal+'><a href="Player.html#' + this.row['Name'] + '">' + this.row['Name'] + '</a> </span>');
		card.push("<br />");
		card.push('<span class="crime_item" style="background-color:#' + this.row['Crime_category_color'] + '">');
        card.push('<a href="Crime.html#' + this.row['Category'] + '">' + this.row['Category'] + "</a> </span>");
		card.push('<span class="team_item ' + this.row['Team'] + '" style="background-color:#' + this.row['Team_hex_color'] + ';">');
        card.push('<a href="Team.html#' + this.row['Team'] + '" style="color:#' + this.row['Team_hex_alt_color'] + ';" >' + this.row['Team_preffered_name'] + '</a></span>');
		card.push('<br />');
		card.push('<span class="description_item">' + this.row['Description'] + '</span>'); // .substring(0,n)
		card.push('<span class="outcome_item">' + this.row['Outcome'] + '</span>');
		card.push('</div>');
		var card2 = card.join('');
        return card2;
    }
}