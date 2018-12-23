class AdminDWDashboard {
	constructor(){
		this.newsFeed = new NewsFeed();
		this.adminTabs = new AdminTabs();
	}
}

var dashboard = undefined;
// main function for admin DW dashboard
$(function () {
	dashboard = new AdminDWDashboard();
});