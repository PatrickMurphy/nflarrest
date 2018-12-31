class CompareCrimeByTeamTable {
    constructor(parent) {
        this.parent = parent;
    }

    // function to render the crime table on demand
    renderView() {
        var orderedCrimeList = this.getCrimeList(Object.assign(Object.keys(this.parent.teams[0].byCrime), Object.keys(this.parent.teams[1].byCrime)));
       this.getRowsHTML(orderedCrimeList);
    }

    // insert the html for all table rows, totals and header optional default to include
    getRowsHTML(orderedCrimeList, totals, header) {
        totals = totals || true;
        header = header || true;
        var teamTotals = [0, 0, 0];
        var teamCrimes = [this.parent.teams[0].byCrime, this.parent.teams[1].byCrime];
    
        // If header option set: print header    
        if(header)
            $('#crimeTable').html(this.getRowHTML(['Crime Category', this.parent.teams[0].code + ' Arrests', this.parent.teams[1].code + ' Arrests', 'Total Arrests'], true));
        
        // for each crime category, print row
        for (var i = 0; i < orderedCrimeList.length; i++) {
            var crimeItem = orderedCrimeList[i];
            var teamValues = [0, 0];

            teamValues[0] = teamCrimes[0].hasOwnProperty(crimeItem[0]) ? teamCrimes[0][crimeItem[0]] : 0;
            teamValues[1] = teamCrimes[1].hasOwnProperty(crimeItem[0]) ? teamCrimes[1][crimeItem[0]] : 0;

            // store totals
            teamTotals[0] += teamValues[0];
            teamTotals[1] += teamValues[1];
            teamTotals[2] += crimeItem[1];

            $('#crimeTable').append(this.getRowHTML([crimeItem[0], teamValues[0], teamValues[1], crimeItem[1]]));
        }

        // If column totals option set: print totals
        if(totals)
            $('#crimeTable').append(this.getRowHTML(['Total', teamTotals[0], teamTotals[1], teamTotals[2], teamTotals[3]],true));
    }

    // return the html for one table row
    getRowHTML(values, header) {
        header = header || false;
        var cellElement = 'td';
        var cellClass = ' class="value-cell">';
        var diff, diff2, color1, color2;
        if (header) {
            cellElement = 'th';
            cellClass = ' class="value-cell" colspan="2">';
        }


        if(!header){
            diff = ((parseInt(values[1])-parseInt(values[2]))/parseInt(values[2]))*100.0;
            diff = Math.round(diff * 100) / 100;
            color1 = diff < 0 ? 'rgba(77,202,80,'+Math.abs(diff/100)+')' : 'rgba(206,51,51,'+Math.abs(diff/100)+')';

            diff2 = ((parseInt(values[2])-parseInt(values[1]))/parseInt(values[1]))*100.0;
            diff2 = Math.round(diff2 * 100) / 100;
            color2 = diff2 < 0 ? 'rgba(77,202,80,'+Math.abs(diff2/100)+')' : 'rgba(206,51,51,'+Math.abs(diff2/100)+')';
        }

        var newRow = '<tr>';
        // crime title cell
        newRow += '<' + cellElement + '>' + values[0] + '</' + cellElement + '>';

        // team 1 value cell
        newRow += '<' + cellElement + cellClass + values[1] + '</' + cellElement + '>';
        if(!header)
            newRow += '<td class="delta" style="width:60px;text-align:center;font-weight:bold;background-color:'+color1+';">'+diff+'%</td>';

        // team 2 value cell
        newRow += '<' + cellElement + cellClass + values[2] + '</' + cellElement + '>';
        if(!header)
            newRow += '<td class="delta" style="width:60px;text-align:center;font-weight:bold;background-color:'+color2+';">'+diff2+'%</td>';

        // total value cell
        newRow += '<' + cellElement;
        if(!header)
            newRow += cellClass;
        else
            newRow += ' class="value-cell">';
        newRow += values[3] + '</' + cellElement + '>';
        
        newRow += '</tr>';


        return newRow;
    }

    // count and return the total number of team combined crime arrests (by team and by crime labels)
    getCrimeTotals(keys) {
        var crimeTotals = {};

        // for each team object
        for (var i = this.parent.teams.length - 1; i >= 0; i--) {
            var teamItem = this.parent.teams[i];

            // for each crime from combined teams
            for (var j = keys.length - 1; j >= 0; j--) {
                var crimeItem = keys[j];

                // if this team has this crime
                if (teamItem.byCrime.hasOwnProperty(crimeItem)) {
                    // if this crime already has a property in crimeTotals
                    if (crimeTotals.hasOwnProperty(crimeItem)) {
                        // add value to existing property
                        crimeTotals[crimeItem] += parseInt(teamItem.byCrime[crimeItem]);
                    } else { // define new property
                        crimeTotals[crimeItem] = parseInt(teamItem.byCrime[crimeItem]);
                    }
                }
            }
        }

        return crimeTotals;
    }

    // get list of sorted crimes by team combined crime totals
    getCrimeListSorted(crimeTotals) {
        var sortedCrimeList = [];

        // convert object to sortable array
        for (var crime in crimeTotals) {
            sortedCrimeList.push([crime, crimeTotals[crime]]);
        }

        // sort descending order, highest crime first
        sortedCrimeList.sort(function(a, b) {
            return b[1] - a[1];
        });

        // return sorted list
        return sortedCrimeList;
    }

    // get crime list sorted by team combined crime totals
    getCrimeList(keys) {
        return this.getCrimeListSorted(this.getCrimeTotals(keys));
    }

}