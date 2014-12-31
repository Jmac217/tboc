<?php
require_once 'connect.php';
if (isset($_POST['message'])){
	$bug = $_POST['message'];
	$date = date('Y-m-d');
	$sql = "INSERT INTO bugs (bug,date) VALUES (:bug,:date)";
	$query = $connect->prepare($sql);
	$query->execute(array(':bug'=>$bug, ':date'=>$date));
}
?>