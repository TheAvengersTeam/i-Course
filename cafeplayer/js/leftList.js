(function(window, document){
	var list1={
		cName:[{
			name:[],
			count:0
		},{
			name:[],
			count:0
		},{
			name:[],
			count:0
		},{
			name:[],
			count:0
		},{
			name:[],
			count:0
		},{
			name:[],
			count:0
		},{
			name:[],
			count:0
		}],
		gradeNum:0,
		init:function(){
			list1.gradeNum=7;
			list1.fillContent();
			list1.show();
		},
		fillContent:function(){
			var length=5;
			var i;
			var j;
			for(i =0 ;i<list1.gradeNum;i++){
				for(j=0;j<length;j++){	
					list1.cName[i].name[j]="hi"+j+'&'+i;
				}
			}
		},
		createElement:function(){
			var i;
			var length=list1.cName[i].name.length;
			var content=[];
			content=list1.cName[i].name;
			if(length>0){
				for(i=0;i<list1.gradeNum;i++){
					var ul=document.createElement("ul");
					var li=document.createElement("li");
					var a=document.createElement("a");
					a.href='#';
					a.textContent=content[i];
					var j=i+1;
					var pli=document.getElementById("c_g"+j);
					li.appendChild(a);
					ul.appendChild(li);
					pli.appendChild(ul);
				}
			}
		},
		show:function(){
			var i,j; 
			for(i =0 ;i<list1.gradeNum;i++){
				//	alert(list1.cName[i].name);
			}
		}
	};
	list1.init();
}(this, document))