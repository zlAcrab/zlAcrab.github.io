/*
	1.要找到对应的元素
	2.判断某个元素是否有某个class
	3.如果没有就添加
	4.如果有就删除
*/
// 获取元素  #id / .class / #id .class tag
function M(sele) {
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
function rmClass(obj,cls) { //acccbb bbb ccc
	var re = new RegExp(`\\b${cls}\\b`);
	if(hasClass(obj,cls)){
		obj.className = obj.className.replace(re,'')
									 .replace(/\s{2}/,' ')
									 .trim();
	}
}







