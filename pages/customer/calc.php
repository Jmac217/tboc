<?php
// File: tboc.com/calc.php - Calculators template page. Pulls from /calc based on $c

// Still trying to decide what to do about this PHP global type junk

/*
	$OpenPanel = '1';
	$PageTitle = 'About Us';
	$SloganFile = 'slogan.php';
	$PicBar = FALSE;
*/ 
?>

<h1 class='header'>
	Calculators
</h1>

<h4>Select A Calculator </h4>

<span style='position:relative;left:45px;'>
	These calculators are intended for illustrative purposes <u>only</u>.<br />
	<i style='font-size:10px;'>Please consult a financial professional prior to replying on your results.</i>
	<br />
</span>
<br />
<div id='calc_selection'>
	<ul>
		<li><a js_href='pages/customer/calc/autoloan.htm'>Auto Loan</a></li>
		<li><a js_href='pages/customer/calc/retirement.htm'>Retirement Goal</a></li>
		<li><a js_href='pages/customer/calc/savings.html'>Monthly Savings Accumulation</a></li>
		<li><a js_href='pages/customer/calc/college.html'>College Fund</a></li>
		<li><a js_href='pages/customer/calc/creditcard.html'>Credit Card</a></li>
		<li><a js_href='pages/customer/calc/mortgage.html'>Mortgage Loan</a><br /></li>
	</ul>
</div>
<!-- this script, and all other standalones, should probably go into their own js pages to be called on by the index -->
<script type='text/javascript'>
	$('a').click(function(){
		var href = $(this).attr('js_href');
		$('#calc_area').load(href);
	});
</script>
<div id='calc_area'>
	<!-- Javascript loads pages into this div -->
</div>
