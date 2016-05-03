
(function(){

	var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };
	var randomScalingFactor20 = function() {
        return Math.round(Math.random() * 10);
    };
	var randomScalingFactorRange = function(range) {
        return Math.round(Math.random() * range);
    };
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };
    var config = {
        data: {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: 'My dataset' // for legend
            }],
            labels: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            },
            scale: {
              ticks: {
                beginAtZero: true
              },
              reverse: false
            },
            animateRotate:false
        },
        addData:function(tag,cData,name){
        		 config.options.title.text=name.toString();
	        	 if (config.data.datasets.length > 0) {
	        	 	for(var i=0;i<tag.length;i++){
		          	config.data.labels[i]=tag[i];
		          	config.data.datasets[0].data[i]=cData[i];
		            config.data.datasets[0].backgroundColor[i]=randomColor();
	          	}
	       //    window.myPolarArea.update();
		       //polarAreaChart.updateLegend();
	        }
        }
    };

	var courseName=window.parent.document.getElementById('rewind').name;
	var parentFrame=window.parent.document.getElementById('rewind');
	var course={
					name:"",
					total:0,
					length:0,
					data:[],
					sections:[],
					partEndTime:[],
					test1:[],
					test2:[],
					getInfo:function(){
						course.name=courseName;   //info for Video
						course.total=randomScalingFactor20();           
						course.length=33;
						for(var i=0;i<course.total;i++){  //geting the fastForward data 
							course.partEndTime[i]=i*11;  
							course.data[i]=randomScalingFactor();  //fastForward times
							course.sections[i]="hi"+i;    //知识点 名
							//test data for point chart;
							course.test1[i]=randomScalingFactorRange(33);
							course.test2[i]=randomScalingFactorRange(360);
						}
					},
					setChartData:function(kind){
						switch(kind){
							case 'line':linearChartData.addData(course.sections,course.data);
										break;
							case 'point':bubbleData.addData(course.test1,course.test2);
							case 'polarArea':config.addData(course.sections,course.data,course.name);
											 break;
							default: alert("error");break;
						}
					}
				};	
	course.getInfo();

	var polarAreaChart={
		click:0,
		init:function(){
		//		if(courseName!="center"){
					polarAreaChart.createElement();
			//		course.getInfo();
					course.setChartData('polarArea');
		//		 }
			},
		updateLegend:function() {
	        $legendContainer = $('#legendContainer');
	        $legendContainer.empty();
	        $legendContainer.append(window.myPolarArea.generateLegend());
    		},
    		createElement:function(){
    		//	polarAreaChart.removeElement();
    		if(!document.getElementById("canvas-holder")){
    			var container= document.createElement("div");
    			container.id="canvas-holder";
    			container.className='chart';
    			container.style.cssText="opacity: 1;width:100%;";
    			var canvas=document.createElement("canvas");
    			canvas.id="chart-area";
    			canvas.style.cssText="width: 100%;height: 100%;";
    			container.appendChild(canvas);
    			
    			var textContainer=document.createElement("div");
    			textContainer.id="textContainer";
    			var legendContainer=document.createElement("div");
    			legendContainer.id="legendContainer";
    			textContainer.appendChild(legendContainer);
    			document.body.appendChild(container);
    			document.body.appendChild(textContainer);
    			}
    		},            
    		hiddenMe:function(){
            	if(document.getElementById("canvas-holder")){
            		var container=document.getElementById("canvas-holder");
            		if(container.style.opacity==1)
         			container.style.cssText="opacity: 0; ";
            	}
        },
        showMe:function(){
            	if(document.getElementById("canvas-holder")){
            		var container=document.getElementById("canvas-holder");
            		if(container.style.opacity==0)
         			container.style.cssText="opacity: 1; ";
            	}
        },
    		removeElement:function(){
			if(document.getElementById("canvas-holder")){
				var children= document.body.childNodes;
				var length=children.length;
				for(var i=length-1;i>=0;i--){
					if(document.getElementById("radioBtns")!=children.item(i))
						document.body.removeChild(children.item(i));
				}
				var hiddenFrame=document.getElementsByClassName('chartjs-hidden-iframe');
				if(hiddenFrame)
					hiddenFrame.parentNode.removeChild(hiddenFrame);
	    		}
		}
	}

	 var linearChartData = {
            labels: [],
            datasets: [{
                type: 'line',
                label: 'Dataset1',
                backgroundColor: 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)',
                data:[],
                borderColor: 'white',
                borderWidth: 2
            }],
            init:function(){
			//	if(courseName!="center"){
		//			course.getInfo();
					course.setChartData('line');	
			//	 }
            },
            addData:function(tag,cData){
				if (linearChartData.datasets.length > 0) {
	                for (var index = 0; index < tag.length; ++index) {
	                		linearChartData.labels[index]=tag[index];
	                		linearChartData.datasets[0].data[index]=cData[index];
	                }
	                linearChartData.datasets[0].backgroundColor='rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
            		}
            },
            createElement:function(){
            	//	linearChartData.removeElement();
            	if(!document.getElementById("linearContainer")){
            		var container=document.createElement('div');
            		container.id="linearContainer";
            		container.className='chart';
            		container.style.cssText="width:100%;opacity:1";
            		var canvas=document.createElement('canvas');
            		canvas.id="canvas";
            		canvas.cssText="width=auto;height=auto";
            		container.appendChild(canvas);
            		document.body.appendChild(container);
            		}
            },
            hiddenMe:function(){
            		if(document.getElementById("linearContainer")){
            			var container=document.getElementById("linearContainer");
					if(container.style.opacity==1)
	         			container.style.cssText="opacity: 0; ";
            		}
            },
            showMe:function(){
            		if(document.getElementById("linearContainer")){
            			var container=document.getElementById("linearContainer");
					if(container.style.opacity==0)
	         			container.style.cssText="opacity: 1; ";
            		}
            },
            removeElement:function(){
				var children= document.body.childNodes;
				var length=children.length;
				for(var i=length-1;i>=0;i--){
					if(document.getElementById("radioBtns")!=children.item(i))
						document.body.removeChild(children.item(i));
				}
            }
        };
     
        var linearChartController={
        		click:0,
        		start:function(){
	        			linearChartData.createElement();
	        			linearChartData.init();
        		}
        };
     var bubbleData = {
            animation: {
                duration: 10000
            },
            datasets: [{
                label: "My First dataset",
                backgroundColor: randomColor(),
                data: []
            }],
            click:0,
            init:function(){
            	//	course.getInfo();
            		course.setChartData('point');
            		bubbleData.creatElement();
            },
            addData:function(tag,cData){
            if (bubbleData.datasets.length > 0) {
                for (var index = 0; index < cData.length; index++) {
					bubbleData.datasets[0].data[index]={
	                        x: tag[index],
	                        y: cData[index],
	                        r: Math.abs(randomScalingFactor()) / 5,
	                    }
	                }
           	 	}
            },
            updateLegend:function(){
	            	$legendContainer = $('#legendContainer');
	            $legendContainer.empty();
	            $legendContainer.append(window.myChart.generateLegend());
            },
            creatElement:function(){
            	if(!document.getElementById("container2")){
	            		var container=document.createElement("div");
	            		container.id='container2';
	            		container.className='chart';
	            		container.style.cssText="width: 100%; height: 100%;opacity: 1;";
	            		var canvas=document.createElement("canvas");
	            		canvas.id='canvas2';
	            		container.appendChild(canvas);
	            		document.body.appendChild(container);
            		}
            },
            hiddenMe:function(){
            		if(document.getElementById("container2")){
            			var container=document.getElementById("container2");
            			if(container.style.opacity==1)
	         			container.style.cssText="opacity: 0; ";
            		}
            },
            showMe:function(){
            		if(document.getElementById("container2")){
            			var container=document.getElementById("container2");
            			if(container.style.opacity==0)
	         			container.style.cssText="opacity: 1; ";
            		}
            }
        };
   
   	var isOnload=0;
    	function loadingfuc() {
	  	//	linearGraph
	  			if(document.getElementById("canvas")){
		            var ctx = document.getElementById("canvas").getContext("2d");
		            window.myBar = new Chart(ctx, {
		                type: 'line',
		                data: linearChartData,
		                options: {
		                    responsive: true,
		                }
		            });
	           }

	  		//polarArea
	  		if(document.getElementById("chart-area")){
		  		var ctx = document.getElementById("chart-area");
			 	window.myPolarArea = Chart.PolarArea(ctx, config);
		//    polarAreaChart.updateLegend();
			}
	  		
	  		if(document.getElementById("canvas2")){
	            var ctx2 = document.getElementById("canvas2").getContext("2d");
	            window.myChart = new Chart(ctx2, {
	                type: 'bubble',
	                data: bubbleData,
	                options: {
	                    responsive: true,
	                }
	            });
			}	
        //    bubbleData.updateLegend();
        }
    function bindEvent(ele, eventName, func){
         if(window.addEventListener){
             ele.addEventListener(eventName, func);
         }
         else{
             ele.attachEvent('on' + eventName, func);
         }
    }
	
  //  	selectorRBtn();
    function selectorRBtn(){
    		var linearGraph=document.getElementById("linearGraph");
    		var pointGraph=document.getElementById("pointGraph");
    		var polarArea=document.getElementById("polarArea");
    		var graphObj=[linearGraph,pointGraph,polarArea];
    		var i=0;
    		while(i<3){
    			bindEvent(graphObj[i],'click',function(){clarify(this);});
    			i++;
    		}
    }
    function clarify(item){
      	var chartType= item.value;
		isOnload=parseInt(chartType);
		switch(isOnload){
			case 1: if(linearChartController.click==0){
						linearChartController.start();
						linearChartController.click=1;
					}
					else
						linearChartData.showMe();
						polarAreaChart.hiddenMe();
						bubbleData.hiddenMe();
					
					break;
			case 2: if(bubbleData.click==0){
						bubbleData.init();
						bubbleData.click=1;
					}
					else
						bubbleData.showMe();
						linearChartData.hiddenMe();
						polarAreaChart.hiddenMe();
					
					break;
			case 3: if(polarAreaChart.click==0){
						polarAreaChart.init();
						polarAreaChart.click=1;
					}
					else
						polarAreaChart.showMe();
						linearChartData.hiddenMe();
						bubbleData.hiddenMe();
					
					break;
			default:	alert("error");break;
		}
		loadingfuc();
	}
        	
 if(courseName!='center'){

		polarAreaChart.click=1;
  		polarAreaChart.init();
		window.onload=loadingfuc;
  	}
	selectorRBtn();
  })();