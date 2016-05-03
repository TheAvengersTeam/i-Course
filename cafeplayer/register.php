<?php
session_start();
$name=$_POST['name'];
$sex=$_POST['sex'];
$pwd=$_POST['rpassword'];
$tID=0;
if(empty($name) || empty($sex) || empty($pwd)){
	echo "用户信息要求完整。";
	return 0;
}
//get the total of teachers.
//generate tID;
//insert the record ;
// return tID ;
// run counter in wholeForm about teachersTotal

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
//get && set tID;
$tID=getTeachersTotal()+1;
echo $tID;
//init the saving path
$path2="upload/".$tID;
$sPath2=$path2."/head.jpg";
//look for the file
getDir($path2);   
//upload the head img
$result=saveheadImage();
//echo $result;
if($result==1){
	insertTeacherInfo($tID, $name, $sex, $pwd);
	updateWholeForm($tID);
	$_SESSION['uid']=$tID;
	$_SESSION['pwd']=$pwd;
	header('location:./infoCenter.html');  //jump
}
else
	echo "<script> alert('照片大于50k,请重新上传。');history.go(-1);</script>";  //BACK FOR THE BIG SIZE;
function getTeachersTotal(){
	global $conn;
	$teachersTotal=0;
	$sql_select="SELECT * FROM wholeForm";
	$result=$conn->query($sql_select);
	if($result->num_rows>0){		
		while($row=$result->fetch_assoc()){
			$teachersTotal=$row["teachersTotal"];
			echo "There are ".$teachersTotal." teachers.<br/>";
		}
	}
	else{
		echo '0 result;';
	}
	return $teachersTotal;
}
function insertTeacherInfo($tid,$tname,$tsex,$tpwd){
	global $conn;
	$sql_insert="INSERT INTO `teacherInfo` (`tID`, `Name`, `Sex`, `vTotal`, `password`) VALUES ('".$tid."', '".$tname."', '".$tsex."', '0', '".$tpwd."')";
	$result=$conn->query($sql_insert);
	if($result){
		echo '<br/>You tID is '.$tid;
	}
	else{
		echo '<br/>Unfortunately failed.';
	}
}
function updateWholeForm($sum){
	global $conn;
	//$sql_="UPDATE `wholeForm` SET `teachersTotal`= 1 WHERE 1";
	$sql_update="UPDATE `wholeForm` SET `teachersTotal`= ".$sum." WHERE 1";
	if($conn->query($sql_update))
		echo '<br/>Successfully!';
	else
		echo '<br/>failed to update.';
}


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

function saveheadImage(){
	global $sPath2;
	$i=1;
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES["file"]["name"]);
	$extension = end($temp);
	if ((($_FILES["file"]["type"] == "image/gif")
	|| ($_FILES["file"]["type"] == "image/jpeg")
	|| ($_FILES["file"]["type"] == "image/jpg")
	|| ($_FILES["file"]["type"] == "image/pjpeg")
	|| ($_FILES["file"]["type"] == "image/x-png")
	|| ($_FILES["file"]["type"] == "image/png"))
	&& ($_FILES["file"]["size"] < 50000)
	&& in_array($extension, $allowedExts))
	{
	if ($_FILES["file"]["error"] > 0)
	{
		echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
		return 0;
	}
	else
	{
		echo "Upload: " . $_FILES["file"]["name"] . "<br>";
		echo "Type: " . $_FILES["file"]["type"] . "<br>";
		echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
		echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
		
			if (file_exists($sPath2 ))
			{
				echo $_FILES["file"]["name"] . " already exists. ";
				return 0;
			}
			else
			{
				move_uploaded_file($_FILES["file"]["tmp_name"],
				$sPath2 );
				echo "Stored in: " . $sPath2;
				return 1;
			}
	}
}
	else
	{
		echo "Invalid file";
		return 0;
	}
}

//$tname,$tsex,$tpwd
//	$sql_insert="INSERT INTO 'teacherInfo'('tID','Name','Sex','vTotal','password') VALUES ('".."') "

?>