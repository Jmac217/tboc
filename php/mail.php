<?php
	if (isset($_POST['name'])&&isset($_POST['sender'])&&isset($_POST['message'])){
	
		$name = $_POST['name'];
		$sender = $_POST['sender'];
		$message = wordwrap($_POST['message'], 300, "\n");
		
		if(isset($_POST['subject'])){$subject = $_POST['subject'];}else{$subject = '';}
		$email = "
*** EMAIL GENERATED BY TBOC.COM SOFTWARE ***
*** DO NOT REPLY TO THIS EMAIL ***

Customer Name: ".$name."
Email or Phone: ".$sender."
Subject: ".$subject."

Message:
".$message."

*** DO NOT REPLY TO THIS EMAIL ***
		";
		mail('newaccounts@tboc.com', 'Email from TBOC.com', $email);
	}
?>