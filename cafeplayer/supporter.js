
    // 为了不随意的创建全局变量，我们将我们的代码放在一个自己调用自己的匿名函数中，这是一个好的编程习惯
        (function(window, document){
        	
			var myVar=setInterval(function(){myTimer()},1000);
			var ctimer=0;
			function myTimer()
			{ 	
				ctimer++;
				var d=new Date();
				var t=d.toLocaleTimeString();
			//	document.getElementById("time").innerHTML=t;
			//	document.getElementById("timer").innerHTML=ctimer;
			}  //Timer for the page
			
            // 获取要操作的元素
            var video = document.getElementById("video");
            var videoControls = document.getElementById("videoControls");
            var videoContainer = document.getElementById("videoContainer");
            var controls = document.getElementById("video_controls");
            var playBtn = document.getElementById("playBtn");
            var fullScreenBtn = document.getElementById("fullScreenBtn");
            var progressWrap = document.getElementById("progressWrap");
            var playProgress = document.getElementById("playProgress");
            var fullScreenFlag = false;
            var progressFlag;
			var preview=document.getElementById("preview");
			// make notes
			var noteBook=document.getElementById("noteBook");
			var mouseBehavior={
				clock:[],
				position:[],
				i:-1,             
				fastForward:[],
				rewind:[],
				part:0,
				//duration:video.duration,    // the duration of video
				length:0,   //the length of every part
				createNew:function(){
					i=0;
					mouseBehavior.clock=[];
					mouseBehavior.position=[];
					mouseBehavior.i=-1;
					var n=5;
					part=n;
					},
				setValue:function(when,where){
					mouseBehavior.i++;
					mouseBehavior.clock[mouseBehavior.i]=when;
					mouseBehavior.position[mouseBehavior.i]=where;	
					console.log("i:",mouseBehavior.i);console.log("clock:",mouseBehavior.clock[i]);console.log("position:",mouseBehavior.position[i]);
					//document.getElementById("result").innerHTML+="i="+mouseBehavior.i+" clock="+mouseBehavior.clock[mouseBehavior.i]+" position="+mouseBehavior.position[mouseBehavior.i]+" || ";
				},//setValue;
				getClock:function(){
					return mouseBehavior.clock;
				},//getClock
				getPosition:function(){
					return mouseBehavior.position;
				}
			}; //mouseBehavior
			mouseBehavior.createNew();
			function listener(when,where){
				mouseBehavior.setValue(when,where);
			}
            // 创建我们的操作对象，我们的所有操作都在这个对象上。
            var videoPlayer = {
                init: function(){
                    var that = this;
                    video.removeAttribute("controls");
                    bindEvent(video, "loadeddata", videoPlayer.initControls);
                    videoPlayer.operateControls();
                },
                initControls: function(){
                    videoPlayer.showHideControls();
                },
                showHideControls: function(){
                    bindEvent(video, "mouseover", showControls);
                    bindEvent(videoControls, "mouseover", showControls);
                    bindEvent(video, "mouseout", hideControls);
                    bindEvent(videoControls, "mouseout", hideControls);
                },
                operateControls: function(){
                    bindEvent(playBtn, "click", play);
                    bindEvent(video, "click", play);
                    bindEvent(fullScreenBtn, "click", fullScreen);
                    bindEvent(progressWrap, "mousedown", videoSeek);
                }
            }

            videoPlayer.init();
            // 原生的JavaScript事件绑定函数
            function bindEvent(ele, eventName, func){
                if(window.addEventListener){
                    ele.addEventListener(eventName, func);
                }
                else{
                    ele.attachEvent('on' + eventName, func);
                }
            }
            // 显示video的控制面板
            function showControls(){
                videoControls.style.opacity = 1;
            }
            // 隐藏video的控制面板
            function hideControls(){
                // 为了让控制面板一直出现，我把videoControls.style.opacity的值改为1
                videoControls.style.opacity = 1;
            }
            // 控制video的播放
            function play(){
                if ( video.paused || video.ended ){              
                    if ( video.ended ){ 
                        video.currentTime = 0;
                        } 
                    video.play();
                    playBtn.innerHTML = "暂停"; 
                    progressFlag = setInterval(getProgress, 60);
                } 
                else{ 
                    video.pause(); 
                    playBtn.innerHTML = "播放";
                    clearInterval(progressFlag);
                } 
            }
            // 控制video是否全屏，额这一部分没有实现好，以后有空我会接着研究一下
            function fullScreen(){
				launchFullscreen(video);
            }
			function launchFullscreen(element) {
			  if(element.requestFullscreen) {
				element.requestFullscreen();
			  } else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			  } else if(element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			  } else if(element.msRequestFullscreen) {
				element.msRequestFullscreen();
			  }
			}
            // video的播放条 
            function getProgress(){
                var percent = video.currentTime / video.duration;
                playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
                showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
            }
            // 鼠标在播放条上点击时进行捕获并进行处理
            function videoSeek(e){
				
                if(video.paused || video.ended){
                    play();
                    enhanceVideoSeek(e);
                }
                else{
                    enhanceVideoSeek(e);
                }

            }
            function enhanceVideoSeek(e){
                clearInterval(progressFlag);
                var length = e.pageX - progressWrap.offsetLeft;
                var percent = length / progressWrap.offsetWidth;
                playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
                video.currentTime = percent * video.duration;					
                progressFlag = setInterval(getProgress, 60);
				listener(ctimer,video.currentTime);
				uploader.uploadController();
				Recorder.check();   //check the timing
            }
            
			function hello(){
				console.log("hi");
			}
			//make annotation
			annotation={
				tID:0,
				cID:0,
				count:0,
				content:[],
				time:[],
				partition:[],
				nodeObj:[],
				i:1,
				init:function(){
					annotation.count=5;
					annotation.fillContent();
					var test=setTimeout(
						function(){
							j=annotation.count;
							while(j){annotation.makeIt();j--;}
						}
					,500);
				//	var makebubble=setTimeout(annotation.bubble(),10);
				},
				initAgain:function(mytime,mycontent,total){
					preview.innerHTML="";
					annotation.count=total;
					annotation.time=annotation.content=[];
					annotation.i=0;
					annotation.time=mytime;
					annotation.content=mycontent;
					annotation.setPartitionTime(mytime);
					var test=setTimeout(
						function(){
							j=annotation.count;
							while(j){annotation.makeIt();j--;}
						}
					,500);
				},
				setPartitionTime:function(annTime){
					annotation.partition[0]=0;
					for(i=1;i<=annTime.length;i++){
						annotation.partition[i]=annTime[i-1];
					}
				},
				setTitle:function(courseName,teacherName){
					$('#courseName').text(courseName);
					$('#teacherName').text(teacherName);
				},
				fillContent:function(){   // download the position of every points;
					for(i=1;i<=annotation.count;i++){
						annotation.content[i]='hi'+i; // 提示框内容
						annotation.time[i]=i*5;    //position  时间点 单位s
					}
				},
				makeIt:function(){
					var position=(annotation.time[annotation.i]/video.duration)*100+'%';  
					var content=annotation.content[annotation.i];
					//annotation.time[annotation.i]/video.duration)* (progressWrap.offsetWidth)+ "px";
					
					$('#preview').append('<div style="position:absolute;marginBottom:0px;left:'+position+'"><img id="node" name="nodeobj" title='+position+' data-tipso='+content+' src="images/retangle.png" style="height:10px"/></div>');
					
					annotation.nodeObj[annotation.i]=node;
					annotation.i++;
					$(node).tipso({
						useTitle: false
					});
				},
				bubble:function(){
					var whole=document.getElementsByName("nodeobj");
					$(whole.item(1).id).poshytip({
						className: 'tip-twitter',
						showTimeout: 1,
						alignTo: 'target',
						alignX: 'center',
						offsetY: 5,
						allowTipHover: false,
						fade: false,
						slide: false
					});	
				},
				gettIDcID:function(tid,cid){
					annotation.tID=tid;
					annotation.cID=cid;
					mouseBehavior.createNew();
					Recorder.initAgain();
					uploader.init();
				}
			};
			annotation.init();
			//for the data collection
			var timeMachine;
			var analysis=document.getElementById("analysis");
			var counter=document.getElementById("counter");
			var resultForAnalysis=document.getElementById("timeForNow");
			var analysisResult=document.getElementById("analysisResult");
			var Recorder={
				temphistory:[],
				playhistory:[],  // sum must be even number!  
				playhis_time:[],
				rewind:[],  //记录回退次数
				fastforward:[], //记录快进次数
				sections:[],  //导入视频每一部分的末尾位置
				j:0,
				i:0,
				initAgain:function(){
					Recorder.temphistory=[];
					Recorder.playhistory=[];
					Recorder.playhis_time=[];
					Recorder.i=0;
					Recorder.j=0;
					timeMachine=setInterval(function(){Recorder.record();},0.01);
				},
				init:function(){
					timeMachine=setInterval(function(){Recorder.record();},0.01);
					bindEvent(analysis,"click",function(){Recorder.clarify();});  //clarify the rewind && fastForward;
					var part=annotation.count;
					Recorder.sections[0]=part;
					Recorder.sections[part]=video.duration;
					for(var k=1;k<=part;k++){
						Recorder.sections[k]=annotation.partition[k];
						Recorder.fastforward[k]=0;
						Recorder.rewind[k]=0;
					}
					Recorder.fastforward[part]=0;
					Recorder.rewind[part]=0;
					
				},
				record:function(){
					if(!video.paused && !video.ended && video.currentTime!=0){
						Recorder.temphistory[Recorder.j]=video.currentTime;
				//		counter.innerHTML+="history["+Recorder.j+"]="+Recorder.temphistory[Recorder.j]+"\t";  for test
						Recorder.j++;
					}
				},//record
				check:function(){
						window.clearInterval(timeMachine);
						video.pause();
						Recorder.j=Recorder.j-1;
						Recorder.temphistory[Recorder.j]=video.currentTime;
						counter.innerHTML="";
					//	counter.innerHTML+="history["+Recorder.j+"]="+Recorder.temphistory[Recorder.j]+"\t";   // for test
						Recorder.saveHistory();
						Recorder.temphistory=[];
						timeMachine=setInterval(function(){Recorder.record();},0.01);						
					//	video.play();
				},//stopIt
				saveHistory:function(){
					if(Recorder.temphistory[Recorder.j-1])   
						Recorder.playhistory[Recorder.i]=Recorder.temphistory[Recorder.j-1];
					else 
						Recorder.playhistory[Recorder.i]=Recorder.playhistory[Recorder.i-1];    // 没有播放就直接点击进度条
					Recorder.i++;
					Recorder.playhistory[Recorder.i]=Recorder.temphistory[Recorder.j];
					if(Recorder.i!=0)
						Recorder.playhis_time[Recorder.i-1]=ctimer-0.5;
					Recorder.playhis_time[Recorder.i]=ctimer;
					k=0;
					Recorder.i++;
					timeForNow.innerHTML="";
					while(k<=Recorder.i){
						timeForNow.innerHTML+="playhistory["+k+"]="+Recorder.playhistory[k]+" time["+k+"]="+Recorder.playhis_time[k];
						k++;
					}
				},//saveHistory
				clarify:function(){
					m=Recorder.i-1;  
					n=0;
					var k;
					for(k=1;k<=m;k+=2){   // 两个一组
						var flag=false;
						a=Recorder.search_location(k-1);
						b=Recorder.search_location(k);
						if(Recorder.playhistory[k]<Recorder.playhistory[k-1]){  //回退
							flag=true;  //回退
						}
						Recorder.analyse_section(flag,a,b);
					}
					for(i=1;i<=Recorder.fastforward.length-1;i++){
						analysisResult.innerHTML+="fastforward["+i+"]="+Recorder.fastforward[i]+"\t";
						analysisResult.innerHTML+="rewind["+i+"]="+Recorder.rewind[i]+"\t";
					}
				},//clarify
				search_location:function(loc){
					var tSections=Recorder.sections;
					temp=Recorder.playhistory[loc];
					i=1;
					while(tSections[i]<temp){
						i++;
					}
					return i;
				},//search_location*/
				analyse_section:function(flag,i,j){
					if(flag){  //i>j; 回退
						Recorder.rewind[j]++;
					} //if 
					else{  //i<j; 快进
						if(i==j)
							Recorder.fastforward[j]++;
						else{
							while(j){
								Recorder.fastforward[j-1]++;
								j--;
							}
						}
					}//else
				},//analyse_section
				getPlayHistory:function(){
					if(Recorder.playhistory[0]==undefined)
						Recorder.playhistory[0]=0;
					return Recorder.playhistory;
				},
				getPlayHisTime:function(){
					return Recorder.playhis_time;
				}
			};
		//	Recorder.init();

			var note={
				notes:[],
				i:-1,
				openner:false,
				writting:false,
				time:0,
				date:"",
				whetherlogin:false,
				init:function(){
					notes=new Array();
					note.operator();
				},
				operator:function(){
					bindEvent(noteBook, "click", play);
					bindEvent(noteBook,"click",makeNote);
				//	bindEvent(noteBook,"click",stopCount);
				},
				writter:function(){                             // save notes
					var saveBtn=document.getElementById("saveBtn");
					bindEvent(saveBtn,"click",function(){
							note.i++;
							notes[i]=$('#text').val();  ///save the note
							var noteContent=document.getElementById("noteContent").innerHTML+=notes[i];
							$('#right').slideToggle(100);
							alert("保存成功！");
							note.loginChecker(notes[i],note.time); 
						}//function
					);//bindevent				
				},//writter
				setDate:function(){
					var d=new Date();
					var s=d.toLocaleDateString().replace(/[\u4E00-\u9FA5\uF900-\uFA2D]/,"-");
					s=s.replace(/[\u4E00-\u9FA5\uF900-\uFA2D]/,"-");
					s=s.replace(/[\u4E00-\u9FA5\uF900-\uFA2D]/," ");
					var h=d.getHours();       //获取当前小时数(0-23)
					var m=d.getMinutes();     //获取当前分钟数(0-59)
					var sec=d.getSeconds(); 
					var str=h+":"+m+":"+sec;
					s+=str;
					console.log("currentTime:",s);
					return s;
				},
				upload:function(currentNote,noteTime){
					var tID=annotation.tID;
					var cID=annotation.cID;
					var position=note.time;
					var notes=currentNote;
					var date=note.setDate()+".000000";
					console.log(tID,cID,position,notes);
					if(!note.whetherlogin)
						return 0;
					if(tID&&cID){
						console.log("getin");
						$.post("php/sveNotes.php",{tID:tID,cID:cID,position:position,note:notes,date:date},function(result){
							console.log("result of the notes uploaded:",result);
						});
					}
				},
				loginChecker:function(currentNote,noteTime){ //not only check login && trigger it to upload notes.
					if(!uploader.loginCheck || !note.whetherlogin)
						$.post("php/whetherLogin.php",function(result){
							console.log("logincheck result:",result);
							if(!result)
								return 0;
							note.upload(currentNote,noteTime);
							uploader.loginCheck=true;
							note.whetherlogin=true;
							return 1;
						});
					else
						note.upload(currentNote,noteTime);
				}
			};//note
			note.init();  // initialize
			function makeNote(){	
				$('#right').slideToggle(100);
				var timeCounter=parseFloat(video.currentTime);
				note.time=timeCounter;
				$('#textBox').text("笔记时间："+timeCounter); //VIDEO POSITION
				$('#textBox').append('<textarea id="text" class="noteText" >Please Enter!</textarea>','<button id="saveBtn" class="btn btn-info">Save</button>');
				note.writter();
			}
			var uploader={
				tid:0,
				cid:0,
				loginCheck:false,
				uploadControl:false,
				init:function(){
					uploader.loginCheck=false;
					uploader.uploadControl=false;
					uploader.tid=annotation.tID;
					uploader.cid=annotation.cID;
				//	console.log("tid ",uploader.tid);console.log("cid",uploader.cid);
				},
				uploadController:function(){
					console.log("uploadController",uploader.uploadControl);
					if(!uploader.uploadControl){
						var uploadAlarm=setInterval(function(){uploader.loginChecker();},5000);
						uploader.uploadControl=true;
					}
				},
				loginChecker:function(){
					if(!uploader.loginCheck)
						$.post("php/whetherLogin.php",function(result){
							if(!result)
								return 0;
							uploader.upload(uploader.tid,uploader.cid);
							uploader.loginCheck=true;
							return 1;
						});
					else
						uploader.upload(uploader.tid,uploader.cid);
				},
				upload:function(tID,cID){
					var clock=mouseBehavior.getClock();
					var position=mouseBehavior.getPosition();
					var clickTimes=clock.length;
					var playHistory=Recorder.getPlayHistory();
					var time=Recorder.getPlayHisTime();
					console.log(clock,position,clickTimes,playHistory,time);
					if(tID&&cID&&clickTimes&&playHistory)
					$.post("php/sveMouseBehavior.php",
							{tID:tID,cID:cID,playHistory:playHistory,time:time,clock:clock,position:position,clickTimes:clickTimes},
							function(result){
								console.log("result",result);
					});
				}
			};
        }(this, document))