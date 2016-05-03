$(document).ready(function(){
	$('#summit').click(function(){
		location.href="index.html";
	});
	$.post("php/infoCenter.php",function(result){
		if(result==0)
			alert("failed.");
		else {
			var info = JSON.parse(result);
			$('#tID').html(info['tID']);
			$('#myname').html(info['name']);
			$('#pwd').html(info['pwd']);
			$('#sex').html(info['sex']);
			var imgsrc="upload/"+info['tID']+"/head.jpg";
			$('#headImg').attr('src',imgsrc);
		}
	});
});
