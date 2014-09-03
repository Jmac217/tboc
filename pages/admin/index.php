<html>
<head><title>Administrative Area</title>
<style>


#admin_notice_form{position:absolute;top:20px;left:20px;height:500px;width:300px;align:center;border:solid 1px #777;background-color:#FFF;height:250px;}
	#admin_notice_form_rows{height:100%;width:100%;border-style:none;font-size:15px;border-bottom:solid 1px #777;}
		#admin_notice_form_title{height:35px;width:100%;font-size:25px;border-style:none;border-bottom:solid 1px #777;}
			.form_title{position:absolute;top:0px;left:0px;height:36px;width:100%;resize:none;border-style:none;border:solid 1px #777;font-size:20px;}
		#admin_notice_form_body{height:130px;width:100%;font-size:15px;border-style:none;border-bottom:solid 1px #777;}
			.form_body{position:absolute;top:35px;left:0px;height:130px;width:100%;resize:none;border-style:none;border:solid 1px #777;font-size:14px;}
		#admin_notice_form_extra{resize:none;height:65px;width:300px;border-style:none;font-size:13px;font-style:italic;}
			.form_extra{position:absolute;top:165px;left:0px;height:60px;width:100%;resize:none;border-style:none;border:solid 1px #777;font-size:12px;font-style:italic;}
		#admin_notice_form_date{position:absolute;top:226px;left:0px;height:22px;width:298px;text-align:right;border-style:none;border:solid 1px #777;background-color:#EEE;}
	
	#admin_notice_options{position:absolute;top:20px;left:321px;height:250px;width:130px;border:solid 1px #777;background-color:#EEE;}
		#admin_notice_options_size{position:absolute;top:0px;left:0px;height:85px;width:100%;background-color:#EEE;border-bottom:solid 1px #777;}
			#admin_notice_options_size_header{position:absolute;top:0px;left:0px;width:100%;background-color:#DDD;text-align:center;}
		#admin_notice_options_style{position:absolute;top:85px;left:0px;height:105px;width:100%;background-color:#EEE;}
			#admin_notice_options_style_header{position:absolute;top:0px;left:0px;width:100%;background-color:#DDD;text-align:center;border-top:solid 1px #777;}
		#admin_notice_options_space{position:absolute;top:190px;height:20px;width:100%;background-color:#DDD;}
			#admin_notice_options_space_header_text{position:absolute;left:5px;}
			.break_space{position:absolute;right:2px;top:0px;}
			#admin_notice_options_space_header{position:absolute;top:0px;left:0px;width:100%;background-color:#DDD;border-top:solid 1px #777;}

#admin_notice_form_submit{position:absolute;bottom:3px;right:3px;height:30px;width:95%;border-style:none;border:solid 1px #777;}

</style>
</head>
<body>
<?php
// This page will house all of the functionality that will eventually get broken down into separated panel items.

//$file = $_POST['file'];

?>


<!-- 

So yeah, I decided to quickly sketch out the layout for the html using inline styles... Hopefully this won't be too bad to import into index.css it's pretty straight forward. This way I can mutate the style and id names quite abit more without hassle. It's not production worthy, this is where Evan made his mistake.

 -->


<div id='admin_notice_form'>
	<div id='admin_notice_form_rows'>
		<div id='admin_notice_form_title'><input class='form_title' type='text' value='Title...'/></div>
		<div id='admin_notice_form_body'><textarea class='form_body'>Body...</textarea></div>
		<div id='admin_notice_form_extra'><textarea class='form_extra'>extra...</textarea></div>
		<div id='admin_notice_form_date' class='form_date'><?php date_default_timezone_set('America/Chicago'); echo date("m-d-Y | h:m")."&nbsp&nbsp"; ?></div>
	</div>
</div>
<div id='admin_notice_options'>
	<div id='admin_notice_options_size'>
		<span id='admin_notice_options_size_header'>Font Size</span><br />
		<input class='small options' type='radio' /> Small<br />
		<input class='medium options' type='radio' /> Medium<br />
		<input class='large options' type='radio' /> Large<br /><br />
	</div>
	<div id='admin_notice_options_style'>
		<span id='admin_notice_options_style_header'>Font Style</span><br />
		<input class='bold options' type='checkbox' /> Bold<br />
		<input class='italic options' type='checkbox' /> Italic<br />
		<input class='underline options' type='checkbox' /> Underline<br />
		<input class='center options' type='checkbox' /> Center<br /><br />
	</div>
	<div id='admin_notice_options_space'>
		<span id='admin_notice_options_space_header'>
			<span id='admin_notice_options_space_header_text'>Break Space</span>
			<input class='break_space options' type='checkbox' />
		</span>
		<br />
	</div>
	<input id='admin_notice_form_submit' type='button' value='Submit' />
</div>


<div id='JSON_output' style='position:absolute;top:500px;height:300px;width:600px;border:solid 1px #777;'>
<div id='JSON_output_title' style='position:absolute;top:-30px;font-size:20px;'>JSON Interpreter <i>(Disconnected...)</i></div>
<!--
<div id='XML_output' style='position:absolute;top:500px;height:300px;width:600px;border:solid 1px #777;'>
<div id='XML_output_title' style='position:absolute;top:-30px;font-size:20px;'>XML Interpreter <i>(Disconnected...)</i></div>
<div id='XML_output_text' style='position:absolute;top:0px;left:0px;height:100%;width:100%;'></div>
-->
<!-- this area will display JSON as it's created by the form above -->
</div>

<div id='Readme' style='position:absolute;bottom:20px;right:20px;height:500px;width:400px;border:solid 1px #777;'>
<?php include 'README_wysiwyg'; ?>
</div>

<!-- OUTPUT -->
<!--
<div id='wysiwyg_form'>
	<div id='wysiwyg_form_title'><b><u>Mastercard Warning</u></b></div>
	<div id='wysiwyg_form_body'>
		<div row='0' class='wysiwyg_form_row'>MasterCard SecureCode maintenance has been scheduled on Saturday, November 16, 2013 from approximately 6:00 pm to 10:00 pm.</div>
		<div row='1' class='wysiwyg_form_row_extra'><i>During this maintenance period, online authentication, enrollment and activation during shopping may be affected.</i></div>
	</div>
	<div id='wysiwyg_form_date'>1:15pm | 11-14-13</div>
</div>
-->
<script type='text/javascript' src='../js/jquery.js'></script>
<script type='text/javascript'>
$(document).ready(function(){

	// instanciate JSON object for variation
	// I want to add 'value' to each field here and remove the need for XML. XML's efficiency degrades at this level- though it works now, and will work for the foreseeable future.
	var obj = {
		'title':{
			'style':{'bold':'true', 'italic':'false', 'underline':'true', 'center':'false'},
			'size':{'small':'true', 'medium':'false', 'large':'false'},
			'break_space':'false'
		},	
		'body':{
			'style':{'bold':'true', 'italic':'true', 'underline':'true', 'center':'true'},
			'size':{'small':'false', 'medium':'true', 'large':'false'},
			'break_space':'false'
		},
		'extra':{
			'style':{'bold':'false', 'italic':'true', 'underline':'false', 'center':'true'},
			'size':{'small':'false', 'medium':'false', 'large':'true'},
			'break_space':'true'
		}
	};	

	var active = 'title'; // active contains global information
	var this_obj = '';
//	function set_values(this_obj){}

	$('.options').click(function(){
		if (this_obj == ''){alert('A selection has not been made. Please select an area to format.');}
		var selected_array = $(this).attr('class').split(' '); // splits classes into an array
		selected = selected_array[0]; // takes first class as value 
		if($(this).attr('type')=='checkbox'){
//			alert('selected: '+selected+' | obj: '+obj.title.style[selected]);
			if ($(this).prop('checked')==true){
				if (selected == 'break_space'){
					this_obj[selected] = 'true';
//					alert(this_obj[selected]);
				}else{
					this_obj.style[selected] = 'true';
//				alert(this_obj.style[selected]);
				}
			}else{
				if (selected == 'break_space'){
					this_obj[selected] = 'false';
				}else{
					this_obj.style[selected] = 'false';	
//				alert(this_obj.style[selected]);
				}
			}
		}else if($(this).attr('type')=='radio'){
			switch (selected){
				case 'small':	
					this_obj.size[selected] = 'true';	
					this_obj.size.medium = 'false';	
					this_obj.size.large = 'false';	
					$('.medium').prop('checked',false);
					$('.large').prop('checked',false);
					// 
				break;
				case 'medium':	
					this_obj.size[selected] = 'true';	
					this_obj.size.small = 'false';	
					this_obj.size.large = 'false';	
					$('.small').prop('checked',false);
					$('.large').prop('checked',false);
				break;
				case 'large':	
					this_obj.size[selected] = 'true';	
					this_obj.size.small = 'false';	
					this_obj.size.medium = 'false';	
					$('.small').prop('checked',false);
					$('.medium').prop('checked',false);
				break;
			}
		}
	});

	function get_values(this_obj){

		// iterate json values
		var bold, italic, underline, center, small, medium, large, break_space;

		// styles
		bold = this_obj.style.bold;
		italic = this_obj.style.italic;
		underline = this_obj.style.underline;
		center = this_obj.style.center;

		// sizes
		small =this_obj.size.small;	
		medium =this_obj.size.medium;	
		large =this_obj.size.large;	

		// break_space
		break_space = this_obj.break_space;	

		// conditions
		if (bold == 'true'){$('.bold').prop('checked',true);}else{$('.bold').prop('checked',false);}
		if (italic == 'true'){$('.italic').prop('checked',true);}else{$('.italic').prop('checked',false);}
		if (underline == 'true'){$('.underline').prop('checked',true);}else{$('.underline').prop('checked',false);}
		if (center == 'true'){$('.center').prop('checked',true);}else{$('.center').prop('checked',false);}

		if (break_space == 'true'){$('.break_space').prop('checked',true);}else{$('.break_space').prop('checked',false);}

		if (small == 'true'){
			$('.small').prop('checked',true);
			$('.medium').prop('checked',false);
			$('.large').prop('checked',false);
		}
		if (medium == 'true'){
			$('.small').prop('checked',false);
			$('.medium').prop('checked',true);
			$('.large').prop('checked',false);
		}
		if (large == 'true'){
			$('.small').prop('checked',false);
			$('.medium').prop('checked',false);
			$('.large').prop('checked',true);
		}
	}

	$('.form_title, .form_body, .form_extra').focus(function(){
		// set notification border
		$(this).css({'border':'solid 1px #5D5','background-color':'#FEFFFE'});
		// set correct option values
		// get (this) value	
		var element = $(this).attr('class');
		switch (element){
			case 'form_title':
				// scope the object
				this_obj = obj.title;
				get_values(this_obj);
			break;
			case 'form_body':
				this_obj = obj.body;
				get_values(this_obj);
			break;
			case 'form_extra':
				this_obj = obj.extra;
				get_values(this_obj);
			break;
		}
	}).blur(function(){
		// reset notification border
		$(this).css({'border':'solid 1px #777','background-color':'#FFF'});
	});


	// encapsulate each row with XML and attributes
	//
	// attributes are hard-coded, not hooked up to the options yet.
	//

	/*
 		* for each section
		* if (style is set) then add it to this XML
		*
		*
		*/

	function get_JSON(){
		// these seem like they will be generated by a function and return the constructed string to each variable rather than just setting them as a string by default.
		var title = '<title decoration="'+obj.title.style+'" size="'+obj.title.size+'" centered="'+obj.title.style.centered+'" break_space="'+obj.title.break_space+'">'+$('.form_title').val()+'</title>';
		var body = '<body decoration="bold" size="2" centered="false" break_space="0">'+$('.form_body').val()+'</body>';
		var extra = '<extra decoration="bold" size="2" centered="false" break_space="0">'+$('.form_extra').val()+'</extra>';
		var date = '<date decoration="" size="1"'+$('#wysiwyg_form_date').text()+'</date>';
		var words = $('.form_body').val().split(' '); // wow .split(' ') is how you'd make tags, this is exactly what I need in the inventory..
	}get_JSON();	

	function generate_XML(element,attributes){
		switch(element){
			case 'title':	
				var meta = $('.form_title');
				var section = meta.val();
				// to get attributes correctly the thing to use is dynamic JSON- like inventory, but it's possible to get them using conditions. clicking on an area hides other_options and brings into view these_options
				var attributes = [meta.attr('decoration'),meta.attr('size'),meta.attr('centered'),meta.attr('break_space'),]
			break;
			case 'body':	
				var meta = $('.form_body');
				var section = meta.val();
				var attributes = [meta.attr('decoration'),meta.attr('size'),meta.attr('centered'),meta.attr('break_space'),]
			break;
			case 'extra':	
				var meta = $('.form_extra');
				var section = meta.val();
				var attributes = [meta.attr('decoration'),meta.attr('size'),meta.attr('centered'),meta.attr('break_space'),]
			break;
			case 'date':	
				var meta = $('.form_date');
				var section = meta.text();
				var attributes = [meta.attr('decoration'),meta.attr('size'),meta.attr('centered'),meta.attr('break_space'),]
			break;
		}
		// take section and append it	where necessary
		//return "<"+element+" decoration='"+attributes[0]+"' size='"+attributes[1]+"' centered='"+attributes[3]+"' break_space='"+attributes[4]+"'>"+section+"</"+element+"><br />";
		
		//DEBUG
		//alert("<"+element+" decoration='"+attributes[0]+"' size='"+attributes[1]+"' centered='"+attributes[3]+"' break_space='"+attributes[4]+"'>"+section+"</"+element+"><br />");
	}
	generate_XML('title');
	generate_XML('body');
	generate_XML('extra');
	generate_XML('date');

	
	// these seem like they will be generated by a function and return the constructed string to each variable rather than just setting them as a string by default.
	var title = '<title decoration="bold-underline" size="3" centered="false" break_space="0">'+$('.form_title').val()+'</title>';
	var body = '<body decoration="bold" size="2" centered="false" break_space="0">'+$('.form_body').val()+'</body>';
	var extra = '<extra decoration="bold" size="2" centered="false" break_space="0">'+$('.form_extra').val()+'</extra>';
	var date = '<date decoration="" size="1"'+$('#wysiwyg_form_date').text()+'</date>';
	var words = $('.form_body').val().split(' '); // wow .split(' ') is how you'd make tags, this is exactly what I need in the inventory..


	function get_form_as_html(form){
		return form;
	}
	$('#admin_notice_form_submit').click(function(){

	var form = title+' '+body+' '+extra+' '+date+' '+words.length;

		var data = get_form_as_html(form);
		// classes must be created in the text boxes and inputs

//		alert(title+' '+body+' '+extra+' '+date+' '+words.length);

		// I'm going to allow 20 words per row

		$('#XML_output_text').text(data);
	});
});
</script>
</body>
</html>
