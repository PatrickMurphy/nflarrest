class FiltersControl {
    constructor(options) {
        this.options = options || {};
        this.dateRangeNFL;

        this.filters = {
            date: {
                title: 'Date Filters',
                element: '#filter-date-section',
                items: [{
                        element: '#dateRangeJquery',
                        type: 'dateRangeController',
                        default_val: ['2000-01-01', dateRangeController.getToday()]
						},
                    {
                        element: '#filter-month-input',
                        type: 'select',
                        default_val: null
					},
                    {
                        element: '#filter-dayofweek-input-mon, #filter-dayofweek-input-tues, #filter-dayofweek-input-wed, #filter-dayofweek-input-thur, #filter-dayofweek-input-fri, #filter-dayofweek-input-sat, #filter-dayofweek-input-sun',
                        type: 'checkbox-group',
                        default_val: 'all'
					},
                    {
                        element: '#filter-yeartodate-input',
                        type: 'checkbox',
                        default_val: false
					}]
            },
            season: {
                title: 'Season Filters',
                element: '#filter-season-section',
                items: [{
                        element: '#filter-season-input',
                        type: 'select',
                        default_val: null
					},
                    {
                        element: '#filter-seasonStatusOn-input, #filter-seasonStatusOff-input',
                        type: 'checkbox-group',
                        default_val: 'all'
					}]
            },
            team: {
                title: 'Team Filters',
                element: '#filter-team-section',
                items: [{
                        element: '#filter-team-input',
                        type: 'select',
                        default_val: null
					},
                    {
                        element: '#filter-conference-AFC-input, #filter-conference-NFC-input',
                        type: 'checkbox-group',
                        default_val: 'all'
					},
                    {
                        element: '#filter-division-input',
                        type: 'select',
                        default_val: null
					}]
            },
            crime: {
                title: 'Crime Filters',
                element: '#filter-crime-section',
                items: [{
                    element: '#filter-crime-category-input',
                    type: 'select',
                    default_val: null
					}, {
                    element: '#filter-crime-input',
                    type: 'select',
                    default_val: null
					}]
            },
            position: {
                title: 'Position Filters',
                element: '#filter-position-section',
                items: [{
                    element: '#filter-position-input',
                    type: 'select',
                    default_val: null
					}, {
                    element: '#filter-position-type-input-o, #filter-position-type-input-d, #filter-position-type-input-s',
                    type: 'checkbox-group',
                    default_val: 'all'
					}]
            },
            player: {
                title: 'Player Filters',
                element: '#filter-player-section',
                items: [{
                    element: '#filter-player-input',
                    type: 'select',
                    default_val: null
					}]
            }
        };

        this.setupView();
        this.renderView();
    }

    setupView() {
        var self = this;

        // setup chosen module standard multi selects
        $('.filter-chosen-multi').chosen({
            inherit_select_classes: true,
            hide_results_on_select: false
        }).change(function () {
            self.renderView();
        });

        // hide content of all sections
        //$('.filter-section-content').hide();

        // only open sections with filters used
        //$() TODO

        // allow toggle of hidden content filter sections
        $('.filter-section-title').click(function () {
            $(this).parent().children().eq(1).toggle();
        });

        // include exclude filter button toggles
        $('.filter-type-btn').click(function () {
            $(this).removeClass('filter-include filter-exclude');
            if ($(this).html() === 'Exclude') {
                $(this).html('Include');
                $(this).addClass('filter-include');
            } else {
                $(this).html('Exclude');
                $(this).addClass('filter-exclude');
            }
        });

        // jquery ui checkbox radio buttons
        $('.filter-radio-group input').checkboxradio({
            icon: false
        }).change(function () {
            self.renderView();
        });

        // sliders for seasons doesn't allow 2012, 2014, 2016 for example
        /*$('#filter-season-slider').slider({
        	values: [2001, 2018],
        	range: true,
        	min: 2001,
        	max: 2018,
        	step: 1,
        	slide: function (event, ui) {
        		$("#amount").val("$" + ui.value);
        	}
        });*/

        // setup date range controller
        dateRangeController.init(function (newDateRange) {
            self.dateRangeNFL = newDateRange;

            $('#dateRangeJquery').on('dateRangeChanged', function (e) {
                //nflLoadingBar.showLoading();
                //setupChart();
                //reload_top_lists();
                self.renderView();
            });
        });

    }

    // view update after setting changed
    renderView() {
        var self = this;
        this.countSetFilters();
        $('#filter-date-section .filter-section-title span').html(this.filters.date.active_count + '/4');
        $('#filter-season-section .filter-section-title span').html(this.filters.season.active_count + '/2');
        $('#filter-team-section .filter-section-title span').html(this.filters.team.active_count + '/3');
        $('#filter-crime-section .filter-section-title span').html(this.filters.crime.active_count + '/2');
        $('#filter-position-section .filter-section-title span').html(this.filters.position.active_count + '/2');
        $('#filter-player-section .filter-section-title span').html(this.filters.player.active_count + '/1');
    }

    // count by section the number of filters not set to default
    countSetFilters() {
        for (var key in this.filters) {
            // skip loop if the property is from prototype
            if (!this.filters.hasOwnProperty(key)) continue;

            var obj = this.filters[key]['items'];
            this.filters[key]['active_count'] = 0;
            for (var prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;
                var is_active = false;
                switch (obj[prop]['type']) {
                case 'select':
                    is_active = $(obj[prop]['element']).val() != obj[prop]['default_val'];
                    break;
                case 'dateRangeController':
                    is_active = this.dateRangeNFL.start_date != obj[prop]['default_val'][0] || this.dateRangeNFL.end_date != obj[prop]['default_val'][1];
                    break;
                case 'checkbox-group':
                    // assume default val = all
                    var group_count = 0;
                    $(obj[prop]['element']).map(function (item, el) {
                        if (!$(el).prop('checked')) {
                            group_count++;
                        }
                    });
                    is_active = group_count > 0;
                    //for(){} each item if all, all must be checked
                    break;
                case 'checkbox':
                    is_active = $(obj[prop]['element']).prop('checked') != obj[prop]['default_val'];
                    break;
                default:
                    console.log('unknown type');
                }
                obj[prop]['active'] = is_active;
                if (is_active) {
                    this.filters[key]['active_count']++;
                }
            }
        }
    }

    getValues() {
        var value_ret = {};
        for (var key in this.filters) {
            // skip loop if the property is from prototype
            if (!this.filters.hasOwnProperty(key)) continue;

            var obj = this.filters[key]['items'];

            for (var prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;
                var is_active = false;
                var filter_name = obj[prop]['element'];
                var filter_value = '';
                switch (obj[prop]['type']) {
                case 'select':
                    filter_value = $(obj[prop]['element']).val();
                    break;
                case 'dateRangeController':
                    filter_value = [this.dateRangeNFL.start_date, this.dateRangeNFL.end_date];
                    break;
                case 'checkbox-group':
                    // assume default val = all
                    var group_settings = [];
                    $(obj[prop]['element']).map(function (item, el) {
                        if (!$(el).prop('checked')) {
                            group_settings.push('1');
                        } else {
                            group_settings.push('0');
                        }
                    });
                    filter_value = group_settings.join('');
                    break;
                case 'checkbox':
                    filter_value = $(obj[prop]['element']).prop('checked');
                    break;
                default:
                    console.log('unknown type');
                }

                // store value if active
                if (obj[prop]['active']) {
                    if (!value_ret.hasOwnProperty(key)) {
                        value_ret[key] = {};
                    }

                    // save value
                    value_ret[key][filter_name] = filter_value;
                }
            }
        }
        return value_ret;
    }
}
var page;
$(document).ready(function () {
    page = new FiltersControl();
});