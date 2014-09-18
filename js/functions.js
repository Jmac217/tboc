//var nav_array = new Array('home');
//alert(nav_array[0]);
function push_to_nav(link){
	
}

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

	
	
	
	
	
	
	/***********************************************/
	
		// set visibility false and animate closed
		$('#notices').animate({'height':'0px'});		
	}
}
//notice('false', 'JSON/notice.xml', 'warning');












function set_footer(page_height){
	var notice_height = parseInt($('#notices').css('height'));
	var footer_height = 470;
	var footer_top = page_height+notice_height+footer_height+'px';
	$('#footer').css({'top':footer_top});
}

function load_link(path,location,win){

	// set visibility
	

	// for security's sake, check path against an whitelist of paths
	
	// global defaults
	var outside=1;
	//var page='window';

	switch (location){// check for path,null,window
		case "internal":	
				// load path into #pages
			outside=0;
			$('#pages').css({'visibility':'visible'});
		break;
		case "external":
			// load path through outside.php?u=path
			$('#outgoing').html("<span class='outgoing_message'>You are about to leave TBOC.com and enter: </span><br/><span class='outgoing_link'>"+path)
				.css({'visibility':'visible'})
				.children('.outgoing_link')
				.css({'font-size':'.7vw'})
				.parent()
				.dialog({
					title: 'Confirm',
					width: 460,
					height: 165,
					modal: true,
					resizable: false,
					draggable: false,
					dragStart: function(event, ui){},
					dialogClass: 'no-close',
					buttons: [{
						text: 'Cancel',
						click: function()
						{
							// exit
							$(this).dialog('close');
						}
					},{
						text: 'Continue',
						click: function()
						{
							// go to location	
							window.location.href=path;
						}
					}]
				});
		break;
		default:
			location=null;	
		break;
	}

	switch (win){// check for path,location
		case "current":
			// load new page into view 	
			win='#pages';
		break;
		case "window":
			// load page into new window	
			win='(new window)';
		break;
		case "tab":
			// load page into new tab
			win='_blank';
		break;
		case "calc":
			win='#calc_area';
		default:
			win=null;	
		break;
	}

	// all parameters loaded	
	// add path to navigational array
		
	// $(win).load(path);
	
	//alert(path+' '+location+' '+win);
	
	/*** This can only work for internal links ***/
	if (win == '#pages'){
		$.ajax({
			type:"post",
			url:path,
			async:true,
			success:function(data){
				$('#body_container').css({'visibility':'hidden'});
				$(win).html(data);
				//	$(win).css({'height':'1500px'}); // height needs to be set by an innerHeight function
				$('#pages').css({'height':'0px'});
				height = $(win)[0].scrollHeight;
				height+=50; // #pages height is weird
				$(win).css({'height':height});
				set_footer(height);
			}
		});
	}
}

//** Example Usage **//
$('.load_link').click(function(){

	// how about coordinating the 'name' or 'id' with a JSON array
	// -- get name
	// -- find name in json
	// -- pull json attributes
	// ---- this prevents html from seeing paths

	// extrapolate attributes
	var path = $(this).attr('path');
	var location = $(this).attr('location');
	var win = $(this).attr('win');

	/** IMPORTANT: `nav` values should replace the current paths to abstract the true paths from the browser. These paths will all be matched up according to a JSON file. **/

	var nav = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));	
	nav_array.splice(0,1);
	nav_array.push(nav);
	get_nav(nav_array);
	load_link(path,location,win);
});

function get_nav(nav_array){
	if (nav_array!==null){
		var nav_string = '';
		/** Setting `nav_array` for proof-of-concept **/
		for (var i=0; i<=2; i++){
			nav_string += '<u class="nav_element">'+nav_array[i]+'</u>';
			if(i<2){
				nav_string+=' > ';	
			}
		}
	}
	$('#user_nav_array').html(nav_string);
}
