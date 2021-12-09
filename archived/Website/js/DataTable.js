class DataTable {
	constructor(data) {
		this.data = data;
		this.display_data = this.data;
		this.current_page = 0;
		this.row_limit = 15;
		this.arrest_view_mobile = false;

		if(mobileCheck())
			this.arrest_view_mobile = true;

		this.renderView();
	}

	// sort
	sortData(columnInt, directionFlag) {
		this.data.sort(function (a, b) {
			if (directionFlag)
				return a[columnInt] > b[columnInt];
			else
				return a[columnInt] < b[columnInt];
		});
	}

	// pagination
	setPage(intPage) {
		intPage = intPage || this.current_page;
		this.current_page = intPage;
	}

	nextPage() {
		this.current_page++;
	}

	previousPage() {
		this.current_page--;
	}

	setRowLimit(intRowLimit) {
		intRowLimit = intRowLimit || 15;
		this.row_limit = intRowLimit;
	}

	// view
	renderView() {
		this.renderArrests();
	}

	renderArrests() {
		var row,
			items = [];

		items.push(this.renderArrestRowHeader());
		var pageData = this.data.slice(this.row_limit * this.current_page);

		for (var rowID in pageData) {
			row = data[rowID];
			items.push(this.renderArrestRow(row));
		}

		$('#arrest_table').html(items.join(""));
	}


	// should be overloaded
	renderArrestRowHeader() {
		return '<tr><th class="one column">Date:</th><th class="one column">Team:</th><th class="two columns">Name:</th><th class="one column">Crime:</th><th class="four columns">Description:</th><th class="three columns">Outcome:</th></tr>';
	}

	// should be overloaded
	renderArrestRow(row) {
		return '<tr><td class="one column">' + moment(row['Date'], "YYYY-MM-DD").fromNow() + '</td><td class="one column">' + row['Team'] + '</td><td class="two columns"><a href="player/' + row['Name'] + '/">' + row['Name'] + '</a></td><td class="one column"><a href="crime/' + row['Category'] + '/">' + row['Category'] + '</a></td><td class="four columns">' + row['Description'] + '</td><td class="three columns">' + row['Outcome'] + '</td></tr>';
	}
}
