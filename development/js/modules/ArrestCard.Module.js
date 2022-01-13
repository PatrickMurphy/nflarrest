class ArrestCard {
    constructor(row,options){
        this.row = row;
        
        // Set Options Values
        this.options = options || {showName:false,momentDate:false,standalone:false};
        this.options.momentDate = this.row['DaysSince']>99;
        
        // Include Column dimension definitions
        this.addDimensions();
        
        // ensure wrow data has team_preffered_name to make sure it is a correct response
        if(!this.row.hasOwnProperty('Team_preffered_name')){
            throw "error: incorrect row definition";
        }
    }
    
    // Include Column dimension definitions, used in init
    addDimensions(){
        this.Dimension_Team    =   {dimension_id: 0, dimension_name: 'team',        data_column: 'Team',        color:'Team_hex_color',         url:'Team.html',        display: 'Team_preffered_name', color2: 'Team_hex_alt_color', useColor2: true};
        this.Dimension_Player  =   {dimension_id: 2, dimension_name: 'player',      data_column: 'Name',        color:'Team_hex_color',         url:'Player.html',      display: 'Name',                color2: 'Team_hex_alt_color', useColor2: true};
        this.Dimension_Position=   {dimension_id: 3, dimension_name: 'position',    data_column: 'Position',    color:'Team_hex_color',         url:'Position.html',    display: 'Position',            color2: 'Team_hex_alt_color', useColor2: true};
        this.Dimension_Crime   =   {dimension_id: 1, dimension_name: 'crime',       data_column: 'Category',    color:'Crime_category_color',   url:'Crime.html',       display: 'Category'};
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
        var col1 = col1 || this.Dimension_Crime;
        var col2 = col2 || this.Dimension_Team;
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
        card.push('<a href="' +col1.url + '#' + this.row[col1.data_column] + '">' + this.row[col1.display] + "</a> </span>");
		card.push('<span class="team_item ' + this.row[col2.data_column] + '" style="background-color:#' + this.row[col2.color] + ';">');
        card.push('<a href="' + col2.url + '#' + this.row[col2.data_column] + '" ' + col2_color_css_val + ' >' + this.row[col2.display] + '</a></span>');
		card.push('<br />'); // linebreak
		card.push('<span class="description_item">' + this.row['Description'] + '</span>'); // span: col, class
        if(detail_column.hasOwnProperty('data_column')){
            card.push('<span class="arrest_card_detail_links"><a href="' + detail_column.url + '#' + this.row[detail_column.data_column] + '">'+ this.row[detail_column.data_column] +'</a></span>');
        }
		card.push('<span class="outcome_item">' + this.row['Outcome'] + '</span>'); // span: col, class
		card.push('</div>');
		var card2 = card.join('');
        return card2;
    }
}