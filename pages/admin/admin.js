$('document').ready(function(){


	$('#username').click(function(){
		$('#user_options').animate({width: '250px'}).on('mouseleave', function(){$(this).animate({width: '0px'});});
	});
	$('#user_options').css('height', $('#pages').css('height'));

	$('.tab').click(function(){
		// this number of class in sequence matches with json number in array
		// - pull contents of json into scope, and perform load_link() into #pages
		/*** Debug ***
		$('#pages').html($(this).text());
		*/
		$('#pages').load('test.html');
	});
});