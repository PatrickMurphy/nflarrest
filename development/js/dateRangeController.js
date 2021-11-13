var dateRangeController = {
    start_date: '2000-01-01',
    end_date: '',

    init: function (callback) {
        if (typeof pageID !== 'undefined') {
            var hash = pageID || '';
            hash = '#!' + hash;
        } else {
            var hash = '#!';
        }

        $("#dateRangeJquery").daterangepicker({
            presetRanges: [{
                    text: 'Last 3 Months',
                    dateStart: function () {
                        return moment().subtract('months', 3)
                    },
                    dateEnd: function () {
                        return moment()
                    }
     },
                {
                    text: 'Last 6 Months',
                    dateStart: function () {
                        return moment().subtract('months', 6)
                    },
                    dateEnd: function () {
                        return moment()
                    }
     }, {
                    text: 'Last Year',
                    dateStart: function () {
                        return moment().subtract('years', 1);
                    },
                    dateEnd: function () {
                        return moment()
                    }
     }, {
                    text: 'Last 5 Years',
                    dateStart: function () {
                        return moment().subtract('years', 5);
                    },
                    dateEnd: function () {
                        return moment()
                    }
     }, {
                    text: 'All Records',
                    dateStart: function () {
                        return moment('2000-01-01')
                    },
                    dateEnd: function () {
                        return moment()
                    }
     }],
            datepickerOptions: {
                minDate: new Date('2000-01-01'),
                maxDate: 0
            }
        });
        var todayDate = moment().format('YYYY-MM-DD');

        this.start_date = this.getCookie('start_date') || '2000-01-01';
        this.end_date = this.getCookie('end_date') || todayDate;


        $("#dateRangeJquery").daterangepicker("setRange", {
            start: moment(this.start_date).toDate(),
            end: moment(this.end_date).toDate()
        });

        $('#dateRangeJquery').on('change', this.changeDateRange);
        $("#dateRangeJquery").on('open', function () {
            googleTracking.sendTrackEvent('DateRange', 'OpenDialog');
        });

        callback(this);
    },

    open: function () {
        $('#dateRangeJquery').daterangepicker("open");
    },

    close: function () {
        $('#dateRangeJquery').daterangepicker("close");
    },

    resetTime: function (softReset) {
        googleTracking.sendTrackEvent('DateRange', 'Reset');
        softReset = softReset || false;
        var start = '2000-01-01',
            end = dateRangeController.getToday();

        dateRangeController.setDates(start, end);
    },

    getToday: function () {
        var today = new Date(),
            month, day;

        if (today.getMonth() < 9) {
            month = '0' + (today.getMonth() + 1);
        } else {
            month = today.getMonth() + 1;
        }

        if (today.getDate() < 10) {
            day = '0' + today.getDate();
        } else {
            day = today.getDate();
        }
        return today.getFullYear() + '-' + month + '-' + day;
    },

    getStart: function () {
        return this.start_date;
    },

    getEnd: function () {
        return this.end_date;
    },

    changeDateRange: function () {
        var data = JSON.parse($('#dateRangeJquery').val());
        console.log(data);
        //console.log(data.start);
        //var start = $('#dateRange_start').val(),
        //end = $('#dateRange_end').val();
        var start = data.start,
            end = data.end;
        // swap dates if in wrong order
        if (new Date(start) > new Date(end)) {
            var temp = start;
            start = end;
            end = temp;
        }
        dateRangeController.setDates(start, end);
    },

    setDates: function (start, end) {
        dateRangeController.setCookie('start_date', start);
        dateRangeController.setCookie('end_date', end);
        dateRangeController.start_date = start;
        dateRangeController.end_date = end;

        if (window.CustomEvent) {
            var event = new Event('dateRangeChanged');
            $('#dateRangeJquery').trigger('dateRangeChanged');
            googleTracking.sendTrackEvent('DateRange', 'DateChanged');
        }
    },

    setCookie: function setCookie(cname, cvalue, exdays) {
        return setCookieValue(cname, cvalue, exdays);
    },

    getCookie: function getCookie(cname) {
        return getCookieValue(cname);
    }
}
