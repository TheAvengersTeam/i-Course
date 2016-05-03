// JavaScript Document

(function(window,document){
	createContent();
	var responsive=document.getElementsByName("response");
	function setLesson(content,total){
		for(var i=1;i<=total;i++){
			content[i]=i+"hi";
		}
	}
	function createContent(){
		var i;
		var str1,str2;
		var content=[];
		var total=6;   //共选了多少课程
		setLesson(content,total);
		str1="firstList";
		str2="secondList";
		for( i =1;i<=total;i++){
			if(i>=4)
				str1=str2;
			var ul=document.getElementById(str1);
			var li=document.createElement('li');
			li.setAttribute('class','col-xs-4');
			var img=document.createElement('img');
			img.name='response';
			img.alt=content[i];   
			img.src='images/'+i+'.jpg';
			img.setAttribute('class','img-responsive');
			var p=document.createElement('p');
			p.style.cssText="text-align: center;";
			p.innerHTML=content[i];
			li.appendChild(img);
			li.appendChild(p);
			ul.appendChild(li);
			bindEvent(img,"click",function(){courseSelected(this.alt);});
		}
	}
	function bindEvent(ele, eventName, func){
		  if(window.addEventListener){
			  ele.addEventListener(eventName, func);
		  }
		  else{
			  ele.attachEvent('on' + eventName, func);
		  }
	  }
	  
	function courseSelected(courseName){
		var ifName=document.getElementById("center");
		var ifName_rewind=document.getElementById("rewind");
		ifName.name=courseName;
		ifName_rewind.name=courseName;
	//	alert(ifName.name);
		ifName_rewind.src="chart_rewind.html";
		ifName.src="chart_fastForward.html";
	}
}(this,document))