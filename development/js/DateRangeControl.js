class DateRangeControl {
    constructor(parent){
        this.start_date = '2000-01-01';
        this.end_date = '';
        this.parent = parent;
        
        this.setHash();
        
        this.setupDateRangePicker();
        
        this.setupDateRangePickerEvents();
    }
    
    setupDateRangePicker(presets){
        // initialize jquery date range picker
        var presets = [{
            text: 'Last 3 Months',
            dateStart: () => moment().subtract('months', 3),
            dateEnd: () => moment()
        }, {
            text: 'Last 6 Months',
            dateStart: () => moment().subtract('months', 6),
            dateEnd: () => moment()
        }, {
            text: 'Last Year',
            dateStart: () => moment().subtract('years', 1),
            dateEnd: () => moment()
        }, {
            text: 'Last 5 Years',
            dateStart: () => moment().subtract('years', 5),
            dateEnd: () => moment()
        }, {
            text: 'All Records',
            dateStart: () => moment('2000-01-01'),
            dateEnd: () => moment()
        }];

        $("#dateRangeJquery").daterangepicker({
            presetRanges: presets,
            datepickerOptions: {
                minDate: new Date('2000-01-01'),
                maxDate: 0
            }
        });
    }
    
    setupDateRangePickerEvents() {
        this.setDefaultDate();
        var rng = {
            start: moment(this.start_date).toDate(),
            end: moment(this.end_date).toDate()
        };
        
        $("#dateRangeJquery").daterangepicker("setRange", rng);
        $('#dateRangeJquery').on('change', () => {this.changeDateRange(this)});
        $("#dateRangeJquery").on('open', () => this.parent.Utilities.googleTracking.sendTrackEvent('DateRange', 'OpenDialog'));
    }
    
    open() {
        $('#dateRangeJquery').daterangepicker("open");
    }
    
    close() {
        $('#dateRangeJquery').daterangepicker("close");
    }

    resetTime(softReset) {
        this.parent.Utilities.googleTracking.sendTrackEvent('DateRange', 'Reset');
        softReset = softReset || false;
        var start = '2000-01-01',
            end = this.getToday();

        this.setDates(start, end);
    }
    
    setDefaultDate() {
        var todayDate = moment().format('YYYY-MM-DD');
        this.start_date = this.getCookie('start_date') || '2000-01-01';
        this.end_date = this.getCookie('end_date') || todayDate;
    }

    getToday() {
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
    }

    getStart() {
        return this.start_date;
    }
    
    getEnd(){
        return this.end_date;
    }
    
    setHash(){
        if (typeof pageID !== 'undefined') {
            var hash = pageID || '';
            hash = '#!' + hash;
        } else {
            var hash = '#!';
        }
    }

    changeDateRange(self) {
        var data = JSON.parse($('#dateRangeJquery').val());
        //console.log(data);
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
        self.setDates(start, end);
    }

    setDates(start, end) {
        this.setCookie('start_date', start);
        this.setCookie('end_date', end);
        this.start_date = start;
        this.end_date = end;

        if (window.CustomEvent) {
            var event = new Event('dateRangeChanged');
            $('#dateRangeJquery').trigger('dateRangeChanged');
            this.parent.Utilities.googleTracking.sendTrackEvent('DateRange', 'DateChanged');
        }
    }

    setCookie(cname, cvalue, exdays) {
        return this.parent.Utilities.setCookieValue(cname, cvalue, exdays);
    }

    getCookie(cname) {
        return this.parent.Utilities.getCookieValue(cname);
    }
}