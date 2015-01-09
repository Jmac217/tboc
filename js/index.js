$(document).on('click', '.nav_element', function(){
	// these can just be passed a onclick='load_link()' call on generation
	load_link($(this).attr('id'), $(this).attr('title')); // ajax calls return as text, so this is a fix for the navigation links
}).ready(function(){

var list_items;

generate_tiles('#column', 'column', 'vertical');
generate_tiles('#bottom', 'row', 'horizontal');

/*** debug ***/

$('#debug_button').click(function(){$('#debug_options').animate({width:'150px'}).on('mouseleave',function(){$(this).animate({width:'0px'});});});
$('#debug_options>span').click(function(){
	switch ($(this).attr('attr')){
		case "alert":
			// toggle sample alerts
			notice('true', 'notice', 'markdown');
		break;
		case "admin":
			// href = admin
			location.href='pages/admin/admin.html';
		break;
	}
});
$('.debug_button').click(function(){
	// pop bug
	var message = $('#bug_message').val();
	$.post('php/bug.php', {message:message}, function(data){
		$('#bug_feedback').css({display:'inline-block'}).html('Bug Report Sent!').fadeOut(3000, function(){
			$(this).animation({display:'none'});
		});
		$('#bug_message').val('');
	});
});

/*** /debug ***/

	/** Nobody seems to have liked the polyfill placeholder **/
	/*
	$('[placeholder]').focus(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();
	*/

	// hardcoded banner loads
	$('#banner_mortgage').load('res/banner/content/mortgage.html');
	$('#banner_online').load('res/banner/content/online.html');

	// @todo line 9
	$('#user_nav_home').click(function(){
		$('#body_container').css({'visibility':'visible','display':'block'});
		$('#pages').css({'visibility':'hidden','display':'none'});
		$('#footer').css({'top':'20px'});
	});
	
	$('#logo').click(function(){
		// debug
		//location.href = window.location.origin+window.location.pathname;
		// production
		location.href = "http://tboc.com";
	});
	
	$('input').click(function(){
		$(this).select();
	});
	
	$('#banner').slick({
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed:7000,
		speed: 500,
		fade: true,
		slide: 'div',
		cssEase: 'linear'
	});

	$.each(json.paths, function(key, val){
		list_items = '';
		$.each(val.links, function(k, v){
			list_items += "<li id='"+k+"' class='load_link load_link_li' location='"+v.location+"' win='"+v.win+"'>"+v.name+"</li>";
		});
		if (list_items !==''){
			$('#links').append("<div class='link link_button shadow' alt='"+key+"'><div class='link_title'><a>"+val.title+"</a></div><ul><li><ul class='link_drop'>"+list_items+"</ul></li></ul></div>");
		}
	});
	
	$('.link').mouseover(function(){
		var dropdown = $(this).attr('alt');	
		var fields = _.size(json.paths[dropdown].links)+1; // this might be the only place I ended up using Underscore.js. If so this should be addressed.
		var drop_height = (fields*26)+'px';  // @bugs:1
		$(this).find('.link_drop').css({'height':drop_height});
	}).mouseleave(function(){
		$(this).children('ul').children('li').children('ul').css({'height':'0px'});
	});
	
	$('.load_link').click(function(){
		var id = $(this).attr('id');
		if($(this).hasClass('load_link_li')){
			var title = $(this).parent().parent().parent().parent().attr('alt'); // up up and away // @unnecessary, $.find could simplify this
		}else{
			var title = $(this).attr('title');
		}
		load_link(id, title);
	});
	send_url_parameters();
});
