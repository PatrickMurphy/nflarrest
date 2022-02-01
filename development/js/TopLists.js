class TopLists {
    constructor(parent){
        this.parent = parent;
        this.last_start_pos = 0;
        this.Lists = {
            ReturnStatus: false
        };
        
        this.load_lists('first');
    }
    
    // jquery handler function that calls class function
    jQuery_Handler(event){
       IndexPageInstance.TopLists.load_lists('not first', false);
    }
    
    load_list(data, page, prefix, list, values, replace) {
        replace = replace || false;
        if (replace) {
            this.last_start_pos = 0;
        }
        var items = [];
        if (data.length > 0) {
            $.each(data, (key, val) => {
                var link = "<a href=\"" + this.parent.getDetailPageLink(page, val[values[0]]) + "\">";
                var link_end = '</a>';
                if (page == '' || !this.parent.detail_page_active) {
                    link = '';
                    link_end = '';
                }
                items.push("<li id='" + prefix + key + "'>" + link + "<span>" + val[values[0]] + "</span><span class='value-cell'>" + val[values[1]] + "</span>" + link_end + "</li>");
            });
        } else {
            if (replace) {
                items.push('<li class="list-no-data-msg-item">No Data Available for this Date Range</li>');
            }
        }
        if (replace) {
            $(list).html(items.join(""));
        } else {
            $(list).append(items.join(""));
        }
    }
        
    load_lists(first, replace) {
        first = first || 'not first';
        replace = replace || false;

        $('.list-no-data-msg-item').remove();
        
        //var ref = IndexPageInstance;

        if (first != 'first') {
            this.parent.Utilities.googleTracking.sendTrackEvent('TopLists', 'Load Next Page');
        }
        
        ////console.log(this, this.last_start_pos);
        this.parent.data_controller.getTopLists(this.last_start_pos, this.parent.DateRangeControl.getStart(), this.parent.DateRangeControl.getEnd(), (data) => {
            var crimes_list = data[0],
                players_list = data[1],
                positions_list = data[2];

            if ((crimes_list.length + players_list.length + positions_list.length) <= 0 && this.last_start_pos == 0) {
                console.warn('no data returned');
            }

            this.load_list(crimes_list, 'crime', 'top_crime_', '#top_crimes_list', ['Category', 'arrest_count'], replace);
            this.load_list(players_list, 'player', 'top_player_', '#top_players_list', ['Name', 'arrest_count'], replace);
            this.load_list(positions_list, 'position', 'top_pos_', '#top_positions_list', ['Position', 'arrest_count'], replace);

            // set returns
            this.Lists.ReturnStatus = true;
            this.Lists.ReturnCount = 0;
            this.last_start_pos = this.last_start_pos + 5;
            
            this.parent.checkLoadingFinished();
        });
    }
    
    // todo rename load_top_lists_reload()
    reload() {
        this.last_start_pos = 0;
        this.load_lists('not first', true);
    }
    
    fixTopListLinks(){
        // add click listener to li so that entire element is clickable rather than just the link
        if(this.parent.detail_page_active){
            $(".top-list ol li").click(function () {
                window.location = $(this).find("a").attr("href");
                return false;
            });
        }
    }
}