<?php
session_start();
$type=$_POST['type'];
$tID=$_POST['tID'];
$pwd=$_POST['pwd'];
if(!is_numeric($tID)){
	echo "-3"; //Please enter your ID.
	return 0;
}
if(empty($pwd) || $pwd=='Please enter.'){
	echo "-2";//Please enter your code.
	return 0;
}
$tablename="";
$record="";
if($type=='老师'){
	$tablename='teacherInfo';
	$record='tID';	
}
else	{
	$tablename='studentInfo';
	$record='sID';
}
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
confirmIdentity($tID, $pwd);
function confirmIdentity($id,$code){
	global $conn,$tablename,$record,$type;
	$sql_getInfo="SELECT ".$record.",password FROM ".$tablename." WHERE ".$record."=".$id;
	$result=$conn->query($sql_getInfo);
	if($result->num_rows>0){
		while($row=$result->fetch_assoc()){
			$ID=$row[$record];
			$CODE=$row['password'];
		}
		if($ID==$id && $CODE==$code){
			$_SESSION['uid']=$id;
			$_SESSION['pwd']=$code;
			$_SESSION['type']=$type;
			echo "1";//Successfully!
		}
		else
			echo "0";//Wrong password.
	}
	else
		echo "-1";//Wrong ID;
}

?>