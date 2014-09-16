<!DOCTYPE HTML>
<!--[if lt IE 7 ]> <html class="ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=9" />
	<link rel="stylesheet" type="text/css" href="css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="css/print.css" media="print" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
	<link rel="stylesheet" type="text/css" href="css/index.maroon.css" />
	<!--<link rel="stylesheet" type="text/css" href="css/index.dark.css" />-->
	<!--<link rel="stylesheet" type="text/css" href="css/index.blue.css" />-->
	<!--<link rel="stylesheet" type="text/css" href="css/index.green.css" />-->
	<link rel="stylesheet" type="text/css" href="css/navigation.css" />
	<link rel="stylesheet" type="text/css" href="lib/jquery-ui-1.11.1.tboc/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="lib/jquery-ui-1.11.1.tboc/jquery-ui.theme.min.css"/>
	<link rel='shortcut icon' href='res/icon.bmp' />
	<title>The Bank of Carbondale</title>
</head>

<body>
	<div id='debug'>
		<u>Notices: </u> <span id='noticesOn'>On</span> / <span id='noticesOff'>Off</span>
	</div>
	<div id="doc">
		<div id="header">
			<div id='logo'></div>
			<div id='photo'></div>
			<div id="nav_links">
			<?php /* include('pages/include/i_uppernav.php'); */ ?>
			<!-- inserted uppernav.php into structure -->
			<!--<div class="span-19 last UpperNav">-->
				<!--<a href='http://10.0.0.140/landing/php/tracker/'>REPORT AN ISSUE OR REQUEST</a> &nbsp;&nbsp;&nbsp;&nbsp; -->Phone:&nbsp; 618&#149;549&#149;2181 &nbsp;&nbsp;&nbsp;&nbsp; <a href="/rates">Current Rates</a> &nbsp;&nbsp;&nbsp;&nbsp;  <a href="/locations">Hours & Locations</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="/atm">ATM Locations</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="/contact">Contact Us</a>
			<!--</div>-->
			</div>
			<span id='motto'>Your Hometown Friend!</span>
			<span id='user_nav'><span id='user_nav_home'><u>Home</u> &nbsp; | &nbsp; </span><span id='user_nav_array'></span></span>
			<div id='notices'>
				<div id='notices_area'>
					<div id='alert'></div>
					<div id='warning'></div>
				</div>
			</div>

			<!-- links module -->
			<!-- JQUERY LINKS -->
			<!--
			<div id='links'>
				<span class='link links_customers shadow' alt='customer'>
					<span class='text_pad'>Customer Service</span>
						<span class='link_drop'>
						<ul>
						-->
							<!--
								reference:
								<li type='' path='' load='' [name=''] [element='']>TEXT</li>
							-->
						<!--
							<li><a href='https://tboc.mortgagewebcenter.com/'>Online Mortgage Center</a></li>
							<li class='load_link' path='pages/customer/personal_loans.php' location='internal' window='current' name='personal_loans'>Consumer Loan Application</li>
							<li><a href='https://secure9.onlineaccess1.com/CarbondaleAutoEnrollment/auto_enrollment.html'>eBanking Demo</a></li>
							<li><a href='https://secure9.onlineaccess1.com/CarbondaleOnline_30/demo/demo.htm'>eBanking Bill Pay Demo</a></li>
							<li class='load_link' path='pages/personal/ebanking.php' location='internal' window='current' name='ebanking'>Enroll In eBanking</li>
							<li href='pages/customer/estatements_activate.php'>Activate eStatements</li>
							<li href='pages/customer/calc.php'>Financial Calculators</li>
							<li class='load_link' path='pages/customer/security/index.php' location='internal' window='current' name='security'>Security Center</li>
						</ul>
					</span>
				</span>
				<span class='link links_personal shadow' alt='personal'>
					<span class='text_pad'>Personal</span>
						<span class='link_drop'>
						<ul>
							<li class='load_link' path='pages/personal/checking.php' location='internal' window='current'>Checking</li>
							<li class='load_link' path='pages/personal/moneymarket.php' location='internal' window='current'>Money Market</li>
							<li class='load_link' path='pages/personal/savings.php' location='internal' window='current'>Savings</li>
							<li class='load_link' path='pages/personal/cod.php' location='internal' window='current'>Certificates of Deposit</li>
							<li class='load_link' path='pages/personal/personal_ira.php' location='internal' window='current'>Individual Retirement (IRA)</li>
							<li class='load_link' path='pages/personal/card-services.php' location='internal' window='current'>Card Services</li>
							<li class='load_link' path='pages/personal/ebanking.php' location='internal' window='current'>eBanking</li>
							<li class='load_link' path='pages/personal/loans.php' location='internal' window='current'>Loans</li>
							<li class='load_link' path='pages/personal/personal_loans.php' location='internal' window='current'>Mortgage</li>
							<li class='load_link' path='pages/personal/goclub.php' location='internal' window='current'>GO Club</li>
							<li class='load_link' path='pages/personal/services.php' location='internal' window='current'>Other Services</li>
						</ul>
					</span>
				</span>
				<span class='link links_business shadow' alt='business'>
					<span class='text_pad'>Business</span>
						<span class='link_drop'>
						<ul>
							<li class='load_link' path='pages/business/checking.php' location='internal' window='current'>Checking</li>
							<li class='load_link' path='pages/business/ebanking.php' location='internal' window='current'>eBanking</li>
							<li class='load_link' path='pages/business/remote-deposit.php' location='internal' window='current'>Remote Deposit</li>
							<li class='load_link' path='pages/business/debit-card.php' location='internal' window='current'>Business Debit Card</li>
							<li class='load_link' path='pages/business/loans.php' location='internal' window='current'>Loans</li>
							<li class='load_link' path='pages/business/services.php' location='internal' window='current'>Other Services</li>
						</ul>
					</span>
				</span>
				<span class='link links_about shadow' alt='about'>
					<span class='text_pad'>About Us</span>
					<span class='link_drop'>
						<ul>
							<li class='load_link' path='pages/about/history.php' location='internal' window='current'>History</li>
							<li class='load_link' path='pages/about/mission.php' location='internal' window='current'>Mission</li>
							<li class='load_link' path='pages/about/news.php' location='internal' window='current'>News</li>
							<li class='load_link' path='pages/about/employment.php' location='internal' window='current'>Employment</li>
							<li class='load_link' path='pages/about/locations.php' location='internal' window='current'>Hours & Locations</li>
							<li class='load_link' path='pages/about/atm.php' location='internal' window='current'>ATM Locations</li>
							<li class='load_link' path='pages/about/contact.php' location='internal' window='current'>Contact Us</li>
						</ul>
					</span>
				</span>
			</div>
			-->
			<!-- end: links -->
			<div id='links'>
				<div class='link shadow links_customer link_button link_left' alt='customer'>
					<div class='link_title'>
						<a>Customer</a>
					</div>
					<ul>
						<li>
							<ul class='link_drop'>
								<li><a class='load_link load_link_li' href='https://tboc.mortgagewebcenter.com/'>Online Mortgage Center</a></li>
								<li class='load_link load_link_li' path='pages/customer/personal_loans.php' location='internal' win='current' name='personal_loans'>Consumer Loan Application</li>
								<li><a class='load_link load_link_li' href='https://secure9.onlineaccess1.com/CarbondaleAutoEnrollment/auto_enrollment.html'>eBanking Demo</a></li>
								<li><a class='load_link load_link_li' href='https://secure9.onlineaccess1.com/CarbondaleOnline_30/demo/demo.htm'>eBanking Bill Pay Demo</a></li>
								<li class='load_link load_link_li' path='pages/personal/ebanking.php' location='internal' win='current' name='ebanking'>Enroll In eBanking</li>
								<li class='load_link load_link_li' path='pages/customer/estatements_activate.php' location='internal' win='current' name='ebanking'>Activate eStatements</li>
								<li class='load_link load_link_li' path='pages/customer/calc.php' location='internal' win='current' name='calculators'>Financial Calculators</li>
								<li class='load_link load_link_li' path='pages/customer/security.php' location='internal' win='current' name='security'>Security Center</li>
							</ul>
						</li>
					</ul>
				</div>

				<div class='link shadow links_personal link_button' alt='personal'>
					<div class='link_title'>
						<a>Personal</a>
					</div>
					<ul>
						<li>
							<ul class='link_drop'>
								<li class='load_link load_link_li' path='pages/personal/checking.php' location='internal' win='current'>Checking</li>
								<li class='load_link load_link_li' path='pages/personal/moneymarket.php' location='internal' win='current'>Money Market</li>
								<li class='load_link load_link_li' path='pages/personal/savings.php' location='internal' win='current'>Savings</li>
								<li class='load_link load_link_li' path='pages/personal/cod.php' location='internal' win='current'>Certificates of Deposit</li>
								<li class='load_link load_link_li' path='pages/personal/personal_ira.php' location='internal' win='current'>Individual Retirement (IRA)</li>
								<li class='load_link load_link_li' path='pages/personal/card-services.php' location='internal' win='current'>Card Services</li>
								<li class='load_link load_link_li' path='pages/personal/ebanking.php' location='internal' win='current'>eBanking</li>
								<li class='load_link load_link_li' path='pages/customer/personal_loans.php' location='internal' win='current'>Loans</li>
								<li><a class='load_link load_link_li' href='http://tboc.mortgagewebcenter.com/Default.asp?bhcp=1'>Mortgage</a></li>
								<li class='load_link load_link_li' path='pages/personal/goclub.php' location='internal' win='current'>GO Club</li>
								<li class='load_link load_link_li' path='pages/personal/services.php' location='internal' win='current'>Other Services</li>
							</ul>
						</li>
					</ul>
				</div>

				<div class='link shadow links_business link_button' alt='business'>
					<div class='link_title'>
						<a>Business</a>
					</div>
					<ul>
						<li>
							<ul class='link_drop'>
								<li class='load_link load_link_li' path='pages/business/checking.php' location='internal' win='current'>Checking</li>
								<li class='load_link load_link_li' path='pages/business/ebanking.php' location='internal' win='current'>eBanking</li>
								<li class='load_link load_link_li' path='pages/business/remote-deposit.php' location='internal' win='current'>Remote Deposit</li>
								<li class='load_link load_link_li' path='pages/business/debit-card.php' location='internal' win='current'>Business Debit Card</li>
								<li class='load_link load_link_li' path='pages/business/loans.php' location='internal' win='current'>Loans</li>
								<li class='load_link load_link_li' path='pages/business/services.php' location='internal' win='current'>Other Services</li>
							</ul>
						</li>
					</ul>
				</div>

				<div class='link shadow links_about link_button link_right' alt='about'>
					<div class='link_title'>
						<a>About</a>
					</div>
					<ul>
						<li>
							<ul class='link_drop'>
								<li class='load_link load_link_li' path='pages/about/history.php' location='internal' win='current'>History</li>
								<li class='load_link load_link_li' path='pages/about/mission.php' location='internal' win='current'>Mission</li>
								<li class='load_link load_link_li' path='pages/about/news.php' location='internal' win='current'>News</li>
								<li class='load_link load_link_li' path='pages/about/employment.php' location='internal' win='current'>Employment</li>
								<li class='load_link load_link_li' path='pages/about/locations.php' location='internal' win='current'>Hours & Locations</li>
								<li class='load_link load_link_li' path='pages/about/atm.php' location='internal' win='current'>ATM Locations</li>
								<li class='load_link load_link_li' path='pages/about/contact.php' location='internal' win='current'>Contact Us</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			<!--<a href="http://tboc.mortgagewebcenter.com/Default.asp?bhcp=1">-->
			<!--</a>-->
			<!-- Anchor is replaced with Javascript href -->
			<!--<a href="http://www.tboc.com"><img src="res/TBOC_Logo.jpg" alt="The Bank of Carbondale"></a>-->
		</div>
		<div id="body">
			<div id='body_container'>
				<div id="banner" class=''>
					<a href='#'><img src='res/NewBanner.png'/></a>
					<a href='#'><img src='res/online.png'/></a>
				</div>
				<div id='banner_pagination'></div>
				<div id='sliders' class=''>
					<div id='slide-1'>
						<div id='slide-1-panel'>Online Banking Login</div>
						<div id='slide-1-area'>
							<div id="login">
								<div id="login_form">
									<!-- <h2><img src="images/eBanking_hdr.png"></h2> -->
									<div class="small buttons">
										<!-- the values in this form must remain constant -->
										<form id="Q2OnlineLogin" name="Q2OnlineLogin" action="https://secure9.onlineaccess1.com/CarbondaleOnline_30/Authentication/Login.aspx" method="post">
											<input id="user_id" type="text" name="user_id" value="User ID"/>
											<input id="password" type="password" name="password" value="Password"/>
											<input id="submit_button" type="submit" name="submit" value="Login"/>
											<!--<input class="checkbox_login" type="checkbox" value="1" name="forgot_password" onClick="CheckBoxCheck(0);" id="forgot_password"/> I am a First Time User-->
											<!--<input class="checkbox_login" type="checkbox" value="1" name="forgot_password" onClick="CheckBoxCheck(1);" id="forgot_password"/> I have Forgotten my Password-->
										</form>
									</div>
								<span id='forgot'><a class='blended'>I forgot my Username or Password</a></span>
								<span id='first'><a class='blended'>I'm a first time user.</a></span>
								</div>
								<!-- <div class="LoginBlock Lower">
									<h2><img src="images/eStatements_hdr.png" width="129" height="20"></h2>
									<p align="center">
										<button>Login to eStatements</button>
									</p>
								</div> -->
								<div id="login_form_mortgage">
									<div id='login_form_mortgage_image'>
								</div>
									<!-- Mortgage button -->
									<!--
									<img src="images/eMortgage_header.png">
									<p align="center">
									<div class="buttons"><a href="http://tboc.mortgagewebcenter.com" class="button">Access eMortgage</a></div>
									</p>
									-->
								</div>
							</div>
						</div>
					</div>
					<!--<div id='slide-2'>
						<div id='slide-2-panel'>Consumer Loan Application</div>
						<div id='slide-2-area'>
							The Bank of Carbondale offers an array of installment loans to meet your needs. Whether you need an auto loan to purchase your dream car or a short-term loan for unexpected emergencies, we can provide the loan product that is right for you. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u style='cursor:pointer'>APPLY NOW</u>
						</div>
					</div>
					<div id='slide-3'>
						<div id='slide-3-panel'>Slide 3 Panel</div>
						<div id='slide-3-area'>
							TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING  <br/> TESTING TESTING TESTING  <br/><br/> TESTING TESTING 
						</div>
					</div>
				</div>
				-->
				<!-- /sliders -->
				<div id='tiles' class=''>
					<span class='tile plain_tile'>
						<div class='tile_container'>
							<img class='tile_image ' src='res/debit_card.jpg'/>
							<span class='tile_text'>Card Services</span>
							<span class='apply tile_button'>Get Information</span>
						</div>
					</span>
					<span class='tile plain_tile' style='left:33%;'>
						<div class='tile_container'>
							<img class='tile_image ' src='res/Banking1.jpg'/>
							<span class='tile_text'>Mortgage Center</span>
							<span class='apply tile_button'>Apply Now</span>
						</div>
					</span>
					<span class='tile plain_tile' style='left:66%;border-right:none;'>
						<div class='tile_container'>
							<img class='tile_image ' src='res/business_ebanking.png'/>
							<span class='tile_text'>Mobile App</span>
							<span class='apply tile_button'>Download</span>
						</div>
					</span>
				</div>
			</div>
			<div id='pages'>
				<!-- pages -->
			</div>
		</div>
		<div id="footer">
			<div id='footer_copy'>
				<p>&copy; 2014 The Bank of Carbondale. All Rights Reserved. &nbsp;&nbsp;
				<a href="pages/main/privacy.php">Privacy Policy</a>
			</div>
			<div id='footer_FDIC'>
				<span id='footer_FDIC_logo'></span>
				<span id='footer_FDIC_text'><strong>Member FDIC</strong></span>
			</div>
		</div>
	</div>
	<div id='outgoing'>
		<span><center>You are about to enter :PAGE:</center></span>
	</div>
<script type='text/javascript' src='js/jquery1.js'></script>
<script type='text/javascript' src='js/globals.js'></script>
<script type='text/javascript' src='js/functions.js'></script>
<script type='text/javascript' src='js/index.js'></script>
<!--<script type='text/javascript' src='js/jquery.slides.min.js'></script>-->
<script type='text/javascript' src='js/jquery.slides.js'></script>
<script type='text/javascript' src='lib/jquery-ui-1.11.1.tboc/jquery-ui.min.js'></script>
</body>
</html>
