<?php
include "mouseBehavior.php";
include "course_Single.php";
include "loginChecker.php";
$checker=new loginChecker();
$result=$checker->getStatus();
if(!$result)
	return 0;
$sid=$result;
$test=new mouseBehavior($sid,0,0);
$test->selectCourseWatchedInfo('clickBehavior');
//$test->selectCourseWatchedInfo('playHistory');
$data=$test->getCourseWatchedInfo();
$cs=new courseSingle();
$courseName['cNames']=$cs->queryCourses($data['CW_clickBehavior']['tID'], $data['CW_clickBehavior']['cID']);
$courseName+=$data['CW_clickBehavior'];
echo json_encode($courseName);
?>