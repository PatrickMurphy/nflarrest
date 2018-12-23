class AddButtons {
	constructor(){		
		this.DEBUG = true;

		this.titleInput = {
			'addIncidentNote':undefined
			,'addIncidentSource':undefined
		};

		this.input_values = {
			'addIncidentNote':{}
			,'addIncidentSource':{}
		};

		// lookup table for many relationships to incident (notes, source, outcome etc)
		// key is parent html id
		this.add_icon_buttons = {
			'addIncidentNote':{
				data:[],
				inputs: [{type:'input',name:'incidentNoteTitle', isTitle: true},{type:'textarea',name:'incidentNote', isTitle:false}],
				formID: '#addIncidentNoteForm',
				listID: '#addIncidentNoteList'
			},
			'addIncidentSource':{
				data:[],
				inputs: [{type:'input',name:'incidentSourceURL', isTitle: true},{type:'select',name:'incidenExternalSource', isTitle:false}],
				formID: '#addIncidentSourceForm',
				listID: '#addIncidentSourceList'
			}
		};

		// lookup table for add dimension forms (one to one) key = select/input name
		this.add_dim_buttons = {

		};

		this.setupAddIcons();
	}

	getData(id){
		if(this.add_icon_buttons.hasOwnProperty(id)){
			if(this.add_icon_buttons[id].hasOwnProperty('data')){
				return this.add_icon_buttons[id].data;
			}
		}

		return {};
	}

	// for every input in this form: check if valid, save value and save if is title
	checkIfAddIconMultiFormIsValid(id){
		var btn = this.add_icon_buttons[id];
		var isValid = true;
		for(var i in btn.inputs){
			var temp_input = btn.inputs[i];

			// check if title
			if(temp_input.isTitle){
				this.titleInput[id] = temp_input;
			}

			if(isValid){
				// check if valid
				isValid = $(temp_input.type+'[name="'+temp_input.name+'"]').val() != '';
				// save value
				var value = $(temp_input.type+'[name="'+temp_input.name+'"]').val();
				this.input_values[id][temp_input.name] = value;
			}
		}

		return isValid;
	}

	handleAddIconMulti(e){
		var id = e.target.parentNode.id;
		var btn = this.add_icon_buttons[id];

		// show form if not already shown
		$(btn.formID).show();

		// if already active, add this note draft to data structure
		if(this.checkIfAddIconMultiFormIsValid(id)){
			// if was valid add data
			btn.data.push(this.input_values[id]);

			// add note to list
			var tmp_title = this.titleInput[id]; 
			var listHTML = '<li>'+($(tmp_title.type+'[name="'+tmp_title.name+'"]').val()).substring(0,8)+'</li>';
			$(btn.listID).append(listHTML);

			// reset all input
			for(var i in btn.inputs){
				var temp_input = btn.inputs[i];
				// reset value
				$(temp_input.type+'[name="'+temp_input.name+'"]').val('');
			}
		}

		if(this.DEBUG)
			console.log(btn.data);	
	}

	handleAddIcon(e){
		// dim not multi
		var tempDialog = $('#'+e.target.parentNode.id+'Form').dialog({
	      modal: true,
	      width: '90%',
	      buttons: {
	        "Create": function(a1,a2,a3,a4,a5){console.log(a1,a2,a3,a4,a5);},
	        Cancel: function() {
	          $('#'+e.target.parentNode.id+'Form').dialog( "close" );
	        }
	      }
	      /*,
	      close: function() {
	        //form[ 0 ].reset();
	        //allFields.removeClass( "ui-state-error" );
	      }*/
	    });

	    var tempForm = tempDialog.find( "form" ).on( "submit", function( event ) {
	      event.preventDefault();
	      //addUser();
	    });


		this.add_dim_buttons[e.target.parentNode.id] = {};
		this.add_dim_buttons[e.target.parentNode.id]['dialog'] = tempDialog;
		this.add_dim_buttons[e.target.parentNode.id]['form'] = tempForm;  
	}

	handleAddButtonClick(e){
		if(e.hasOwnProperty('target')){
			// if it is a many to one relationship
			if($(e.target).hasClass('multi')){
				this.handleAddIconMulti(e);
			}else{
				this.handleAddIcon(e);
			}
			// DEBUG
			if(this.DEBUG)
				console.log('(Add Button Clicked) Parent: ' + e.target.parentNode.id);
		}
	}

	// setup add icons
	setupAddIcons(){
		$(".add_icon").click(this.handleAddButtonClick.bind(this));
	}
}