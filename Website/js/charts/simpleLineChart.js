var simpleLineChart = {
    lineChart: undefined,
    options: {
        targetElement: '#theElementSelector',
        data: {}
    },

    init: function(options) {
        this.options.data = {};
        $.extend(true, this.options, options);
        console.log('Initialize Chart:  ' + this.options.targetElement);

        this.options.$targetElement = $(this.options.targetElement);
        this.renderChart();
    },

    renderChart: function() {
        if ($(document).width() < 800) {
            var bottomPadding = 20;
        } else {
            var bottomPadding = 6;
        }

        simpleLineChart.lineChart = c3.generate({
            bindto: simpleLineChart.options.targetElement,
            data: {
                empty: { label: { text: "No Data Available for this Date Range" } },
                x: 'x',
                columns: simpleLineChart.options.data.columns
            },
            padding: {
                bottom: bottomPadding
            },
            color: {
                pattern: ["#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF", "#154F78", "#B0580A", "#248224", "#7D1717"]
            }
        });
    }
};