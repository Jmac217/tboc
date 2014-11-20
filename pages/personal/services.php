
<!-- placeholder proof of concept for drop-tiles -->

<html>
<head>
<style>
	.p_header{height:auto;width:95%;padding:10px 20px;display:block;font-size:18px;text-align:center;}
	.p_body{position:relative;float:right;margin-top:20px;}
	.p_tile{}
	.p_image{position:relative;float:left;margin-top:20px;}
	.p_drop_container{position:relative;display:inline-block;height:auto;width:100%;float:left;}
		.p_drop_header{cursor:pointer;}
		.p_drop_content{display:none;background-color:#CCC;border-radius:5px;padding:10px;border:1px solid #BBB;}
</style>
</head>
<body>
<div class='page_header'>Banking Services</div>
<span class='p_header textblock text_shadow'>We offer a variety of additional services to make your banking relationship with us more convenient.</span>
<img src="res/Services.jpg" class="p_image text_shadow box">

<div class='p_body textblock text_shadow calculated_width box'>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>Wire Transfers</h2>
		<div class='p_drop_content'>
			<p>Both domestic and international wire services are available five days a week. Visit any of our locations to learn more.</p>
			<p><a href="pages/downloads/wiring_instructions.pdf">Wiring Instructions</a></p>
			<p><a href="pages/downloads/wiring_instructions_international.pdf">International Wiring Instructions</a></p>
		</div>
	</div>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>Safe Deposit Boxes</h2>
		<div class='p_drop_content'>
			<p>The Bank of Carbondale offers three sizes of Safe Deposit Boxes to our customers; offering you confidence, security, and peace of mind. Store your valuables, documents, and records in our vault with a Safe Deposit Box.</p>
		</div>
	</div>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>Notary Service</h2>
		<div class='p_drop_content'>
			<p>All our customers have access to our Notary Service at any of our four full-service banking centers. For information, contact the Bank at 618-549-2181.</p>
		</div>
	</div>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>License Plate Renewal </h2>
		<div class='p_drop_content'>
			<p>Our Carbondale, Carterville, and Murphysboro facilities offer license renewal services six days a week for all Illinois registered vehicles.</p>
		</div>
	</div>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>Foreign Currency</h2>
		<div class='p_drop_content'>
			<p>Traveling out of the country? No problem. We can order foreign currency for established customers before your trip. Save time and hassle at the airport, and be ready before you pack your bags! Currency orders take two to five business days to complete. Call the bank at 618-549-2181 for complete details.</p>
		</div>
	<div class='p_drop_container'>
		<h2 class='p_drop_header'>In-Line Telephone Banking</h2>
		<div class='p_drop_content'>
			<p>24-hours per day, you have access to your account balance from any phone. Just dial 618-549-0939.</p>
		</div>
	</div>
</div>
<script type='text/javascript'>$(document).ready(function(){
	$('.p_drop_header').click(function(){
		$(this).parent().children('.p_drop_content').css({'display':'inline-block'});
		var height = $('#pages')[0].scrollHeight+80;
		$('#pages').css({'height':height});
	}).siblings('.p_drop_content').mouseleave(function(){
		$(this).parent().children('.p_drop_content').css({'display':'none'});
	});
});</script>
</body>
</html>