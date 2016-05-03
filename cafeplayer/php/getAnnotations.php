<?php
include "annotation.php";
$tID=$_POST['tID'];
$cID=$_POST['cID'];
if(is_numeric($tID) && is_numeric($cID)){
	$ann=new annotation($tID,$cID);
}
else	
	echo 0;
?>