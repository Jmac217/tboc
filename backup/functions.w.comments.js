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

				var notices = get_top(0);

				var body = get_top(0);
				var links = get_top(0);
				var pages = get_top(0);
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
//notice('false', 'json/notice.xml', 'warning');

function set_footer(page_height){
	var notice_height = parseInt($('#notices').css('height'));
	var footer_height = 470;
	var footer_top = page_height+notice_height+footer_height+'px';
	$('#footer').css({'top':footer_top});
}

function get_nav(){
	var nav_string = '';
	var nav_cap = 3;
	for (var i=0; i<=nav_cap; i++){
		nav_string += '<u class="nav_element load_link" title="'+nav_obj.nav[i].title+'" id="'+nav_obj.nav[i].id+'">'+nav_obj.nav[i].name+'</u>';
		if(i<nav_cap){
			nav_string+=' &nbsp; &#149; &nbsp; ';
		}
	}
	$('#user_nav_array').html(nav_string);
}

function load_link(id, title){
	$.ajax({
		url: 'json/paths.json',
		dataType: 'json',
		async: false,
		success: function(json){
			var name = String(json.paths[title][id].name);
			var path = String(json.paths[title][id].path);
			var location = String(json.paths[title][id].location);
			var win = String(json.paths[title][id].win);
			$.ajax({
				type:"post",
				url:path,
				async:false,
				success:function(data){
					$('#body_container').css({'visibility':'hidden'});
					$('#pages').html(data).css({'visibility':'visible'});
					var height = $('#pages')[0].scrollHeight;
					height+=50; // #pages height is weird
					$('#pages').css({'height':height});
					set_footer(height);
					for (var i=0;i<nav_obj.nav.length;i++){
						if(nav_obj.nav[i].name == name){
							break;
						}else{
							nav_obj.nav.splice(0,1);
							nav_obj.nav.push({"name":name,"id":id,"title":title});
							get_nav();
						}
					}
					/*
					if(name !== (nav_obj.nav[nav_obj.nav.length-1].name)){
						nav_obj.nav.splice(0,1);
						nav_obj.nav.push({"name":name,"id":id,"title":title});
						get_nav();
					}
					*/
				}
			});
		}
	});
}

	$.ajax({
		dataType:"json",
		url:'json/paths.json',
		data:'json',
		async:false,
		success:function(json){
			$.each(json.paths.customer,function(key, val){
				$('div.links_customer>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
			});
			$.each(json.paths.personal,function(key, val){
				$('div.links_personal>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
			});
			$.each(json.paths.business,function(key, val){
				$('div.links_business>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
			});
			$.each(json.paths.about,function(key, val){
				$('div.links_about>ul>li>ul.link_drop').append("<li class='load_link load_link_li' id='"+key+"'>"+val.name+"</li>");
			});
		}
	});