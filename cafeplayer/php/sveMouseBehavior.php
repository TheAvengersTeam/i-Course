<?php
include "mouseBehavior.php";
include "identityChecker.php";
$iden=new identity();
if($iden->getType()==1)
	return 0;//teacher
$sID=$iden->getID();
$tID=$_POST['tID'];
$cID=$_POST['cID'];

$playHistory=$_POST['playHistory'];
$time=$_POST['time'];

$clock=$_POST['clock'];
$position=$_POST['position'];
$clickTimes=$_POST['clickTimes'];

$mb=new mouseBehavior($sID,$tID,$cID);
$mb->isTableExist('clickBehavior');
$mb->isTableExist('playHistory');

$mb->setClickBehavior($clock,$position,$clickTimes);
$mb->saveTable('clickBehavior');
$mb->setPlayHistory($playHistory,$time);
$mb->saveTable('playHistory');
//create the courseWatched table
$mb->isCourseWatchedExist('clickBehavior');
$mb->isRecordExist('clickBehavior');
$mb->isCourseWatchedExist('playHistory');
$mb->isRecordExist('playHistory');
?>