<?php
	class course{  // container for every kinds of lesson (english1,chinese2.etc.)
	 	public $grade=null;
		public $subject="";
		public $cID=[];
		public $cName=[];
		public $aTotal=[];
		public $tID=[];
		public static $count=0;
		public function init($g,$sub){
			$this->grade=$g;
			$this->subject=$sub; 
		}
		public function push($id,$tid,$name,$total){
			array_push($this->cID,$id);
			array_push($this->tID,$tid);
			array_push($this->cName,$name);
			array_push($this->aTotal,$total);
		}
		public function display(){
			for($i=0;$i<sizeof($this->cID, 0);$i++){
				echo $i."	cID:".$this->cID[$i]." tID:".$this->tID[$i]." cName:".$this->cName[$i]." aTotal:".$this->aTotal[$i].'<br/>';
				course::$count++;
			}
		}
	}
?>