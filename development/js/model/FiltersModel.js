/*eslint-env es6*/ // Enables es6 error checking for that file
/*eslint-env jquery*/ // Enables error checking for jquery functions
/*eslint-env browser*/ // Lets you use document and other standard browser functions
/*eslint no-console: 0*/ // Lets you use console (for example to log something)

class FiltersModel {
	constructor() {
		// the type of filter controls used
		this.filter_types = {
			date_range_controller: {
				name: 'dateRangeController',
				names: ['start_date', 'end_date'],
				library: 'NFLArrest',
				description: 'The NFL Date Range Controller Module, contains two values',
				default_val: ['2000-01-01', moment().format('YYYY-MM-DD')],
				getValue: function (FCObj, item) {
					var arr = [];
					arr.push(FCObj.DateRangeFilterInstance.start_date);
					arr.push(FCObj.DateRangeFilterInstance.end_date);
					return arr;
				},
				isActive: function (FCObj, item) {
					var start_date_bool = FCObj.DateRangeFilterInstance.start_date != item['type']['default_val'][0];
					var end_date_bool = FCObj.DateRangeFilterInstance.end_date != item['type']['default_val'][1];
					return start_date_bool || end_date_bool;
				},
                compare: function (FCObj, item, rowValue){
                    if(new Date(rowValue) >= new Date(FCObj.DateRangeFilterInstance.start_date) && new Date(rowValue) <= new Date(FCObj.DateRangeFilterInstance.end_date)){
                        return true;
                    }else{
                        return false;
                    }
                }
			},
			select: {
				name: 'select',
				library: 'Chosen',
				description: 'multi select field for filters, contains an array of values',
				default_val: 'all',
				getValue: function (FCObj, item) {
					return $(item.element).val();
				},
				isActive: function (FCObj, item) {
                    if(item.isHidden){
                        return false;
                    }else{
                        if(item['type']['default_val'] == 'all'){
                            return $(item.element).val().length != $(item.element + ' option').length;
                        }else{
                            return true;
                        }
                    }
				},
                compare: function (FCObj, item, rowValue){
                    return $(item.element).val().indexOf(rowValue)>0;
                }
			},
			checkbox_group: {
				name: 'checkbox-group',
				library: 'JQuery-UI',
				description: 'a group of binary options',
				default_val: 'all',
				getValue: function (FCObj, item) {
					/*RETURN OBJECT*/
                    var group_settings = {};

					var element_arr = item['element'].split(', '); // for each element in str list

                    for(var i = 0; i < element_arr.length; i++){
                        if($(element_arr[i] + ':checked').length>0){
                            group_settings[element_arr[i].substring(1)] = true;
                        }else{
                            group_settings[element_arr[i].substring(1)] = false;
                        }
                    }
                    return group_settings;
				},
				isActive: function (FCObj, item) {
                    if(item.isHidden){
                        return false;
                    }else{
                        if(item['type']['default_val'] == 'all'){
                            var element_arr = item['element'].split(', '); // for each element in str list
                            var total_checkboxes = element_arr.length; // total list length equal total checkboxes
                            var checked_checkboxes = 0;
                            
                            for(var i = 0; i < element_arr.length; i++){
                                if($(element_arr[i] + ':checked').length>0){
                                    checked_checkboxes++; // if element checked then add to count
                                }
                            }
                            if(total_checkboxes > checked_checkboxes){
                                return true;
                            }
                        }
                    }
                    return false;
				},
                compare: function (FCObj, item, filterValue, rowValue) {
                    var group_count = 0;
					$(item.element).map(function (item2, el) {
						if (!$(el).prop('checked')) {
							group_count++;
						}
					});
                    return filterValue === rowValue;
                }
			},
			radio_group: {
				name: 'radio-group',
				library: 'JQuery-UI',
				description: 'a group of discrete options',
				default_val: 'all',
				getValue: function (FCObj, item) {
                    /*RETURN OBJECT*/
                    var group_settings = {};

					var element_arr = item['element'].split(', '); // for each element in str list

                    for(var i = 0; i < element_arr.length; i++){
                        if($(element_arr[i] + ':checked').length>0){
                            group_settings[element_arr[i].substring(1)] = true;
                        }else{
                            group_settings[element_arr[i].substring(1)] = false;
                        }
                    }
                    return group_settings;
				},
				isActive: function (FCObj, item) {
					if(item.isHidden){
                        return false;
                    }else{
                        if(item['type']['default_val'] == 'all'){
                            var element_arr = item['element'].split(', '); // for each element in str list
                            var total_radios = element_arr.length; // total list length equal total checkboxes
                            var checked_radios = 0;
                            
                            for(var i = 0; i < element_arr.length; i++){
                                if($(element_arr[i] + ':checked').length>0){
                                    checked_radios++; // if element checked then add to count
                                }
                            }
                            if(total_radios > checked_radios){
                                return true;
                            }
                        }
                    }
                    return false;
				},
                compare: function (FCObj, item, rowValue) {
                    var is_true = false;
					$(item.element).map(function (item2, el) {
						if ($(el).prop('checked')) {
							is_true = $(el).attr('id') == rowValue;
						}
					});
                    return is_true;
                }
			},
			checkbox: {
				name: 'checkbox',
				library: 'JQuery-UI',
				description: 'a single binary option',
				default_val: false,
				getValue: function (FCObj, item) {
					return $(item.element).prop('checked');
				},
				isActive: function (FCObj, item) {
					return $(item.element).prop('checked') != item['type']['default_val'];
				},
                compare: function (FCObj, item, rowValueBool) {
                    return $(item.element).prop('checked') === rowValueBool;
                }
			}
		};

		// all the filter items
		this.filter_items = {
			daterange: {
				element: '#filter-daterange-input',
				type: this.filter_types.date_range_controller,
                title:'Date Range',
				name: ['start_date', 'end_date'],
                isHidden: false
			},
			month: {
				element: '#filter-month-input',
				type: this.filter_types.select,
                title: 'Month',
                filter_data_options: DATA_MODEL_FRAMEWORK_MONTHS_VALUES_ARRAY,
				name: 'month[]',
                isHidden: true // use date range
			},
			dayofweek: {
				element: '#filter-dayofweek-input-mon, #filter-dayofweek-input-tues, #filter-dayofweek-input-wed, #filter-dayofweek-input-thur, #filter-dayofweek-input-fri, #filter-dayofweek-input-sat, #filter-dayofweek-input-sun',
				type: this.filter_types.checkbox_group,
                title: 'Day Of Week',
                filter_data_options: DATA_MODEL_FRAMEWORK_DAY_OF_WEEK_VALUES_ARRAY,
				name: 'dayofweek',
                isHidden: true // this is not very useful
			},
			yeartodate: {
				element: '#filter-yeartodate-input',
				type: this.filter_types.radio_group,
                title: 'Year To Date',
                filter_data_options: DATA_MODEL_FRAMEWORK_NULLABLE_BOOLEAN_VALUES_ARRAY,
				name: 'yeartodate',
                isHidden: true // hide until help button explaining what it means
			},
			season: {
				element: '#filter-season-input',
				type: this.filter_types.select,
                title: 'Season',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_SEASON_VALUES_ARRAY,
				name: 'season[]',
                isHidden: true // use dates
			},
			season_status: {
				element: '#filter-season_status-in_season-input, #filter-season_status-off_season-input',
				type: this.filter_types.checkbox_group,
                title: 'Season Status',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_ARRESTSEASONSTATE_VALUES_ARRAY,
				name: 'season_status',
                isHidden: false
			},
			team: {
				element: '#filter-team-input',
				type: this.filter_types.select,
                title: 'Team',
                filter_data_options_parent_item: this.filter_items.division,
                filter_data_options: DATA_MODEL_VWARRESTSWEB_TEAM_VALUES_ARRAY,
				name: 'team[]',
                isHidden: false
			},
			conference: {
				element: '#filter-Conference-AFC-input, #filter-Conference-NFC-input',
				type: this.filter_types.checkbox_group,
                title: 'Conference',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_TEAM_CONFERENCE_VALUES_ARRAY,
				name: 'conference',
                isHidden: true // use division
			},
			division: {
				element: '#filter-division-input',
				type: this.filter_types.select,
                title: 'Division',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_TEAM_CONFERENCE_DIVISION_VALUES_ARRAY,
				name: 'division[]',
                isHidden: false
			},
			crimeCategory: {
				element: '#filter-crime_category-input',
				type: this.filter_types.select,
                title: 'Crime Category',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_CRIME_CATEGORY_VALUES_ARRAY,
				name: 'crime_category[]',
                isHidden: false
			},
			crime: {
				element: '#filter-crime-input',
				type: this.filter_types.select,
                title: 'Crime',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_CATEGORY_VALUES_ARRAY,
				name: 'crime[]',
                isHidden: true // to detailed
			},
			position: {
				element: '#filter-position-input',
				type: this.filter_types.select,
                title: 'Position',
                filter_data_options_parent_item: this.filter_items.position_type,
                filter_data_options: DATA_MODEL_VWARRESTSWEB_POSITION_VALUES_ARRAY,
				name: 'position[]',
                isHidden: false
			},
			position_type: {
				element: '#filter-position_type-offense-input, #filter-position_type-defense-input, #filter-position_type-special_teams-input',
				type: this.filter_types.checkbox_group,
                title: 'Position Type',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_POSITION_TYPE_VALUES_ARRAY,
				name: 'position_type',
                isHidden: false
			},
			player: {
				element: '#filter-player-input',
				type: this.filter_types.select,
                title: 'Player',
                filter_data_options: DATA_MODEL_VWARRESTSWEB_POSITION_TYPE_VALUES_ARRAY, // todo replace
				name: 'player[]',
                isHidden: true
			}
		};

        // filter sections, contains filter items of filter type
		this.filter_sections = {
			date: {
				title: 'Date Filters',
				element: '#filter-date-section',
				items: [this.filter_items.daterange, this.filter_items.month, this.filter_items.dayofweek, this.filter_items.yeartodate],
                isHidden: true
			},
			season: {
				title: 'Season Filters',
				element: '#filter-season-section',
				items: [this.filter_items.season, this.filter_items.season_status],
                isHidden: false
			},
			team: {
				title: 'Team Filters',
				element: '#filter-team-section',
				items: [this.filter_items.division, this.filter_items.team, this.filter_items.conference],
                isHidden: false
			},
			crime: {
				title: 'Crime Filters',
				element: '#filter-crime-section',
				items: [this.filter_items.crimeCategory, this.filter_items.crime],
                isHidden: false
			},
			position: {
				title: 'Position Filters',
				element: '#filter-position-section',
				items: [this.filter_items.position_type, this.filter_items.position],
                isHidden: false
			},
			player: {
				title: 'Player Filters',
				element: '#filter-player-section',
				items: [this.filter_items.player],
                isHidden: true
			}
		};
	}
}
