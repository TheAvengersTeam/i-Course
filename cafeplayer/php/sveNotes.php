<?php
include "note.php";
include "identityChecker.php";

$iden=new identity();
if($iden->getType()==1)
	return 0;//teacher
$sID=$iden->getID();
echo "sid:".$sID;
$tID=$_POST['tID'];
$cID=$_POST['cID'];


$not=$_POST['note'];
$dat=$_POST['date'];
$pos=$_POST['position'];

$note=new note($sID,$tID,$cID);
$note->setInfo($not, $dat, $pos);
$note->isTableExist();
$note->uploadNotes();
?>