class ArrestCard {
    constructor(row,options){
        this.row = row;
        this.options = options || {showName:false,momentDate:false,standalone:false};
        this.options.momentDate = this.row['DaysSince']>99;
        this.Column_Team = {column: 'Team', color:'Team_hex_color', url:'Team.html', display: 'Team_preffered_name', color2: 'Team_hex_alt_color', useColor2: true};
        this.Column_Crime = {column: 'Category', color:'Crime_category_color', url:'Crime.html', display: 'Category'};
        this.Column_Player = {column: 'Name', color:'Team_hex_color', url:'Player.html', display: 'Name', color2: 'Team_hex_alt_color', useColor2: true};
        this.Column_Position = {column: 'Position', color:'Team_hex_color', url:'Position.html', display: 'Position', color2: 'Team_hex_alt_color', useColor2: true};
        if(!this.row.hasOwnProperty('Team_preffered_name')){
            throw "error: incorrect row definition";
        }
    }
    getHTML(col1,col2){
        var col1 = col1 || {column: 'Category', color:'Crime_category_color', url:'Crime.html', display: 'Category'};
        var col2 = col2 || {column: 'Team', color:'Team_hex_color', url:'Team.html', display: 'Team_preffered_name', color2: 'Team_hex_alt_color', useColor2: true};
        var showNameVal = this.options.showName ? ' style="display:inline-block; visibility:visible;"' : '';
        var dateVal = this.options.momentDate ? moment(this.row['Date'], "YYYY-MM-DD").fromNow() : this.row['DaysSince'] + ' days ago';
        var standaloneVal = this.options.standalone ? " standalone_card" : '';
        var card = ['<div class="card arrest_card ' + standaloneVal + '">'];
		card.push('<span class="date_item" title="' + this.row['Date'] + '">' + dateVal + '</span>');
		card.push('<span class="name_item"'+showNameVal+'><a href="Player.html#' + this.row['Name'] + '">' + this.row['Name'] + '</a> </span>');
		card.push("<br />");
		card.push('<span class="crime_item" style="background-color:#' + this.row[col1.color] + '">');
        card.push('<a href="' +col1.url + '#' + this.row[col1.column] + '">' + this.row[col1.display] + "</a> </span>");
		card.push('<span class="team_item ' + this.row[col2.column] + '" style="background-color:#' + this.row[col2.color] + ';">');
        card.push('<a href="' + col2.url + '#' + this.row[col2.column] + '" ' + (col2.useColor2 ? 'style="color:#' + this.row[col2.color2] + ';"' : '') + ' >' + this.row[col2.display] + '</a></span>');
		card.push('<br />');
		card.push('<span class="description_item">' + this.row['Description'] + '</span>'); // .substring(0,n)
		card.push('<span class="outcome_item">' + this.row['Outcome'] + '</span>');
		card.push('</div>');
		var card2 = card.join('');
        return card2;
    }
}