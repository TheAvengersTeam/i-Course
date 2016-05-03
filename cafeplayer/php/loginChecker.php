<?php
	session_start();
	class loginChecker{
		public $status=0;
		public function loginChecker(){
			if(!empty($_SESSION['uid']))  $this->status=$_SESSION['uid'];
		}
		public function getStatus(){
			return $this->status;
		}
	}
?>