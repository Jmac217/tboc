$(document).on('click', '.nav_element', function(){
	load_link($(this).attr('id'), $(this).attr('title')); // ajax calls return as text, so this is a fix for the navigation links
}).ready(function(){

	get_nav();

	// populate dropdowns
	$.ajax({
		dataType:"json",
		url:'json/paths.json',
		data:'json',
		async:false,
		success:function(json){
			for(var i = 0; i < Object.keys(json.paths).length; i++){
				var selection = Object.keys(json.paths)[i];
				$.each(json.paths[selection],function(key, val){
					$('div.links_'+selection+'>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
				});
			}
		}
	});

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

	/** manual notice switch for debugging/demonstration **/
	// notice('false', 'json/notice.xml', 'warning');

	$('#noticesOn').click(function(){
		notice('true', 'json/notice.xml', 'warning');
	});

	$('#noticesOff').click(function(){
		notice('false', 'json/notice.xml', 'warning');
	});

	$('#banner').click(function(){
		/** gets link attributes and runs the load_link function **/
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

	// dynamic list sizing when clicked
	$('.link').click(function(){
		var dropdown = $(this).attr('alt');	
		var fields = null;
		var drop_height = null;
		$.ajax({
			dataType: 'json',
			url:'json/paths.json',
			async: false,
			success: function(json){
				fields = Object.keys(json.paths[dropdown]).length;
				drop_height = (fields*29)+'px';
			}
		});
		$(this).find('.link_drop').css({'height':drop_height});
		//$(this).children('ul').children('li').children('ul').css({'height':drop_height}); // I'm leaving this here in case find() doesn't work in IE
	}).mouseleave(function(){
		$(this).children('ul').children('li').children('ul').css({'height':'0px'});
	});
		
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