var IndexPage;
class IndexPage {
    constructor() {
        this.MainChartOptions = {
            buttons: [{
                title: 'By Team',
                short_title: 'ByTeam',
                id: 0,
                ytdChart: false,
                element: '#mainChartByTeamBtn'
            }, {
                title: 'By Year',
                short_title: 'ByYear',
                id: 1,
                ytdChart: true,
                element: '#mainChartByYearBtn'
            }, {
                title: 'By Season',
                short_title: 'BySeason',
                id: 2,
                ytdChart: false,
                element: '#mainChartBySeasonBtn'
            }, {
                title: 'By Day',
                short_title: 'ByDayOfWeek',
                id: 3,
                ytdChart: true,
                element: '#mainChartByConfBtn'
            }, {
                title: 'By Division',
                short_title: 'ByDivision',
                id: 4,
                ytdChart: true,
                element: '#mainChartByConfDivBtn'
            }]
        };

        // loop through, add the button listeners
        for(var i = 0; i<this.MainChartOptions.buttons.length; i++){
            $(this.MainChartOptions.buttons[i].element).click(() =>
                var button = this.MainChartOptions.buttons[i];
                ytdChart = button.ytdChart;
                mainChartStyleID = button.id;
                window.location.hash = button.short_title;
                changeTopChart();
                googleTracking.sendTrackEvent('mainChart', 'switchTo'+button.short_title);
            );
        }
        // date range init
    }
}



$(window).load(function () {
    IndexPage = new IndexPage();
});