// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys // 'Polyfill' for IE 8
if (!Object.keys) {
  Object.keys = (function() {
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
		dontEnums = [
		  'toString',
		  'toLocaleString',
		  'valueOf',
		  'hasOwnProperty',
		  'isPrototypeOf',
		  'propertyIsEnumerable',
		  'constructor'
		],
		dontEnumsLength = dontEnums.length;

	return function(obj) {
	  if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
		throw new TypeError('Object.keys called on non-object');
	  }

	  var result = [], prop, i;

	  for (prop in obj) {
		if (hasOwnProperty.call(obj, prop)) {
		  result.push(prop);
		}
	  }

	  if (hasDontEnumBug) {
		for (i = 0; i < dontEnumsLength; i++) {
		  if (hasOwnProperty.call(obj, dontEnums[i])) {
			result.push(dontEnums[i]);
		  }
		}
	  }
	  return result;
	};
  }());
}

function notice(visible, path, type){ // this needs to be refactored into JSON so painfully bad
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
				var row_height = 25;
				var notice_height = ($rows_id*row_height)+'px';
				function get_top(top){
					var row_multiple = row_height*parseInt($rows_id);
					return (top + row_multiple) + 'px';
				}
				var rows = [];
				$('#notices').css({'visibility':'visible'}).animate({'height':notice_height});
				//$('#body_container').animate({'top':'135px'}); 
				//$('#links').animate({'top':'240px'}); 
				$('#body_container').animate({'top':'35px'}); 
				$('#links').animate({'top':'140px'}); 
				$('#footer').animate({'top':'465px'}); 
				//$('#pages').animate({'top':'0px'}); 
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
					//$('#notices').css({'background-color':'#FF8'});
					$('#warning').html(rows).css({'visibility':'visible'}).prepend("<img src='res/attention.svg' height='25' width='25'/>").click(function(){
						notice('false', 'json/test.xml', 'warning');
					});
					$('#alert').css({'visibility':'hidden'});
				}else if (type == 'alert'){
					//$('#notices').css({'background-color':'#B66'});
					$('#alert').html(rows).css({'visibility':'visible'});
					$('#warning').css({'visibility':'hidden'});
				}
			}
		});
	}else if(visible=='false'){
				$('#notices').animate({'height':'0px'});
				$('#body_container').animate({'top':'0px'}); 
				$('#links').animate({'top':'105px'}); 
				$('#footer').animate({'top':'440px'}); 
				
				//$('#pages').animate({'top':'0px'}); 
				setTimeout(function(){
					$('#notices').css({'visibility':'hidden'});
					$('#notices_area').css({'visibility':'hidden'});
					$('#warning').css({'visibility':'hidden',});
					$('#alert').css({'visibility':'hidden'});
				},350);
		// set visibility false and animate closed
		$('#notices').animate({'height':'0px'});
	}
}

function set_footer(page_height){
	var notice_height = parseInt($('#notices').css('height'));
	var footer_height = 470;
	var footer_top = page_height+notice_height+footer_height+'px';
	$('#footer').css({'top':footer_top});
}

function push_nav(name, id, title){
	nav_obj.nav.splice(0,1);
	nav_obj.nav.push({"name":name,"id":id,"title":title});
}

function get_nav(){
	var nav_string = '';
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
			//alert(title+' '+id);
			//alert(json.paths.customer.demos.name);
			alert(JSON.stringify(json.paths[title].links[id]));
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
					
					/*
					for (var i=0;i<nav_obj.nav.length;i++){
						if(nav_obj.nav[i].name == name){
							break;
						}else{
							push_nav(name, id, title);
							get_nav();
						}
					}
					*/
					
					
					var nav_has_value = false;
					for(var i = 0; i < nav_obj.nav.length; i++){
						//alert('name: '+name+' | nav_obj.name: '+nav_obj.nav[i].name);
						//alert(name==nav_obj.nav[i].name);
						if(name == nav_obj.nav[i].name){
							nav_has_value = true;
							//alert(nav_has_value);
						}
					}
					
					//alert(nav_has_value);
					if (nav_has_value===false){
						push_nav(name, id, title);
						get_nav();
					}
					
					/*
					if(name !== (nav_obj.nav[nav_obj.nav.length-1].name)){
						push_nav(name, id, title);
						get_nav();
					}
					*/
				}
			});
		}
	});
}