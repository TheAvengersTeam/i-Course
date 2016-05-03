<?php 
include "connectDB.php";
class annotation{
	private $time=[];
	private $anns=[];
	private $tID=0;
	private $cID=0;
	public $courseAnn=array();
	function annotation($tid,$cid){
		$this->tID=$tid;
		$this->cID=$cid;
		$this->queryAnno();
		$this->get_jsonResult();
	}
	public function queryAnno(){
		if($this->tID && $this->cID){
			$conn=new connection();
			$conn->connect();
			$result=$conn->queryDB('SELECT * FROM `videoAnn_'.$this->tID.'_'.$this->cID.'`');
			if(!$result){
				echo 'failed to select.';
				return 0;
			}
			while($row=$result->fetch_assoc()){
				array_push($this->time,(int)$row['time']);
				array_push($this->anns,$row['annotation']);
			}
		}
	}
	public function get_jsonResult(){
		if(!$this->time || !$this->anns)
			return 0;
		$this->courseAnn['time']=$this->time;
		$this->courseAnn['annotation']=$this->anns;
		echo json_encode($this->courseAnn);
	}
}
?>