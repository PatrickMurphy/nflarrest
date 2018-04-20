class FiltersControl {
	constructor(options) {
		this.options = options || {};
		this.options.hidden_panels = options.hidden_panels || [];
		this.options.presets = options.presets || {};

		this.filters_model = new FiltersModel();
		this.dateRangeNFL;
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
		$('#filter-date-section .filter-section-title span').html(this.filters_model.filter_sections.date.active_count + '/4');
		$('#filter-season-section .filter-section-title span').html(this.filters_model.filter_sections.season.active_count + '/2');
		$('#filter-team-section .filter-section-title span').html(this.filters_model.filter_sections.team.active_count + '/3');
		$('#filter-crime-section .filter-section-title span').html(this.filters_model.filter_sections.crime.active_count + '/2');
		$('#filter-position-section .filter-section-title span').html(this.filters_model.filter_sections.position.active_count + '/2');
		$('#filter-player-section .filter-section-title span').html(this.filters_model.filter_sections.player.active_count + '/1');
	}

	// count by section the number of filters not set to default
	countSetFilters() {
		for (var key in this.filters_model.filter_sections) {
			// skip loop if the property is from prototype
			if (!this.filters_model.filter_sections.hasOwnProperty(key)) continue;

			var section = this.filters_model.filter_sections[key];

			section['active_count'] = 0;

			for (var item_key in section['items']) {
				// skip loop if the property is from prototype
				if (!section['items'].hasOwnProperty(item_key)) continue;
				var item = section['items'][item_key];
				var is_active = false;

				switch (item['type']) {
					case 'select':
						is_active = $(item['element']).val() != item['default_val'];
						break;
					case 'dateRangeController':
						is_active = this.dateRangeNFL.start_date != item['default_val'][0] || this.dateRangeNFL.end_date != item['default_val'][1];
						break;
					case 'checkbox-group':
						var group_count = 0;
						$(item['element']).map(function (item, el) {
							if (!$(el).prop('checked')) {
								group_count++;
							}
						});
						is_active = group_count > 0;
						break;
					case 'checkbox':
						is_active = $(item['element']).prop('checked') != item['default_val'];
						break;
					default:
						console.log('unknown type');
				}

				// set item active status and section increment count
				item['active'] = is_active;
				if (is_active) {
					section['active_count']++;
				}
			}
		}
	}

	getValues() {
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
				var filter_value = '';
				switch (item['type']) {
					case 'select':
						filter_value = item[type].getValue(item['element']);
						break;
					case 'dateRangeController':
						filter_value = item[type].getValue(this.dateRangeNFL.end_date);
						break;
					case 'checkbox-group':

						filter_value = item[type].getValue(item['element']);
						break;
					case 'checkbox':
						filter_value = item[type].getValue(item['element']);
						break;
					default:
						console.log('unknown type');
				}

				// store value if active
				if (item['active']) {
					if (!value_ret.hasOwnProperty(section_key)) {
						value_ret[section_key] = {};
					}

					// save value
					value_ret[section_key][filter_name] = filter_value;
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
