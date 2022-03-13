var DATA_MODEL_DISPLAY_COLUMNS = {
    Date: {
        column_id: 0,
        column_title: 'Date:',
        column_data: 'Date',
        column_display_fn: (row) => {
            return moment(row['Date'], "YYYY-MM-DD").fromNow();
        },
        column_tooltip: 'Date',
        column_width: 2
    },
    Name:{
        column_id: 1,
        column_title: 'Player:',
        column_data: 'Name',
        column_display_fn: (row) => {
            return '<a href="Player.html#' + row['Name'] + '">'+row['Name']+'</a>';
        },
        column_width: 2
    },
    Category: {
        column_id: 2,
        column_title: 'Crime Sub-Category:',
        column_data: 'Category',
        column_display_fn: (row) => {
            return '<a href="Crime.html#' + row['Category'] + '">'+row['Category']+'</a>';
        },
        column_width: 2
    },
    Team:{
        column_id: 3,
        column_title: 'Team:',
        column_data: 'Team',
        column_display_fn: (row) => {
            return '<a href="Team.html#' + row['Team'] + '"><span style="display:inline-block;width:20px;height:20px;vertical-align: text-bottom;background:url(\'images/NFLTeamLogos.png\') 0px -' + (row['Team_logo_id'] * 20) + 'px;background-size:100%;"></span> ' + row['Team'] + '</a>';
        },
        column_width: 1
    },
    Description: {
        column_id: 4,
        column_title: 'Description:',
        column_data: 'Description',
        column_width: 5
    },
    Outcome:{
        column_id:5,
        column_title: 'Outcome:',
        column_data: 'Outcome',
        column_width: 4
    },
    Crime_category:{
        column_id:6,
        column_title: 'Crime Category:',
        column_data: 'Crime_category',
        column_display_fn: (row) => {
            return '<a href="CrimeCategory.html#' + row['Crime_category'] + '">' + row['Crime_category'] + '</a>';
        },
        column_width: 2
    }};