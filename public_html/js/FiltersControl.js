class FiltersControl {
	constructor(options) {
		// setup options
		this.options = options || {};
		this.options.hidden_panels = options.hidden_panels || [];
		this.options.presets = options.presets || {};
		this.options.date_range_object = options.date_range_object || {};

		this.options.dialog_element = options.dialog_element || '#filter-dialog-container';
		this.options.dialog_content_url = options.dialog_content_url || 'templates/FiltersDialog.html';

		// load model and date range object
		this.filters_model = new FiltersModel();
		this.dateRangeNFL = this.options.date_range_object;
		this.first_open = true;

		var self = this;

		$('#filters-open-button').click(function () {
			self.show();
		});

		$('#filter-dialog-container').click(function (e) {
			if (e.target.id == 'filter-dialog-container') {
				self.hide();
			}
		});

		// setup dialog control
		this.hide();
	}

	show() {
		$(this.options.dialog_element).show();
		if (this.first_open) {
			this.loadDialogContents();
			this.first_open = false;
		}
	}

	hide() {
		$(this.options.dialog_element).hide();
	}

	// load the html contents of the dialog
	loadDialogContents() {
		var self = this;
		loadCSS('css/modules/styles-filters.css');
		loadCSS('css/vendor/chosen.min.css');

		$(self.options.dialog_element).load(self.options.dialog_content_url, function () {
			console.log("Load was performed.");
			self.setupView();
			self.renderView();
		});
	}

	// add hidden panels for sections effected by presets
	setupFilterPresets() {
		for (var option_key in this.options.presets) {
			var option_value = this.options.presets[option_key];
			for (var option_sub_key in option_value) {
				var option_sub_value = option_value[option_sub_key];
				switch (option_sub_key) {
					case 'team':
					case 'crime':
					case 'position':
					case 'player':
						this.options.hidden_panels.push(option_sub_key);
						break;
					default:
						console.log('unknown preset');
				}
			}
		}
	}

	// add UI librarys to input, as well as on change events
	setupFilterInput(onChangeCallback) {
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
		$('#dateRangeJquery').on('dateRangeChanged', onChangeCallback);

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

	// setup the UI Elements that are interactive, but not direct inputs
	setupUserInterface() {
		var self = this;
		// allow toggle of hidden content filter sections
		$('.filter-section-title').click(function () {
			$(this).parent().children().eq(1).toggle();
		});

		$('#filters-close-button').click(function () {
			self.hide();
		});

		$('#filters-apply-button').click(function () {
			self.apply();
			self.hide();
		});

		$('#filters-clear-button').click(function () {
			self.reset();
		});

		$('#filters-cancel-button').click(function () {
			self.hide();
		});
	}

	apply() {
		var tempVals = this.getFilterValues();
		for (var key in tempVals) {
			for (var key2 in tempVals[key]) {
				setCookieValue(key2, tempVals[key][key2]);
			}
		}
	}

	// get all of the filter values
	reset() {
		var self = this;
		for (var section_key in this.filters_model.filter_sections) {
			// skip loop if the property is from prototype
			if (!this.filters_model.filter_sections.hasOwnProperty(section_key)) continue;
			var section = this.filters_model.filter_sections[section_key];
			var items = section['items'];

			for (var item_key in items) {
				// skip loop if the property is from prototype
				if (!items.hasOwnProperty(item_key)) continue;
				var item = items[item_key];

				// save value
				if (Array.isArray(item['type'].default_val) && item['type'].hasOwnProperty('names')) {
					var i = 0;
					for (var filter_val_key in item['type'].default_val) {
						setCookieValue(item['type']['names'][i], item['type'].default_val[i++]);
					}
				} else {
					setCookieValue(item_key, item['type'].default_val);
				}
			}
		}
		self.loadDialogContents();
	}

	// the event for when a filter is changed, do anything extra and then render the view
	onFilterChanged(self, event_action, selected_value) {
		var button_id = event_action.currentTarget.getAttribute('id');
		var button_id_end = button_id.substring(button_id.indexOf('-') + 1, button_id.length);
		var button_id_name = button_id_end.substring(0, button_id_end.lastIndexOf('-'));
		// todo: got half of the reqs for GA events
		// rename ids based on these rules
		console.log(button_id, button_id_end, button_id_name);
		self.renderView();
	}

	// construct the view the first time (initialize)
	setupView() {
		var self = this;
		this.setupFilterPresets();
		this.setupUserInterface();
		this.setupFilterInput(function (evt, act) {
			self.onFilterChanged(self, evt, act);
		});
	}

	// view update after setting changed
	renderView() {
		var self = this;
		this.countActiveFilters();
		for (var key in self.options.hidden_panels) {
			switch (self.options.hidden_panels[key]) {
				case 'team':
				case 'crime':
				case 'position':
				case 'player':
					$(self.filters_model.filter_sections[self.options.hidden_panels[key]]['element']).hide();
					break;
			}
		}
		$('#filter-daterange-input').html(self.dateRangeNFL.getStart() + '-' + self.dateRangeNFL.getEnd());
		$('#filter-date-section .filter-section-title span').html(this.filters_model.filter_sections.date.active_count + '/4');
		$('#filter-season-section .filter-section-title span').html(this.filters_model.filter_sections.season.active_count + '/2');
		$('#filter-team-section .filter-section-title span').html(this.filters_model.filter_sections.team.active_count + '/3');
		$('#filter-crime-section .filter-section-title span').html(this.filters_model.filter_sections.crime.active_count + '/2');
		$('#filter-position-section .filter-section-title span').html(this.filters_model.filter_sections.position.active_count + '/2');
		$('#filter-player-section .filter-section-title span').html(this.filters_model.filter_sections.player.active_count + '/1');
	}

	// count by section the number of filters not set to default
	countActiveFilters() {
		var self = this;
		for (var key in this.filters_model.filter_sections) {
			// skip loop if the property is from prototype
			if (!this.filters_model.filter_sections.hasOwnProperty(key)) continue;

			var section = this.filters_model.filter_sections[key];

			section['active_count'] = 0;

			for (var item_key in section['items']) {
				// skip loop if the property is from prototype
				if (!section['items'].hasOwnProperty(item_key)) continue;
				var item = section['items'][item_key];
				var is_active = item['type'].isActive(self, item);

				// set item active status and section increment count
				item['active'] = is_active;
				if (is_active) {
					section['active_count']++;
				}
			}
		}
	}

	// get all of the filter values
	getFilterValues() {
		var self = this;
		var value_ret = {};
		for (var section_key in this.filters_model.filter_sections) {
			// skip loop if the property is from prototype
			if (!this.filters_model.filter_sections.hasOwnProperty(section_key)) continue;
			var section = this.filters_model.filter_sections[section_key];
			var items = section['items'];

			for (var item_key in items) {
				// skip loop if the property is from prototype
				if (!items.hasOwnProperty(item_key)) continue;
				var is_active = false;
				var item = items[item_key];
				var filter_name = item['name'];
				var filter_value = item['type'].getValue(self, item);

				// store value if active
				if (item['active']) {
					if (!value_ret.hasOwnProperty(section_key)) {
						value_ret[section_key] = {};
					}

					// save value
					if (Array.isArray(filter_value) && item['type'].hasOwnProperty('names')) {
						var i = 0;
						for (var filter_val_key in filter_value) {
							value_ret[section_key][item['type']['names'][i++]] = filter_value[filter_val_key];
						}
					} else {
						value_ret[section_key][filter_name] = filter_value;
					}
				}
			}
		}
		return value_ret;
	}

	// get the string to append to the api URL
	getQueryString() {
		var filterValueSet = this.getFilterValues();
		// copy presets to value set
		filterValueSet = Object.assign(filterValueSet, this.options.presets);

		// build query string
		var querystring_return = [];
		for (var filterKey in filterValueSet) {
			for (var filterSubKey in filterValueSet[filterKey]) {
				if (Array.isArray(filterValueSet[filterKey][filterSubKey])) {
					for (var filterSubSubKey in filterValueSet[filterKey][filterSubKey]) {
						querystring_return.push(filterSubKey + '=' + filterValueSet[filterKey][filterSubKey][filterSubSubKey]);
					}
				} else {
					querystring_return.push(filterSubKey + '=' + filterValueSet[filterKey][filterSubKey]);
				}
			}
		}

		return querystring_return.join('&');
	}
}
