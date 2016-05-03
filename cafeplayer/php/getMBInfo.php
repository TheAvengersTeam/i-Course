<?php
include "mouseBehavior.php";
include "loginChecker.php";
$tid=$_POST['tID'];
$cid=$_POST['cID'];
$w=new loginChecker();
$sid=$w->getStatus();
if(!$sid)
	return 0;
$mba=new mouseBehavior($sid,$tid,$cid);
$mba->downloadTableInfo(1);//clickbehavior;
$mba->downloadTableInfo(0);//playhistory
$mba->getMouseBehavior();
?>