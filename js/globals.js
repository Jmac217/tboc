/*** User Nav ***/
var nav_cap = 3; // starting with 0; ex: 3 = 3 + 1 = 4
var nav_obj = null; // initialize scope
$.ajax({
	dataType:'json',
	url: 'json/nav.json',
	async: false,
	success: function(json){
		nav_obj = json; // pass to global
	}
});