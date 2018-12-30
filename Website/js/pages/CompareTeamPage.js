var CompareTeam;
class CompareTeamPage {
    constructor() {
        this.util = new Utilities();
        this.overtimechart = undefined;
        this.monthchart = undefined;

        // setup teams
        this.setupTeamSelects();
        // add handlers
        this.setupEventHandlers();

        // render
        this.renderView();
    }

    setupTeamSelects(){
        var hashs = this.util.update_hash().split('-');
        // select options based on hash bang
        $('#teamSelect-1').val(hashs[0]);
        $('#teamSelect-2').val(hashs[1]);
    }

    setupEventHandlers(){
        // setup handler to render view when selects or date range changed
        var that = this;
        $('#teamSelect-1, #teamSelect-2').change(function(){
            that.renderView();
        });
    }

    renderView(){
        this.resetTeams();
        this.teams[0].code = $('#teamSelect-1').val();
        this.teams[1].code = $('#teamSelect-2').val();

        // set the location hash
        window.location.hash = '#'+this.teams[0].code+'-'+this.teams[1].code;

        var that = this;
        var renderAfterData = function(){
            // if both returned, finish render
            if(that.teams[0].return && that.teams[1].return){
                that.renderDelta();
                that.setupOvertimeChart();
                that.setupMonthChart();    
                that.setupCrimeTable();
            }
        }
        // loads data
        this.loadTeamData(1, renderAfterData);
        this.loadTeamData(2, renderAfterData);
    }
//?start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd()
    loadTeamData(teamIndex,callback){
        var teamObj = this.teams[teamIndex-1];
        var that = this;
        var tempByMonth = {};
        $.getJSON( "http://nflarrest.com/api/v1/team/arrests/"+teamObj.code+"?start_date=" + dateRangeNFL.getStart() + "&end_date=" + dateRangeNFL.getEnd(), function( data ) {
            teamObj.data = data;
            teamObj.totalArrests = data.length;
            teamObj.avgDaysToArrest = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                var arrest = data[i];
            
                // record season count
                teamObj.maxSeason = Math.max(teamObj.maxSeason,parseInt(arrest.Season));
                teamObj.minSeason = Math.min(teamObj.minSeason,parseInt(arrest.Season));
                
                if(arrest.DaysToLastTeamArrest != null){ 
                    teamObj.avgDaysToArrest += parseInt(arrest.DaysToLastTeamArrest);
                }

                if(teamObj.bySeason.hasOwnProperty(arrest.Season)){
                    teamObj.bySeason[arrest.Season]++;
                }else{
                    teamObj.bySeason[arrest.Season] = 1;
                }

                if(teamObj.byCrime.hasOwnProperty(arrest.Crime_category)){
                    teamObj.byCrime[arrest.Crime_category]++;
                }else{
                    teamObj.byCrime[arrest.Crime_category] = 1;
                }

                // record data by month
                teamObj.byMonth[0] = teamObj.code;
                teamObj.byMonth[parseInt(arrest.Month)]++;
            }

            teamObj.avgDaysToArrest = teamObj.avgDaysToArrest/(data.length-1);
            //console.log(teamObj.byCrime);
            // render
            //$('#teamSelect-'+teamIndex).css('color','#'+teamObj.data[0].Team_hex_color);
            $('.teamKPI-'+teamIndex).css('border','2px solid '+'#'+teamObj.data[0].Team_hex_color);
            $('#teamKPI-arrests-'+teamIndex).html(teamObj.totalArrests).css('color','#'+that.teams[teamIndex-1].data[0].Team_hex_color);
            $('#teamImg-'+teamIndex).attr("src", "images/TeamLogos/"+teamObj.code+".gif");
            var avgDaysStr = (teamObj.avgDaysToArrest+'');
            $('#teamKPI-arrestDay-'+teamIndex).html(avgDaysStr.substring(0,avgDaysStr.indexOf('.')+2));

            teamObj.return = true;
            callback();
        });
    }

    renderDelta(){
        var that = this;

        // arrest total count deltas
        var diff = ((that.teams[0].totalArrests-that.teams[1].totalArrests)/that.teams[1].totalArrests)*100.0;
        diff = Math.round(diff * 100) / 100;

        var diff2 = ((that.teams[1].totalArrests-that.teams[0].totalArrests)/that.teams[0].totalArrests)*100.0;
        diff2 = Math.round(diff2 * 100) / 100;
        
        // avg days between arrest deltas
        var dayDiff1 = ((that.teams[0].avgDaysToArrest-that.teams[1].avgDaysToArrest)/that.teams[1].avgDaysToArrest)*100.0;
        dayDiff1 = Math.round(dayDiff1 * 100) / 100;

        var dayDiff2 = ((that.teams[1].avgDaysToArrest-that.teams[0].avgDaysToArrest)/that.teams[0].avgDaysToArrest)*100.0;
        dayDiff2 = Math.round(dayDiff2 * 100) / 100;

        this.renderDeltaElement(diff,'#compareDelta-1',true);
        this.renderDeltaElement(diff2,'#compareDelta-2',true);

        this.renderDeltaElement(dayDiff1,'#compareDayDelta-1',false);
        this.renderDeltaElement(dayDiff2,'#compareDayDelta-2',false);
    }

    renderDeltaElement(diff,ele,posOrNeg){
        posOrNeg = posOrNeg || false;
        if(posOrNeg)
            if(diff>0)
                $(ele).html('+'+diff+'%').css('background-color','red');
            else
                $(ele).html(diff+'%').css('background-color','green');
        else
            if(diff>0)
                $(ele).html('+'+diff+'%').css('background-color','green');
            else
                $(ele).html(diff+'%').css('background-color','red');
    }

    setupCrimeTable(){
        var keys = Object.assign(Object.keys(this.teams[0].byCrime),Object.keys(this.teams[1].byCrime));
        //console.log(keys);

        var crimeTotals = {};
        for (var i = this.teams.length - 1; i >= 0; i--) {
            var teamObj = this.teams[i];
            for (var j = keys.length - 1; j >= 0; j--) {
                var crimeObj = keys[j];
                // if team has this crime
                if(teamObj.byCrime.hasOwnProperty(crimeObj)){
                    // if crime already has obj
                    if(crimeTotals.hasOwnProperty(crimeObj)){
                        crimeTotals[crimeObj] += parseInt(teamObj.byCrime[crimeObj]);
                    }else{
                        crimeTotals[crimeObj] = parseInt(teamObj.byCrime[crimeObj]);
                    }
                }
            }
        }
        console.log(crimeTotals);

        var sortable = [];
        for (var crime in crimeTotals) {
            sortable.push([crime, crimeTotals[crime]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        console.log(sortable);

        $('#crimeTable').html('<tr><th>Crime Category</th><th>'+ this.teams[0].code +' Arrests</th><th>'+ this.teams[1].code +' Arrests</th><th>Total Arrests</th></tr>');
        var teamTotals = [0,0,0];
        for (var i = 0; i < sortable.length; i++) {
            var val1 = 0;
            var val2 = 0;
            var crimeCat = sortable[i];
            var newRow = '<tr>';
            newRow += '<td>'+crimeCat[0]+'</td>';
            if(this.teams[0].byCrime.hasOwnProperty(crimeCat[0])){
                val1 = this.teams[0].byCrime[crimeCat[0]];
            }
            newRow += '<td>'+val1+'</td>';
            if(this.teams[1].byCrime.hasOwnProperty(crimeCat[0])){
                val2 = this.teams[1].byCrime[crimeCat[0]];
            }
            newRow += '<td>'+val2+'</td>';
            newRow += '<td>'+crimeCat[1]+'</td>';
            newRow += '</tr>';
            $('#crimeTable').append(newRow);
            teamTotals[0] += val1;
            teamTotals[1] += val2;
            teamTotals[2] += crimeCat[1];
        }
        var newRow = '<tr>';
        newRow += '<td>Total</td>';
        newRow += '<td>'+teamTotals[0]+'</td>';
        newRow += '<td>'+teamTotals[1]+'</td>';
        newRow += '<td>'+teamTotals[2]+'</td>';
        newRow += '</tr>';
        $('#crimeTable').append(newRow);

    }

    setupOvertimeChart() {
        var options = {
            targetElement: '#overtimechart',
            data: {
                columns: []
            },
            colors: ['#'+this.teams[1].data[0].Team_hex_color,'#'+this.teams[0].data[0].Team_hex_color]
        };

        // get min and max seasons so we don't miss any seasons with zero
        var minSeason = Math.min(this.teams[0].minSeason,this.teams[1].minSeason);
        var maxSeason = Math.max(this.teams[0].maxSeason,this.teams[1].maxSeason);

        // season list is overwritten for each team, so last teams value is used
        var seasonlist = ['x'];

        // for each team, build running total for each season between min and max season
        for (var i = this.teams.length - 1; i >= 0; i--) {
            var teamObj = this.teams[i];
            var runningTotal = 0;
            var bySeason = [teamObj.code];
            seasonlist = ['x'];

            // for each season between min and max
            for(var season = minSeason; season <= maxSeason; season++){
                if(teamObj.bySeason.hasOwnProperty(season)){
                    runningTotal += teamObj.bySeason[season];
                }

                // add running total for this season
                bySeason.push(runningTotal);
                // add the this season
                seasonlist.push(season);
            }
            options.data.columns.push(bySeason);
        }
        // add season list for x values
        options.data.columns.push(seasonlist);

        this.overtimechart = simpleLineChart.init(options);
    }

    setupMonthChart() {
        // for some reason adding groups that don't exist (not stacked) make them not stack
        var options = {
            targetElement: '#monthchart',
            data: {
                columns: [['x', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']]
                ,groups: ['not','stacked']
            },
            colors: ['#'+this.teams[0].data[0].Team_hex_color,'#'+this.teams[1].data[0].Team_hex_color],
            customLegend: false
        };

        // add data for two teams
        options.data.columns.push(this.teams[0].byMonth);
        options.data.columns.push(this.teams[1].byMonth);

        // init chart
        this.monthchart = stackedBarChart.init(options);
    }

    resetTeams(){
        // reset teams
        this.teams = [];
        this.teams[0] = {
            code: '',
            data:[],
            totalArrests: 0,
            avgDaysToArrest: 0,
            byMonth: ['TEAM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            maxSeason:-1,
            minSeason:999999,
            bySeason: {},
            byCrime:{},
            return: false
        };
        this.teams[1] = {
            code: '',
            data:[],
            totalArrests: 0,
            avgDaysToArrest: 0,
            byMonth: ['TEAM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            maxSeason:-1,
            minSeason:999999,
            bySeason: {},
            byCrime:{},
            return: false
        };
    }
}
var dateRangeNFL;
// init page
$(window).load(function() {
    dateRangeController.init(function (newDateRange) {
        dateRangeNFL = newDateRange;


        CompareTeam = new CompareTeamPage();
    
        $('#dateRangeJquery').on('dateRangeChanged', function (e) {
           CompareTeam.renderView();             
        });
    });
});