// JavaScript Document

(function(window,document){
	var responsive=document.getElementsByName("response");
	var CourseSaw={
		wTotal:0,
		courseInfo:{},
		init:function(){
			CourseSaw.wTotal=0;
			CourseSaw.courseInfo={};
		},
		loginChecker:function(){
			$.post('php/whetherLogin.php',function(result){
				if(result==0){
					alert("Please login first.");
					location.href="index.html";
				}
				CourseSaw.getCourseInfo();
			});
		},
		getCourseInfo:function(){
			$.post('php/getCourseWatchedInfo.php',function(result){
				CourseSaw.courseInfo=eval('('+result+')');
				CourseSaw.wTotal=CourseSaw.courseInfo['cNames'].length;
				console.log("wTotal:",CourseSaw.wTotal);
				list.init();
			});
		}
	}
	
	CourseSaw.loginChecker();
	var list={
		init:function(){
			list.create(CourseSaw.wTotal);
		},
		create:function(total){
			var groupSum=0;
			groupSum=parseInt(total/3);
			var rest=total%3;
			if(rest)
				groupSum++;
			list.ulCreate(groupSum);
			list.liCreate(total,groupSum);
		},
		ulCreate:function(groups){
			for(j=2;j<=groups;j++){
				var listname="list"+j;
				var cssText='<ul class="row item" id="'+listname+'"></ul>';
				$('#ulBox').append(cssText);
			}
		},
	 	liCreate:function(total,groups){
			var j=1;
			for(i=1;i<=total;i++){
				if(i%3==1){
					var listname="list"+j;
					j++;
					var liBox=document.createElement("div");
					liBox.className='libox';
				//	liBox.style.cssText="width: 100%;display: flex;float: left;display: -webkit-flex;align-items: flex-end;-webkit-align-items: flex-end;";
				}
				var ul=document.getElementById(listname);//
				var li=document.createElement('li');
				li.setAttribute('class','col-xs-4');
				li.style.cssText="text-align: center;";
				var img=document.createElement('img');
				img.name='response';
				//img.style.cssText="width: 50%;";
				img.className='menuImg';
				img.alt=CourseSaw.courseInfo["tID"][i]+"_"+CourseSaw.courseInfo["cID"][i];//cID[i];/////// tid_cid string
				img.src='upload/'+CourseSaw.courseInfo["tID"][i]+"/image/"+CourseSaw.courseInfo["cNames"][i]+".jpg";////  tid  cname
				var p=document.createElement('p');
				p.style.cssText="text-align: center;";
				p.innerHTML=CourseSaw.courseInfo["cNames"][i];////
				li.appendChild(img);
				li.appendChild(p);
				liBox.appendChild(li);
				ul.appendChild(liBox);
				bindEvent(img,"click",function(){courseSelected(this.alt)});
			}
		}
	};
	function bindEvent(ele, eventName, func){
		  if(window.addEventListener){
			  ele.addEventListener(eventName, func);
		  }
		  else{
			  ele.attachEvent('on' + eventName, func);
		  }
	  }
	  
	function courseSelected(courseName){	
		//$('#cent	er').contentWindow.course.messageReceiver(courseName);
		//$('#center').contentWindow.course.messageReceiver(courseName);
		var ifName=document.getElementById("center");
		var ifName_rewind=document.getElementById("rewind");
		ifName.name=courseName;
		ifName_rewind.name=courseName;
	//	alert(ifName.name);
		ifName_rewind.src="chart_rewind.html";
	//	ifName.src="chart_fastForward.html";
		window.frames[0].messageCarrier(courseName);
	}
}(this,document))