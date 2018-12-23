var CompareTeam;
class CompareTeamPage {
    constructor(pageID) {
        this.overtimechart = undefined;
        this.monthchart = undefined;

        this.setupEventHandlers();

        // render
        this.renderView();
    }

    setupEventHandlers(){
        // setup handler to render view when selects or date range changed
        var that = this;
        $('#teamSelect-1').change(function(){
            that.renderView();
        });
        $('#teamSelect-2').change(function(){
            that.renderView();
        });
    }

    renderView(){
        this.resetTeams();
        this.teams[0].code = $('#teamSelect-1').val();
        this.teams[1].code = $('#teamSelect-2').val();

        var that = this;
        var renderAfterData = function(){
            // if both returned, finish render
            if(that.teams[0].return && that.teams[1].return){
                that.renderDelta();
                that.setupOvertimeChart();
                that.setupMonthChart();    
            }
        }
        // loads data
        this.loadTeamData(1, renderAfterData);
        this.loadTeamData(2, renderAfterData);
    }

    resetTeams(){
        // reset teams
        this.teams = [];
        this.teams[0] = {
            code: '',
            data:[],
            totalArrests: 0,
            byMonth: ['TEAM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            maxSeason:-1,
            minSeason:999999,
            bySeason: {},
            return: false
        };
        this.teams[1] = {
            code: '',
            data:[],
            totalArrests: 0,
            byMonth: ['TEAM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            maxSeason:-1,
            minSeason:999999,
            bySeason: {},
            return: false
        };
    }

    loadTeamData(teamIndex,callback){
        var teamObj = this.teams[teamIndex-1];
        var that = this;
        var tempByMonth = {};
        $.getJSON( "http://nflarrest.com/api/v1/team/arrests/"+teamObj.code, function( data ) {
            teamObj.data = data;
            teamObj.totalArrests = data.length;
            for (var i = data.length - 1; i >= 0; i--) {
                var arrest = data[i];
                teamObj.maxSeason = Math.max(teamObj.maxSeason,parseInt(arrest.Season));
                teamObj.minSeason = Math.min(teamObj.minSeason,parseInt(arrest.Season));

                if(teamObj.bySeason.hasOwnProperty(arrest.Season)){
                    teamObj.bySeason[arrest.Season]++;
                }else{
                    teamObj.bySeason[arrest.Season] = 1;
                }

                if(tempByMonth.hasOwnProperty(arrest.Month)){
                    tempByMonth[arrest.Month]++;
                }else{
                    tempByMonth[arrest.Month] = 1;
                }
            }
            
            teamObj.byMonth[0] = teamObj.code;
            for(var i in tempByMonth){
                teamObj.byMonth[parseInt(i)] = tempByMonth[i];
            }
            // render
            $('#teamKPI-arrests-'+teamIndex).html(teamObj.totalArrests).css('color','#'+that.teams[teamIndex-1].data[0].Team_hex_color);
            $('#teamImg-'+teamIndex).attr("src", "images/TeamLogos/"+teamObj.code+".gif");

            teamObj.return = true;
            callback();
        });
    }

    renderDelta(){
        var that = this;
        var diff = ((that.teams[0].totalArrests-that.teams[1].totalArrests)/that.teams[1].totalArrests)*100.0;
        var diff = Math.round(diff * 100) / 100;
        if(diff>0)
            $('#compareDelta').html('+'+diff+'%');
        else
            $('#compareDelta').html(diff+'%');
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
        this.monthchart = stackedBarChart.init(options);
    }
}
$(window).load(function() {
    CompareTeam = new CompareTeamPage(update_hash());
});