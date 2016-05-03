$(document).ready(function(){
		whetherLogin();
		$('#items').hide();
		$('#RegisterBox').hide();	
		new uploadPreview({ UpBtn: "imgSelected", DivShow: "imgBox2", ImgShow: "headImg" });
});
function showRegisterBox(){
		$('#RegisterBox').fadeIn(500);
		$('#loginBox').hide();
	register();
}
function backtoItems(){
		$('#loginBox').hide();
		$('#RegisterBox').hide();
		$('#items').slideDown(1200);
	
}
function login(){
	var tID=$('#tID').val();
	var pwd=$('#loginpwd').val();
	var whetherClick=$(".typer").is(":checked");
	if(whetherClick){
		var type1=$('#type1:checked').val();
		var type2=$('#type2:checked').val();
		var type=type1||type2;
	}
	else{
		alert("Choose your type.");
		return 0;
	}
	$.post("php/login.php",{type:type,tID:tID,pwd:pwd},function(result){
		var condition;
   		switch(result){
   			case '1':	condition='Successfully!';backtoItems();break;
   			case '0': condition='Wrong password!';break;
   			case '-1': condition='Wrong ID!';break;
   			case '-2': condition='Please enter your password!';break;
   			case '-3': condition='Please enter your ID!';break;
   			default:	condition='Error.';console.log(result);break;
   		}
   		alert(condition);
	});
}

function register(){
	var timer=setTimeout(function(){register();},1000);
	var name=$('#name').val();
	var pwd=$('#password').val();
	var flag1=document.getElementById('sex1').checked;
	var flag2=document.getElementById('sex2').checked;
	var sex;
	if(flag1)
		sex='男';
	else if(flag2)
		sex='女';
	if(name &&pwd && sex && $('#imgSelected').val()){
		$('#Resummit').show();
//		$.post("php/register.php",{name:name,pwd:pwd,sex:sex},function(reslut){
//			alert(reslut);
//		}); 

	}
	else{
		$('#Resummit').hide();
	}
}
function whetherLogin(){
	$.post("php/whetherLogin.php",function(result){
		if(result!=0){
			$('#loginBox').hide();
			$('#RegisterBox').hide();	
			$('#items').show();
		}
	});
}
 
//condtion exchange about login register and index information
//1.login page automatic
	//2. "without account " clicked ,hide login page && index Info, show register page
	//3. browse image, <img> change;   when summitting,save the image as head,upload data to db.
	//4. after register, show index info 
//5.keep the login condition
