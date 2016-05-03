<?php
	session_start();
	$cID=$_POST['cID'];
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
	$tID=$_SESSION['uid'];
	$annotation=[];
	
	$sql_select="SELECT * FROM `videoAnn_".$tID."_".$cID."` ";
	$result=$conn->query($sql_select);
	if($result->num_rows>0){
		while($row=$result->fetch_assoc()){
			$annotation[$row['time']]=$row['annotation'];
		}
		echo json_encode($annotation);
	}
	else
		echo 0;
?>