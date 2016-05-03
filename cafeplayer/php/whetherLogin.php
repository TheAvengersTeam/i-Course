<?php
	session_start();
	if(!empty($_SESSION['uid'])) echo $_SESSION['uid'];
	else echo 0;
?>