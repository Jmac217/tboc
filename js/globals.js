/*
if(Ext.isIE7 && document.documentMode == 8) {
Ext.isIE7 = false;
Ext.isIE8 = true;
Ext.getBody().replaceClass('ext-ie7', 'ext-ie8');
}
*/


//var history_obj = {};
//history.pushState('','',window.location.origin+window.location.pathname);
window.onpopstate = function(){
	send_url_parameters();
}
/*
alert(JSON.stringify(history.state));
var url = window.location.origin+window.location.pathname+'?id=loans&title=asdf';
alert(url);
history.pushState(history_obj,'a',url);
alert(JSON.stringify(history.state));
*/

/*** User Nav ***/
var nav_cap = 3; // starting with 0; ex: 3 = 3 + 1 = 4 | will be json.length at some point
var nav_obj = {}; // initialize scope
$.ajax({
	dataType:'json',
	url: 'json/nav.json',
	async: false,
	success: function(json){
		nav_obj = json.nav; // pass to global
		//alert(JSON.stringify(nav_obj[0]));
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