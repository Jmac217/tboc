window.onpopstate = function(){
	send_url_parameters();
}

var nav_cap = 3;
var nav_obj = null;
var json = null;
$.ajax({
	dataType:'json',
	url: 'json/nav.json',
	async: false,
	success: function(j){
		nav_obj = j.nav;
	}
});

$.ajax({
	dataType:'json',
	url: 'json/tiles.json',
	async: false,
	success: function(t){
		json = t;
	}
});

function get_nav(){
	var nav_string = '';
	for (var i=0; i<=3; i++){
		nav_string += '<u class="nav_element load_link" title="'+nav_obj[i].title+'" id="'+nav_obj[i].id+'">'+nav_obj[i].name+'</u>';
		if(i<nav_cap){
			nav_string+=' &nbsp; &#149; &nbsp; ';
		}
	}
	$('#user_nav_array').html(nav_string);
}

get_nav();