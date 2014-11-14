<?php
// ***************************************************************************
// *
// *  CONNECTION INFORMATION
// *
// ****************************************************************************

/*
define ('DB_USER', 'tboccom');
define ('DB_PASS', 'Upgz6xv');
define ('DB_HOST', '216.247.255.142');
define ('DB_NAME', 'tboccom');

/*
#define ('DB_USER', 'user1271087');
#define ('DB_PASS', 'ip77bnpspa');

define ('DB_HOST', 'mysql25.secureserver.net');
define ('DB_NAME', 'tboccom');
*/


// NEW CONNECTION INFORMATION 1/9/09
define ('DB_USER', '1271087');
define ('DB_PASS', 'iVKPVH@0');
define ('DB_HOST', '209.237.150.136');
define ('DB_NAME', '34179_tboccom');


#$dbc = @mysql_connect (DB_HOST, DB_USER, DB_PASS) OR die('Could not connect to MySQL: ' . mysql_error() );
$dbc = @mysql_connect (DB_HOST, DB_USER, DB_PASS);
@mysql_select_db (DB_NAME);

if (mysql_error()) {
	echo '<!--' . mysql_error() . '-->';
}
?>