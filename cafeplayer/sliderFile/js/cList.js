// JavaScript Document

(function(window,document){
	var vTotal=0; 
	var aTotal=[];
	var courses=[];
	var annotation=[]; // the annotation of current id;
	var time=[];     //  up;
	var cID=[];
	var tID=0;
	var currentCID=0;
	funController();
	function funController(){
		getCourseInfo();
		var additems=document.getElementById("addItems");
		bindEvent(additems,'click',function(){
			i=$("div").filter('.rowBox').length;
			addItems(i,10,'hi');
		});
		var confirm=document.getElementById("summit");
		bindEvent(confirm,'click',function(){
			saveAnnVal();
		})
	}	  
	function getCourseInfo(){
		var i=1;
		$.post("php/whetherLogin.php",function(result){
			if(result!=0)
			{	tID=result;
				$.post("php/getCourseInfo.php",function(condition){
					if(condition==-1)
						alert("Sorry.Failed to get courses Information.");
					else{
						var jsonobj=eval('('+condition+')');
						$.each(jsonobj, function(name,value) {
							if(name=='total')
								vTotal=value;
							else{
								courses[i]=value;
								cID[i]=name;
							}
							i++;
						});
						if(vTotal<=0){
							$('#list1').append('<p style="margin:0 20%;">No any course. Please upload first.</p>');
						}
						setLesson(courses,vTotal);
					}
				});
			}
			else if(result==0){
				alert("Please log in first.");
				location.href="index.html";
			}
		});
		$.post("php/getAnnTotal.php",function(content){
			if(content!=0){
				var obj=eval('('+content+')');
				$.each(obj, function(name,value) {
					aTotal[name]=value;
				});
			}
		});
	}
	function setLesson(courses,total){
		var groupSum=0;
		groupSum=parseInt(total/3);
		var rest=total%3;
		if(rest)
			groupSum++;
		ulCreate(groupSum);
		liCreate(total,groupSum);
	}
	function ulCreate(groups){
		for(j=2;j<=groups;j++){
			var listname="list"+j;
			var cssText='<ul class="row item" id="'+listname+'"></ul>';
			$('#ulBox').append(cssText);
		}
	}
	function liCreate(total,groups){
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
			img.alt=cID[i];
			img.src='upload/'+tID+"/image/"+courses[i]+".jpg";
			var p=document.createElement('p');
			p.style.cssText="text-align: center;";
			p.innerHTML=courses[i];
			li.appendChild(img);
			li.appendChild(p);
			liBox.appendChild(li);
			ul.appendChild(liBox);
			bindEvent(img,"click",function(){getCurrentcID(this,this.alt);});
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
	function addItems(i,time,annotation){
		var boxID="box"+i;
		var div = document.createElement('div');
		div.className='rowBox';
		div.setAttribute('id',boxID);
		$('.annBox').append(div);
		
		var p='<p>'+i+'</p>';
		var inputbox='<input value="'+time+'" name=time['+i+']/>';
		var textbox='<textarea name=annotation['+i+'] >'+annotation+'</textarea>';
		$('#'+boxID).append(p,inputbox,textbox);
	}
	function getCurrentcID(ele,id){
		currentCID=id;
		var cName=ele.nextSibling.innerText;
		$('#cName').val(cName);
		$('#aTotal').val(aTotal[currentCID]);
		getTimeAnnsdb(currentCID);   //get time annotations when click.
	}
	function getTimeAnnsdb(cID){
		$.post("php/getTimeAnns.php",{cID:cID},function(result){
			removeAlertNoAnns();
			if(result[result.length-1]==0)
			{
				renderAlertNoAnns();
			}
			else if(result[result.length-1]=='}'){
				var i=1;
				var jsonobj=eval('('+result+')');
				time=[];
				annotation=[];
				$.each(jsonobj, function(t,ann) {
					time[i]=t;
					annotation[i]=ann;
					i++;
				});
				removeAlertNoAnns();
			}
			renderTimeAnns();
		});
	}
	function renderAlertNoAnns(){
		$('.attetion').append('<div id="noAnn" class="alert alert-warning" role="alert"></div>');
		$('#noAnn').append('<strong>No any annotations!</strong>');
	}
	function removeAlertNoAnns(){
		$('#noAnn').remove();
	}
	function renderTimeAnns(){
		$("#tableTitle").nextAll().remove();
		if(!annotation || !time|| aTotal[currentCID]<=0){
				return 0;
		}
		var i=$("div").filter('.rowBox').length;
		for(j=1;j<=aTotal[currentCID];j++){
			addItems(i,time[j],annotation[j]);
			i++;
		}
	}
	function saveAnnVal(){
		var length=$('div').filter('.rowBox').length;
		var mytime=[];
		var myannotation=[];
		for(i=1;i<=length-1;i++){
			var boxID="box"+i;
			var num=$('#'+boxID).children('p').text();
			var t=$('#'+boxID).children('input').val();
			var a=$('#'+boxID).children('textarea').val();
			mytime[i]=t;
			myannotation[i]=a;
		}			
		mytime=unique(mytime);
		myannotation=unique(myannotation);
		alert(myannotation);
		
		if(currentCID==0)
			getCurrentcID();
			$.post('php/setAnnotations.php',{cID:currentCID,time:mytime,annotation:myannotation},function(result){
				alert("Succeeded.");
				location.reload();
		});
	}
	function unique(arr){
		var result=[],hash={};
		for(var i=1,elem;(elem=arr[i])!=null;i++){
			if(!hash[elem]){
				result.push(elem);
				hash[elem]=true;
			}
		}
		return result;
	}
}(this,document))