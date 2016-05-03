<?php
//get tID cName;
session_start();
if(empty($_SESSION['uid']))
{
	echo -1;   //login please
	return;
}
$cName=$_POST["cName"];  
$subject=$_POST['subject'];
$grade=$_POST['grade'];
$tID=$_SESSION['uid'];

if(is_numeric($tID)==FALSE){
	echo 'tID=null';
	return 0;
}
if(empty($cName)){
	echo 'Please input your course name!';
	return 0;
}
else if(empty($subject)){
	echo 'Please input course subject!';
	return 0;
}
else if(empty($grade)){
	echo 'Please input the grade!';
	return 0;
}
$vTotal=0;
$cID=0;
//init the saving path
$path="upload/".$tID."/video";  
$path2="upload/".$tID."/image";
echo $path;
$sPath=$path."/".$cName.".mp4";
$sPath2=$path2."/".$cName.".jpg";
//look for the file
getDir($path);
getDir($path2);   
//upload the video
$result1=saveVideo();
if($result1)
	$result2=savecImage();
else {
	echo "<script>alert('Failed to upload files. Check your video file again.');history.go(-1);</script>";
	return 0;
}
if(!$result2){
	echo "<script>alert('Failed to upload files. Check your image file again.');history.go(-1);</script>";
	return 0;
}

$servername="localhost";
$username="root";
$password="";
$dbname="edu_db";
//new link;
$conn=new mysqli($servername,$username,$password,$dbname);
// test link
$conn->query("SET NAMES utf8");
if($conn->connect_error){
	die("Connection failed:".$conn->connect_error);
}

getvTotal(); // get vTotal by tID;
setcIDnvTotal();    //set cID ;
searchTable();
updatevTotal();
insertCourseInfo();
$conn->close();
//if($result1&& $result2){
//	header("location:./Video.html");
//}

function getDir($p){   // find and create the file 
	if(is_dir($p)){
		echo "The directory is already exist.";
	}
	else{
		$res=mkdir(iconv("UTF-8", "GBK", $p),0777,TRUE);
		if($res)
			echo "succeeded.";
		else
			echo "failed";
	}
}
function saveVideo(){
	global $sPath;
	
	$allowedExts = array("mp4");  //the kind of the video mp4
	$temp = explode(".", $_FILES["file"]["name"][0]);  //split the content by .
	$extension = end($temp);
	if (($_FILES["file"]["type"][0] == "video/mp4")
	&& ($_FILES["file"]["size"][0] < 41943040)   //the size of the video about 40m
	&& in_array($extension, $allowedExts))
	{
		if ($_FILES["file"]["error"][0] > 0)
		{
		echo "Return Code: " . $_FILES["file"]["error"][0] . "<br>";
		}
		else
		{
			echo "Upload: " . $_FILES["file"]["name"][0] . "<br>";
			echo "Type: " . $_FILES["file"]["type"][0] . "<br>";
			echo "Size: " . ($_FILES["file"]["size"][0] / 1024) . " kB<br>";
			echo "Temp file: " . $_FILES["file"]["tmp_name"][0] . "<br>";
		
			if (file_exists($sPath))
			{
				echo $_FILES["file"]["name"][0] . " already exists. ";
			}
			else
			{
				move_uploaded_file($_FILES["file"]["tmp_name"][0],
				$sPath);
				echo "Stored in: " . $sPath;
			}
			return 1;
		}
	}
	else
	{	
		echo "Invalid file";
		if ($_FILES["file"]["type"][0] != "video/mp4")
			echo "<script>alert('Failed to upload files. The type of the video isn't mp4.');history.go(-1);</script>";
		else if($_FILES["file"]["size"][0] < 41943040)
			echo "<script>alert('Failed to upload files. You video files is required to under 40M.');history.go(-1);</script>";
		else
			echo "<script>alert('Failed to upload files. Check your video file again.');history.go(-1);</script>";
		return 0;
	}
}
function savecImage(){
	global $sPath2;
	$i=1;
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES["file"]["name"][$i]);
	$extension = end($temp);
	if ((($_FILES["file"]["type"][$i] == "image/gif")
	|| ($_FILES["file"]["type"][$i] == "image/jpeg")
	|| ($_FILES["file"]["type"][$i] == "image/jpg")
	|| ($_FILES["file"]["type"][$i] == "image/pjpeg")
	|| ($_FILES["file"]["type"][$i] == "image/x-png")
	|| ($_FILES["file"]["type"][$i] == "image/png"))
	&& ($_FILES["file"]["size"][$i] <= 40000)
	&& in_array($extension, $allowedExts))
	{
	if ($_FILES["file"]["error"][$i] > 0)
	{
	echo "Return Code: " . $_FILES["file"]["error"][$i] . "<br>";
	}
	else
	{
	echo "Upload: " . $_FILES["file"]["name"][$i] . "<br>";
	echo "Type: " . $_FILES["file"]["type"][$i] . "<br>";
	echo "Size: " . ($_FILES["file"]["size"] [$i]/ 1024) . " kB<br>";
	echo "Temp file: " . $_FILES["file"]["tmp_name"][$i] . "<br>";
	
	if (file_exists($sPath2))
	{
	echo $_FILES["file"]["name"][$i] . " already exists. ";
	}
	else
	{
	move_uploaded_file($_FILES["file"]["tmp_name"][$i],
	$sPath2 );
	echo "Stored in: " . $sPath2 ;
	}
	}
		return 1;
	}
	else
	{
		echo "Invalid file";
		if($_FILES["file"]["size"][$i] > 40000)
			echo "<script>alert('Failed to upload files. You image files is required to under 40Kb.');history.go(-1);</script>";
		else if(!(($_FILES["file"]["type"][$i] == "image/gif")
	|| ($_FILES["file"]["type"][$i] == "image/jpeg")
	|| ($_FILES["file"]["type"][$i] == "image/jpg")
	|| ($_FILES["file"]["type"][$i] == "image/pjpeg")
	|| ($_FILES["file"]["type"][$i] == "image/x-png")
	|| ($_FILES["file"]["type"][$i] == "image/png"))){
			echo "<script>alert('Failed to upload files. Check the type of your images.');history.go(-1);</script>";				
		}
		else 			
			echo "<script>alert('Failed to upload files. Check the your images.');history.go(-1);</script>";				
		return 0;
	}
}

function getvTotal(){
	global $conn,$tID,$vTotal;
	$sql="SELECT tID, vTotal FROM video WHERE tID=".$tID;
	$result=$conn->query($sql);
	if($result->num_rows> 0){
		while($row=$result->fetch_assoc()){
			echo "<br> tID:". $row["tID"]." - vTotal: ".$row["vTotal"];
			$vTotal=$row["vTotal"];
		}
		echo "<br/> vTotal:".$vTotal;
	}
	else{
		insertVideoForm();
		echo "0 results";
	}
}
function insertVideoForm(){
	global $conn,$tID,$vTotal;
	$sql_inserttID="INSERT INTO `video`(`tID`, `vTotal`) VALUES (".$tID.",'".$vTotal."')";
	$conn->query($sql_inserttID);
}
function setcIDnvTotal(){
	global	$vTotal,$cID;
	if($vTotal>=0){
		$cID=1+$vTotal;
		$vTotal++;
	}
}

function updatevTotal(){
	global $conn,$vTotal,$tID;
	//update vTotal from video
	$sql_update="UPDATE video SET vTotal = ".$vTotal." WHERE tID =".$tID;
	$conn->query($sql_update);
}


function insertCourseInfo(){
	global $conn,$tID,$cID,$cName,$subject,$grade;
	//insert record cName cID in video_1;
	$sql_insert="INSERT INTO `video_".$tID."`(`cID`, `cName`, `aTotal` ,`subject`,`grade`) VALUES (".$cID.",'".$cName."',0, '".$subject."', ".$grade.")";
	$conn->query($sql_insert);
}

function createTable(){
	global $tID,$conn;
	 //create table
	$sql_createTable="CREATE TABLE video_".$tID." (cID INT NOT NULL,cName VARCHAR(20) NOT NULL , aTotal INT(10) NOT NULL, subject VARCHAR(20) NOT NULL, grade INT(10) NOT NULL )";
	 $conn->query($sql_createTable);
}
 function searchTable(){
 	global $conn,$tID;
	 //search table
	 $sql_search="SHOW TABLES LIKE 'video_".$tID."'";
	 $search=$conn->prepare($sql_search);
	 $search->execute();
	 $search->store_result();
	if($search->num_rows==1)
		echo "<br/>Exist";
	else
 		createTable();
 }

////add column
//$sql_add="ALTER TABLE courseVideo ADD cN2 VARCHAR(10) not null";
//$conn->query($sql_add);
?>