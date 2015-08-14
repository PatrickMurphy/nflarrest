var nflLoadingBar = {
	options: {
		targetEl: 'body',
		loadingElID: 'loading-bar',
		message: 'Loading...'
	},

	init: function initialize_loadingbar(){
		$(this.options.targetEl).append('<div id="'+ this.options.loadingElID +'">'+ this.options.message +'</div>');
		this.showLoading();
	},

	hideLoading: function() {
		$('#'+ nflLoadingBar.options.loadingElID).fadeOut();
	},

	showLoading: function() {
		$('#'+ nflLoadingBar.options.loadingElID).fadeIn();
	}
};
