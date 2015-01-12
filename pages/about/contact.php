
<div class='page_header'>Contact Us</div>
<div class='textblock text_shadow'>
<p>Call <span style="font-weight: bold">618-549-2181</span> or e-mail us below.</p>
<p>Please do not include any sensitive customer information in your email (e.g. social security number, account number, etc.)<br/>E-mail is NOT secure.</p>
<!--<form id="email" name="email" method="post" action="contact.php">-->
	<table width="450" border="0" align="center" cellpadding="1" cellspacing="0">
		<tr>
			<td width="143" align="right"><div align="right">Your Name: </div></td>
			<td width="303"><input type="text" id="name" /></td>
		</tr>
		<tr>
			<td align="right"><div align="right">Your email or phone: </div></td>
			<td><input type="text" id="sender" /></td>
		</tr>
		<tr>
			<td align="right"><div align="right">Subject:</div></td>
			<td><input type="text" id="subject" /></td>
		</tr>
		<tr>
			<td>Message:</td>
		</tr>
		<tr>
			<td colspan="2">
				<p>
					<textarea id="message" style="width:100%;height:200px;border-style:none;border:solid 1px #CCC;min-height:100%;max-height:100%;min-width:100%;max-width:100%;resize:none;"></textarea>
				</p>
				<p align="center">
					<input name="submit" type="submit" id="submit" value="Send Email" onclick="contact_submit(this)" class='button tile_button radius' style='position:relative;border-radius:3px;'/>
				</p>
			</td>
		</tr>
	</table>
	<div id='mail_feedback'></div>
<!--</form>-->
</div>
