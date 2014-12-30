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

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
// "The following algorithm is an imitation of the native JSON object:"
if (!window.JSON) {
  window.JSON = {
    parse: function (sJSON) { return eval("(" + sJSON + ")"); },
    stringify: function (vContent) {
      if (vContent instanceof Object) {
        var sOutput = "";
        if (vContent.constructor === Array) {
          for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
            return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
        }
        if (vContent.toString !== Object.prototype.toString) { 
          return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
        }
        for (var sProp in vContent) { 
          sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
        }
        return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
     }
     return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
    }
  };
}

// @todo
// send_url_parameters() needs more consideration, and research into hashes, rather than question mark / php style parameters.
// Hashes can be changed without reloading the page, question marks cannot be.
function send_url_parameters(){
	var url = document.URL;
	var params = {}
	//alert(location.search.substr(0));
	//(\?|\&)([^=]+)\=([^&]+)
	location.search.substr(1).split("&").forEach(function(param){params[param.split("=")[0]] = param.split("=")[1]});
	var id = params.id;
	var title = params.title;
	//alert(url+params+id+title);
	//alert(id);
	if (id != null && title != null){
		load_link(id, title);
	}else{
		load_link();
	}
}
send_url_parameters();

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
						notice('false', 'json/notice.xml', 'warning');
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
					$('#warning').css({'visibility':'hidden'});
					$('#alert').css({'visibility':'hidden'});
				},350);
		// set visibility false and animate closed
		$('#notices').animate({'height':'0px'});
	}
}
notice('true', 'json/notice.xml', 'warning');

// disabled!
/*
function set_footer(){
	var page_height = parseInt($('#pages').css('height'));
	//var notice_height = parseInt($('#notices').css('height'));
	var footer_height = 210;
	var footer_top = page_height+footer_height+'px';
	//$('#footer').css({'top':footer_top});
	//$('#footer').css({'top':'auto'});
}
*/

function push_nav(name, id, title){
	nav_obj.splice(0,1);
	nav_obj.push({"name":name,"id":id,"title":title});
}

function generate_tiles(panel, tile, orientation){ // `panel` is the id of the tile-location, and `tile` is tiles.*
	$.ajax({
		dataType: 'json',
		url: 'json/tiles.json',
		data: 'json',
		async: 'false',
		success: function(json){
			//var a = $.each(json.tiles[tile].links[Number()], function(){return(this);})
		  var debug;
		  for (var i = 0; i <= json.tiles[tile].links.length-1; i++){
		  	//debug += _.zip(_.keys(json.tiles[tile].links[i]), _.values(json.tiles[tile].links[i]));

			var _type = json.tiles[tile].links[i].type;
			var _id = json.tiles[tile].links[i].id;
		  	var _orientation = orientation+'_tile'; // special class
		  	var _classes = "tile tile_border padded box load_link linear_gradient shadow";
		  	var _image = "<span class='tile_image'><img src='"+json.tiles[tile].links[i].image+"'/></span>";
		  	var _header = "<span class='tile_header'>"+json.tiles[tile].links[i].title+"</span>";
		  	var _text = "<span class='tile_text'>"+json.tiles[tile].links[i].body+"</span>";
		  	var _button;
		  	if (json.tiles[tile].links[i].button !== ''){
		  		_button = "<span class='tile_button button'>"+json.tiles[tile].links[i].button+"</span>";	
		  		_text += _button;
		  	}
			
			// following possible in all but IE, of course
		  	//var _div = "<div id='"+_id+"' title='"+_type+"' class='"+_orientation+" "+_classes+"'>"+_image+_header+_text+"</div>";
			var _div = "<div onclick='load_link(\""+_id+"\", \""+_type+"\")' class='"+_orientation+" "+_classes+"'>"+_image+_header+_text+"</div>";

		  	// @todo
		  	// in _div, _type is still being called title
		  	$(panel).append(_div);
		 }

		  //alert(debug);

			//$.each(json.tiles.banner, function(){alert(this.href);});

			//alert(_.keys(json.tiles[tile].form));

			//jsonPath.eval(json.tiles, '$..'+tile+'.*').forEach(function(k, i){
				//alert(_.keys(k));
				/*
				alert(JSON.stringify(k+', '+i));
				alert(_.keys(k, "form"));
				alert(_.has(k, "type"));
				*/
				/*
				if(_.has(k, "form")==true){
					// do form	
					alert(json_array_elements(json));
					jsonPath.eval(k, '$..form.*').forEach(function(l, o){
						alert(JSON.stringify(_.object(l)));
						//alert (l);	
					});
				}else if(_.has(k, "links")==true){
					// do links	
				}else if(_.has(k, "page")==true){
					// do page	
				}
				*/
			//});


/* for current tile-set
 * i = 1
 * if !object, get property: switch between i++ tier types; otherwise pass object into recursive function and try again;
 */


/*
 * 
 *
 * starting in tiles
 *
 * accepts a tile as a string, javscript returns each tile as an array index
 *
 * for each index in array a nested function skims each layer of hierarchy returning 
 *
 *
 */ 



		}
	});
}

// page drop_tiles
// @todo - height is hard-coded, should be based on div.height
function page_drop(onclick){
	$(onclick).children('.drop_tile_body').css({'visibility':'visible','padding':'10px'}).animate({'height':'100%'}, function(){
		$(this).parent().mouseleave(function(){
			$(this).children('.drop_tile_body').animate({'height':'0px','padding':'0px'}, function(){
				$(this).css({'visibility':'hidden'});
			});
		});
	});
}

// @debug | These will go into index.js
generate_tiles('#column', 'column', 'vertical');
generate_tiles('#bottom', 'row', 'horizontal');
// ---

// function load_link(id, title, path, location){ // for external path and location
function load_link(id, title){
	//alert(id+': '+title);
	if(id==null&&title==null){
		// go home Javascript, you're drunk.
		$('#body_container').css({'visibility':'visible','display':'block'});
		$('#pages').css({'visibility':'hidden','display':'none'});
		$('#footer').css({'top':'20px'});
	}
	$.ajax({
		url: 'json/tiles.json',
		dataType: 'json',
		async: false,
		success: function(json){
			if (id == 'external'){
				var location = 'external';
				var path = title;
			}else{
				
				// for external onclick events path and location must be supplied some how
				
				//alert('1: '+path+location);
				
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

			//alert('2: '+path+location);

			/*
			var name = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].name');
			var path = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].path');
			var location = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].location');
			var win = jsonPath.eval(json, '$.paths['+title+'].links.['+id+'].win');
			*/

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
						$('#pages').css({'height':'0px'});
						$('#body_container').css({'visibility':'hidden','display':'none'});
						$('#pages').html(data).css({'visibility':'visible','display':'block','height':'auto'});
						//var height = $('#pages')[0].scrollHeight;
						//height+=50; // #pages height is weird @bug:2
						//$('#pages').css({'height':height});

						
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
					}
				});
				
				/*
				var routeData= route.substring(0, route.indexOf('?'));
				alert(routeData);
				*/
				/*
				var d= document.URL+'?id='+id+'&title='+title;
				alert(d.route.split(("?")[0]));
				*/
			}
		}
	});
}
