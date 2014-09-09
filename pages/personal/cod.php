<?php

//	File: tboc.com/rates.php - Interest Rates
//	Pulls rate information from MySQL db: tboccom, table: rates

/*
	$OpenPanel = '2';
	$PageTitle = 'Certificates of Deposit';
*/

include '../../php/connect.php';

//Query for ATMs/Status
$query = "SELECT description, rate, category, minbal, apy, minopen FROM rates ORDER BY linenum";
$result = mysql_query($query);

// Query for Thru Date
// Noticed that this could be a JSON file
$query2 = "SELECT value FROM settings WHERE name = 'rate_thru_date'";
$result2 = mysql_query($query2);
$ThruDate = mysql_fetch_assoc($result2);
	
?>
<div class='page_header'>Current Rates</div>
<div class='textblock text_shadow'>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td valign="top">
			<h2>Interest Rates effective <?php echo $ThruDate['value']; ?></h2>
<?php
		//Display ATM Locations
		if ($result) {
			$row = mysql_fetch_assoc($result);
			echo "
			<table width='500' class='rates' align='center' cellpadding='2' cellspacing='0' border='0'>
				<tr>
					<th width='35%'>Account Type</th>
					<th width='15%' style='text-align:right'>Min. Balance<br />
						to Open
					</th>
					<th width='15%' style='text-align:right;'>Minimum<br/>
						Balance to Earn APY
					</th>
					<th width='15%' style='text-align:right;'>Interest<br/>
						Rate
					</th>
					<th width='20%' style='text-align:right;'>Annual<br/>
						Percentage<br/>
						Yield (APY)
					</th>
				</tr>";
			do {
				echo "
				<tr>
					<td class='Left'>".stripslashes($row['description'])."</td>
					<td style='text-align:right;'>".stripslashes($row['minopen'])."</td>
					<td style='text-align:right;'>".stripslashes($row['minbal'])."</td>
					<td style='text-align:right;'>".stripslashes($row['rate'])."</td>
					<td style='text-align:right;'>".stripslashes($row['apy'])."</td>
				</tr>";
				$row = mysql_fetch_assoc($result);
				if ($row) {
					echo "
				<tr class='shaded'>
					<td class='Left'>".stripslashes($row['description'])."</td>
					<td style='text-align:right;'>".stripslashes($row['minopen'])."</td>
					<td style='text-align:right;'>".stripslashes($row['minbal'])."</td>
					<td style='text-align:right;'>".stripslashes($row['rate'])."</td>
					<td style='text-align:right;'>".stripslashes($row['apy'])."</td>
				</tr>
					";
				}
			}while($row = mysql_fetch_assoc($result));
		}else{
			echo "
				<p>Our rates are temporarily unavailable. Please call 618-549-2181 for information or check back soon.</p>
			";
		}
?>
				<tr>
					<td style='padding-top: 15px;' colspan='4'>
						<table width='100%' border='0' align='center' cellpadding='0' cellspacing='0'>
							<tr>
								<th colspan='2'>
									<div align='center'>Certificates of Deposit Early Withdrawal Penalty </div>
								</th>
							</tr>
							<tr>
								<td width='50%' align='left' class='Left'>1 &amp; 3 Month CD </td>
								<td width='50%'>1 Month Interest </td>
							</tr>
							<tr>
								<td width='50%' align='left' class='Left'>6 -11  Month CD </td>
								<td width='50%'>3 Months Interest </td>
							</tr>
							<tr>
								<td width='50%' align='left' class='Left'>12 Months  or Over </td>
								<td width='50%'>6 Months Interest </td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<div class='job_opening'>
				<p>*The rates may change after the account is opened.</p>
				<p>A penalty may be imposed for early withdrawal on CDs.</p>
				<p>Fees could reduce earnings on the account.</p>
				<p>Additional disclosure information is available in our Truth in Savings brochure.</p>
			</div>
		</td>
	</tr>
</table>
</div>
