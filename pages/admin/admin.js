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
		}
		$('#tabs').html(tabs);
		$('.tab').click(function(){
		
			var _tabText = $(this).text().toLowerCase();
			
			$('#pages').html(JSON.stringify(json[_tabText]));
			

			// this number of class in sequence matches with json number in array
			// - pull contents of json into scope, and perform load_link() into #pages

			/*** Debug ***/
			//$('#pages').html($(this).text());
			//$('#pages').load('test.html');		
		});
	});

	$('#user_options').css('height',$('#pages').css('height'));
});