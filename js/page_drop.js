// page drop_tiles
// @todo - height is hard-coded, should be based on div.height
// include where needed
function page_drop(){
	$('.drop_tile_header').click(function(){
		$(this).siblings('.drop_tile_body').css({'visibility':'visible'}).animate({'height':'50px','padding':'10px'}, function(){
			$(this).parent().mouseleave(function(){
				$(this).children('.drop_tile_body').animate({'height':'0px','padding':'0px'}, function(){
					$(this).css({'visibility':'hidden'});
				});
			});
		});
	});
}
