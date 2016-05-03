	var login={
		whether:false,
		checkLogin:function(){
			$.ajax({
				//type:"get",
				url:"../php/whetherLogin.php",
				async:false,
				success:function(result){
					if(result==0){
						alert("Please login first.");
						window.parent.location.href="../index.html";
					}
					else{
						login.whether=true;
						return login.whether;
					}
					alert(login.whether);
					return false;
				}
				
			});
//			$.post("../php/whetherLogin.php",function(result){
//				if(result==0){
//					alert("Please login first.");
//					window.parent.location.href="../index.html";
//				}
//				else{
//					login.whether=true;
//					//alert(login.whether);
//					return login.whether;
//				}
//				return false;
//			});
		}
	}