jQuery.ajaxSetup({ cache: false });

$('document').ready(function(){
	var json;
	
	$.ajax({
		dataType:'json',
		url:'../../json/tiles.json',
		success: function(data){json=data;}
	}).then(function(){
		var tabs = "";
		for(var i = 0; i <= Object.keys(json).length-1;i++){
			var _id = Object.keys(json)[i];
			var _name = _id.charAt(0).toUpperCase() + _id.slice(1);
			tabs += "<div class='tab'>"+_name+"</div>";
			$('#pages').append("<div class='page "+_name.toLowerCase()+"'>"+_id+"</div>");
		}
		$('#tabs').html(tabs);
		$('.tab').click(function(){
			var _tabText = $(this).text().toLowerCase();
			//alert(json[_tabText][0].title);
			$('.'+_tabText).html(JSON.stringify(json[_tabText])).css({display: 'block'}).siblings('.page').css({display: 'none'});
			
			switch(_tabText){
				case "rates":
				break;
				case "security":
					function enterIsPressed(event){
						$(event).keypress(function(e) {
							console.log(event);
							if(e.which==13){
								return true;
							}else{
								return false;
							}
						});	
					}
					//alert(JSON.stringify(json[_tabText]));
					var html = "";
					for(var i = 0; i < json[_tabText].length; i++){
						html +=
						"<div class='list'>"+
							"<span class='list_title'>"+
								json[_tabText][i].title+
							"</span>"+
							"<span class='list_body'>"+
								json[_tabText][i].body+
							"</span>"+
							"<span class='list_date'>"+
							json[_tabText][i].date+
							"</span>"+
							"<div class='list_color box'>"+
								/*
								"<select class='color_select_preset'>"+
									"<option>none...</option>"+
								"</select>"+
								*/
								"<div class='color_box list_border_choice' title='List Border'></div>"+
								"<div class='color_box list_background_choice' title='List Background'></div>"+
								"<div class='color_box list_font_choice' title='List Font'></div>"+
									// here's where Chosen goes
									//"<input class='list_new_preset' placeholder='New Preset...' type='text'/>"+
									'<select data-placeholder="Select or Create a Preset..." style="position:relative;width:230px;" class="chosen-select box">'+
										"<option value=''></option>"+
										"<option value='1'>1</option>"+
										"<option value='2'>2</option>"+
										"<option value='3'>3</option>"+
										"<option value='4'>4</option>"+
									"</select>"+
							"</div>"+
						"</div>";
					}
					html += "<div class='list_pop'>+</div>";
					$('.'+_tabText).html(html);
					var _selected = "";
					var _nth = "";
					$('.list').mouseover(function(){
						_nth = $(this).index()+1;
					}).click(function(){
						$(this).siblings('.list').children('.list_color').css({display: 'none'});
						$(this).children('.list_color').css({display: 'block'}).children('.color_box').click(function(){_selected = $(this).attr('class').split(' ')[1];}).ColorPicker({
							color: '#BBBBBB',
							onShow: function (colpkr) {
								$(colpkr).fadeIn(500);
								return false;
							},
							onHide: function (colpkr) {
								$(colpkr).fadeOut(500);
								return false;
							},
							onChange: function (hsb, hex, rgb) {
								$('.list:nth-child('+_nth+') .'+_selected).css('backgroundColor', '#' + hex);
								$('.list:nth-child('+_nth+')').css(
									{
										border: "solid 1px "+$('.list:nth-child('+_nth+') .list_border_choice').css('backgroundColor'),
										background: $('.list:nth-child('+_nth+') .list_background_choice').css('backgroundColor'),
										color: $('.list:nth-child('+_nth+') .list_font_choice').css('backgroundColor')
									}
								);
								$('.list:nth-child('+_nth+') .list_body').css("border-left", "solid 3px "+$('.list:nth-child('+_nth+') .list_border_choice').css('backgroundColor'));
							}
						});
						$(this).find('.chosen-select').chosen({
							create_option: true,
							width:230,
							no_results_text:function(){
								alert('none');
							}
						});
					});
					$('.list_pop').click(function(){
						$('.page').append("<div class='list'><span class='list_title'>"+"Title"+"</span><span class='list_body'>"+"Body"+"</span><span class='list_date'>"+"data"+"</span><div class='list_color box'><select class='color_select_preset'><option>none...</option></select><div class='color_box list_border_choice' title='List Border'></div><div class='color_box list_background_choice' title='List Background'></div><div class='color_box list_font_choice' title='List Font'></div><input class='list_new_preset' placeholder='New Preset...' type='text'/></div></div>");
					});
				break;
				case "employment":
				break;
				case "news":
				break;
				case "alerts":
				break;
				case "nav":
				break;
				case "tiles":
				break;
				case "paths":
				break;

			}
			$('.page span').attr('contenteditable', 'true');
			
			// this number of class in sequence matches with json number in array
			// - pull contents of json into scope, and perform load_link() into #pages

			/*** Debug ***/
			//$('#pages').html($(this).text());
			//$('#pages').load('test.html');		
		});
	});
	$('#user_options').css('height',$('#pages').css('height'));
});