<?php

/* for JSON
echo $json = file_get_contents("./notice.json");
$json = json_decode($json,true);
echo var_dump($json);
*/

// the maximum row number needs to be returned with the data, possibly after the return of this script- use da

$xml = file_get_contents("notice.xml");
$xml = simplexml_load_string($xml);

$warning = $xml->warning;
$warning_rows = $warning->rows;
$warning_extra = $warning->extra;

//echo $warning->title."<br/>";
//echo $warning->date."<br/>";

// for each row echo and break line

function format($rows, $div){ // return arrays of formated strings based on attributed rows, decorations, and sizes

	$rows = $rows->$div;

	foreach ($rows as $row){

		// push ids into an array to be counted
		$id_array = [];
		$id = $row->attributes()->id;
		array_push($id_array, $id);
	
		$decoration = $row->attributes()->decoration;
		$size = $row->attributes()->size;
		$centered = $row->attributes()->centered;
		
		
		switch($decoration){
			case "bold":
				$row = "<b>".$row."</b>";
			break;
			case "italic":
				$row = "<i>".$row."</i>";
			break;
			case "underline":
				$row = "<u>".$row."</u>";
			break;
			case "bold-underline":
				$row = "<b><u>".$row."</u></b>";
			break;
			default:
			break;
		}
		
		switch($size){
			case "1":
				$row = "<font size='1'>".$row."</font>";
			break;
			case "2":
				$row = "<font size='2'>".$row."</font>";
			break;
			case "3":
				$row = "<font size='3'>".$row."</font>";
			break;			
		}
		
		if ($centered == "true"){
			$row = "<center>".$row."</center>";
		}
		
		if ($div == "date"){
			$row = "<div style='position:absolute;bottom:0px;right:5px;'>".$row."</div>";
		}
	
		if ($div == "extra"){
			$row = "<br />".$row;
		}
		
		echo $row."<br/>"; // formatted row
	}
	$max = max($id_array);
}

format($warning, "title");
format($warning_rows, "body");
format($warning_rows, "extra");
format($warning, "date");


?>
