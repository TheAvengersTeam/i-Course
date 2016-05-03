(function(window,document){
	var courseJson=[];
	var jsonObj={};
	var time;
	var t=0;
	timer();
	function timer(){
		t++;
		setInterval(time,1,function(){timer();});
	}
	var courseAssem={
		subject:[],
		gradeTotal:0,
		courseObj:[],
		userStatus:false,
		init:function(){
			courseAssem.subject=['chinese','math','english'];
			courseAssem.gradeTotal=6;
			courseAssem.checkUserStatus();
		},
		checkUserStatus:function(){
			$.post(	"../php/whetherLogin.php",
					function(result){
						if(result==0){
							alert("Please login first.");
							window.parent.location.href="../index.html";
						}
						else{
							courseAssem.userStatus=true;
							courseAssem.courseObj=courseAssem.getCoursesInfo();
						}
					}
				);
		},
		getCoursesInfo:function(){
			if(this.userStatus){
				$.post("../php/clarifyCourseInfo.php",{subject:courseAssem.subject,gradeTotal:courseAssem.gradeTotal},function(result){
						jsonObj= eval('('+result+')');
						//hi(jsonObj);
						list.init();
				});
			}	
		},
		getCourseAnn:function(cid,tid){
			$.post("../php/getAnnotations.php",{tID:tid,cID:cid},function(result){
				try{
					var jsonO=eval('('+result+')');
					var time=jsonO['time'];
					var ann=jsonO['annotation'];
					console.log("time",time);
					console.log("annotation:",ann);
					parent.annotation.initAgain(time,ann,time.length);
					parent.annotation.gettIDcID(tid,cid);
					$('#video',parent.document).load();	
				}catch(exception){
				//	alert("The course isn't exist. Please reload again.");
					return 0;
				}
			});
		},
		getTeacherName:function(tID,courseName){
			$.get("../php/getTeacherInfo.php",{id:tID},function(result){
				if(result==0){
					alert("Please select one course.");
					return 0;
				}
				var myjsonObject=eval('('+result+')');
				var teacherName=myjsonObject['Name'];
				console.log("teacher's name:",teacherName);
				parent.annotation.setTitle(courseName,teacherName);
			});
		}
	};
	//courseAssem.init();
	var list={
		subject:[],
		grade:[],
		ulId:[],
		init:function(){
			list.subject=['语文','数学','英语'];
			list.grade=['一年级','二年级','三年级','四年级','五年级','六年级'];
			list.ulId=["demo1","demo2","demo3"];
			list.renderGrade();
			list.renderCourses();
			list.chosenClickBinding();
		},
		renderGrade:function(){
			var length=list.grade.length;
			for(var i=0;i<length;i++){
				if(i==0)
					$('.nav').append('<li class="active"><a href="#">'+list.grade[i]+'</a></li>');
				else
					$('.nav').append('<li><a href="#">'+list.grade[i]+'</a></li>');
			}
		},
		renderCourses:function(){
			for(var i=0;i<courseAssem.subject.length;i++){
				for(var j=0;j<courseAssem.gradeTotal;j++){ //1
					var l=j+1;
					var cname=courseAssem.subject[i]+l; //chinese1
					var length=jsonObj[cname].cName.length;//how many courses in chinese1
					if(length>0) //have course/s
						$('#'+list.ulId[i]+' li:nth-child('+l+')').append('<ul></ul>'); //demo1 :1
					for(k=0;k<length;k++){
						var name=jsonObj[cname].cName[k];
						$('#'+list.ulId[i]+' li:nth-child('+l+') ').children('ul').append('<li><a href="#">'+name+'</a></li>');
					}
				}
			}
			setNavgoco();
		},//renderCourses
		chosenClickBinding:function(){
			for(var i=0;i<list.ulId.length;i++){
				$('#'+list.ulId[i]+' ul li a').click(function(){
					var subject=$('ul.tabs li.active a').text();
					var grade=$(this).parent().parent().parent().index()+1;
					var cIndex=$(this).parent().index();
					var cname=translatecName(subject)+grade;
					var tID=jsonObj[cname].tID[cIndex];
					var cID=jsonObj[cname].cID[cIndex];
					var cName=jsonObj[cname].cName[cIndex];
					var videoPath="upload/"+tID+"/video/"+cName+".mp4";
					$('#videoSource',parent.document).attr('src',videoPath);
					courseAssem.getCourseAnn(cID,tID);
					courseAssem.getTeacherName(tID,cName);
				});
			}
		}
	}

window.onload=function(){
	courseAssem.init();
};
function translatecName(name){
	switch(name){
		case '语文':	name='chinese';break;
		case '数学':	name='math';break;
		case '英语':	name='english';break;
		default:name='';alert("Choose Again!");break;
	}
	return name;
}
function setNavgoco(){
	hoverBehavior(); //only place.
	$('#demo1, #demo2,#demo3').navgoco('toggle',false);
	for(i=0;i<3;i++){
		$('.expandAll').eq(i).click(function(e) {	
			e.preventDefault();
			$(this).parent().siblings('ul').navgoco('toggle', true);
		});
		$('.collapseAll').eq(i).click(function(e) {	
			e.preventDefault();
			$(this).parent().siblings('ul').navgoco('toggle', false);
		});
		$('.nav').eq(i).navgoco({
			caretHtml: '',
			accordion: false,
			openClass: 'open',
			save: true,
			cookie: {
				name: 'navgoco',
				expires: false,
				path: '/'
			},
			slide: {
				duration: 400,
				easing: 'swing'
			}//,
			// Add Active class to clicked menu item
		//	onClickAfter: active_menu_cb,
		});
	}
}
function hoverBehavior(){
	var disableCallbacks = location.href.match(/(\?|&)nocallbacks($|&|=)/);


	for(i=0;i<$('.nav').length;i++){
		$('.nav').eq(i).children('li').first().addClass('active');
	}
	var length=[];
	 length[0]=$('#demo1').children().find('a').length;
	 length[1]=$('#demo2').children().find('a').length;
	 length[2]=$('#demo3').children().find('a').length;
	 for(j=0;j<3;j++){ 	
		for(i=0;i<length[j];i++){
			var k=j+1;
			$('#demo'+k).children().find('a').eq(i).click(function(){
					$('.active,.open').find('ul').css({"display":"none"});
					if(!$(this).next('ul').length)
						$(this).parents('ul').css({"display":"block"});
					$('.nav').find('li').removeClass('active');
					$('.nav').find('li').removeClass('open');
					var li =  $(this).parent();
					var lis = li.parents('li');
					li.addClass('active');
					lis.addClass('active');
			});
		 }		
	}


	$(".tabs a").click(function(e) {
		e.preventDefault();
		$(this).parent().siblings().removeClass('active').end().addClass('active');
		$(this).parents('ul').next().children().hide().eq($(this).parent().index()).show();
	});

	$(".panes").each(function() {
		$(this).children().hide().eq(0).show();

	});
	hljs.tabReplace = '    ';
	hljs.initHighlightingOnLoad();
}
}(this,document));
