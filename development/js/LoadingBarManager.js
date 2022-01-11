class LoadingBarManager {
	constructor(){
		this.options = {targetEl: 'body',
			loadingElID: 'loading-bar',
			message: 'Loading...'};
		this.reset();
	}

	reset(){
        if ($('#'+this.options.loadingElID).length ) {
            this.showLoading();
        }else{
            $(this.options.targetEl).append('<div id="'+ this.options.loadingElID +'">'+ this.options.message +'</div>');
            this.showLoading();
        }
	}
	
	hideLoading() {
		$('#'+ this.options.loadingElID).fadeOut();
	}
	
	showLoading() {
		$('#'+ this.options.loadingElID).fadeIn();
	}
}