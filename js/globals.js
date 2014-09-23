/*** User Nav ***/
var nav_obj = null; // initialize scope
$.ajax({
	dataType:'json',
	url: 'json/nav.json',
	async:false,
	success: function(json){
		nav_obj = json; // pass to global
	}
});