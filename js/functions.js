// @todo
// send_url_parameters() needs more consideration, and research into hashes, rather than question mark / php style parameters.
function send_url_parameters(){
	var url = document.URL;
	var params = {}
	location.search.substr(1).split("&").forEach(function(param){params[param.split("=")[0]] = param.split("=")[1]});
	var id = params.id;
	var title = params.title;
	if (id != null && title != null){
		load_link(id, title);
	}else{
		load_link();
	}
}

// https://gist.github.com/paulirish/357741
function isIE(version, comparison) {
	var cc = 'IE',
	b = document.createElement('B'),
	docElem = document.documentElement,
	isIE;
	if(version){
		cc += ' ' + version;
		if(comparison){ cc = comparison + ' ' + cc; }
	}
	b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);
	return isIE;
}

function notice(visible, path, type){
	if(path !== null){
		if(visible){
			switch(type){
				case "markdown":
					$('#notices').css({display: 'block'}).html('php/md.php');
				break;
				case "xml":
					// This is available if it becomes necessary
			}
		}
	}
}
//if(isIE(8, 'lte')){alert('<IE8');}

function push_nav(name, id, title){
	nav_obj.splice(0,1);
	nav_obj.push({"name":name,"id":id,"title":title});
}

function generate_tiles(panel, tile, orientation){ // `panel` is the id of the tile-location, and `tile` is tiles.*
	for (var i = 0; i <= json.tiles[tile].links.length-1; i++){
		var _type = json.tiles[tile].links[i].type;
		var _id = json.tiles[tile].links[i].id;
		var _orientation = orientation+'_tile'; // special class
		var _classes = "tile tile_border padded box load_link linear_gradient shadow";
		var _image = json.tiles[tile].links[i].image;
		if (_image !== ""){
			_image = "<span class='tile_image'><img src='"+json.tiles[tile].links[i].image+"'/></span>";
		}
		var _header = json.tiles[tile].links[i].title;
		if(_header.indexOf("img:")>-1){
			_header = _header.substring(4);
			_header = "<img class='tile_header' src='"+_header+"' />";
		}else{
			_header = "<span class='tile_header'>"+json.tiles[tile].links[i].title+"</span>";
		}
		var _text = "<span class='tile_text'>"+json.tiles[tile].links[i].body+"</span>";
		var _button;
		if (json.tiles[tile].links[i].button !== ''){
			_button = "<span class='tile_button button'>"+json.tiles[tile].links[i].button+"</span>";	
			_text += _button;
		}
		var _div = "<div onclick='load_link(\""+_id+"\", \""+_type+"\")' class='"+_orientation+" "+_classes+"'>"+_image+_header+_text+"</div>";
		// @todo
		// in _div, _type is still being called title
		//alert(_div);
		$(panel).append(_div);
	}
}

function page_drop(onclick){
	$(onclick).children('.drop_tile_body').css({'visibility':'visible','padding':'10px','display':'block'}).animate({'height':'100%'}, function(){
		$(this).find('.page_drop_escape').click(function(){
			$(this).parent().parent().animate({'height':'0px','padding':'0px'}, function(){
				$(this).css({'visibility':'hidden','display':'none'});
			});
		});
	});
}

function isset(field){
	if(field!==''){return "true";}
}

function contact_submit(onclick){
	var name = $('#name').val();
	var sender = $('#sender').val();
	var subject = $('#subject').val();
	var message = $('#message').val();
	if(isset(name)&&isset(sender)&&isset(message)){
		$.post('php/mail.php', {name:name,sender:sender,subject:subject,message:message}, function(data){
			alert(data);
			if (data == 'err'){
				$('#mail_feedback').css({'visibility':'visible', 'color':'red'}).html("An error has occurred.").fadeOut(6000, function(){
					$(this).css({'visibility':'hidden', 'color':'black'});
				});
			}else{
				$('#mail_feedback').css({'visibility':'visible', 'color':'green'}).html("Your message has been sent!").fadeOut(6000, function(){
					$(this).css({'visibility':'hidden', 'color':'black'});
					$('#name').empty();
					$('#sender').empty();
					$('#subject').empty();
					$('#message').empty();
				});
			}
		});
	}
}

function load_link(id, title){
	if(id=='404'){
		$('#pages').css({height:'0px'});
		$('#body_container').css({visibility:'hidden',display:'none'});
		$('#pages').load('pages/404.php').css({visibility:'visible',display:'block',height:'auto'});
	}/*else if((id==null&&title==null)||id!=='404'){
		$('#body_container').css({'visibility':'visible','display':'block'});
		$('#pages').css({'visibility':'hidden','display':'none'});
		$('#footer').css({'top':'20px'});
	}*/
	if (id == 'external'){
		var location = 'external';
		var path = title;
	}else{
		// @todo -- it may become necessary to change the name variable name `location` to something else; seeing as it is a keyword in some instances.
		var name = json.paths[title].links[id].name;
		if (path == null){
			var path = json.paths[title].links[id].path;
		}
		if (location == null){
			var location = json.paths[title].links[id].location;
		}
		var win = json.paths[title].links[id].win;
	}
	if (location=='external'||id=='external'){
		var pretty_path = path.replace(/.*?:\/\//g, "");
		var message = "<p style='position:relative;text-align:left;'>You have selected a page outside of The Bank of Carbondale's web site. Click 'Continue' below to proceed to:</p><p><a style='font-weight:bold;text-align:center;' href='"+path+"'>"+pretty_path+"</a>.<p style='position:relative;font-size:10px;text-align:left;margin-top:20px;'>The information contained in this site is not endorsed or guaranteed by The Bank of Carbondale. Also, please be aware that the security and privacy policies on this site may be different from our policy.</p>";
		$('#outgoing').css({'visibility':'visible'}).html(message).dialog({
			title:"Confirmation: You Are Leaving TBOC.com",
			dialogClass:"dialog-shadow",
			height:"auto",
			width:400,
			reziable:false,
			modal:true,
			buttons:[
				{
					text:"Cancel",
					click:function(){
						$(this).dialog("close");
					}
				},
				{
					text:"Continue",
					click:function(){
						window.location.href = path;
					}
				}
			]	
		});
	}else if(location=='affiliate'){
		window.location.href = path;
	}else if(location=='internal'){
		$.ajax({
			type:"post",
			url:path,
			async:false,
			success:function(data){
				//if(isIE(8, 'lte')){ // hack for <= IE8 to provide history. History JS wasn't working at this time. This is super slow.
					//window.location.href = 'http://tboc.com/?id='+id+'&title='+title;
				//}else{
					$('#pages').css({'height':'0px'});
					$('#body_container').css({'display':'none'});
					$('#pages').html(data).css({'visibility':'visible','display':'block','height':'auto'});
					var nav_has_value = false;
					for(var i = 0; i < nav_obj.length; i++){
						if(name == nav_obj[i].name){
							nav_has_value = true;
						}
					}
					if (nav_has_value===false){
						var url = window.location.origin+window.location.pathname+'?id='+id+'&title='+title;
						window.history.pushState('', '', url);
						push_nav(name, id, title);
						get_nav();
					}
				//}
			}
		});
	}
}
