var DefaultPageInstance;

class DefaultPage extends WebPage {
    constructor() {
        super('Default',true);
    }
}

$(window).load(function () {
    DefaultPageInstance = new DefaultPage();
});