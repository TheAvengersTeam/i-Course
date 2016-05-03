<?php
include "connectDB.php";
include "course.php";
include "courses.php";
include "videoUploadCondition.php";

//	session_start();
//	if(empty($_SESSION['uid'])){
//		return 0;
//	}
	
	// create array for all kind class
	//m-math c-chinese e-english
	//grade 1-6;
	$courseType=array('chinese','math','english');//$_POST['subject']; // //
	$gradeTotal=6;//$_POST['gradeTotal'];// 6; //
	//assemblage of all kinds of courses.  chinese1 .etc
	$courseController=new courses($courseType,$gradeTotal);
	$courseController->init();

	$videoUpld=new videoUploadCondition();
	$videoUpld->selectData();
	$courseController->clarifynRecord($videoUpld);
	echo $courseController->courseAssemJsonCode();
	//$courseController->display();
	
	
?>