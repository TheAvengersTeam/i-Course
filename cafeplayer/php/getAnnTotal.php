<?php
	session_start();
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
		$aTotal=[];
		$sql_getAnnTotal="SELECT * FROM `video_".$tID."`";//.$tID."`";
		$result=$conn->query($sql_getAnnTotal);
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				$i=(int)$row['cID'];
				$aTotal[$i]=$row['aTotal'];
			}
			echo json_encode($aTotal);
		}
		else
			echo 0;
?>