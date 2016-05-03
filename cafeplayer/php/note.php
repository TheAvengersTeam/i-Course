<?php
include "connectDB.php";
class note{
	private $sID=0;
	private $tID=0;
	private $cID=0;
	private $notes="";
	private $date="";
	private $position=0.0;
	function note($sid,$tid,$cid){
		$this->sID=$sid;
		$this->tID=$tid;
		$this->cID=$cid;
	}	
	public function setInfo($not,$dat,$pos){
		$this->notes=$not;
		$this->date=$dat;
		$this->position=$pos;
	}
	public function isTableExist(){
		$sql_search="SHOW TABLES LIKE 'note_".$this->sID."'";
		$conn=new connection();
		$conn->connect();
		$result=$conn->isTableExist($sql_search);
		if($result==0){
			$this->createNoteTable();
			return 0;
		}
		echo "<br/> note_".$this->sID." is already exist.";
		return 1;
		$conn->disconnect();
	}
	public function createNoteTable(){
		$conn=new connection();
		$conn->connect();
		$sql="CREATE TABLE `note_".$this->sID."` ( `position` FLOAT(10) NOT NULL , `date` DATETIME(6) NOT NULL , `notes` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , `tID` INT(10) NOT NULL , `cID` INT(10) NOT NULL ) ";
		$res=$conn->createTable($sql);
		$conn->disconnect();
		if($res){
			echo "<br/> create note table successfully.";
			return 1;
		}
		echo "<br/>failed to create note table.";
		return 0;
	}
	public function uploadNotes(){
		$conn=new connection();
		$conn->connect();
		$sql="INSERT INTO `note_".$this->sID."` (`position`, `date`, `notes`, `tID`, `cID`) VALUES ('".$this->position."', '".$this->date."', '".$this->notes."', ".$this->tID.", ".$this->cID.")";
		$res=$conn->insertDB($sql);
		$conn->disconnect();
		if($res){
			echo "<br/>upload notes successfully.";
			return 1;
		}
		echo "<br/>failed to upload notes.";
		return 0;
	}
	
}
?>