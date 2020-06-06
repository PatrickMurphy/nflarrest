/*----------------
Todo: replace references
------------------*/
/*
class LoadingBarManager {
	constructor(){
		this.options = {targetEl: 'body',
			loadingElID: 'loading-bar',
			message: 'Loading...'};
		this.reset();
	}

	reset(){
		$(this.options.targetEl).html('<div id="'+ this.options.loadingElID +'">'+ this.options.message +'</div>');
		this.showLoading();
	}
	
	hideLoading() {
		$('#'+ this.options.loadingElID).fadeOut();
	}
	
	showLoading() {
		$('#'+ this.options.loadingElID).fadeIn();
	}
}
*/

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