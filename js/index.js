$(document).ready(function(){

	$('#logo').click(function(){
		$('#body_container').css({'visibility':'visible'});	
		$('#pages').css({'visibility':'hidden'});	
	});

// currently debugging
// This will be a click event for links
// a page will be passed in to the continue button
// Not sure if I like the #outgoing id

/*** Dialog Testing ***/
/*
$('#outgoing').dialog({
	title: 'Confirm',
	width: 380,
	height: 140,
	modal: true,
	resizable: false,
	draggable: false,
	dragStart: function(event, ui){},
	dialogClass: 'no-close',
	buttons: [{
		text: 'Cancel',
		click: function()
		{
			// exit
			$(this).dialog('close');
		}
	},{
		text: 'Continue',
		click: function()
		{
			// go to location	
		}
	}]
});
*/

// Main section //

/*** Moving to functions.js ***/
/*
function notice(visible, path, type){ // this function deals with everything relating to the notice_board
	if (visible == 'true'){
		$.ajax({
			type: "GET",
			url: path,
			dataType: "xml",
			success: function(xml){

				// set xml
				$xml = $(xml);

				// set row id
				$rows_id = $xml.find(type).find("rows").attr("id");

				// set relative top values accordingly
				// there will be an [x] button 

				var row_height = 25; //px
				var notice_height = ($rows_id*row_height)+'px'; // calculate height: id * (row_height) // add +1 to id for each break_space written to xml

				function get_top(top){
					var row_multiple = row_height*parseInt($rows_id);
					return (top + row_multiple) + 'px';
				}

				var rows = []; // html strings will be pushed into this array

				var notices = get_top(100);

				var body = get_top(10);
				var links = get_top(20);
				var pages = get_top(300);
//				var footer = get_top(640);
				$('#notices').css({'visibility':'visible'}).animate({'height':notice_height});
				$('#body_container').animate({'top':body}); 
				$('#links').animate({'top':links}); 
				$('#pages').animate({'top':pages}); 
//				$('#footer').animate({'top':footer}); 

				// if notices is on => set height to (rows*row_height)
				// and set relative divisions to (notice_height+div_top)

				// title
				var title_meta = $xml.find(type).find("title");
				var title = title_meta.text();
				var title_decoration = title_meta.attr("decoration");
				var title_size = title_meta.attr("size");
				var title_centered = title_meta.attr("centered");
				var title_break_space = title_meta.attr("break_space");
				format(title, title_decoration, title_size, title_centered, title_break_space);

				// body
				$xml.find(type).find("rows").find("body").each(function(){
					var body = $(this).text();
					var body_decoration = $(this).attr("decoration");	
					var body_size = $(this).attr("size");	
					var body_centered = $(this).attr("centered");	
					var body_break_space = $(this).attr("break_space");	
					format(body, body_decoration, body_size, body_centered, body_break_space);
				});

				// extra
				var extra_meta = $xml.find(type).find("extra");
				var extra = extra_meta.text();
				var extra_decoration = extra_meta.attr("decoration");
				var extra_size = extra_meta.attr("size");
				var extra_centered = extra_meta.attr("centered");
				var extra_break_space = extra_meta.attr("break_space");
				format(extra, extra_decoration, extra_size, extra_centered, extra_break_space);

				// date
				var date = "<div style='position:absolute;bottom:0px;right:5px;'>"+$xml.find(type).find("date").text()+"</div>";

				function format(div,decoration,size,centered,break_space){// break_space is optional
					switch(decoration){
						case 'bold':
							div = '<b>'+div+'</b>';	
						break;
						case 'italic':
							div = '<i>'+div+'</i>';
						break;
						case 'underline':
							div = '<u>'+div+'</u>';
						break;
						case 'bold-underline':
							div = '<b><u>'+div+'</u></b>';
						break;
						default:
					}
					switch(size){
						case '1':
							div = '<font size="1">'+div+'</font>';
						break;
						case '2':
							div = '<font size="2">'+div+'</font>';
						break;
						case '3':
							div = '<font size="3">'+div+'</font>';
						break;
					}
					if (centered == 'true'){
						div = '<center>'+div+'</center>';
					}
					// push onto array
					if (break_space == 1){
						rows.push("<br />"+div+"<br />");
					}else{
						rows.push(div+"<br />");
					}
				}

				// determine the notice type
				if (type == 'warning'){
					$('#notices').css({'background-color':'#FF8'});
					$('#warning').html(rows).css({'visibility':'visible',});
					$('#alert').css({'visibility':'hidden'});
				}else if (type == 'alert'){
					$('#notices').css({'background-color':'#B66'});
					$('#alert').html(rows).css({'visibility':'visible'});
					$('#warning').css({'visibility':'hidden'});
				}
			}
		});
	}else if(visible=='false'){
	
				$('#notices').animate({'height':'0px'});
				$('#body_container').animate({'top':'0px'}); 
				$('#links').animate({'top':'10px'}); 
				$('#pages').animate({'top':'300px'}); 
//				$('#footer').animate({'top':'717px'}); 
//				$('#footer').css({'bottom':'0px'}); 
				setTimeout(function(){
					$('#notices').css({'visibility':'hidden'})
						$('#notices_area').css({'visibility':'hidden'})
						$('#warning').css({'visibility':'hidden',});
						$('#alert').css({'visibility':'hidden'});
				},350);
	
		// set visibility false and animate closed
		$('#notices').animate({'height':'0px'});		
	}
}
*/

// manual notice switch
// notice('false', 'JSON/notice.xml', 'warning');

$('#noticesOn').click(function(){
	notice('true', 'JSON/notice.xml', 'warning');
});

$('#noticesOff').click(function(){
	notice('false', 'JSON/notice.xml', 'warning');
});

//var pages_height = $('#pages')[0].scrollHeight;
//$('#pages').css({'height':pages_height});

//alert($('#pages').innerHeight());

// pretty sure this is being depricated for load_link
function selection_handler(type,path,load,name,element){
	/* --Parameters--
	 *
	 * type:
	 * 	link
	 *
	 * path:
	 * 	/php/*.php
	 *
	 * load:
	 * 	this-> load into frame
	 * 	tab-> load in new tab
	 * 	win-> load in new window
	 *
	 * name: optional
	 * 	Class | ID | 'name'
	 *
	 * element: optional
	 * 	only necessary if name is grabbed by the name attribute
	 * 	takes only HTML elements
	 *
	 */
	
	// get link XHTTP attributes
	/*
	var type = $(this).attr('type');	
	var path = $(this).attr('path');	
	var load = $(this).attr('load');	
	var name = $(this).attr('name');	
	*/

	function get_name_type(name){
		var debug = null;
		// takes `name` & returns if value is a(n) 'ID', 'class', or 'name'
		if(name.charAt(0)=='#'){
			if(debug){alert('name == id');}
		}else if (name.charAt(0)=='.'){
			if(debug){alert('name == class');}	
		}else{ // 'name' attribute will be searched used
			if(element==NULL){
				if(debug){alert('`element` must be set to use a name attribute.');}
			}else if(name==NULL){
				if(debug){alert('name has not been set, check selection_handler instansiation');}
			}else{
				// checks are good, grab 'name' where 'element'	
				name = $(element+'[name*="'+name+'"]').val();
			}
		}
	}
	alert(name);
	get_name_type(name);

	// there are only links right now, but soon there may be more choices: (to rattle off possibilities) picture, panel, button, div
	switch(type){
		case 'link':
			switch(load){
				case 'frame':
					$('#pages').load(path);
				break;
				case 'tab':
					window.open(path);
				break;
				case 'win':
				/*
					$(name).live(click,function(){
						$(this).attr('target','_blank');	
					});
					*/
				alert('New Windows have not been set up yet.');
				break;
			}
		break;
	}
}
//selection_handler('link','pages/personal/Checking.php','frame','#personal_checking');
//selection_handler('link','pages/customer/security/index.php','frame','security','li');
//$('#pages').load('pages/personal/checking.php');

	$('#banner').click(function(){
		//alert('click');
	}).slidesjs({
		width: 750,
		height: 279,
		play:{
			active: true,
			effect: 'fade',
			interval: 7000,
			auto: true,
			swap: true,
			pauseOnHover: true,
			restartDelay: 2500
		}
		/*
		pagination:{
			active: true,
			effect: 'slide'
		}
		*/
	});

	var link_speed = 200;
	$('.link').click(function(){
		// get variables for dropdown
		var dropdown = $(this).attr('alt');	
		var fields = null;
		var drop_height = null;
		// switch for categories
		switch(dropdown){
			case 'customer':
				fields = 8;
			break;
			case 'personal':
				fields = 11;
			break;
			case 'business':
				fields = 6;
			break;
			case 'about':
				fields = 7;
			break;
			default:
				fields = 11; // the highest number
			break;
		}
		// 1 field = 16 px
		drop_height = (fields*29)+'px';

		/*$(this).on('click mouseover',function(){*/
		/*$(this).on('click',function(){*/
			$(this).children('ul').children('li').children('ul').css({'height':drop_height});
		/*})*/
		$(this).mouseleave(function(){
			$(this).children('ul').children('li').children('ul').css({'height':'0px'});
		});
	});

/*
	$('li').click(function(){
		var href = $(this).attr('href');
		if (href != ''){
			$('#pages').load(href);
		}else{
			$('#pages').html("<br/><center><b>There isn't a link between the anchor and that file yet.</b></center>");		
		}
	});
*/

	// Main Login Box
	/*
	$('#user_id, #password').click(function(){
		$(this).select();	
	});
	*/

	// login sliders
/*
	$('#slide-1-panel').click(function(){
		$('#slide-3').animate({'top':'243px','height':'25px'});	
		$('#slide-3-area').css({'visibility':'hidden'});
		$('#slide-2').animate({'top':'209px','height':'25px'});	
		$('#slide-2-area').css({'visibility':'hidden'});
		$('#slide-1').animate({'height':'190px'});
		$('#slide-1-area').css({'visibility':'visible'});
	});

	$('#slide-2-panel').click(function(){
		$('#slide-3').animate({'top':'243px','height':'25px'});
		$('#slide-3-area').css({'visibility':'hidden'});
		$('#slide-1').animate({'height':'25px'});	
		$('#slide-1-area').css({'visibility':'hidden'});
		$('#slide-2').animate({'top':'44px','height':'190px'});
		$('#slide-2-area').css({'visibility':'visible'});
	});

	$('#slide-3-panel').click(function(){
		$('#slide-1').animate({'height':'25px'});	
		$('#slide-1-area').css({'visibility':'hidden'});
		$('#slide-2').animate({'top':'44px','height':'25px'});
		$('#slide-2-area').css({'visibility':'hidden'});
		$('#slide-3').animate({'top':'79px','height':'190px'});
		$('#slide-3-area').css({'visibility':'visible'});
	});
*/
/*** Moving to functions.js ***/
/*
function set_footer(page_height){
	var notice_height = parseInt($('#notices').css('height'));
	var footer_height = 470;
	var footer_top = page_height+notice_height+footer_height+'px';
	$('#footer').css({'top':footer_top});
}
*/

/*** Moving to functions.js ***/
/*
function load_link(path,location,window){

	// set visibility
	$('#pages').css({'visibility':'visible'});

	// for security's sake, check path against an whitelist of paths
	
	// global defaults
	var outside=1;
	//var page='window';

	switch (location){// check for path,null,window
		case "internal":	
				// load path into #pages
			outside=0;
		break;
		case "external":
			// load path through outside.php?u=path
			$('#outgoing').css({'visibility':'visible'}).dialog({
				title: 'Confirm',
				width: 380,
				height: 140,
				modal: true,
				resizable: false,
				draggable: false,
				dragStart: function(event, ui){},
				dialogClass: 'no-close',
				buttons: [{
					text: 'Cancel',
					click: function()
					{
						// exit
						$(this).dialog('close');
					}
				},{
					text: 'Continue',
					click: function()
					{
						// go to location	
					}
				}]
			});
		break;
		default:
			location=null;	
		break;
	}

	switch (window){// check for path,location
		case "current":
			// load new page into view 	
			window='#pages';
		break;
		case "window":
			// load page into new window	
			window='';
		break;
		case "tab":
			// load page into new tab
			window='';
		break;
		default:
			window=null;	
		break;
	}

	// all parameters loaded	
	// add path to navigational array
		
	// $(window).load(path);
		
	$.ajax({
		type:"post",
		url:path,
		async:true,
		success:function(data){
			$(window).html(data);
//			$(window).css({'height':'1500px'}); // height needs to be set by an innerHeight function
			$('#pages').css({'height':'0px'});
			height = $(window)[0].scrollHeight;
			height+=50; // #pages height is weird
			$(window).css({'height':height});
			set_footer(height);
		}
	});
}
*/
/*** Wondering if this should be moved to functions as well ***/
/*
$('.load_link').click(function(){

	// how about coordinating the 'name' or 'id' with a JSON array
	// -- get name
	// -- find name in json
	// -- pull json attributes
	// ---- this prevents html from seeing paths

	// extrapolate attributes
	var path = $(this).attr('path');
	var location = $(this).attr('location');
	var window = $(this).attr('window');

	// run the function
	load_link(path,location,window);
});
*/

/*** Moved to functions.js ***/
/*
function get_nav(nav_array){
	if (nav_array==null){
		var nav_string = '';
		// Setting `nav_array` for proof-of-concept
		nav_array = new Array('home','about','privacy','personal');	
		for (var i=0; i<nav_array.length; i++){
			if(i==nav_array.length-1){
			nav_string += nav_array[i];
			}else{
			nav_string += nav_array[i]+' > ';
			}
		}
		// alert(nav_string);
	}else{
		// perform history generation
		// check length, cut at 5, and get associations	(links)
	}
	$('#user_nav').html(nav_string);
}
*/
//var nav_array = new Array('about', 'privacy', 'personal');
get_nav(nav_array);

// End of Main Section //

// STARTING PAGES - These will be moved accordingly, but for now this is the most maintainable method of editing them //

// Customer Service
// ADD THE LINK FOR TBOC.LOANWEBCENTER
// activate estatements

// financial calculators
// security center

// Personal
// money market
// savings
// certificates of deposit
// indevidual retirement
// card services
// ebanking
// loans
// go club
// other services

// Business
// checking
// ebanking
// remote deposit
// busines debit cared
// loans
// other services

// About Us
// history
// news
// employment
// hours and locations
// atm locatiosn
// contaract us
});
