<?
//include "connectDB.php";
class courseSingle{
	private $tID=0;
	private $cID=0; 	
	private $cName=""; 	
	private $aTotal=0;
	private $subject=""; 	
	private $grade=0;
	
	public function queryCourse($tid,$cid){
		$this->tID=$tid;
		$this->cID=$cid;
		$conn=new connection();
		$conn->connect();
		$sql="SELECT cName FROM video_".$this->tID." WHERE cID=".$this->cID;
		$result=$conn->queryDB($sql);
		if(!$result){
			echo "without any result.";
			return 0;
		}
		while($row=$result->fetch_assoc()){
			$this->cName=$row['cName'];
		}
		echo $this->cName;
	}
	public function queryCourses($tidG,$cidG){
		$conn=new connection();
		$conn->connect();
		$sql="";
		for($i=0;$i<sizeof($tidG, 0);$i++){
			$sql.="SELECT cName FROM video_".$tidG[$i]." WHERE cID=".$cidG[$i].";";
		}
		$result=$conn->MutiqueryDB($sql);
		if(!$result){
			echo "without any result.";
			return 0;
		}
		$tempName=[];
		$tempName=$result;
		return $tempName;
	}
}
?>