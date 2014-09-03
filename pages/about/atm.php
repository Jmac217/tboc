<?php
// File: tboc.com/atm.php - ATM List & Status Display
/*
	$PageTitle = 'ATM Locations';
	$SloganFile = 'slogan.php';
	$PicBar = FALSE;
*/

	include '../../php/connect.php';
	
	//Query for ATMs/Status
	$query = "SELECT city, location, status FROM atm ORDER BY city";
	$result = mysql_query($query) or die(mysql_error());
?>
<h1 class="page_header" style='position:relative;'>Hours &amp; Locations - ATM Locations</h1>
<?php 
	//Display ATM Locations
	$row = mysql_fetch_assoc($result);
	$City1 = $row['city'];
	echo "
		<table width='500' class='atm textblock text_shadow' align='center' style='width:95%;'>
			<tr>
				<td colspan=2>
					<h2>".$row['city']."</h2>
				</td>
			</tr>
	";
	while ($row=mysql_fetch_assoc($result)){
//	do {
		$City2 = $row['city'];
		if($City1 != $City2){
			//Create header for the new city entry
			echo "
				<tr>
					<td>&nbsp</td>
					<td></td>
				</tr>
				<tr>
					<td colspan='2'>
						<h2>".stripslashes($row['city'])."</h2>
					</td>
				</tr>
			";
		}
		//Display the row entry in the table.
		echo "
			<tr class='job_opening'>
			<td class='Left'>".stripslashes($row['location'])."</td>
			<td class='Right'>";
				//Display Status In colors
				if($row['status'] == 'A'){
						echo '<div class="StatusActive">Online</div>';
				}else if($row['status'] == 'O'){
						echo '<div class="StatusOffline" title="This ATM is currently offline.">Offline</div>';
				}
		echo "
			</td>
		</tr>";
		$City1 = $City2;
	}
//	}while($row = mysql_fetch_assoc($result));
echo "
	</table>
";
?>
