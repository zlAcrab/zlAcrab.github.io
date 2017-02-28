// 获取样式
// 获取元素  #id / .class / #id .class tag
	function querySelect(sele) {
		var first = sele.substr(0,1),
			isArr = sele.split(' ');
		if(first === '#' && isArr.length == 1){
			return document.getElementById(sele.substr(1));
		}else{
			var arr = Array.from(document.querySelectorAll(sele));
			return arr.length == 1 ? arr[0] : arr;
		}
	}

// 判断cls   // obj,'aaa'
	function hasClass(obj,cls) { // aaa bbb ccc
		var re = new RegExp(`\\b${cls}\\b`);
		if(re.test(obj.className)){
			return true;
		}else{
			return false;
		}
	}
// 给某个元素添加某个cls
	function addClass(obj,cls){
		if(!hasClass(obj,cls)){
			obj.className += ` ${cls}`;
		}
		obj.className = obj.className.trim();
	}
// 给某个元素删除某个class
	function removeClass(obj,cls) { //acccbb bbb ccc
		var re = new RegExp(`\\b${cls}\\b`);
		if(hasClass(obj,cls)){
			obj.className = obj.className.replace(re,'')
										 .replace(/\s{2}/,' ')
										 .trim();
		}
	}




// 滚轮函数的兼容封装

	function myWheel(obj,callBack){
		
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		
			obj.addEventListener('DOMMouseScroll',fn1);
			
		}else{
			obj.addEventListener('mousewheel',fn1);
		}
	
	
		function fn1(ev){
			var down = 0;
			down = ev.wheelDelta?(ev.wheelDelta>0?true:false):(ev.detail < 0?true:false);
			
			
			callBack && typeof callBack === 'function' && callBack(down);
		}
	}

// 设置样式和获取样式封装
	function getStyle(obj,arrt){
			return obj.currentStyle?obj.currentStyle[arrt]:getComputedStyle(obj)[arrt];
		}

	function setStyle(obj,json){
            for(var i in json)
            {
                obj.style[i]=json[i];
            }
    }

// 设置缓存
	function getCookie(key){
		var str = document.cookie;
		var arr = str.split('; ');
		for(var i=0;i<arr.length;i++){
			var str1 = arr[i].split('=');
			if(str1[0] == key){
				return str1[1];
			}
		}
		return false;
	};

	function setCookie(key,value,time){
		time = time || 0;
		var oDate = new Date();
		//设置时间：获取今天的时间，在今天的时间基础上加了多少天。
		//console.log(oDate.getDate())
		oDate.setDate(oDate.getDate()+time);
		
		document.cookie = (key+'='+value)+(time?';expires='+oDate:'');
	}
	function removeCookie(key,value){
		setCookie(key,value,-1);
	}


	// 事件绑定
	function addEvent(obj,evName,evFn){
		if(obj.addEventListener){
			obj.addEventListener(evName,evFn);
		}else{
			obj.attachEvent('on'+evName,function(){
				evFn.call(obj);   //?
			});
		}
	}
	// 解绑
	function removeEvent(obj,evName,evFn){
		if(obj.removeEventListener){
			obj.removeEventListener(evName,evFn);
		}else{
			obj.detachEvent('on'+evName,function(){
				evFn.call(obj);
			});
		}
	}

	function bind(obj, eventType, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(eventType, function() {
				fn.call(this);
			}, false)
		} else {
			obj.attachEvent('on' + eventType, function() {
				fn.call(this);
			})
		}
	}