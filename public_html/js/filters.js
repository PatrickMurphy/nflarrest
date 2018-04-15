$(document).ready(function () {
	var dateRangeNFL;
	$('.filter-chosen-multi').chosen({
		inherit_select_classes: true,
		hide_results_on_select: false
	});

	//$('.filter-section-content').hide();

	$('.filter-section-title').click(function () {
		$(this).parent().children().eq(1).toggle();
	});

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

	$('.filter-radio-group input').checkboxradio({
		icon: false
	});

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
	dateRangeController.init(function (newDateRange) {
		dateRangeNFL = newDateRange;

		$('#dateRangeJquery').on('dateRangeChanged', function (e) {
			//nflLoadingBar.showLoading();
			//setupChart();
			//reload_top_lists();
		});
	});

});
