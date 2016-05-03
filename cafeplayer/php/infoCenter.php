<?php
	session_start();
	if(!empty($_SESSION['uid']) && !empty($_SESSION['pwd'])){
		$conn=connection();
		displayInfo($conn);
	}
	function connection(){
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
		return $conn;
	}
	function displayInfo($connection){
		$info=new ArrayObject();
		$sql_select="SELECT * FROM teacherInfo WHERE tID=".$_SESSION['uid'];
		$result=$connection->query($sql_select);	
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				$info['tID']=$row['tID'];
				$info['pwd']=$row['password'];
				$info['name']=$row['Name'];
				$info['sex']=$row['Sex'];
				$info['vTotal']=$row['vTotal'];
			}
				echo json_encode($info) ;
		}
		else{
			echo  0;
		}
	}
?>