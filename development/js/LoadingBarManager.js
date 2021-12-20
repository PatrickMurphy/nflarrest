/*----------------
Todo: replace references
------------------*/
class LoadingBarManager {
	constructor(){
		this.options = {targetEl: 'body',
			loadingElID: 'loading-bar',
			message: 'Loading...'};
		this.reset();
	}

	reset(){
		$(this.options.targetEl).append('<div id="'+ this.options.loadingElID +'">'+ this.options.message +'</div>');
		this.showLoading();
	}
	
	hideLoading() {
		$('#'+ this.options.loadingElID).fadeOut();
	}
	
	showLoading() {
		$('#'+ this.options.loadingElID).fadeIn();
	}
}

var LoadingBarManagerInstance = new LoadingBarManager();
var nflLoadingBar = {
	options: {
		targetEl: 'body',
		loadingElID: 'loading-bar',
		message: 'Loading...'
	},
	
	init: function initialize_loadingbar(){
		console.warn('Deprecated nflLoadingBar.init() function called!');
		//LoadingBarManagerInstance.reset();
	},

	reset: function(){
        console.warn('Deprecated nflLoadingBar.reset() function called!');
		//LoadingBarManagerInstance.reset();
	},
	
	hideLoading: function() {
        console.warn('Deprecated nflLoadingBar.hideLoading() function called!');
		LoadingBarManagerInstance.hideLoading();
	},
	
	showLoading: function() {
        console.warn('Deprecated nflLoadingBar.showLoading() function called!');
		LoadingBarManagerInstance.showLoading();
	}
};

/*
var nflLoadingBar = {
	options: {
		targetEl: 'body',
		loadingElID: 'loading-bar',
		message: 'Loading...'
	},
	
	init: function initialize_loadingbar(){
		nflLoadingBar.reset();
	},

	reset: function(){
		$(nflLoadingBar.options.targetEl).append('<div id="'+ nflLoadingBar.options.loadingElID +'">'+ nflLoadingBar.options.message +'</div>');
		nflLoadingBar.showLoading();
	},
	
	hideLoading: function() {
		$('#'+ nflLoadingBar.options.loadingElID).fadeOut();
	},
	
	showLoading: function() {
		$('#'+ nflLoadingBar.options.loadingElID).fadeIn();
	}
};
*/