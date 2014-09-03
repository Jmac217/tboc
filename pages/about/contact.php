<?php
/*
	$OpenPanel = '1';
	$PageTitle = 'Privacy Policy';
*/
if (isset($_POST['submit'])) {
	$message = "
		*** EMAIL GENERATED BY TBOC.COM SOFTWARE ***
		*** DO NOT REPLY TO THIS EMAIL ***

		Customer Name: {$_POST['CustomerName']}
		Email or Phone: {$_POST['EmailOrPhone']}
		Subject: {$_POST['Subject']}

		Message:
		{$_POST['message']}

		*** DO NOT REPLY TO THIS EMAIL ***
	";
	// mail('newaccounts@tboc.com', 'Email from TBOC.com', $message); // production
	mail('jordan.elder@tboc.com', 'Email from TBOC.com', $message); // testing
	echo 'Your message has been sent. Someone will respond as soon as possible.';
	exit();
}

?>
<!--<p><img src="res/ContactUs.png" alt="Contact Us" width="681" height="62"></p>-->
<div class='page_header' style='position:relative;left:30px;'>Contact Us</div>
<div class='textblock text_shadow' style='position:relative;top:0px;left:3%;width:90%;height:78%;'>
<p>Call <span style="font-weight: bold">618-549-2181</span> or e-mail us below.</p>
<p>Please do not include any sensitive customer information in your email (e.g. social security number, account number, etc.)<br/>E-mail is NOT secure.</p>
<form id="email" name="email" method="post" action="contact.php">
	<table width="450" border="0" align="center" cellpadding="1" cellspacing="0">
		<tr>
			<td width="143" align="right"><div align="right">Your Name: </div></td>
			<td width="303"><input type="text" name="CustomerName" /></td>
		</tr>
		<tr>
			<td align="right"><div align="right">Your email or phone: </div></td>
			<td><input type="text" name="EmailOrPhone" /></td>
		</tr>
		<tr>
			<td align="right"><div align="right">Subject:</div></td>
			<td><input type="text" name="subject" /></td>
		</tr>
		<tr>
			<td>Message:</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td colspan="2">
				<p>
					<textarea name="message" style="width:100%;height:200px;border-style:none;border:solid 1px #CCC;min-height:100%;max-height:100%;min-width:100%;max-width:100%;resize:none;"></textarea>
				</p>
				<p align="center">
					<input name="submit" type="submit" id="submit" value="Send Email" style='border-style:none;border:solid 1px #CCC;border-radius:2px;color:#333;'/>
				</p>
			</td>
		</tr>
	</table>
</form>
</div>
