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
	
	/***********************************************/
	$('#banner').click(function(){
		/** gets link attributes and runs the load_link function **/ // @documentation
	}).slick({
	  dots: true,
	  infinite: true,
	  autoplay: true,
	  autoplaySpeed:7000,
	  speed: 500,
	  fade: true,
	  slide: 'div',
	  cssEase: 'linear'
	});/*.slidesjs({
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
		*/
		// @implementation
		/*
		pagination:{
			active: true,
			effect: 'slide'
		}
		*/
		/*
	});
*/
	//get_nav();
	// populate dropdowns
	$.ajax({
		dataType:'json',
		url:'json/tiles.json',
		data:'json',
		async:false,
		success:function(json){
		// @out-take
		/*
			$.each(Object.keys(json.paths), function(i){
				for (i in Object.keys(json.paths)){alert(Object.keys(json.paths)[i]);}
			});
			*/
			
			/*
			var obj;
			for (var i = 0; i < jsonPath.eval(json, '$.paths.*').length; i++){
				obj = Object.keys(json.paths)[i];
				for (var t = 0; t < jsonPath.eval(json, '$..['+obj+'].links.*').length; t++){
					//alert(obj);
					var name = jsonPath.eval(json, '$..['+obj+'].links.*')[t].name;
					var path = jsonPath.eval(json, '$..['+obj+'].links.*')[t].path;
					var location = jsonPath.eval(json, '$..['+obj+'].links.*')[t].location;
					var win = jsonPath.eval(json, '$..['+obj+'].links.*')[t].win;
					
					console.log(obj+'->links->'+name);
					console.log(obj+'->links->'+path);
					console.log(obj+'->links->'+location);
					console.log(obj+'->links->'+win);
					
				}
			}
			*/
			
			var list_items;
			$.each(json.paths, function(key, val){
				list_items = '';
				$.each(val.links, function(k, v){
				
					console.log(key+'->'+'links->'+k+'->name:'+v.name); // @debug
					console.log(key+'->'+'links->'+k+'->name:'+v.path);
					console.log(key+'->'+'links->'+k+'->name:'+v.location);
					console.log(key+'->'+'links->'+k+'->name:'+v.win);
					console.log("____________________________________");

					list_items += "<li id='"+k+"' class='load_link load_link_li' path='"+v.path+"' location='"+v.location+"' win='"+v.win+"'>"+v.name+"</li>";
				});
				if (list_items !==''){
					$('#links').append("<div class='link link_button shadow' alt='"+key+"'><div class='link_title'><a>"+val.title+"</a></div><ul><li><ul class='link_drop'>"+list_items+"</ul></li></ul></div>");
				}
			});
			
			// @out-take
			/*
			for(var i = 0; i < Object.keys(json.paths).length; Object.keys(json.paths.i++)){
				alert(JSON.stringify(Object.keys(json.paths)[i].title));
				var links = Object.keys(json.paths)[i];
				for(var t = 0; t < Object.keys(paths.links).length; t++){
					var obj = Object.keys(paths.links)[i];
					alert(obj);
				}
				*/
				/*
				for(var i = 0; i < Object.keys(json.paths).length; i++){
					var selection = Object.keys(json.paths)[i];
					$.each(json.paths[selection],function(key, val){
					//alert('div.links_'+selection+'>ul>li>ul.link_drop ::> '+"<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
						$('div.links_'+selection+'>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
					});
				}
			}
			*/
		}
	});

	// dynamic list sizing when clicked
	$('.link').click(function(){
		var dropdown = $(this).attr('alt');	
		var fields = null;
		var drop_height = null;
		$.ajax({
			dataType: 'json',
			url: 'json/tiles.json',
			async: false,
			success: function(json){
				fields = jsonPath.eval(json, '$.paths['+dropdown+'].*.*').length+1;
				drop_height = (fields*26)+'px';  // @bugs:1
			}
		});
		$(this).find('.link_drop').css({'height':drop_height});
		//$(this).children('ul').children('li').children('ul').css({'height':drop_height}); // I'm leaving this here in case find() doesn't work in IE // @out-take
	}).mouseleave(function(){
		$(this).children('ul').children('li').children('ul').css({'height':'0px'});
	});
	$('.load_link').click(function(){
		var id = $(this).attr('id');
		if($(this).hasClass('load_link_li')){
			var title = $(this).parent().parent().parent().parent().attr('alt'); // up up and away // @unnecessary
		}else{
			var title = $(this).attr('title');
		}
		//alert(id+', '+title); // @debug
		load_link(id, title);
	});	
});
