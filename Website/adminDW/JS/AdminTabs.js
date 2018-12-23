class AdminTabs {
	constructor(){
		this.addButtons = new AddButtons();
		this.setupTabs();
	}
	
	// setup tabs
	setupTabs(){
		$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
		$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
		var handleForm = function( event ) {
			event.preventDefault();
			//console.log(event.target);
			var data = {};
			var valid_names = ['DateID', 'TeamID','PositionID','PlayerID','InfractionID','form_action'];

			for(var i = 0; i < event.target.length; i++){
				var input = event.target[i];
				if(valid_names.indexOf(input.name) >= 0){
					data[input.name] = $(input).val();
				}
				//console.log(input.name,$(input).val());
			}
		    
			// get notes
		    data['multi'] = {};
			data['multi']['IncidentNotes'] = this.addButtons.getData('addIncidentNote');
			// get sources
			data['multi']['IncidentSources'] = this.addButtons.getData('addIncidentSource');	

			console.log(data);
			$.post('PHP/API/INSERT.php',{postData: JSON.stringify(data)},function(data, status, xhr){
				$('#status').html(JSON.stringify(data));
			});

	    };
		var tempForm = $('#tabs-2 form').on( "submit", handleForm.bind(this));
	}
}