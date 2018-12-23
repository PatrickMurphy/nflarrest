var CompareTeam;
class CompareTeamPage {
    constructor(pageID) {
        var tempTeamDataStructure = {
            code: '',
            data:[],
            totalArrests: 0,
            byMonth: ['TEAM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            maxSeason:-1,
            minSeason:999999,
            bySeason: {},
            return: false
        };
        this.teams = [];
        this.teams.push(JSON.parse(JSON.stringify(tempTeamDataStructure)));
        this.teams.push(JSON.parse(JSON.stringify(tempTeamDataStructure)));
        this.overtimechart = undefined;
        this.monthchart = undefined;
        this.renderView();
        // setup handler to render view when selects or date range changed
    }

    renderView(){
        this.teams[0].code = $('#teamSelect-1').val();
        this.teams[1].code = $('#teamSelect-2').val();
        this.loadTeamData(1);
        this.loadTeamData(2);
        //$.when($.ajax("http://nflarrest.com/api/v1/team/arrests/"+this.teams[0].code), $.ajax("http://nflarrest.com/api/v1/team/arrests/"+this.teams[1].code))
        //    .done(this.handleTeamData)
        //    .done(this.renderTeamData);
        //this.renderTeamData();
    }

    loadTeamData(teamIndex){
        var teamObj = this.teams[teamIndex-1];
        var that = this;
        var tempByMonth = {};
        $.getJSON( "http://nflarrest.com/api/v1/team/arrests/"+teamObj.code, function( data ) {
            teamObj.totalArrests = data.length;
            for (var i = data.length - 1; i >= 0; i--) {
                var arrest = data[i];
                //console.log(JSON.stringify(arrest));
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
            console.log(JSON.stringify(teamObj.bySeason));
            
            teamObj.byMonth[0] = teamObj.code;
            for(var i in tempByMonth){
                teamObj.byMonth[parseInt(i)] = tempByMonth[i];
            }
            console.log(JSON.stringify(teamObj.byMonth));
            // render
            $('#teamKPI-arrests-'+teamIndex).html(teamObj.totalArrests);
            $('#teamImg-'+teamIndex).attr("src", "images/TeamLogos/"+teamObj.code+".gif");

            teamObj.return = true;
            console.log('return'+teamIndex);
            if(that.teams[0].return && that.teams[1].return){
                console.log('both return');
                var diff = ((that.teams[teamIndex-2].totalArrests-that.teams[teamIndex-1].totalArrests)/that.teams[teamIndex-1].totalArrests)*100.0;
                if(diff>0)
                    $('#compareDelta').html('+'+diff+'%');
                else
                    $('#compareDelta').html(diff+'%');
                that.setupOvertimeChart();
                that.setupMonthChart();    
            }
        });
    }

    renderTeamData(){
        for(var i = 0; i<this.teams.length; i++){
            var teamIndex = i + 1;
            var teamObj = this.teams[i];
            $('#teamKPI-arrests-'+teamIndex).html(teamObj.totalArrests);
            $('#teamImg-'+teamIndex).attr("src", "images/TeamLogos/"+teamObj.code+".gif");
        }
    }

    setupOvertimeChart() {
        var options = {
            targetElement: '#overtimechart',
            data: {
                columns: []
            }
        };

        var minSeason = Math.min(this.teams[0].minSeason,this.teams[1].minSeason);
        var maxSeason = Math.max(this.teams[0].maxSeason,this.teams[1].maxSeason);
        var seasonlist = ['x'];
        for (var i = this.teams.length - 1; i >= 0; i--) {
            var teamObj = this.teams[i];
            var runningTotal = 0;
            var bySeason = [teamObj.code];
            seasonlist = ['x'];
            for(var season = minSeason; season<= maxSeason; season++){
                if(teamObj.bySeason.hasOwnProperty(season)){
                    runningTotal += teamObj.bySeason[season];
                }
                bySeason.push(runningTotal);
                seasonlist.push(season);
            }
            console.log(bySeason);
            options.data.columns.push(bySeason);
        }
        options.data.columns.push(seasonlist);

        this.overtimechart = simpleLineChart.init(options);
    }

    setupMonthChart() {
        var options = {
            targetElement: '#monthchart',
            customLegend: false,
            data: {
                columns: [
                    ['x', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//                    ,['DAL', 3, 3, 2, 1, 2, 1, 2, 1, 3, 1, 1, 2],
  //                  ['PHI', 0, 2, 4, 2, 0, 3, 3, 1, 0, 1, 4, 0]
                ]
                ,groups: ['DAL', 'PHI']
            }
        };

        options.data.columns.push(this.teams[0].byMonth);
        options.data.columns.push(this.teams[1].byMonth);
        this.monthchart = stackedBarChart.init(options);
    }
}
$(window).load(function() {
    CompareTeam = new CompareTeamPage(update_hash());
});