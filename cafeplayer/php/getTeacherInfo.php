<?php
include "teacher.php";

$id=$_GET['id'];
if(!$id)
{
	echo 0;//'<script>alert("Please select the course.");</script>';
	return 0;
}
if(!is_numeric($id)){
	echo 0;
	return 0;
}
$t=new teacher();
$t->searchTeacherByID($id);
$t->jsonEncodeInfo();
?>