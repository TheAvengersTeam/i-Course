<?php
include "connectDB.php";
class mouseBehavior{
	private $clickTimes=0;
	private $clock=[];
	private $position=[];
	
	private $playHistory=[];
	private $time=[];
	
	private $mbAssem=[];
	
	private $cw_click_tid=[];
	private $cw_click_cid=[];
	private $courseWatched_click=[]; //assem cover the data above;
	
	private $cw_playH_tid=[];
	private $cw_playH_cid=[];
	private $courseWatched_playHistory=[];//assem cover..
	
	private $courseWatchedInfo=[];
	
	private $fastforward=[];
	private $rewind=[];
	private $partition=0;
	
	private $cID=0;
	private $tID=0;
	private $sID=0;
	function mouseBehavior($sid,$tid,$cid){
		$this->sID=$sid;
		$this->cID=$cid;
		$this->tID=$tid;
	}
	public function 	downloadTableInfo($type){
		$tempTime=[];
		$tempPosition=[];
		$row1='clock';
		$row2='position';
		$tablename='playHistory';
		if($type)
			$tablename='clickBehavior';
		$conn=new connection();
		$conn->connect();
		$sql="SELECT * FROM `".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."` ";
		$result=$conn->queryDB($sql);
		if(!$result){
			echo "<br/>Without any click behavior.";
			return 0;
		}
		while($row=$result->fetch_assoc()){
			array_push($tempTime,(int)$row[$row1]);
			array_push($tempPosition,(int)$row[$row2]);
		}
		if($type){
			$this->clock=$tempTime;
			$this->position=$tempPosition;
		}
		else{
			$this->time=$tempTime;
			$this->playHistory=$tempPosition;
		}
		$conn->disconnect();
		$this->clickTimes=sizeof($this->clock, 0);
	}
	public function getMouseBehavior(){
		$this->mbAssem['clock']=$this->clock;
		$this->mbAssem['position']=$this->position;
		$this->mbAssem['playHistory']=$this->playHistory;
		$this->mbAssem['time']=$this->time;
		echo json_encode($this->mbAssem);
	}
	public function isTableExist($tablename){
		$sql_search="SHOW TABLES LIKE '".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."'";
		$conn=new connection();
		$conn->connect();
		$result=$conn->isTableExist($sql_search);
		if($result==0){
			$this->createTable($tablename);
			$this->remarkwTotal();
			return 0;
		}
		echo "<br/>".$tablename." is already exist.";
		return 1;
		$conn->disconnect();
	}
	public function createTable($tablename){
		$conn=new connection();
		$conn->connect();
		$sql="CREATE TABLE `".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."` ( `clock` FLOAT(10) NOT NULL , `position` FLOAT(10) NOT NULL )";
		$result=$conn->createTable($sql);
		$conn->disconnect();
		if($result){
			echo "<br/>create successfully.";
			return 1;
		}
		echo "<br/>failed to create.";
		return 0;
	}
	public function setClickBehavior($clo,$pos,$times){
		$this->clock=$clo;
		$this->position=$pos;
		$this->clickTimes=$times;
	}
	public function setPlayHistory($ph,$t){
		$this->playHistory=$ph;
		$this->time=$t;
	}
	public function setParition($part){
		$this->partition=$part;
	}
	public function saveTable($tablename){
		$this->cleanTableContent($tablename);
		$conn=new connection();
		$conn->connect();
		$sql="";
		if($tablename=='clickBehavior')
			for($i=0;$i<$this->clickTimes;$i++){
				$this->clock[$i]-=$this->clock[0];
				if(is_numeric($this->position[$i]))
					$sql .=" INSERT INTO `".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."` (`clock`, `position`) VALUES (".$this->clock[$i].", ".$this->position[$i].");";
			}
		else
			for($i=0;$i<sizeof($this->playHistory, 0);$i++){
				$this->time[$i]-=$this->time[0];
				if(is_numeric($this->playHistory[$i]))
					$sql .=" INSERT INTO `".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."` (`clock`, `position`) VALUES (".$this->time[$i].", ".$this->playHistory[$i].");";
			}
		$result=$conn->insertMutiDB($sql);
		$conn->disconnect();
		if($result){
			echo "<br/>saved ".$tablename." successfully!";
			return 1;
		}
		echo "<br/>failed to save record in clickBehavior table.";
		return 0;
	}
	public function cleanTableContent($tablename){
		$conn=new connection();
		$conn->connect();
		$sql="DELETE FROM `".$tablename."_".$this->sID."_".$this->tID."_".$this->cID."`";
		$res=$conn->deleteTableRecord($sql);
		$conn->disconnect();
		if($res){
			echo "<br/>deleted successfully.";
			return 1;
		}
		echo "<br/>failed to delete.";
		return 0;
	}
	public function remarkwTotal(){
		$conn=new connection();
		$conn->connect();
		$sql_getwTotal="SELECT `wTotal`FROM `studentInfo` WHERE sID=".$this->sID;
		$res=$conn->queryDB($sql_getwTotal);
		$wTotal=$res->fetch_assoc()['wTotal'];
		$wTotal++;
		$sql="UPDATE `studentInfo` SET `wTotal`=".$wTotal." WHERE sID=".$this->sID;
		if($conn->updateTableRecord($sql))
			echo "<br/>succeeded to update wTotal";
		else
			echo "<br/>failed to update wTotal.";
	}
	public function isCourseWatchedExist($tablename){
		$sql_search="SHOW TABLES LIKE '".$tablename."_".$this->sID."'";
		$conn=new connection();
		$conn->connect();
		$result=$conn->isTableExist($sql_search);
		$conn->disconnect();
		if($result==0){
			$this->createTableforCourseWatched($tablename);
			return 0;
		}
		echo "<br/>".$tablename."_".$this->sID." is already exist.";
		return 1;
	}
	public function createTableforCourseWatched($tablename){
		$conn=new connection();
		$conn->connect();
		$sql="CREATE TABLE `".$tablename."_".$this->sID."` ( `tID` INT(10) NOT NULL , `cID` INT(10) NOT NULL )";
		$result=$conn->createTable($sql);
		$conn->disconnect();
		if($result){
			echo "<br/>create successfully.";
			return 1;
		}
		echo "<br/>failed to create.";
		return 0;
	}
	public function remarkCourseWatched($tablename){ //remark it in clickBehavior_sid or playHistory_sid;
		$conn=new connection();
		$conn->connect();
		$sql="INSERT ignore INTO `".$tablename."_".$this->sID."` (`tID`, `cID`) VALUES (".$this->tID.", ".$this->cID.");";
		$result=$conn->insertDB($sql);
		$conn->disconnect();
		if($result)
			echo "<br/>Insert successfully!";
		else
			echo "<br/>Failed to insert.";
		
	}
	public function isRecordExist($tablename){
		$conn=new connection();
		$conn->connect();
		$sql="SELECT * FROM `".$tablename."_".$this->sID."` WHERE tID=".$this->tID." AND cID=".$this->cID;
		$result=$conn->queryDB($sql);
		if($result){
			echo "<br/>exist such a record.";
			return 1;
		}
		echo "<br/>not exist.";
		$this->remarkCourseWatched($tablename);
		return 0;
	}
	public function selectCourseWatchedInfo($tablename){
		$conn=new connection();
		$conn->connect();
		$sql="SELECT * FROM ".$tablename."_".$this->sID;
		$result=$conn->queryDB($sql);
		if(!$result){
			echo "<br>Without any result from ".$tablename."_".$this->sID;
			return 0;
		}
		$temptid=[];
		$tempcid=[];
		while($row=$result->fetch_assoc()){
			array_push($temptid,$row['tID']);
			array_push($tempcid,$row['cID']);
		}
		if($tablename=='clickBehavior'){
			$this->cw_click_tid=$temptid;
			$this->cw_click_cid=$tempcid;
			$this->courseWatched_click['tID']=$this->cw_click_tid;
			$this->courseWatched_click['cID']=$this->cw_click_cid;
			return 1;
		}
		$this->cw_playH_tid=$temptid;
		$this->cw_playH_cid=$tempcid;
		$this->courseWatched_playHistory['tID']=$this->cw_playH_tid;
		$this->courseWatched_playHistory['cID']=$this->cw_playH_cid;
		return 2;
	}
	public function getCourseWatchedInfo(){
		$this->courseWatchedInfo['CW_clickBehavior']=$this->courseWatched_click;
		$this->courseWatchedInfo['CW_playHistory']=$this->courseWatched_playHistory;
	//	echo json_encode($this->courseWatchedInfo);
		return $this->courseWatchedInfo;
	}
}
?>