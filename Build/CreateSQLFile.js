var fs = require('fs');

// Aggregrate SQL Scripts
var filename = 'CreateDataWarehouseDB.sql';
var scriptPath = '../Database/MySQL/DataWarehouse/';
var fileList = [];
var buffer = undefined;
var newText = '';


process.argv.forEach(function (val, index, array) {
	if (val === "full") {
		fileList.push('CreateDB.sql');
	}
});

fileList.push('CreateDimDate.sql');
fileList.push('CreateDimFranchise.sql');
fileList.push('CreateDimTeam.sql');
fileList.push('CreateDimInfractionCategory.sql');
fileList.push('CreateDimInfraction.sql');
fileList.push('CreateDimPositionType.sql');
fileList.push('CreateDimPosition.sql');
fileList.push('CreateDimPlayer.sql');

fileList.push('CreateDimExternalSourceCategory.sql');
fileList.push('CreateDimExternalSource.sql');
fileList.push('CreateDimIncidentLegalLevel.sql');
fileList.push('CreateDimIncidentNote.sql');
fileList.push('CreateDimIncidentSource.sql');
fileList.push('CreateDimIncidentOutcomeCategory.sql');
fileList.push('CreateDimIncidentOutcome.sql');
fileList.push('CreateDimSeason.sql');
fileList.push('CreateFactTables.sql');


fileList.forEach(function (val, index, array){
	buffer = fs.readFileSync(scriptPath + val);
	newText += buffer;

	//console.log(scriptPath+val);
	if(index == array.length-1){
		fs.writeFile(scriptPath+filename, newText, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 
	}
});
