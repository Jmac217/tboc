<?php
$dbtype		= "mysql";
$dbhost 	= "localhost";
$dbname		= "tboc";
$dbuser		= "root";
$dbpass		= "";
$connect = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);
?>