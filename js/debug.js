/** manual notice switch for debugging/demonstration **/ // @documentation
// notice('false', 'json/notice.xml', 'warning');
$('#noticesOn').click(function(){
	notice('true', 'json/test.xml', 'warning');
});
$('#noticesOff').click(function(){
	notice('false', 'json/test.xml', 'warning');
});

//$('#banner_mortgage').load('res/banner/content/morgtage.html');
//$('#banner_mortgage').load("res/banner/content/mortgage.html");
