<?php
include "courseDetail.php";
class courses{//many courses
	public $courseType=array();
	public $courseGrade=array();
	public $gradeTotal=0;
	public $courseAssem=array();
	public function courses($type,$total){
		$this->gradeTotal=$total;
		$this->courseType=$type;
		//init courseGrade
		$i=1;
		while($total--){
			array_push($this->courseGrade,$i);
			$i++;
		}
	}//contruct;
	public function init(){
		for($i=0;$i<sizeof($this->courseType, 0);$i++){
			$name="";
			for($j=0;$j<sizeof($this->courseGrade, 0);$j++){
				$name=$this->courseType[$i].$this->courseGrade[$j];
				$$name = new course();
				$$name->init($j,$this->courseType[$i]);
				$this->courseAssem[$name]=$$name;
			}
		}
		return $this->courseAssem;
	}//init
	public function display(){
		function walkItems($item,$key){
			echo $key.":<br/>";
			$item->display();
		}
		
			array_walk($this->courseAssem,'walkItems');
		
		echo course::$count;
	}
	public function clarifynRecord(videoUploadCondition $videoCondition){
		for($i=0;$i<$videoCondition->teacherNum;$i++){
			$cDetail=new courseDetail($videoCondition->tID[$i]);
			$cDetail->getInfo();
			for($j=0;$j<$cDetail->cNum;$j++){
				$classname=$this->courseTranslation($cDetail->subject[$j]).$cDetail->grade[$j];
				$this->courseAssem[$classname]->push($cDetail->cID[$j],$cDetail->tID,$cDetail->cName[$j],$cDetail->aTotal[$j]);
			}
		}
	}// clarify&record
	public function courseTranslation($sname){
		$name="";
		switch($sname){
			case '语文':	$name='chinese';break;
			case '数学':	$name='math';break;
			case '英语':	$name='english';break;
			default:$name='';echo 'subjectName error';break;
		}
		return $name;
	}
	public function courseAssemJsonCode(){
		return json_encode($this->courseAssem);
	}
}
?>