window.onload=function () {
	var nav = document.querySelector('#nav ul')
	var lis = document.querySelectorAll('li');
	var onoff = true;
	lis[lis.length-1].onclick=function () {
		// alert(1)
		/*i:    0    1    2    3    4    5    6  7  8  9  10  11  12
		  度数  -90  -75  -60  -45  -30  -15  0  15 30 45 60  75  90   
		*/
		for (var i = 0; i < lis.length; i++) {
			var n = i-lis.length/2
			if(onoff){
				n=n*15;
			}else{
				n=360

			}
			lis[i].style.transform='rotateZ('+n+'deg)';

		}
		onoff=!onoff;
	};
	for (var i = 0; i < lis.length-1; i++) {
		(function(index){
			lis[index].onclick = function(){
				var leftDeg = 0;
				var rightDeg = 15;
				this.style.transform='rotateZ(0deg)';
				for(var i=index-1;i>=0;i--){
					leftDeg-=15;
					lis[i].style.transform='rotateZ('+leftDeg+'deg)'
				}
				for(var i=index+1;i<lis.length;i++){
					rightDeg+=15;
					lis[i].style.transform='rotateZ('+rightDeg+'deg)'
				}
				
			}
		})(i);
	}



//*********** 气泡鼠标***********************************
	var canvas=document.getElementById('canvas');
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight+400;
	
	var context=canvas.getContext('2d');
	var balls=[];
	var colors=['#69d2e7','#a7dbd8','#e0e4cc','#f38630','#fa6900','#ff4e50','#f9d423']
	var timer=null;
	// console.log(canvas.width,canvas.height)	
	/*每个气泡的：
		1.半径不同
		2.颜色不同
		3.位置不同
		4.速度不同
	*/
	// canvas画每一个气泡的函数
	function draw(ball){
		// console.log(1)
		context.beginPath();
		context.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
		context.fillStyle=ball.color;
		context.globalCompositeOperation='lighter';   //合成
		context.closePath();
		context.fill();
	}
	function random(min,max){
		return Math.round(Math.random()*(max-min)+min);
	}

	var on=true;		//鼠标移动的时候，定时器也会跑
	canvas.onmousemove=function(ev){
		for(var i = 0; i<2; i++){
			var ball={
				x:random(0,5)+ev.clientX,
				y:random(0,5)+ev.pageY,
				r:random(10,40),		//半径随机为10-45之间
				vx:Math.random()-0.5,	//水平方向的速度为-0.5-0.5之间
				vy:Math.random()-0.5,	//垂直方向的速度为-0.5-0.5之间
				color:colors[random(0,colors.length-1)]
			};
			// console.log(ball.r);
			
			balls.push(ball);
			if(balls.length>300){
				balls.shift();			//当气泡数量达到300，则删除掉最前面的一个
			}
			// console.log(balls.length)
		}

		// 让定时器只开一次
		if(on){
			clearInterval(timer);				//一上来清除上次的定时器，不然速度会越来越快
			timer=setInterval(drawBall,30);
			on=false;
		}


		function drawBall(){
			// console.log(1)
			context.clearRect(0,0,canvas.width,canvas.height);

			for (var i = 0; i < balls.length; i++) {
				// 在画圆的时候把球的位置还有半径都改变了，这样的话看上去球才会动
				balls[i].x+=balls[i].vx*8;	//通过速度改变X轴的位置
				balls[i].y+=balls[i].vy*8;  //改变y轴的位置
				balls[i].r=balls[i].r*0.94; //0.94,8都是经过测试后的任意合适数值,乘以0.94后，小球的半径越来越小
				
				balls[i].index=i;	//添加这个索引值，为了下面能够找到他并删除

			
				// // 如果小球的半径小于1的话，就让canvas不在画了。
				if(balls[i].r<1){
					balls.splice(balls[i].index,1);
					continue;
				}
				// console.log(balls[i].r)
				draw(balls[i]);

				if(!balls.length){
					clearInterval(timer);
					on=true;
				}
			}
		}
	};

}