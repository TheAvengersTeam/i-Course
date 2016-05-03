<?php
class connection{
	public	$servername=null;
	public	$username=null;
	public	$password=null;
	public	$dbname=null;
	public $conn=null;
	public function connection(){
		$this->servername="localhost";
		$this->username="root";
		$this->password="";
		$this->dbname="edu_db";
	}
	public function connect(){
		//new link;
		$this->conn=new mysqli($this->servername,$this->username,$this->password,$this->dbname);
		$this->conn->query("SET NAMES utf8");
		// test link
		if($this->conn->connect_error){
			die("Connection failed:".$this->conn->connect_error);
		}
	}
	public function queryDB($sql){
		$result=$this->conn->query($sql);
		if($result->num_rows>0){
			return $result;
		}
		$this->disconnect();
		return 0;
	}
	public function MutiqueryDB($sql){
		$arr=[];
		if($this->conn->multi_query($sql)){
			do{
				if($result=$this->conn-> store_result ()){
					while($row=$result->fetch_assoc()){
						array_push($arr,$row['cName']);
					}
					$result->free();
				}
				if($this->conn->more_results()){
					
				}
			}
			while($this->conn->next_result());
			
		}
		if($arr){
			return $arr;
		}
		$this->disconnect();
		return $arr;
		
		
	}
	public function insertDB($sql){
		if($result=$this->conn->query($sql)===TRUE){
			return 1;
		}
		else
			return 0;
	}
	public function insertMutiDB($sql){
		$result=$this->conn->multi_query($sql);
		if($result===TRUE){
			return 1;
		}
		else
			return $this->conn->more_results();
	}
	public function createTable($sql){
		if($result=$this->conn->query($sql)===TRUE)
			return 1;
		else 
			return 0;
	}
	public function deleteTableRecord($sql){
		if($result=$this->conn->query($sql)===TRUE)
			return 1;
		else 
			return 0;
	}
	public function updateTableRecord($sql){
		if($result=$this->conn->query($sql)===TRUE)
			return 1;
		else 
			return 0;
	}
	public function isTableExist($sql){
		$search=$this->conn->prepare($sql);
		$search->execute();
		$search->store_result();		
		if($search->num_rows!=1)
			return 0;
		return 1;
	}
	public function disconnect(){
		$this->conn->close();
	}
}
?>