<?php
	class videoUploadCondition{  //fetch anything from  video;
		public $teacherNum=0;
		public $tID=array();
		public $vTotal=array();
		public $sql="";
		public function videoUploadCondtion(){
		 	$this->sql="SELECT * FROM `video` ";
		}
		public function selectData(){
			$conn=new connection();
			$conn->connect();
		$result=	$conn->queryDB("SELECT * FROM `video`");
		//	$result=$conn->queryDB($this->sql);
			if($result){
				$i=0;
				while($row=$result->fetch_assoc()){
					$this->teacherNum++;
					$this->tID[$i]=(int)$row['tID'];
					$this->vTotal=$row['vTotal'];
					$i++;
				}
				$conn->disconnect();
			}
			else
				echo 'Without data.';
		}//selectdata
	}
?>