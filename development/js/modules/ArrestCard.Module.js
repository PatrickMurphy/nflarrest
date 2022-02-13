class ArrestCard extends Module {
    constructor(parent, row, options){
        super('ArrestCard', parent, row, (options || {showName:false,momentDate:false,standalone:false}));
        
        // set new/overwrite momentDate Options value with boolean value, resolves to true if row DaysSince was greater than 99 days ago
        this.options.momentDate = this.row['DaysSince']>99;
        
        // Include Column dimension definitions
        // TODO: Extract to data model metadata classes/enums/json
        this.dimensions = {};
        this.addDimensions();
    }
    
    validateDataFormat(newData){
        // Use value team_preffered_name to validate expected data format
        if(!newData.hasOwnProperty('Team_preffered_name')){
            throw "error: incorrect row definition";
            return false;
        }else{
            return true;
        }
    }
    
    // Include Column dimension definitions, used in init
    addDimensions() {
        // add dimensions map values
        this.dimensions['Team'] = {
            dimension_id: 0,
            dimension_name: 'Team',
            data_column: 'Team',
            color: 'Team_hex_color',
            url: 'Team.html',
            display: 'Team_preffered_name',
            color2: 'Team_hex_alt_color',
            useColor2: true
        };
        this.dimensions['Player'] = {
            dimension_id: 2,
            dimension_name: 'Player',
            data_column: 'Name',
            color: 'Team_hex_color',
            url: 'Player.html',
            display: 'Name',
            color2: 'Team_hex_alt_color',
            useColor2: true
        };
        this.dimensions['Position'] = {
            dimension_id: 3,
            dimension_name: 'Position',
            data_column: 'Position',
            color: 'Team_hex_color',
            url: 'Position.html',
            display: 'Position',
            color2: 'Team_hex_alt_color',
            useColor2: true
        };
        this.dimensions['Crime'] = {
            dimension_id: 1,
            dimension_name: 'Crime',
            data_column: 'Category',
            color: 'Crime_category_color',
            url: 'Crime.html',
            display: 'Category'
        };
        
        // shortcuts
        this.Dimension_Team = this.dimensions['Team'];
        this.Dimension_Player = this.dimensions['Player'];
        this.Dimension_Position = this.dimensions['Position'];
        this.Dimension_Crime = this.dimensions['Crime'];
    }
    
    getHTML(col1,col2,detail_column){
        var col1 = col1 || this.dimensions['Crime'];
        var col2 = col2 || this.dimensions['Team'];
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
        if(detail_column.hasOwnProperty('data_column')){
            card.push('<br /><span class="arrest_card_detail_links">'+detail_column.dimension_name+': <a href="' + detail_column.url + '#' + this.row[detail_column.data_column] + '">'+ this.row[detail_column.data_column] +'</a></span>');
        }
		card.push('<br />'); // linebreak
		card.push('<span class="description_item">' + this.row['Description'] + '</span>'); // span: col, class
		card.push('<span class="outcome_item">' + this.row['Outcome'] + '</span>'); // span: col, class
		card.push('</div>');
		var card2 = card.join('');
        return card2;
    }
}