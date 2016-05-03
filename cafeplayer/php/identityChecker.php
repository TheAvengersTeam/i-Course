<?php
class identity{
	private $uid=0;
	private $type=0;
	function identity(){
		session_start();
		$this->uid=$_SESSION['uid'];
		$this->type=$this->typeJudger($_SESSION['type']);
	}
	public function typeJudger($s){
		if($s=='老师')
			return 1;
		else
			return 2;
	}
	public function getID(){
		return $this->uid;
	}
	public function getType(){
		return $this->type;
	}
}
?>