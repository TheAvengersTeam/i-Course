<?php
include "connectDB.php";

class teacher{
	private $tID=0;
	private $Name="";
	private $Sex="";
	private $vTotal="";
	protected $password="";
	private $infoAssem=[];
	function teacher(){
		
	}
	public function searchTeacherByID($id){
		$this->tID=$id;
		$conn=new connection();
		$conn->connect();
		$result=$conn->queryDB('SELECT * FROM `teacherInfo` WHERE tID='.$this->tID);
		if(!$result){
			echo 'Without such a person.';
			return 0;
		}
		while($row=$result->fetch_assoc()){
			$this->Name=$row['Name'];
			$this->Sex=$row['Sex'];
			$this->vTotal=$row['vTotal'];
			$this->password=$row['password'];
		}
		$this->infoAssem['tID']=(int)$this->tID;
		$this->infoAssem['Name']=$this->Name;
		$this->infoAssem['Sex']=$this->Sex;
		$this->infoAssem['vTotal']=(int)$this->vTotal;
	}
	public function jsonEncodeInfo(){
		if($this->infoAssem)
			echo json_encode($this->infoAssem);
	}
	
}
?>