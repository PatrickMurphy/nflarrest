var dateRangeNFL,
		mainChartReturned = false;
var last_start_pos = 0,
		listsReturnCount = 0,
		listsReturned = false;

//$( window ).load(function() {
//	dateRangeController.init(function(newDateRange){
		//nflLoadingBar.init();
		//dateRangeNFL = newDateRange;

		//$('.dateRangeEditor').on('dateRangeChanged', function (e){
		//	nflLoadingBar.showLoading();
		//	setupChart();
		//});

		//$('#loadMoreLists').click(load_top_lists);
		//if ($(window).width() >= 800) {
		//	 $('#tooltip').fadeIn();
		//}
		//$( document ).tooltip();
//	});
//});

$(window).load(setupChart);

function loadingFinished(){
	//nflLoadingBar.hideLoading();
	mainChartReturned = false;
};

function key2date(key){
	if((!isNaN(parseFloat(key)) && isFinite(key)) && key >= 0){
		var year  = Math.floor(key/12) + 2009;
		var month = (key%12)+1
		return {'year':year, 'month':month};
	}else{
		return {'error':'invalid key'};
	}
}

function date2key(date){
	if(date.hasOwnProperty('month') && date.hasOwnProperty('year')){
		if(date.year >= 2009 && (date.month > 0 && date.month <= 12)){
			return ((date.year-2009)*12)+(date.month+1);
		}else{
			return {'error':'invalid date, not in the correct ranges'};
		}
	}else{
		return {'error':'invaild date, must have the year and month properties'};
	}
}

function getOverallChartData(callback){
	//$.getJSON('api/overall/topTeams.php?graph=true&start_date='+dateRangeNFL.getStart()+'&end_date='+dateRangeNFL.getEnd(), callback);
	var rawData =[{"year":2009,"month":1,"max":6.8,"min":0.3,"frost":13,"rain":72.4,"sun":63.2,"response":13.3322},{"year":2009,"month":2,"max":7.8,"min":2.1,"frost":10,"rain":69.6,"sun":59.2,"response":13.6018},{"year":2009,"month":3,"max":12.9,"min":3.7,"frost":2,"rain":30,"sun":158.5,"response":13.052560000000001},{"year":2009,"month":4,"max":16.1,"min":7.2,"frost":0,"rain":28,"sun":172.8,"response":12.90276},{"year":2009,"month":5,"max":19.1,"min":9.4,"frost":0,"rain":29.8,"sun":193.9,"response":13.082519999999999},{"year":2009,"month":6,"max":22.4,"min":12.2,"frost":0,"rain":34,"sun":192.8,"response":13.32332},{"year":2009,"month":7,"max":23,"min":13.7,"frost":0,"rain":71.4,"sun":155.8,"response":13.26088},{"year":2009,"month":8,"max":23.9,"min":14.1,"frost":0,"rain":39.6,"sun":167.6,"response":13.099480000000002},{"year":2009,"month":9,"max":20.5,"min":12,"frost":0,"rain":36,"sun":137.3,"response":13.62572},{"year":2009,"month":10,"max":16.3,"min":9.3,"frost":0,"rain":39.4,"sun":84.7,"response":13.186},{"year":2009,"month":11,"max":12.6,"min":7.4,"frost":0,"rain":148,"sun":62.4,"response":13.23372},{"year":2009,"month":12,"max":7,"min":1.3,"frost":12,"rain":84.6,"sun":60.3,"response":12.98836},{"year":2010,"month":1,"max":4.5,"min":-0.3,"frost":15,"rain":51.8,"sun":51.3,"response":12.914359999999999},{"year":2010,"month":2,"max":6.9,"min":1.7,"frost":8,"rain":100.4,"sun":46.7,"response":12.60412},{"year":2010,"month":3,"max":11.1,"min":3.7,"frost":4,"rain":39.8,"sun":106.4,"response":12.60444},{"year":2010,"month":4,"max":15.8,"min":5.6,"frost":0,"rain":23.2,"sun":201.7,"response":12.71904},{"year":2010,"month":5,"max":17.3,"min":7.7,"frost":0,"rain":20.6,"sun":170.4,"response":12.54664},{"year":2010,"month":6,"max":23.5,"min":12.1,"frost":0,"rain":12.4,"sun":220.1,"response":12.6546},{"year":2010,"month":7,"max":25,"min":15.1,"frost":0,"rain":18,"sun":161.8,"response":13.25084},{"year":2010,"month":8,"max":21.6,"min":13.2,"frost":0,"rain":88.6,"sun":110.9,"response":12.59972},{"year":2010,"month":9,"max":19.4,"min":11.2,"frost":0,"rain":38.2,"sun":128.7,"response":12.845999999999998},{"year":2010,"month":10,"max":15.2,"min":8.3,"frost":1,"rain":74.8,"sun":104,"response":14.060719999999998},{"year":2010,"month":11,"max":9.1,"min":4,"frost":7,"rain":32.2,"sun":50,"response":14.44088},{"year":2010,"month":12,"max":3.9,"min":-1.5,"frost":21,"rain":21.4,"sun":18.5,"response":15.12104},{"year":2011,"month":1,"max":7.4,"min":2.8,"frost":8,"rain":76.8,"sun":35.6,"response":13.023599999999998},{"year":2011,"month":2,"max":10.2,"min":4.8,"frost":1,"rain":42.8,"sun":36.2,"response":12.84692},{"year":2011,"month":3,"max":12.3,"min":3.8,"frost":4,"rain":14.6,"sun":126.4,"response":12.77812},{"year":2011,"month":4,"max":19.7,"min":8.6,"frost":0,"rain":2.4,"sun":218,"response":12.85476},{"year":2011,"month":5,"max":19.4,"min":9.4,"frost":0,"rain":24.6,"sun":218,"response":13.06232},{"year":2011,"month":6,"max":20.7,"min":11,"frost":0,"rain":84,"sun":173.5,"response":12.899239999999999},{"year":2011,"month":7,"max":21.7,"min":12.6,"frost":0,"rain":49.8,"sun":173.6,"response":12.804},{"year":2011,"month":8,"max":21.8,"min":13.4,"frost":0,"rain":68.8,"sun":144.1,"response":13.00684},{"year":2011,"month":9,"max":21.3,"min":12.4,"frost":0,"rain":35,"sun":161.2,"response":12.80168},{"year":2011,"month":10,"max":18.1,"min":10.1,"frost":0,"rain":18.4,"sun":140.4,"response":12.95212},{"year":2011,"month":11,"max":13.6,"min":7.3,"frost":0,"rain":29,"sun":52.5,"response":12.8972},{"year":2011,"month":12,"max":9.9,"min":3.8,"frost":4,"rain":63,"sun":60.6,"response":12.808119999999999},{"year":2012,"month":1,"max":9.8,"min":3.4,"frost":7,"rain":34.4,"sun":68.5,"response":12.5616},{"year":2012,"month":2,"max":8,"min":1.3,"frost":12,"rain":16.8,"sun":84.9,"response":13.215039999999998},{"year":2012,"month":3,"max":14.7,"min":4.7,"frost":0,"rain":16.2,"sun":180.3,"response":12.91488},{"year":2012,"month":4,"max":13.3,"min":4.9,"frost":1,"rain":98.4,"sun":141.7,"response":12.65872},{"year":2012,"month":5,"max":18.2,"min":9.7,"frost":0,"rain":25.4,"sun":166.6,"response":12.66108},{"year":2012,"month":6,"max":19.4,"min":11.6,"frost":0,"rain":110.8,"sun":118.5,"response":12.78336},{"year":2012,"month":7,"max":21.3,"min":13.2,"frost":0,"rain":71.8,"sun":161.6,"response":12.69788},{"year":2012,"month":8,"max":23.5,"min":14.3,"frost":0,"rain":36.4,"sun":182.6,"response":12.79288},{"year":2012,"month":9,"max":20,"min":10.3,"frost":0,"rain":41.2,"sun":178.9,"response":12.835560000000001},{"year":2012,"month":10,"max":14.2,"min":8,"frost":0,"rain":88.4,"sun":85.6,"response":12.675239999999999},{"year":2012,"month":11,"max":11,"min":4.6,"frost":1,"rain":71.8,"sun":75.4,"response":12.93064},{"year":2012,"month":12,"max":9,"min":2.6,"frost":10,"rain":95.8,"sun":58,"response":12.97916},{"year":2013,"month":1,"max":6.5,"min":2,"frost":13,"rain":50.1,"sun":34.5,"response":12.53764},{"year":2013,"month":2,"max":6.7,"min":1.2,"frost":4,"rain":32.8,"sun":64.9,"response":12.67468},{"year":2013,"month":3,"max":6.9,"min":1.2,"frost":11,"rain":52.8,"sun":62.3,"response":12.53648},{"year":2013,"month":4,"max":13.5,"min":4.7,"frost":3,"rain":34,"sun":162.8,"response":12.3874},{"year":2013,"month":5,"max":16.4,"min":7.7,"frost":0,"rain":41.8,"sun":163.3,"response":12.44536},{"year":2013,"month":6,"max":20.3,"min":11.2,"frost":0,"rain":11.6,"sun":157.5,"response":12.488119999999999},{"year":2013,"month":7,"max":27,"min":15.2,"frost":0,"rain":25.2,"sun":268.2,"response":13.07348},{"year":2013,"month":8,"max":24.3,"min":14.3,"frost":0,"rain":32.6,"sun":198.7,"response":12.611479999999998},{"year":2013,"month":9,"max":19.7,"min":11.1,"frost":0,"rain":49.6,"sun":118.9,"response":12.902159999999999},{"year":2013,"month":10,"max":17,"min":10.6,"frost":0,"rain":81.4,"sun":89.6,"response":12.9498},{"year":2013,"month":11,"max":10.4,"min":4.7,"frost":1,"rain":50,"sun":80.4,"response":13.166279999999999},{"year":2013,"month":12,"max":10.2,"min":3.5,"frost":3,"rain":98.2,"sun":51.3,"response":13.34988},{"year":2014,"month":1,"max":10,"min":3.8,"frost":1,"rain":162.4,"sun":68.3,"response":12.8444},{"year":2014,"month":2,"max":10.6,"min":4.4,"frost":0,"rain":89.8,"sun":91.7,"response":13.70552},{"year":2014,"month":3,"max":14.1,"min":4.4,"frost":1,"rain":27.8,"sun":161.4,"response":13.192039999999999},{"year":2014,"month":4,"max":16.1,"min":7.5,"frost":0,"rain":58,"sun":156.9,"response":12.890640000000001},{"year":2014,"month":5,"max":18,"min":9.8,"frost":0,"rain":84.6,"sun":178.8,"response":13.13612},{"year":2014,"month":6,"max":22.1,"min":12.5,"frost":0,"rain":40.8,"sun":220.2,"response":13.29136},{"year":2014,"month":7,"max":25.8,"min":15,"frost":0,"rain":50,"sun":246.4,"response":13.395119999999999},{"year":2014,"month":8,"max":21.7,"min":12.7,"frost":0,"rain":97.6,"sun":183.6,"response":13.2272},{"year":2014,"month":9,"max":21.5,"min":12.8,"frost":0,"rain":10.8,"sun":134.6,"response":13.1692},{"year":2014,"month":10,"max":17.6,"min":11,"frost":0,"rain":76,"sun":103.8,"response":13.404559999999998},{"year":2014,"month":11,"max":12.5,"min":6.9,"frost":1,"rain":128.4,"sun":51.1,"response":13.90972},{"year":2014,"month":12,"max":9.2,"min":3,"frost":7,"rain":37.8,"sun":71.6,"response":13.36572},{"year":2015,"month":1,"max":8.8,"min":1.6,"frost":10,"rain":63.4,"sun":62,"response":13.212919999999999},{"year":2015,"month":2,"max":8,"min":1.8,"frost":8,"rain":39,"sun":61.9,"response":13.5222},{"year":2015,"month":3,"max":11.6,"min":4.1,"frost":1,"rain":24,"sun":140.7,"response":13.36704},{"year":2015,"month":4,"max":16.3,"min":6,"frost":0,"rain":16.2,"sun":212.1,"response":13.36088},{"year":2015,"month":5,"max":17.6,"min":8.8,"frost":0,"rain":41.6,"sun":189,"response":13.3072},{"year":2015,"month":6,"max":22.2,"min":11.4,"frost":0,"rain":12.2,"sun":197,"response":13.49432},{"year":2015,"month":7,"max":23.7,"min":13.8,"frost":0,"rain":71.8,"sun":189.7,"response":13.88712},{"year":2015,"month":8,"max":22.2,"min":14.1,"frost":0,"rain":116.8,"sun":134.1,"response":13.41048},{"year":2015,"month":9,"max":18.6,"min":9.7,"frost":0,"rain":50.8,"sun":103.2,"response":13.706600000000002},{"year":2015,"month":10,"max":15.8,"min":9.3,"frost":0,"rain":39.8,"sun":94.2,"response":13.526959999999999}];
	var xFields = ['x'];
	var highsCol = ['High'];
	var lowsCol = ['Low'];
	var frost = ['Days of Frost'];
	var resp = ['Avg Response Time'];
	var groups = ['High', 'Low', 'Days of Frost','Avg Response Time']
	for(var key in rawData){
		var element = rawData[key];
		var tempYear = element.year+"";
		tempYear = tempYear.substr(2,4);
		xFields.push(element.month+'-'+tempYear);
		highsCol.push(element.max);
		lowsCol.push(element.min);
		frost.push(element.frost);
		resp.push(element.response);
	}
	var returnData = {'columns':[xFields, highsCol, lowsCol,frost,resp],'groups':groups};
	callback(returnData);
}

function setupChart(){
	getOverallChartData(function(newData){
 		weatherMultiChart.init({
			data: newData,
			targetElement: '#chart'
		});
		mainChartReturned = true;
  });
}
