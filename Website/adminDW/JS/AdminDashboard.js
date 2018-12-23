// lookup table for many relationships to incident (notes, source, outcome etc)
// key is parent html id
var add_icon_buttons = {
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
var add_dim_buttons = {

};


// ------------------------------
// Functions and logic
// ------------------------------
var setupNewsFeed = function(){
	$.getJSON('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.google.com%2Falerts%2Ffeeds%2F10878572914104303077%2F17435386549487357803', function (data) {
		var cards = [];
		for (var i in data.items) {
			var this_html = '<div style="background-color:#fff;box-shadow:0px 2px 2px #bbb; margin-bottom:5px;border-radius:4px;">';
			this_html += '<a href="' + item.link + '">' + item.title + '</a><br />';
			this_html += '<b>' + item.pubDate + '</b><br />';
			this_html += '<p>' + item.description + '</p>';
			this_html += '</div>';
			cards.push(this_html);
		}
		$('#newslist').html(cards.join(''));
	});
};

// setup tabs
var setupTabs = function(){
	$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
	$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
};

var handleAddIconMulti = function(e){
	// show form if not already shown
	$(add_icon_buttons[e.target.parentNode.id].formID).show();

	var isValid = true;
	var titleInput = undefined;
	var input_values = {};
	for(var i in add_icon_buttons[e.target.parentNode.id].inputs){
		var temp_input = add_icon_buttons[e.target.parentNode.id].inputs[i];

		if(temp_input.isTitle){
			titleInput = temp_input;
		}
		if(isValid){
			isValid = $(temp_input.type+'[name="'+temp_input.name+'"]').val() != '';
			input_values[temp_input.name] = $(temp_input.type+'[name="'+temp_input.name+'"]').val();
		}
	}

	// if already active, add this note draft to data structure
	if(isValid){
		add_icon_buttons[e.target.parentNode.id].data.push(input_values);

		// add note to list
		$(add_icon_buttons[e.target.parentNode.id].listID).append('<li>'+($(titleInput.type+'[name="'+titleInput.name+'"]').val()).substring(0,8)+'</li>');

		// reset all input
		for(var i in add_icon_buttons[e.target.parentNode.id].inputs){
			var temp_input = add_icon_buttons[e.target.parentNode.id].inputs[i];
			$(temp_input.type+'[name="'+temp_input.name+'"]').val('');
		}
	}

	console.log(add_icon_buttons[e.target.parentNode.id].data);	
};

var handleAddIcon = function(e){
	// dim not multi
	$('#'+e.target.parentNode.id+'Form').dialog({
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
};

// setup add icons
var setupAddIcons = function(){
	$(".add_icon").click(function(e){
		//console.log(e);
		if(e.hasOwnProperty('target')){
			// if it is a many to one relationship
			if($(e.target).hasClass('multi')){
				handleAddIconMulti(e);
			}else{
				handleAddIcon(e);
			}
			// debug
			console.log('(Add Button Clicked) Parent: ' + e.target.parentNode.id);
		}
	});
};

// main function for admin DW dashboard
$(function () {
	setupNewsFeed();
	setupTabs();
	setupAddIcons();
});
