class FiltersModel {
	constructor() {
		// the type of filter controls used
		this.filter_types = {
			date_range_controller: {
				name: 'dateRangeController',
				names: ['start_date', 'end_date'],
				library: 'NFLArrest',
				description: 'The NFL Date Range Controller Module, contains two values',
				default_val: ['2000-01-01', dateRangeController.getToday()],
				getValue: function (dateRangeControl) {
					var arr = [];
					arr.push(dateRangeControl.start_date);
					arr.push(dateRangeControl.end_date);
					return arr;
				}
			},
			select: {
				name: 'select',
				library: 'Chosen',
				description: 'multi select field for filters, contains an array of values',
				default_val: null,
				getValue: function (ele) {
					return $(ele).val();
				}
			},
			checkbox_group: {
				name: 'checkbox-group',
				library: 'JQuery-UI',
				description: 'a group of binary options',
				default_val: 'all',
				getValue: function (ele) {
					var group_settings = [];

					$(ele).map(function (item, el) {
						if (!$(el).prop('checked')) {
							group_settings.push('1');
						} else {
							group_settings.push('0');
						}
					});

					return group_settings.join('');
				}
			},
			checkbox: {
				name: 'checkbox',
				library: 'JQuery-UI',
				description: 'a single binary option',
				default_val: false,
				getValue: function (ele) {
					return $(ele).prop('checked');
				}
			}
		};

		// all the filter items
		this.filter_items = {
			date_range: {
				element: '#dateRangeJquery',
				type: this.filter_types.date_range_controller,
				name: ['start_date', 'end_date']
			},
			month: {
				element: '#filter-month-input',
				type: this.filter_types.select,
				name: 'month[]'
			},
			dayofweek: {
				element: '#filter-dayofweek-input-mon, #filter-dayofweek-input-tues, #filter-dayofweek-input-wed, #filter-dayofweek-input-thur, #filter-dayofweek-input-fri, #filter-dayofweek-input-sat, #filter-dayofweek-input-sun',
				type: this.filter_types.checkbox_group,
				name: 'dayofweek',
			},
			yeartodate: {
				element: '#filter-yeartodate-input',
				type: this.filter_types.checkbox,
				name: 'yeartodate'
			},
			season: {
				element: '#filter-season-input',
				type: this.filter_types.select,
				name: 'season[]'
			},
			season_status: {
				element: '#filter-seasonStatusOn-input, #filter-seasonStatusOff-input',
				type: this.filter_types.checkbox_group,
				name: 'season_status'
			},
			team: {
				element: '#filter-team-input',
				type: this.filter_types.select,
				name: 'team[]'
			},
			conference: {
				element: '#filter-conference-AFC-input, #filter-conference-NFC-input',
				type: this.filter_types.checkbox_group,
				name: 'conference'
			},
			division: {
				element: '#filter-division-input',
				type: this.filter_types.select,
				name: 'division[]'
			},
			crimeCategory: {
				element: '#filter-crime-category-input',
				type: this.filter_types.select,
				name: 'crimeCategory[]'
			},
			crime: {
				element: '#filter-crime-input',
				type: this.filter_types.select,
				name: 'crime[]'
			},
			position: {
				element: '#filter-position-input',
				type: this.filter_types.select,
				name: 'position[]'
			},
			position_type: {
				element: '#filter-position-type-input-o, #filter-position-type-input-d, #filter-position-type-input-s',
				type: this.filter_types.checkbox_group,
				name: 'position_type'
			},
			player: {
				element: '#filter-player-input',
				type: this.filter_types.select,
				name: 'player[]'
			}
		};

		this.filter_sections = {
			date: {
				title: 'Date Filters',
				element: '#filter-date-section',
				items: [this.filter_items.date_range, this.filter_items.month, this.filter_items.dayofweek, this.filter_items.yeartodate]
			},
			season: {
				title: 'Season Filters',
				element: '#filter-season-section',
				items: [this.filter_items.season, this.filter_items.season_status]
			},
			team: {
				title: 'Team Filters',
				element: '#filter-team-section',
				items: [this.filter_items.team, this.filter_items.conference, this.filter_items.division]
			},
			crime: {
				title: 'Crime Filters',
				element: '#filter-crime-section',
				items: [this.filter_items.crimeCategory, this.filter_items.crime]
			},
			position: {
				title: 'Position Filters',
				element: '#filter-position-section',
				items: [this.filter_items.position, this.filter_items.position_type]
			},
			player: {
				title: 'Player Filters',
				element: '#filter-player-section',
				items: [this.filter_items.player]
			}
		};
	}
}
