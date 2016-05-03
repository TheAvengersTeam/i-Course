<?php
	session_start();
	getCourseInfo();
	function getCourseInfo(){
		global $flag;
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
		$courseInfo=[];
		$vTotal=0;
		
		$sql_getInfo="SELECT * FROM `video_".$tID."` ";
		$result=$conn->query($sql_getInfo);
		
		$sql_getvTotal="SELECT vTotal FROM `video` WHERE tID=".$tID;
		$vResult=$conn->query($sql_getvTotal);
		
		if($vResult->num_rows>0){
				while($row=$vResult->fetch_assoc()){
					$vTotal=$row['vTotal'];
				}
				$courseInfo['total']=$vTotal;
			}
			else
				echo "-2";//Wrong ID;
	
		if($vResult->num_rows>0){
			if($result->num_rows>0){
				while($row=$result->fetch_assoc()){
					$i=(int)$row['cID'];
					$courseInfo[$i]=$row['cName'];
				}
					echo json_encode($courseInfo);
			}
			else
				echo "-1";//Wrong ID;
		}
		
	}
		
?>