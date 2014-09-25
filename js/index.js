$(document).on('click', '.nav_element', function(){
	load_link($(this).attr('id'), $(this).attr('title')); // ajax calls return as text, so this is a fix for the navigation links
}).ready(function(){

	$('#user_nav_home').click(function(){
		$('#body_container').css({'visibility':'visible'});	
		$('#pages').css({'visibility':'hidden'});	
	});
	$('#logo').click(function(){
		location.reload(true);		
	});
	$('input').click(function(){
		$(this).select();
	});

	// manual notice switch for debugging/demonstration
	// notice('false', 'json/notice.xml', 'warning');

	$('#noticesOn').click(function(){
		notice('true', 'json/notice.xml', 'warning');
	});

	$('#noticesOff').click(function(){
		notice('false', 'json/notice.xml', 'warning');
	});

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

	$('.link').click(function(){
		$.getJSON('json/paths.json', function(json){
		/*
			var customer_fields = json.paths.customer.length;
			var personal_fields = json.paths.personal.length;
			var business_fields = json.paths.business.length;
			var about_fields = json.paths.about.length;
			alert(customer_fields+', '+personal_fields+', '+business_fields+', '+about_fields);
			*/
			var customer_fields = json.paths[customer];
			alert(customer_fields.length);
		});
		// get variables for dropdown
		var dropdown = $(this).attr('alt');	
		var fields = null;
		var drop_height = null;
		// switch for categories // will need to be dynamic, now that JSON is in place
		switch(dropdown){
			case 'customer':
				fields = '';
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
	
	get_nav();
		
	$('.load_link').click(function(){
		
		var id = $(this).attr('id');
		if($(this).hasClass('load_link_li')){
			var title = $(this).parent().parent().parent().parent().attr('id'); // up up and away
		}else{
			var title = $(this).attr('title');
		}

		load_link(id, title);
	});
});
