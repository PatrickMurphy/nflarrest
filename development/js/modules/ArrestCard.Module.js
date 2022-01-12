class ArrestCard {
    constructor(row,options){
        this.row = row;
        
        // Set Options Values
        this.options = options || {showName:false,momentDate:false,standalone:false};
        this.options.momentDate = this.row['DaysSince']>99;
        
        // Include Column dimension definitions
        this.addColumnOptions();
        
        // ensure wrow data has team_preffered_name to make sure it is a correct response
        if(!this.row.hasOwnProperty('Team_preffered_name')){
            throw "error: incorrect row definition";
        }
    }
    
    // Include Column dimension definitions, used in init
    addColumnOptions(){
        this.Column_Team = {column: 'Team', color:'Team_hex_color', url:'Team.html', display: 'Team_preffered_name', color2: 'Team_hex_alt_color', useColor2: true};
        this.Column_Crime = {column: 'Category', color:'Crime_category_color', url:'Crime.html', display: 'Category'};
        this.Column_Player = {column: 'Name', color:'Team_hex_color', url:'Player.html', display: 'Name', color2: 'Team_hex_alt_color', useColor2: true};
        this.Column_Position = {column: 'Position', color:'Team_hex_color', url:'Position.html', display: 'Position', color2: 'Team_hex_alt_color', useColor2: true};
    }
    
    /*buildSpan(col, cssClasses, css, link, title){
        col = col || 'Name';
        cssClasses = cssClasses || col.toLowerCase() + "_item";
        css = css || 'style=""';
        link = link || {};
        title = title || '';
        
        var htmlReturnArr = [];
        
        htmlReturnArr.push(`<span class="${cssClasses}"${css}>`);
        if(link.hasOwnProperty('url')){
            htmlReturnArr.push('<a href="');
            htmlReturnArr.push(link.url);
            if(link.hasOwnProperty('hash')){
                htmlReturnArr.push('#' + link.hash);
            }
            htmlReturnArr.push('">'); // end anchor tag either way
            if(link.hasOwnProperty('title')){
                htmlReturnArr.push(link.title);
            }else{
                htmlReturnArr.push(this.row[col]);
            }
            htmlReturnArr.push('</a>');
        }else{
            htmlReturnArr.push(this.row[col]);
        }
        htmlReturnArr.push(`</span>`);
        
        return htmlReturnArr.join('');
    }*/
    
    getHTML(col1,col2,detail_column){
        var col1 = col1 || this.Column_Crime;
        var col2 = col2 || this.Column_Team;
        var detail_column = detail_column || {};
        
        var card_show_name_css_val = this.options.showName ? ' style="display:inline-block; visibility:visible;"' : '';
        var card_date_val = this.options.momentDate ? moment(this.row['Date'], "YYYY-MM-DD").fromNow() : this.row['DaysSince'] + ' days ago';
        var col2_color_css_val = (col2.useColor2 ? 'style="color:#' + this.row[col2.color2] + ';"' : '');
        var card_standalone_css_class_val = this.options.standalone ? " standalone_card" : '';
        
        var card = ['<div class="card arrest_card ' + card_standalone_css_class_val + '">'];
		card.push('<span class="date_item" title="' + this.row['Date'] + '">' + card_date_val + '</span>');  // span: col, class, title
		card.push('<span class="name_item"'+card_show_name_css_val+'><a href="Player.html#' + this.row['Name'] + '">' + this.row['Name'] + '</a> </span>');  // span: col, class, css, link, title
		card.push("<br />"); // linebreak
		card.push('<span class="crime_item" style="background-color:#' + this.row[col1.color] + '">');
        card.push('<a href="' +col1.url + '#' + this.row[col1.column] + '">' + this.row[col1.display] + "</a> </span>");
		card.push('<span class="team_item ' + this.row[col2.column] + '" style="background-color:#' + this.row[col2.color] + ';">');
        card.push('<a href="' + col2.url + '#' + this.row[col2.column] + '" ' + col2_color_css_val + ' >' + this.row[col2.display] + '</a></span>');
		card.push('<br />'); // linebreak
		card.push('<span class="description_item">' + this.row['Description'] + '</span>'); // span: col, class
		card.push('<span class="outcome_item">' + this.row['Outcome'] + '</span>'); // span: col, class
		card.push('</div>');
		var card2 = card.join('');
        return card2;
    }
}