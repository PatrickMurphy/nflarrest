class FiltersControl {
	constructor(options) {
		this.options = options || {};
		this.options.hidden_panels = options.hidden_panels || [];
		this.options.presets = options.presets || {};
		this.dateRangeNFL;

		this.filter_items = {
			date_range: {
				element: '#dateRangeJquery',
				type: 'dateRangeController',
				name: ['start_date', 'end_date'],
				default_val: ['2000-01-01', dateRangeController.getToday()]
			},
			month: {
				element: '#filter-month-input',
				type: 'select',
				name: 'month[]',
				default_val: null
			},
			dayofweek: {
				element: '#filter-dayofweek-input-mon, #filter-dayofweek-input-tues, #filter-dayofweek-input-wed, #filter-dayofweek-input-thur, #filter-dayofweek-input-fri, #filter-dayofweek-input-sat, #filter-dayofweek-input-sun',
				type: 'checkbox-group',
				name: 'dayofweek',
				default_val: 'all'
			},
			yeartodate: {
				element: '#filter-yeartodate-input',
				type: 'checkbox',
				name: 'yeartodate',
				default_val: false
			},
			season: {
				element: '#filter-season-input',
				type: 'select',
				name: 'season[]',
				default_val: null
			},
			season_status: {
				element: '#filter-seasonStatusOn-input, #filter-seasonStatusOff-input',
				type: 'checkbox-group',
				name: 'season_status',
				default_val: 'all'
			},
			team: {
				element: '#filter-team-input',
				type: 'select',
				name: 'team[]',
				default_val: null
			},
			conference: {
				element: '#filter-conference-AFC-input, #filter-conference-NFC-input',
				type: 'checkbox-group',
				name: 'conference',
				default_val: 'all'
			},
			division: {
				element: '#filter-division-input',
				type: 'select',
				name: 'division[]',
				default_val: null
			},
			crimeCategory: {
				element: '#filter-crime-category-input',
				type: 'select',
				name: 'crimeCategory[]',
				default_val: null
			},
			crime: {
				element: '#filter-crime-input',
				type: 'select',
				name: 'crime[]',
				default_val: null
			},
			position: {
				element: '#filter-position-input',
				type: 'select',
				name: 'position[]',
				default_val: null
			},
			position_type: {
				element: '#filter-position-type-input-o, #filter-position-type-input-d, #filter-position-type-input-s',
				type: 'checkbox-group',
				name: 'position_type',
				default_val: 'all'
			},
			player: {
				element: '#filter-player-input',
				type: 'select',
				name: 'player[]',
				default_val: null
			}
		};

		this.filters = {
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

		this.setupView();
		this.renderView();
	}

	// add hidden panels for sections effected by presets
	setupPresets() {
		for (var key in this.options.presets) {
			var value1 = this.options.presets[key];
			for (var key2 in value1) {
				var value2 = value1[key2];
				switch (key2) {
					case 'team':
					case 'crime':
					case 'position':
					case 'player':
						this.options.hidden_panels.push(key2);
						break;
					default:
						console.log('unknown preset');
				}
			}
		}
	}

	// add UI librarys to input, as well as on change events
	setupInputs(onChangeCallback) {
		var self = this;
		var chosen_multi_settings = {
			inherit_select_classes: true,
			hide_results_on_select: false
		};
		var jquery_checkbox_settings = {
			icon: false
		};

		// setup chosen module standard multi selects
		$('.filter-chosen-multi').chosen(chosen_multi_settings).change(onChangeCallback);

		// jquery ui checkbox radio buttons
		$('.filter-radio-group input').checkboxradio(jquery_checkbox_settings).change(onChangeCallback);

		// setup date range controller
		dateRangeController.init(function (newDateRange) {
			self.dateRangeNFL = newDateRange;
			$('#dateRangeJquery').on('dateRangeChanged', onChangeCallback);
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
	}

	setupUserInterface() {
		// allow toggle of hidden content filter sections
		$('.filter-section-title').click(function () {
			$(this).parent().children().eq(1).toggle();
		});
	}

	setupView() {
		var self = this;

		this.setupPresets();
		this.setupUserInterface();
		this.setupInputs(function () {
			self.renderView();
		});
	}

	// view update after setting changed
	renderView() {
		var self = this;
		this.countSetFilters();
		for (var key in self.options.hidden_panels) {
			switch (self.options.hidden_panels[key]) {
				case 'team':
				case 'crime':
				case 'position':
				case 'player':
					$(self.filters[self.options.hidden_panels[key]]['element']).hide();
					break;
			}
		}
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
				var filter_name = obj[prop]['name'];
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

	getQueryString() {
		var valueSet = this.getValues();
		// copy presets to value set
		valueSet = Object.assign(valueSet, this.options.presets);
		var qs = [];
		for (var key in valueSet) {
			for (var key2 in valueSet[key]) {
				if (valueSet[key][key2] instanceof Array) {
					for (var key3 in valueSet[key][key2]) {
						qs.push(key2 + '=' + valueSet[key][key2][key3]);
					}
				} else {
					qs.push(key2 + '=' + valueSet[key][key2]);
				}
			}
		}

		return qs.join('&');
	}
}
var page;
$(document).ready(function () {
	page = new FiltersControl({
		presets: {
			team: {
				team: 'SEA'
			}
		}
	});
});
