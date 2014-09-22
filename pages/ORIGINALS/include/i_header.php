<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="author" content="MEGABYTES - www.megabytesone.com">
<meta name="copyright" content="2012 Megabytes. All Rights Reserved">
<meta name="generator" content="Megabytes WebWare">
<base href="http://www.tboc.com/">
<link rel="stylesheet" href="css/screen.css" type="text/css" media="screen, projection">
<link rel="stylesheet" href="css/print.css" type="text/css" media="print">    
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery.collapser.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){

	$('.panel').hide();
	
	$('.collapse').collapser({
		target: 'next',
		effect: 'slide',
		changeText: 0,
		expandClass: 'expIco',
		collapseClass: 'collIco'
	}, function(){
		$('.panel').slideUp();
	});
	$("#tabs").tabs();
	
	$('.panelShow').show();
});
</script>

<title><?= $PageTitle ?> | The Bank of Carbondale</title>
<link href="tboc.css" rel="stylesheet" type="text/css">
</head>

<body>
<div class="container">
<div class="span-24 Header">
	<div class="span-5 Logo"> <a href="http://www.tboc.com"><img src="images/TBOC_Logo.jpg" alt="The Bank of Carbondale" width="177" height="75"></a></div>
	<div class="span-19 last">
    	<?php include('i_uppernav.php'); ?>
        <div class="span-19 last HNav"><p align="center">&nbsp;</p>
        </div>
</div>
<div class="span-24 MainBody">
<div class="span-5">
	<?php require('i_navbar.php'); ?>
</div>
<div class="span-19 BodyContent last">
