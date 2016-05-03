<?php
	class courseDetail{ //fetch info from video_tID
		 public $cID= array();
		 public $cName= array();
		 public $aTotal= array();
		 public $subject= array();
		 public $grade= array();
		 public $tID=null;
		 public $cNum=0;
		 public $sql="";
		 public function courseDetail($id){
		 	$this->tID=$id;
			$this->sql="SELECT * FROM `video_".$id."` ";
		 }
		 public function getInfo(){
			$conn=new connection();
			$conn->connect();
			$result=$conn->queryDB($this->sql);
			if($result){
				$i=0;
				while($row=$result->fetch_assoc()){
					$this->cID[$i]=(int)$row['cID'];
					$this->cName[$i]=$row['cName'];
					$this->aTotal[$i]=(int)$row['aTotal'];
					$this->subject[$i]=$row['subject'];
					$this->grade[$i]=(int)$row['grade'];
					$i++;
					$this->cNum++;
				}
			}
			else 
				echo "failed.";
		 }
		 public function display(){
			var_dump( $this->cID);
			echo "<br/>";
			var_dump( $this->cName);
			echo "<br/>";
			var_dump( $this->aTotal);
			echo "<br/>";
			var_dump( $this->subject);
			echo "<br/>";
			var_dump( $this->grade);
			echo "<br/>";
		 }
	}
?>