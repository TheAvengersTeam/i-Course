<?php
session_start();
$time=$_POST['time'];
$annotation=$_POST['annotation']	;
$tID=$_SESSION['uid'];
$cID=$_POST['cID'];
if(is_numeric($tID)==FALSE || is_numeric($cID)==FALSE){
	echo 'tID=null';
	return 0;
}
//connection
$servername="localhost";
$username="root";
$password="";
$dbname="edu_db";
//new link;
$conn=new mysqli($servername,$username,$password,$dbname);
$conn->query("SET NAMES utf8");
// test link
if($conn->connect_error){
	die("Connection failed:".$conn->connect_error);
}
// look for table by tID cID

// NOT EXIST &&  create table 
// EXIST   && insert record
//the following code just for test;
//foreach($time as $key=>$val){
//	echo 'time',$key,'=',$val,'<br/>';
//}
//foreach($annotation as $key2=>$val2){
//	echo 'annotation',$key2,'=',$val2,'<br/>';
//}
searchTablebyKind('annotation');
cleanAnnotation();
insertAnnotationInfo();
function searchTablebyKind($kind){
	global $conn,$tID,$cID;
	switch($kind){
		case 'annotation':
						 //search table
						 $sql_search="SHOW TABLES LIKE 'videoAnn_".$tID."_".$cID."'";
						 $search=$conn->prepare($sql_search);
						 $search->execute();
						 $search->store_result();
						//if($search->num_rows==1)
							//echo "<br/>Exist<br/>";
						if($search->num_rows!=1)
					 		createTableAnn($tID,$cID);
						break;
	}
}

function createTableAnn($tID,$cID){
	global $conn,$tID,$cID;
	 //create table
	$sql_createTable="CREATE TABLE videoAnn_".$tID."_".$cID." (time FLOAT NOT NULL,annotation VARCHAR(150) NOT NULL )";
	 $conn->query($sql_createTable);
}
function cleanAnnotation(){
	global $conn,$tID,$cID;
	$sql_clean="DELETE FROM `videoAnn_".$tID."_".$cID."` WHERE 1";
	$result=$conn->query($sql_clean);

}
function insertAnnotationInfo(){
	global $conn,$tID,$cID,$time,$annotation;
	$i=0;
	while((list($key,$val)=each($time)) && (list($key2,$val2)=each($annotation))){
		//insert record cName cID in video_1;
		$sql_insert="INSERT INTO `videoAnn_".$tID."_".$cID."`(`time`, `annotation`) VALUES (".$val.",'".$val2."')";
		$result=$conn->query($sql_insert);
//		var_dump($val);
//		var_dump($val2);
//		echo "<br/>";
		if($result)
			$i++;
	}
	updateaTotal($i);
	if($result)
		echo 1;
	else
		echo 0;
	
}
function updateaTotal($aTotal){
	global $conn,$cID,$tID;
	$sql_update="UPDATE `video_".$tID."` SET `aTotal`=".$aTotal." WHERE cID=".$cID;
	$conn->query($sql_update);
}





?>