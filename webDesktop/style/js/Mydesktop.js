window.onload=function () {
    

// *****************************一、左侧菜单(苹果导航效果)*********************************************
    var leftBtns = document.getElementById('leftbtns');
    var leftImg = leftBtns.getElementsByTagName('img');
    // console.log(leftBtns)
    leftBtns.onmouseover=function(){
        document.onmouseover = function(ev){
            var ev = ev || window.event;
            for(var i=0;i<leftImg.length;i++){
                // console.log(leftImg.length)
                var x = leftImg[0].offsetLeft + leftImg[0].offsetWidth / 2;
                var y = leftImg[i].offsetTop + leftImg[i].offsetHeight / 2 + leftBtns.offsetTop;

                var a = ev.clientX - x;
                var b = ev.clientY - y;
                
                // 鼠标距离谁越近，c的值越小，c的值太大，除一个系数，变成0-1之前，但c/系数后的值与图片大小成反比，所以1-c/一个系数，
                var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
                
                var scale  = 0.9- c/300;
                // 当比例最小0,5时，图片为64px，
                if(scale < 0.6){
                    scale = 0.6;
                }
                // 70为图片的最大值，乘比例得变化的大小，放大境和滚动条原理
                leftImg[i].style.width = scale * 70+ 'px';
                leftImg[i].style.height = scale * 70 + 'px';
            }
                
        };
        return false;
    };




// ******************************二、顶部菜单切换+滚轮功能******************************
    pageTag();
    function pageTag(){
        var topNum = document.getElementById('topNum');
        var topNum_Lis = topNum.getElementsByTagName('li');
        var mainPages = document.getElementById('mainPages');
        var pageUl = mainPages.getElementsByTagName('ul');
        var pageWidth =document.documentElement.clientWidth;
        var iOld=0;
        console.log(pageWidth);
        for (var i = 1; i < pageUl.length; i++) {
            pageUl[i].style.left= -pageWidth + 'px'
        }
        for (var i = 0; i < topNum_Lis.length; i++) {
            (function(index){
                topNum_Lis[index].onclick = function(){
                    for(var i=0;i<topNum_Lis.length;i++){
                        topNum_Lis[i].className = '';
                    }
                    topNum_Lis[index].className = 'active';
                    createNum = index;
                    creatFileFn(topNum_Lis[index], index);

                    if(index<iOld){
                        pageUl[index].style.left=-pageWidth+'px';
                        mTween(pageUl[iOld],{'left':pageWidth,'opacity':0},500,'linear');
                       
                    }
                    else if(index>iOld) {

                        pageUl[index].style.left=pageWidth+'px';
                        mTween(pageUl[iOld],{'left':-pageWidth,'opacity':0},500,'linear');
                    }
                    mTween(pageUl[index],{'left':0,'opacity':1},500,'linear');
                    iOld = index;
                }
            })(i)
        }
        // 滚轮控制页面切换
        myWheel(document,function(down){
            if(down){       //滚轮向上滚的时候
               iOld--;         //改变iOld的值
               if(iOld < 0)
                {
                    iOld = topNum_Lis.length-1;
                }
            }else{          //下
               iOld++;
               if(iOld >= topNum_Lis.length)
                {
                    iOld = 0;
                }
            }
            for(var i=0;i<topNum_Lis.length;i++){
                topNum_Lis[i].className = '';
                if(i<iOld){
                    mTween(pageUl[i],{'left':-pageWidth,'opacity':0},500,'linear');
                    // console.log(iOld)
                }
                else{
                    mTween(pageUl[i],{'left':pageWidth,'opacity':0},500,'linear');
                }
            }
            topNum_Lis[iOld].className = 'active';          //顶部topNum更新为当前iOld为active
            createNum = iOld;
            creatFileFn(topNum_Lis[iOld], iOld);
            mTween(pageUl[iOld],{'left':0,'opacity':1},500,'linear');


        });
    }
    addEvent(window, 'resize', function() { //窗口发生改变时，更新可视区尺寸
       pageTag();

    })


// ************************************三、桌面图标功能项************************************
   
    var mainPages = document.getElementById('mainPages');
    var pageUl = mainPages.getElementsByTagName('ul');
    var iconClient = 150; //根据可视区设置一列4个坐标
    var iconSite = 117; //每个图标的坐标基数
    var onOff = true; //默认是纵向菜单  判断排列方式
    var popOnoff = true; //用来控制弹出窗口事件的触发
    var freeOnoff = true; //用于控制图标的排列时是否允许拖拽回原来的位置
    var menuOnoff = true; //用于区分文件夹右键和系统右键
    var arrRemove = []; //用于保存删除的文件夹的那个元素
    var filesRightMenu = document.getElementById('filesRightMenu'); //文件夹右键
    var filesChildren= filesRightMenu.children;
    for (i = 0; i < pageUl.length; i++) {
        pageUl[i].index = i; //用于存储删除ul的下标
        fileRightMenuFn(pageUl[i],pageUl[i].index);
        showIcon(pageUl[i], onOff);
        fileNamelocal(pageUl[i], pageUl[i].index);
        
    }
    
// ************************************pageUl下的所有图标操作***************************
    // 一、生成位置
    function showIcon(oParent, onOff) {
        var arr = []; //用来存储定位值
        var lis = oParent.getElementsByTagName('li');
        // console.log(1)

      //1、桌面图标排列
        function changeSite(onoff){
            if(onoff){      //默认纵向排列
                var iconLine = Math.floor(document.documentElement.clientHeight / iconClient);
                // console.log(iconLine)       //4
                iconLine = iconLine < 1 ? 1 : iconLine;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].index=i;     //用于删除文件夹时候更新索引值
                    mTween(lis[i],{'left':iconSite*Math.floor(i/iconLine),'top':iconSite*(i%iconLine)},500,'linear')
                    arr.push([iconSite * Math.floor(i / iconLine), iconSite * (i % iconLine)])
                    // console.dir(arr);
                }
            }else{      //横向排列
                var iconRow = Math.floor(document.documentElement.clientWidth / iconClient);
                console.log(iconRow)       //4
                iconRow = iconRow < 1 ? 1 : iconRow;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].index=i;     //用于删除文件夹时候更新索引值
                    mTween(lis[i],{'left':iconSite*(i%iconRow),'top':iconSite*Math.floor(i/iconRow)},500,'linear')
                    arr.push([iconSite * (i % iconRow), iconSite * Math.floor(i / iconRow)])
                    console.log(arr);
                }
            }

        }
        changeSite(onOff);
   
    

      // 2、图标拖拽----有bug
        // iconDrag();
        function iconDrag(){
            for (var i = 0; i < lis.length; i++) {
                lis[i].num=i;

                lis[i].onmousedown = function(ev){

                    popOnoff = true;      //按下出发弹窗事件
                    ev = ev || event;
                    var curL,curT;
                         //如果自由模式，不回到原来位置，那么获取当前坐标
                    if(!freeOnoff){     
                        curL = this.offsetLeft;
                        curT = this.offsetTop;
                       
                    }else{             
                         //不是自由排列时，图标回到原来位置，那么从数组中获取位置
                        curL = arr[this.num][0];
                        curT = arr[this.num][1];
                        console.log(curL,curT)
                    }
                    var disX = ev.pageX - curL;
                    var disY = ev.pageY - curT;
                    // 记录鼠标按下的位置，判断移动距离
                    var curX = ev.clientX;
                    var curY = ev.clientY;
                    var _this = this;

                

                    document.onmousemove =function(ev){

                        ev = ev || event;
                        if(Math.abs(ev.clientX-curX)>5 || Math.abs(ev.clientY-curY)>5){
                            freeOnoff = false;
                        }
                        _this.style.left = ev.clientX-disX+'px';
                        _this.style.top = ev.clientY-disY+'px';
                        // _this.style.zIndex = 1;


                    }

                    document.onmouseup = function() {
                        //如果鼠标抬起事件加在document上，那么为了防止改事件多次触发，需要先清掉鼠标抬起事件
                        var siteIndex = null;
                        var nearLi = judgeBump(_this);
                        if(nearLi){
                            var sibLeft = arr[nearLi.num][0];
                            var sibTop = arr[nearLi.num][1];
                            mTween(_this,{'left':sibLeft,'top':sibTop},500,'linear');
                            mTween(nearLi,{'left':curL,'top':curT},500,'linear');
                            // 位置属性交换
                            siteIndex = _this.num;
                            _this.num = nearLi.num;
                            nearLi.num = siteIndex;


                        }else{
                            if(freeOnoff){
                                mTween(_this,{'left':curL,'top':curT},500,'linear');
                                // console.log(111)
                            }
                        }
                        document.onmousemove = null;
                        document.onmousemup = null;
                        // _this.style.zIndex = 0;
                    }
                    return false;
                }
            }
        }

      //3、检测碰撞
        function check(obj1, obj2) {
            var L1 = obj1.offsetLeft;
            var R1 = L1 + obj1.offsetWidth;
            var T1 = obj1.offsetTop;
            var B1 = T1 + obj1.offsetHeight;

            var L2 = obj2.offsetLeft;
            var R2 = L2 + obj2.offsetWidth;
            var T2 = obj2.offsetTop;
            var B2 = T2 + obj2.offsetHeight;

            return !(L1 > R2 || T1 > B2 || R1 < L2 || B1 < T2); //满足这些条件表示没有碰撞，在取反就表示已经碰撞了
        }
      //4、判断重合面积大小  原理利用定位值的差值来判断重合面积的大小

        function judgeBump(curThis) {
            //console.log(curThis)
            var num = 1000; //用于判断最小重合面积使用
            var index; //用于保存符合要求的li元素
            for (var i = 0; i < lis.length; i++) {
                if ((check(lis[i], curThis)) && (lis[i] !== curThis)) {
                    var iLeft = Math.abs(lis[i].offsetLeft - curThis.offsetLeft);
                    var iTop = Math.abs(lis[i].offsetTop - curThis.offsetTop);
                    var posValue = iLeft + iTop; //拿到left和top值的和同一个值进行比较

                    if (posValue < num) { //判断得出最小值的索引
                        num = posValue;
                        index = i;
                    }
                }
            }
            if (index >= 0) { //这里面排除索引值为0的情况
                return lis[index];
            } else {
                return false;
            }
        }


    }
    //二、window窗口改变排列位置
    addEvent(window, 'resize', function() {
        if (onOff) {
            for (i = 0; i < pageUl.length; i++) {
                showIcon(pageUl[i], onOff); //图标位置生成函数调用
            }
        } else {
            for (i = 0; i < pageUl.length; i++) {
                showIcon(pageUl[i]); //图标位置生成函数调用
            }
        }
    })

    // 三、文件夹名本地存储
    var fileNameOrial = []; 

    function fileNamelocal(obj, n) {
        var aInput = obj.getElementsByTagName('input'); //获取每个ul下面的li
        if (localStorage.getItem('file' + n)) {
            var callName = localStorage.getItem('file' + n).split(',');
        }
        for (i = 0; i < aInput.length; i++) {
            if (localStorage.getItem('file' + n) && callName[i]) {
                aInput[i].value = callName[i];
            }else {
                continue;
            }
        }
    }

// 四、桌面弹窗
    var win_mask = document.getElementById('win_mask'); //弹出窗口
    var w_h2 = win_mask.getElementsByTagName('h2')[0]; //弹出窗口h2
    var con_cover = document.getElementById('con_cover'); //iframe遮罩层
    var iframe = win_mask.getElementsByTagName('iframe')[0] //获取iframe
    var ctrl_btn = win_mask.getElementsByTagName('a');
    var mini = document.getElementById('mini')
    var reduce = document.getElementById('reduce'),
        magnify = document.getElementById('magnify'),
        closeX = document.getElementById('closeX');


    var Tan=true;


    var iconLis = mainPages.getElementsByTagName('li');
        iconLis[7].onclick=function(){
           
                pop_defalut();
           
        }
    // 关闭
    closeX.onclick=function(){
        // alert(1);
        win_mask.className = 'hidden';
    }
    reduce.onclick=function(){
         win_mask.className = 'hidden';
         mini.style.display='block';
    }
    magnify.onclick=function(){
         win_mask.style.width = '1000px'
         win_mask.style.height = '650px';
         win_mask.style.marginLeft='-75px'

    };
    mini.onclick=function(){
        win_mask.className = 'show'
        this.style.display='none';
    }




    
    //弹出窗口设置默认值
    var json = {
        W: 800,
        H: 500,
        O: 100,
        L: 0,
        T: 0
    }

    //弹出窗口出现的位置
    function pop_defalut() {
        win_mask.className = 'show';
        Tan=false;
        win_mask.style.width = json.W + 'px'; //恢复默认left值
        win_mask.style.height = json.H + 'px'; //恢复默认高度
        win_mask.style.opacity = json.O; //恢复默认透明度
        win_mask.style.filter = 'apha(opacity:' + json.O + ')'; //恢复默认透明度

        clientW = document.documentElement.clientWidth;
        clientH = document.documentElement.clientHeight;

        //弹出窗口出现在桌面的中央位置
        var _left = Math.floor((clientW - win_mask.offsetWidth) / 2);
        var _top = Math.floor((clientH - win_mask.offsetHeight) / 2);
        json.L = _left;
        json.T = _top;

        win_mask.style.left = json.L + 'px';
        win_mask.style.top = json.T + 'px';
    }

    //绑定事件函数  浏览器窗口发生变化时改变图标的排列方式
    bind(window, 'resize', function() {
        clientW = document.documentElement.clientWidth;
        clientH = document.documentElement.clientHeight;
    });

    /*-------------------------弹出窗口拖拽-----------------------------------*/
    w_h2.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, win_mask);
        return false;
    } 
       

//******************************弹出窗口按钮变化******************************/
    // var li = null; //用于存储创建的折叠任务菜单的li元素

    // function popUp(_this, val, src, isLeft) {
    //     //切换弹出窗口标题
    //     if (isLeft) {
    //         w_h2.innerHTML = val;
    //         //添加桌面图标对应内容
    //         iframe.src = src;
    //         //折叠任务栏标题
    //         valT = val;
    //     } else {
    //         w_h2.innerHTML = val.value;
    //         //添加桌面图标对应内容
    //         iframe.src = src;
    //         //折叠任务栏标题
    //         valT = val.value;
    //     }

    // /*-----------------------------窗口最大化、最小化、关闭操作------------------------*/
    //     for (i = 0; i < ctrl_btn.length; i++) {
    //         //最小化按钮
    //         ctrl_btn[0].onclick = function() {
    //             mTween(win_mask,{'height':0,'top':500,'opacity':0},500,'linear',function(){
    //                 win_mask.className = 'hidden'; //隐藏弹出窗口
    //                 ctrl_btn[1].className = 'magnify'; //显示默认最大化按钮样式
    //                 if (ctrl_btn[1].onOff) { //如果中间按钮的状态为true，那么就恢复left值设置为0
    //                     win_mask.style.left = 0 + 'px'; //恢复默认left值

    //                 } else {
    //                     win_mask.style.left = json.L + 'px'; //恢复默认left值

    //                 }
    //             });
               

    //             setTimeout(function() { //延迟显示折叠任务菜单
    //                 fold_menu(valT, _this); //折叠任务菜单    
    //             }, 300)

    //         }
    //         //中间最大化按钮
    //         ctrl_btn[1].onclick = function() {
    //             this.onOff = !this.onOff;
    //             magnify(this.onOff, this);

    //         }
    //         ctrl_btn[2].onclick = function() {
    //             iframe.src = '';
    //             //关闭按钮
    //             mTween(win_mask,{'height':0,'top':500,'opacity':0},500,'linear',function(){
    //                 win_mask.className = 'hidden'; //隐藏弹出窗口
    //                 win_mask.style.cssText = 'width:' + json.W + 'px';
    //                 'height:' + json.H + 'px';
    //                 'top:' + json.T + 'px';
    //                 'left:' + json.L + 'px';
    //                 'opacity:' + json.O;
    //                 fliter: 'apha(opacity:' + json.O + ')';
    //                 ctrl_btn[1].className = 'magnify'; //显示默认最大化按钮样式
    //             });
                
    //         }
    //     } 
    // /*-------------------------弹出窗口拖拽-----------------------------------*/
    //     //在标题位置可以拖拽
    //     w_h2.onmousedown = function(ev) {
    //         ev = ev || event;
    //         //拿到鼠标到弹出窗口边界的位置
    //         var disX = ev.clientX - win_mask.offsetLeft;
    //         var disY = ev.clientY - win_mask.offsetTop;
    //         con_cover.style.display = 'block'; //显示iframe遮罩层

    //         document.onmousemove = function(ev) {
    //             ev = ev || event;
    //             //拿到元素在移动过程中的定位值
    //             var x = ev.clientX - disX;
    //             var y = ev.clientY - disY;
    //             if (y < 0) {
    //                 y = 0;
    //             }
    //             win_mask.style.left = x + 'px';
    //             win_mask.style.top = y + 'px';
    //         }
    //         document.onmouseup = function() {
    //             con_cover.style.display = 'none'; //隐藏iframe遮罩层
    //             document.onmouseup = null;
    //             document.onmousemove = null;
    //         }
    //         return false;
    //     }

    // /*------------------------折叠任务菜单操作处理--------------------------------*/
    //     //折叠任务菜单处理

    //     function fold_menu(val, _this) {
    //         if (min_menu_bg.children.length == 0) { //如果为0，那么就创建这个元素
    //             li = document.createElement('li');
    //         }
    //         li.innerHTML = '<div class="min_menu_box"><span class="min_menu"><h2>' + val + '</h2><a class="bg" href="javascript:;"></a><a class="close" href="javascript:;"></a></div></div>';

    //         //向创建的li元素中添加内容
    //         if (li) { //如果存在li，就添加到页面中去
    //             min_menu_bg.appendChild(li);
    //         };
    //         //显示做小化折叠菜单
    //         mTween(li,{'width':112},300,'linear');
    //         //给生成的li添加事件
    //         var oSpan = getClass('min_menu', li)
    //         li.onmouseover = function() {
    //                 var aA = oSpan[0].getElementsByTagName('a');
    //                 var win_mask = document.getElementById('win_mask'); //弹出窗口
    //                 var onOff = true;
    //                 var _this = this;
    //                 mTween(oSpan[0],{'top':-42},300,'linear');
                 
    //                 //还原
    //                 aA[0].onclick = function() {
    //                     mTween(li,{'width':0},500,'easeIn',function(){
    //                          min_menu_bg.removeChild(li);
    //                     });
                     
    //                     if (ctrl_btn[1].onOff) {
    //                         mTween(win_mask,{'height':clientH,'opacity':json.O,'top':0},500,'linear');
                            
    //                     } else {
    //                         mTween(win_mask,{'height':json.H,'opacity':json.O,'top':json.T},500,'linear');
                       
    //                     }
    //                     win_mask.className = 'show';
    //                 }
    //                 //关闭
    //                 aA[1].onclick = function() {
    //                     iframe.src = '';
    //                     mTween(li,{'width':0},500,'linear',function(){
    //                         min_menu_bg.removeChild(li); 
    //                     });
    //                     ctrl_btn[2].onclick(); //此时在调用一遍关闭按钮的事件函数，保证窗口打开的位置还是居中显示

    //                 }
    //             }
    //             //鼠标移入折叠菜单
    //             li.onmouseout = function() {
    //                 var _that = this;
    //                  mTween(oSpan[0],{'top':0},300,'linear')
                    
    //             }
    //     }
    //     //最大化

    //     function magnify(onOff, _this) {
    //         if (onOff) {
    //             //切换最大化按钮
    //             _this.className = 'bg';
    //             mTween(win_mask,{'width':clientW,'height':clientH,'left':0,'top':0,"opacity":100},600,'linear');
                
    //         } else {
    //             _this.className = 'magnify';
    //             mTween(win_mask,{'width':json.W,'height':json.H,'left':json.L,'top':json.T,"opacity":0},600,'linear');
                
    //         }
    //     }
    // }

/**************************************桌面右键菜单********************************/
    var filesMenu = document.getElementById('filesRightMenu'),
        fileLis = filesMenu.getElementsByTagName('li'),
        deskMenu = document.getElementById('deskRightMenu'),
        deakLis = deskMenu.getElementsByTagName('li');
    var iconLis = mainPages.getElementsByTagName('li');
    // console.log(iconLis)



        document.oncontextmenu = function(ev){
            ev = ev || event;
            var disX = ev.clientX;
            var disY = ev.clientY;
            deskMenu.style.left = disX + 'px';
            deskMenu.style.top = disY + 'px';
            filesMenu.style.display = 'none';
            deskMenu.style.display = 'block';
            return false;
        }



        RightMenu(fileLis);
        RightMenu(deakLis);

        function RightMenu(obj){
            for (var i = 0; i < obj.length; i++) {
                //给li添加
                obj[i].onmouseover =function(){
                    this.children[0].className ='active';
                    if(this.children[0].children[0]){
                        this.children[0].children[0].className='down';
                        this.children[1].style.display = 'block';
                    }
                }

                obj[i].onmouseout = function(){
                    this.children[0].className ='';
                    if(this.children[0].children[0]){
                        this.children[0].children[0].className='';
                        this.children[1].style.display = '';
                    }

                }
            }
        }
        document.onclick = function() {
            filesMenu.style.display = 'none'; //隐藏文件夹上的右键菜单
            deskMenu.style.display = 'none'; //隐藏右键菜单
        } 

/**************************************文件夹右键菜单********************************/

    function fileRightMenuFn(obj,uIndex){
        var iconLis = obj.getElementsByTagName('li');
        var aInput = obj.getElementsByTagName('input'); //获取每个ul下面的li

        for (var i = 0; i < iconLis.length; i++) {
            iconLis.index=i;
            iconLis[i].oncontextmenu = function(ev){
                // alert(2);
                var _this=this;
                ev = ev || event;
                var disX = ev.clientX;
                var disY = ev.clientY;
                filesMenu.style.left = disX + 'px';
                filesMenu.style.top = disY + 'px';
                deskMenu.style.display = 'none';
                filesMenu.style.display = 'block';
                ev.cancelBubble = true;

                fileLis[0].onclick=function(){
                    // alert('打开');
                    _this.onclick();
                }
                fileLis[1].onclick=function(){
                    // alert('删除')
                    mTween(_this, {'opacity':0},200,'linear',function() {
                            obj.removeChild(_this);
                            for (i = 0; i < pageUl.length; i++) { //更新图标位置
                                showIcon(pageUl[i], onOff); //图标位置生成函数调用
                            }
                        })
                   
                }
                fileLis[2].onclick=function(){
                    // alert('重命名')
                    aInput[_this.index].focus(); //设置焦点
                    aInput[_this.index].select(); //默认选中

                    //回车按下时也可以取消焦点
                    document.onkeydown = function(ev) {
                        ev = ev || event;
                        if (ev.keyCode == 13) {
                            aInput[_this.index].blur();
                        }
                    }
                    //失去焦点 获取并且存储value
                    aInput[_this.index].onblur = function() {
                        if (localStorage.getItem('recallName' + uIndex)) { //如果存储的原来文件夹的名称存储，那么下次存储的时候，从已有的内容继续开始

                            fileNameOrial = localStorage.getItem('recallName' + uIndex).split(',')
                        }
                        var pIndex = _this.parentNode.index
                        fileNameOrial[_this.index] = aInput[_this.index].value;
                        localStorage.setItem('recallName' + pIndex, fileNameOrial);
                    }  
                }
                return false;
            }

        }
       

    }


/***************************更改图标大小***************************/
    var rightLook = deskMenu.getElementsByTagName('ul')[0];
    var rightLookLis = rightLook.getElementsByTagName('li'); 
    var num = 0;
    // 添加勾选状态
    function rightChecked(ele, obj) {
        for (i = 0; i < ele.length; i++) {
            ele[i].className = '';
        }
        obj.className = 'checked';
    }
    // 切换小图标
    rightLookLis[0].onclick=function(){
        rightChecked(rightLookLis,this)
        iconClient = 120; 
        iconSite = 107;
        num = 1;
        for (var i = 0; i < iconLis.length; i++) {
            setStyle(iconLis[i],{height : '75px',width:'72px',padding:'5px'});

        }
        for (var i = 0; i < pageUl.length; i++) {
            showIcon(pageUl[i], onOff)
        }
        deskMenu.style.display = 'none';
    };

    // 切换中等图标
    rightLookLis[1].onclick=function(){
        rightChecked(rightLookLis,this)
        iconClient = 150; 
        iconSite = 117;
        num = 1;
        for (var i = 0; i < iconLis.length; i++) {
            setStyle(iconLis[i],{height : '86px',width:'88px',padding:'5px'});

        }
        for (var i = 0; i < pageUl.length; i++) {
            showIcon(pageUl[i], onOff)
        }
        deskMenu.style.display = 'none';
    };
    // 切换大图标
    rightLookLis[2].onclick=function(){
        rightChecked(rightLookLis,this)
        iconClient = 180; 
        iconSite = 127;
        num = 1;
        for (var i = 0; i < iconLis.length; i++) {
            setStyle(iconLis[i],{height : '96px',width:'98px',padding:'5px'});

        }
        for (var i = 0; i < pageUl.length; i++) {
            showIcon(pageUl[i], onOff)
        }
        deskMenu.style.display = 'none';
    };


/***************************排序方式***************************/
    var sortUl = deskMenu.getElementsByTagName('ul')[1];
    var rightSortLis = sortUl.getElementsByTagName('li');
    // 横向排列
    rightSortLis[0].onclick=function(){
        // alert(1);
        rightChecked(rightSortLis,this);
        onOff = false;      //横向为false
        freeOnoff = true;       //允许图标拖拽到原来的位置
        for (var i = 0; i < pageUl.length; i++) {
            showIcon(pageUl[i], onOff)
        }

    }

    // 纵向排列
    rightSortLis[1].onclick=function(){
        // alert(1);
        rightChecked(rightSortLis,this);
        onOff = true;       //纵向为true
        freeOnoff = true;       //允许图标拖拽到原来的位置
        for (var i = 0; i < pageUl.length; i++) {
            showIcon(pageUl[i], onOff)
        }

    }

    // 自由排列
    rightSortLis[2].onclick=function(){
        alert(1);
        rightChecked(rightSortLis,this);
        freeOnoff = false;       //允许图标拖拽到原来的位置
    }


/***************************右键刷新***************************/
    var rightReload = deskMenu.children[2];

    rightReload.onclick=function(){
        var reloadArr = []; 
        for (i = 0; i < iconLis.length; i++) {
            reloadArr.push(iconLis[i]);
            mTween(iconLis[i], {'opacity': 0},200,'linear',function(){
                for (var j = 0; j < reloadArr.length; j++) {
                    mTween(reloadArr[j], {'opacity':1},100,'linear')
                }
            })
        }
    }
/******************************新建文件夹***************************/
    var construcFile = deskMenu.children[3];
    var topNum = document.getElementById('topNum');
    var topNum_Lis = topNum.getElementsByTagName('li');
    // pageUl
    var createFile=[];
    var fileArr = [];
    // console.log(topNum_Lis[0],0)
    creatFileFn(topNum_Lis[0],0)
    function creatFileFn(obj,index){
        if(localStorage.getItem(index)){
            obj.creatNum = localStorage.getItem(index);
        }else{
            obj.creatNum=-1;//用于计算生成文件的个数
        }
        if (!fileArr[index]) {
            fileArr[index]=1;
            createLis(obj,index);       // 读取数据
        }

        construcFile.onclick=function(){
            // alert('新建')
            createLis(obj, index, true); //右键创建文件夹

        }

    }

    var fileNameArr=[];     //用于存储文件夹的名称
    function createLis(obj, index, isCreate){//isCreate如果为true 就可以创建文件夹
        // 设置缓存
        if(isCreate){
            obj.creatNum++;
            localStorage.setItem(index,obj.creatNum);
        }
        // 创建文件夹
        if(isCreate){
            var li = document.createElement('li');
            li.innerHTML='<a href="javascript:;">'+
            '<img src="style/img/desktop/file2.png" alt="新建文件夹"/>'+
            '<span><input placeholder="新建文件夹" type="text" value="新建文件夹"/></span></a>'
            pageUl[index].appendChild(li)
        }else{//读取存储中创建li的个数
            if (!createFile[index]&&localStorage.getItem('name'+index)) {
                createFile[index] = localStorage.getItem(index); //获取创建文件夹的个数
                var arrCall = localStorage.getItem('name' + index).split(','); //分割后获取文件夹名称

                if (createFile[index] == null) {
                    return;
                }
                //创建li
                for (var i = 0; i <= createFile[index]; i++) {
                    var li = document.createElement('li');
                    li.innerHTML = '<a href="javascript:;">'+
                    '<img src="style/img/desktop/file2.png" alt="' + arrCall[i] + '"/>'+
                    '<span><input placeholder="' + arrCall[i] + '" type="text" value="' + arrCall[i] + '"/></span></a>';
                    //将创建的li插入到对应ul下面
                    pageUl[index].appendChild(li);
                }
            }
        }
        if (li) {
            switch (num) {
            case 1:
                setStyle(li,{height : '75px',width:'72px',padding:'5px'});

                break;
            case 2:
                setStyle(li,{height : '86px',width:'88px',padding:'5px'});
                break;
            case 3:
                css(li, '110px', '110px', '0px', '15px');
                break;
            default:
               setStyle(li,{height : '96px',width:'98px',padding:'5px'});
            }
        }
        for (var i = 0; i < pageUl.length; i++) {
            if (localStorage.getItem('name' + index)) { //如果有那么就从已经有的内容中在进行添加
                fileNameArr = localStorage.getItem('name' + index).split(','); //获取文件夹名称
            }
            // var index = pageUl[index].children.length - 1;
            //获取新创建的li下的input
            var input = pageUl[index].children[pageUl[index].children.length - 1].getElementsByTagName('input')[0];

            if (isCreate) { //修改文件夹名称
                input.focus();
                input.select();
            }
            //回车取消焦点
            document.onkeydown = function(ev) {
                ev = ev || event;
                if (ev.keyCode == 13) {
                    input.blur();
                }
            }

            //失去焦点时获取value 并且存储文件夹名称
            input.onblur = function() {
                fileNameArr.push(input.value);
                localStorage.setItem('name' + index, fileNameArr); //存储输入的value
            }
            //更新图标的位置
            showIcon(pageUl[i], onOff, i); 
            fileRightMenuFn(pageUl[i],i);
            // app_click(pageUl[i], i); //更新图标操作

        }
        // searchFile();


    }

/***************************个性化设置***************************/
    var selfSet = deskMenu.children[4];
    selfSet.onclick=function(){
        bouncedFn();
    }

/****************************便签********************************/
    var noteOpen = deskMenu.children[5]; //右键
    var notepad = document.getElementById('notepad');
    var add = document.getElementById('add');
    var closeNote = document.getElementById('closeNote');
    var note_title = document.getElementById('note_title');
    var list = document.getElementById('list');
    var content = document.getElementById('content');
    var save = document.getElementById('save');
    var del = document.getElementById('del');
    var textarea = document.getElementById('textarea');

    var arr = []; //用来存储内容
    var date = new Date();
    var time = (date.getMonth() + 1) + "月" + date.getDate() + "日";
    //如果有存储内容就读取
    if (localStorage.getItem('note')) {
        arr = localStorage.getItem('note').split(','); //将所条数据分割
    }
    noteOpen.onclick = function() {
        notepad.style.left = deskMenu.offsetLeft + 'px';
        notepad.style.top = deskMenu.offsetTop + 'px';
        notepad.style.display = 'block';
    }
    //添加
    add.onclick = function() {
        textarea.value = '';
        content.style.display = 'block';
        list.style.display = 'none';
        save.index = -1;
        textarea.focus();
    }
    //保存
    save.onclick = function() {
        content.style.display = 'none';
        list.style.display = 'block';
        var con = time + "=" + encodeURIComponent(textarea.value); //将字符进行编码
        if (save.index == -1 && textarea.value == '') return; //如果文本为空就不添加

        //保存时删除数据
        if (save.index != -1 && textarea.value == '') {
            arr.splice(save.index, 1);
            updateList();
            return;
        }
        if (save.index != -1) {
            arr.splice(save.index, 1, con);
            updateList();
            return;
        }
        //每条数据的存储
        if (save.index == -1) {
            if (arr.length == 0) {
                arr[0] = con;
            } else {
                arr.unshift(con);
            }
        }
        updateList();
    }
    //删除数据
    del.onclick = function() {
        var result = confirm('你确定要删除这条便签吗?');
        if (result) {
            arr.splice(save.index, 1);
            content.style.display = 'none';
            list.style.display = 'block';
            updateList();
        }
    }

    //更新数据

    function updateList() {
        localStorage.setItem('note', arr.toString());
        list.innerHTML = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr.length == 0) return;
            var li = document.createElement('li');
            //标题
            var title = decodeURIComponent(arr[i].split("=")[1]).substring(0, 20); //解码并且限制字符的长度
            //时间
            var t = arr[i].split('=')[0];
            li.innerHTML = '<span>' + t + '</span>' + title;
            list.appendChild(li);
        }
        //获取点击内容
        var aLi = list.getElementsByTagName("li");
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].onclick = function() {
                var con = arr[i].split('=')[1];
                var num = i;
                return function() {
                    content.style.display = 'block';
                    list.style.display = 'none';
                    textarea.focus();
                    save.index = num;
                    textarea.value = decodeURIComponent(con);
                }

            }(i)
        }
    }
    updateList(); //页面刷新自动跟新数据

    //隐藏便签
    closeNote.onclick = function() {
        move(notepad, {
            'height': {
                target: 0,
                duration: 400,
                fx: 'linear'
            },
            'opacity': {
                target: 0,
                duration: 400,
                fx: 'linear'
            }
        }, function() {
            notepad.style.display = 'none';
            notepad.style.opacity = '1';
            notepad.style.fliter = 'apha(opacity:100)';
            notepad.style.height = '395px';
        })


    }
    //拖动便签窗口
    note_title.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, notepad);
        return false;
    } 

    function drag(ev, obj) {
        var disX = ev.clientX - obj.offsetLeft;
        var disY = ev.clientY - obj.offsetTop;
        document.onmousemove = function(ev) {
            ev = ev || event;
            var x = ev.clientX - disX;
            var y = ev.clientY - disY;
            var maxL = document.documentElement.clientWidth - obj.offsetWidth;
            var maxT = document.documentElement.clientHeight - obj.offsetHeight;
            //限定x,y值得范围
            if (x < 0) {
                x = 0;
            }
            if (x > maxL) {
                x = maxL;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > maxT) {
                y = maxT;
            }
            obj.style.left = (x) + 'px';
            obj.style.top = (y) + 'px';
        }
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    }

/*******************************下拉壁纸*******************************/
    var bgData=[
                 {  title:"cartoon",
                    id:0,
                    pic:["cartoon01.jpg","cartoon02.jpg","cartoon03.jpg","cartoon04.jpg","cartoon05.jpg","cartoon06.jpg","cartoon07.jpg",
                            "cartoon08.jpg","cartoon09.jpg","cartoon10.jpg","cartoon11.jpg","cartoon12.jpg","cartoon13.jpg","cartoon14.jpg"]

                },
                {   title:"dazzle",
                    id:1,
                    pic:["dazzle01.jpg","dazzle02.jpg","dazzle03.jpg","dazzle04.jpg","dazzle05.jpg","dazzle06.jpg","dazzle07.jpg",
                            "dazzle08.jpg","dazzle09.jpg","dazzle10.jpg","dazzle11.jpg","dazzle12.jpg","dazzle13.jpg","dazzle14.jpg"]

                },
                {   title:"fresh",
                    id:2,
                    pic:["fresh01.jpg","fresh02.jpg","fresh03.jpg","fresh04.jpg","fresh05.jpg","fresh06.jpg","fresh07.jpg",
                            "fresh08.jpg","fresh09.jpg","fresh10.jpg","fresh11.jpg","fresh12.jpg","fresh13.jpg","fresh14.jpg"]

                },
                {   title:"pet",
                    id:3,
                    pic:["pet01.jpg","pet02.jpg","pet03.jpg","pet04.jpg","pet05.jpg","pet06.jpg","pet07.jpg",
                            "pet08.jpg","pet09.jpg","pet10.jpg","pet11.jpg","pet12.jpg","pet13.jpg","pet14.jpg"]

                },
                {   title:"sys",
                    id:4,
                    pic: ["sys01.jpg","sys02.jpg","sys03.jpg","sys04.jpg","sys05.jpg","sys06.jpg","sys07.jpg",
                            "sys08.jpg","sys09.jpg","sys10.jpg","sys11.jpg","sys12.jpg","sys13.jpg","sys14.jpg"]

                }
               
        ]
    var bgpic = document.getElementById('bgpic'),
        wallBg=document.getElementById('wallBg');
    create(0);
    function create(n){
        for(var i=0;i<8;i++){
            var li=document.createElement("li");
            var img=document.createElement('img');
            img.src="style/img/desktop/"+bgData[n].pic[i]
            li.appendChild(img);
            // console.log(li)
            wallBg.appendChild(li);

        }
        // console.log(wallBg)
    }

    var bgimgs = wallBg.getElementsByTagName('img');
    var bgOp = bgpic.getElementsByTagName('p')[0];

    bgpic.onmouseover=function(){
        // console.log(1)
        wallBg.style.display='block';
        mTween(wallBg,{'height':363,'opacity':1},200,'linear',function(){
            for (var i = 0; i < bgimgs.length; i++) {
                setStyle(bgimgs[i],{height : '90px',width:'124px',opacity:1,webkitTransition:'0.3s'});

            }
            setStyle(bgOp,{opacity:1,webkitTransition:'1s'});

        });
    }
    bgpic.onmouseout=function(){
        wallBg.style.display='none';
        mTween(wallBg,{'height':0,'opacity':0},200,'linear',function(){
             for (var i = 0; i < bgimgs.length; i++) {
                setStyle(bgimgs[i],{height : '0px',width:'0px',opacity:0,webkitTransition:'0s'});
            }
            setStyle(bgOp,{opacity:0,webkitTransition:'0s'});

         });
    }
    for (var i = 0; i < bgimgs.length; i++) {
        addEvent(bgimgs[i],'click',function(){
             deskBg_img.src=this.src;
        })
    }    



/*******************************登录注册*******************************/
    var userLogin = document.getElementById('Userlogin'),
        userLoginUl=userLogin.getElementsByTagName('ul')[0],
        userLoginUl_li=userLoginUl.getElementsByTagName('li');
    var On=true;
    console.log(userLoginUl);
    userLogin.onclick=function(){
        if(On){
           userLoginUl.style.height = '105px';
           for (var i = 0; i < userLoginUl_li.length; i++) {
               userLoginUl_li[i].style.height='35px';
               userLoginUl_li[i].style.opacity='1';
               // userLoginUl_li[i].style.display='block';
           }
           On=false;
        }else{
           userLoginUl.style.height = '0px';
           for (var i = 0; i < userLoginUl_li.length; i++) {
               userLoginUl_li[i].style.height='0';
               userLoginUl_li[i].style.opacity='0';
           }
           On=true;
        }
    }
    userLogin.onmouseover=function(){
        userLoginUl.style.height = '105px';
        for (var i = 0; i < userLoginUl_li.length; i++) {
            userLoginUl_li[i].style.height='35px';
            userLoginUl_li[i].style.opacity='1';
            // userLoginUl_li[i].style.display='block';
        }
        On=false;
    }
    userLogin.onmouseout=function(){
        userLoginUl.style.height = '0px';
        for (var i = 0; i < userLoginUl_li.length; i++) {
            userLoginUl_li[i].style.height='0';
            userLoginUl_li[i].style.opacity='0';
        }
        On=true;
    }

// ----------------登录注册出现界面-----------------------
    var login = document.getElementById('login');
    var reg_btn = login.getElementsByTagName('a')[0];
    var close_g = login.getElementsByTagName('span')[0]; //登陆关闭
    var land = document.getElementById('land');
    var close_d = land.getElementsByTagName('span')[0] //注册关闭

    var land_status = document.getElementById('land_status'); //登陆状态
    var land_pic = document.getElementById('land_pic'); //登陆状态显示的图片

    //顶部登陆按钮
    userLoginUl_li[0].onclick = function() {
        // alert(1);
        user.value = ''; //初始化
        pas.value = ''; //初始化
        reg_land(login, 350, true);
        login.style.display = 'block';
        land.style.display = 'none';
    }
    //顶部注册按钮
    userLoginUl_li[1].onclick = function() {
        username.value = ''; //初始化
        password.value = ''; //初始化
        password1.value = ''; //初始化
        man.checked = 'checked'; //初始化
        status(username, aSpan[2], '*请输入您的手机号', true); //初始化
        status(password, aSpan[4], '*密码为6-12个字符区分大小写', true); //初始化
        status(password1, aSpan[6], '*请再次输入密码', true); //初始化
        reg_land(land, 430, true);
        login.style.display = 'none';
        land.style.display = 'block';
    }
    userLoginUl_li[2].onclick=function(){
        if(view){
            stali[1].onclick ();
        }else{
            userLoginUl_li[0].onclick();
        }
        
    }

    //点击登陆窗口中的注册
    reg_btn.onclick = function() {
        reg_land(login);
        reg_land(land, 430, true);

    }
    //点击x取消登陆
    close_g.onclick = function() {
        reg_land(login);

    };
    //点击x取消注册
    close_d.onclick = function() {
        reg_land(land);

    }
    //注册登陆显示和取消函数封装

    function reg_land(obj, height, result) {
        if (result) {
            obj.style.display = 'block';
            clientW = document.documentElement.clientWidth;
            clientH = document.documentElement.clientHeight;
            var _left = Math.floor((clientW - obj.offsetWidth) / 2);
            var _top = Math.floor((clientH - height) / 2);
            obj.style.left = _left + 'px';
            //login.style.top = _top+'px';
            mTween(obj,{'opacity':1,'top':_top,'height':height},1000,'linear');
            
        } else {
            mTween(obj,{'opacity':0,'top':0,'height':0},700,'linear');
        }
    } 
// -----------------注册验证-----------------------
    var land = document.getElementById('land');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var aSpan = land.getElementsByTagName('span');
    var submit = document.getElementById('submit');
    var r_man = document.getElementById('man');
    var r_woman = document.getElementById('woman');
    var regPhone = /^1[3|4|5|8][0-9]\d{8}$/; //匹配手机号
    var regPassword = /^[A-Za-z0-9]{6,12}$/; //匹配密码
    var valU, valP, valP1, valS = man.value,
        imgSrc = 'man'; //默认值是男;

    //验证用户名 手机
    username.onfocus = function() {
        setInterval(function() {
            valU = username.value;
        }, 10)
    };

    username.onblur = function() {
        if (valU == '') return;
        if (valU.match(regPhone)) {
            status(username, aSpan[2], '*请输入您的手机号', true);

        } else {
            status(username, aSpan[2], '*请输入正确的手机号', false);
        }
    }
    //验证密码  必须是数字或者字母以及它们的组合
    password.onfocus = function() {
        setInterval(function() {
            valP = password.value;
        }, 10)
    };

    password.onblur = function() {
        if (valP == '') return;
        if (valP.match(regPassword)) {
            status(password, aSpan[4], '*密码为6-12个字符区分大小写', true);
        } else {
            status(password, aSpan[4], '*验证密码  必须是数字或者字母以及它们的组合', false);
        }
    }
    //再次输入密码验证
    password1.onfocus = function() {
        setInterval(function() {
            valP1 = password1.value;
        }, 10);
    };
    password1.onblur = function() {
        if (valP1 == '') return;
        if (valP1 != undefined && valP != undefined && valP1 == valP) {
            status(password1, aSpan[6], '*请再次输入密码', true);
        } else {
            status(password1, aSpan[6], '*两次输入密码不一致', false);
        }
    }
    //获取性别  男
    r_man.onclick = function() {
        valS = r_man.value;
        imgSrc = 'man';
    }
    //获取性别  男
    r_woman.onclick = function() {
        valS = r_woman.value;
        imgSrc = 'woman';
    }
    //点击注册
    register.onclick = function() {
        if (valU != undefined && valP != undefined && valP1 != undefined) {
            if (valU.match(regPhone) && valP.match(regPassword) && (valP1 == valP)) {
                var json = JSON.parse(localStorage.getItem(valU));
                if (json && json.username == valU) {
                    alert('用户名已存在');
                    return;
                }
                var json1 = {
                    'username': valU,
                    'password': valP,
                    'sex': valS,
                    'name': imgSrc
                }
                localStorage.setItem(valU, JSON.stringify(json1));
                alert('恭喜您注册成功');
                userLoginUl_li[0].onclick(); //重新登陆
            }
        } else {
            alert('请注册')
        }
    }
    //判断验证对错的状态显示

    function status(obj1, obj2, str, result) {
        if (result) {
            obj1.style.border = '1px solid #c7c7c7';
            obj2.innerHTML = str;
            obj2.style.color = '#f38200';
        } else {
            obj1.style.border = '1px solid red';
            obj2.innerHTML = str;
            obj2.style.color = 'red';

        }
    } 
/*------------------登陆验证------------------------*/
    var login = document.getElementById('login');
    var user = document.getElementById('user');
    var pas = document.getElementById('pas');
    var log = document.getElementById('log')
    var remember = document.getElementById('remember'); //记住密码
    var land_status = document.getElementById('land_status'); //登陆成功时的状态
    var valUser, valPas, key;
    //获取用户名
    user.onclick = function() {
        setInterval(function() {
            valUser = user.value;
        }, 10)
    }
    //获取密码
    pas.onclick = function() {
        setInterval(function() {
            valPas = pas.value;
        }, 10)
    }
    //登陆  验证密码
    log.onclick = function() {
        if (!valUser) {
            shake(user, 'left');
        };
        if (!valPas) {
            shake(pas, 'left');
        }
        if (valUser && valPas) {
            var json = JSON.parse(localStorage.getItem(valUser));
            if (!json) {
                alert('用户名不存在，请注册');

            } else if (json && (valUser == json.username && valPas !== json.password)) {

                alert('用户名或者密码有错误');

            } else if (json && (valUser == json.username && valPas == json.password)) {

                key = valUser; //保存用户名，供修改密码使用
                alert('成功登陆');
                reg_land(login, 350);

                //显示登陆状态
                reg_land(land);
                land_pic.src = 'style/img/desktop/' + json.name + '.png';
                land_status.style.display = 'block';
                view=true;
                var json2 = {
                    'name': json.name,
                    'checked': remember.checked
                }
                localStorage.setItem('status', JSON.stringify(json2));
                if (!remember.checked) {
                    user.value = '';
                    pas.value = '';
                }

            }

        }
    }
/*------------------修改密码-------------------------*/
    var change_password = document.getElementById('change_password');
    var ori_pas = document.getElementById('ori_pas');
    var new_pas = document.getElementById('new_pas');
    var yes = document.getElementById('yes');
    var no = document.getElementById('no');
    var valOri, valNew;
    //获取原密码
    ori_pas.onclick = function() {
        setInterval(function() {
            valOri = ori_pas.value;
        }, 10)
    }
    //获取新密码
    new_pas.onclick = function() {
        setInterval(function() {
            valNew = new_pas.value;

        }, 10)
    }
    //确定  修改密码
    yes.onclick = function() {
        var json = JSON.parse(localStorage.getItem(key)); //用于存储新的密码
        if (valOri == undefined || valOri == '') {
            shake(ori_pas, 'left');
        }
        if (valNew == undefined || valNew == '') {
            shake(new_pas, 'left');
        }
        if (valOri && valNew) {
            if (!json) {
                alert('密码错误');
            } else if (json && json.password == valNew) {
                alert('两次密码不能重复')
            } else if (json && json.password != valNew) {
                if (!valNew.match(regPassword)) {
                    alert('密码必须是6-12位')
                } else {
                    alert('修改密码成功');
                    json.password = valNew;
                    localStorage.setItem(key, JSON.stringify(json));
                    reg_land(change_password, 346);
                }

            }
        }
    }
    //取消  不修改密码
    no.onclick = function() {
        ori_pas.value = '';
        new_pas.value = '';
        reg_land(change_password, 346);
    }

/*--------------------------登陆成功时的状态-----------------------*/
    var showSpan = land_status.getElementsByTagName('span')[0]; //用户在线中
    var stali = land_status.getElementsByTagName('li');
    var jt = document.getElementById('jiantou'); //三角形
    var select = document.getElementById('select');
    var json3 = JSON.parse(localStorage.getItem('status'));
    var view=false;
    if (json3 && json3.checked) {
        land_pic.src = 'style/img/desktop/' + json3.name + '.png';
        land_status.style.display = 'block';
        view=true;

    }
    stali[0].onclick = function() {
        reg_land(change_password, 346, true);
        ori_pas.value = ''; //初始化
        new_pas.value = ''; //初始化
    }
    stali[1].onclick = function() {
        confirm('你确定要注销登陆吗?')
        land_status.style.display = 'none';
        view=false;
        remember.checked = false;
        //更新数据
        var json2 = {};
        json2.checked = false;
        localStorage.setItem('status', JSON.stringify(json2));
    };
    land_status.onmouseover = function() {
        showSpan.className = 'mouse';
        select.style.display = 'block';
    }
    land_status.onmouseout = function() {
        showSpan.className = '';
        select.style.display = 'none';
    }
/*-------------------登陆窗口，注册窗口，密码修改窗口拖拽--------*/
    //login  land change_password
    var login_top = document.getElementById('login_top');
    var change_top = document.getElementById('change_top');
    var land_title = document.getElementById('land_title');
    //拖拽 登陆窗口
    login_top.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, login);
    }
    //拖拽 注册窗口
    land_title.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, land);

    }
    //拖拽 拖拽密码修改窗口
    change_top.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, change_top);
        return false; //阻止浏览器默认行为
    }


// *********************************换一批*******************************************
    var exchange = bgOp.getElementsByTagName('a')
    var n=0;
    exchange[0].onclick=function(){
        wallBg.innerHTML='';

        if(n>=bgData.length-1){
            n=-1;
        }
        n++; 
        // console.log(n,bgData.length)
        create(n);
        bgpic.onmouseover();
        for (var i = 0; i < bgimgs.length; i++) {
            addEvent(bgimgs[i],'click',function(){
                 deskBg_img.src=this.src;
            })
        }   

    }

// ********************************更多精彩壁纸*******************************************
    exchange[1].onclick=function(){
        bouncedFn();
    }
    // 弹出皮肤弹窗
    function bouncedFn(){
        var wallBox = document.getElementById('wallBox');
        wallBox.style.display='block';
        mTween(wallBox,{'opacity':1,'marginTop':-175,'marginLeft':-435},500,'linear')
    }

    // 关闭皮肤弹窗
    var close=document.getElementById('close');
    close.onclick=function(){
        mTween(wallBox,{'opacity':0,'marginTop':-350,'marginLeft':-870},500,'linear',function(){
            // wallBox.style.display='none';
            setStyle(wallBox,{'opacity':0,'marginTop':'-700px','marginLeft':'870px'})
        })
    }

    var leftMenu4=document.getElementById('menu4')
    leftMenu4.onclick=function(){
        bouncedFn();
    }


    // 壁纸栏目切换
    var bgContent = document.getElementById('bgContent');
    var bgUls = bgContent.getElementsByTagName('ul');

    var wallBox_title =document.getElementById('wallBox_title');
    var wallBox_lis = wallBox_title.getElementsByTagName('a');
    // console.log(wallBox_lis)
    for (var i = 0; i < wallBox_lis.length; i++) {
        (function(index){
            wallBox_lis[i].onclick=function(){
                for (var i = 0; i < wallBox_lis.length; i++) {
                    wallBox_lis[i].className='';
                    bgUls[i].className=''
                } 
                    wallBox_lis[index].className='active';
                    bgUls[index].className='active';
            }
        })(i)
    }
   
    // 读取皮肤数据
    for (var i = 0; i < bgUls.length; i++) {
        creatUlbg(i);
    }
    function creatUlbg(k){
        bgUls[k].innerHTML='<li><img class="big" src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img class="big" src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img class="last" src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img src="style/img/desktop/"></li>'+
                            '<li><img class="last" src="style/img/desktop/"></li>'

        var bgLisImg = bgUls[k].getElementsByTagName('img');
        for (var i = 0; i < bgData[k].pic.length; i++) {
            bgLisImg[i].src='style/img/desktop/'+bgData[k].pic[i]
           // console.log(bgLisImg[i])
        }
    }     


    // 鼠标滑过预览图片
    var bgPreview =document.getElementById('bgPreview');
    var previewSpan = bgPreview.getElementsByTagName('span')[0]
    var deskBg = document.getElementById('deskBg');
    var deskBg_img =deskBg.getElementsByTagName('img')[0];

    for (var i = 0; i < bgUls.length; i++) {
        previewBg(bgUls[i]); //预览图片
    }
    function previewBg(obj){
        var bgLisImg = obj.getElementsByTagName('img')
        for (var i = 0; i < bgLisImg.length; i++) {
            // 鼠标滑入预览皮肤
            bgLisImg[i].onmouseover=function(){
                previewSpan.style.background = 'url(' + this.src + ')';
                previewSpan.style.backgroundSize = 'cover';
            }
            // 当鼠标点击图片的时候，变换皮肤背景
            bgLisImg[i].onclick = function() {
                deskBg_img.src=this.src;
               
            }
        }
    }


//************************************ 桌面日历*****************************************
    var dateTime = document.getElementById('time');
    var date = document.getElementById('date')
    var onoff=true;
    dateTime.onclick=function(ev){
        ev = ev || event;
        ev.cancelBubble = true;
        if(onoff){
             mTween(date,{'height':470,'opacity':1,'bottom':30},300,'linear');
             creatDate();
             dateToday.onclick();
             onoff=false;
        }else{
             mTween(date,{'height':0,'opacity':0,'bottom':30},300,'linear');
             onoff=true;
        }
        
    }
    date.onclick=function(ev){
        ev = ev || event;
        ev.cancelBubble = true;
    }
    addEvent(document,'click',function(){
            mTween(date,{'height':0,'opacity':0,'bottom':30},300,'linear');
            onoff=true;
    });


    //创建日历
    function creatDate(){
        var clock = document.getElementById("headTime");
        var dateToday = document.getElementById("dateToday");

        var navInform = document.getElementById("navInform");
        var prev = document.getElementById("datePrev");
        var next = document.getElementById("dateNext");

        var section = document.getElementById("dateCont");
        var wrapDate = document.getElementById("wrapDate");
        var wrapMonth = document.getElementById("wrapMonth");
        var wrapYear = document.getElementById("wrapYear");
        
        var dateWrap = document.getElementById("dateInner");

        var onOff = "date";

        var timer = null;
        // 储存当前时间 不可修改
        var today = new Date();
        dateToday.onclick=function(){
            onOff = "date";
            wrapDate.style.display = "block";
            wrapMonth.style.display = "none";
            wrapYear.style.display = "none";
            dateWrapForm(today);
            creatDate();

        }

        // 这里用来设置头部信息，这里使用的时间对象总是为当前时间对象
        headerSet ();
        timer = setInterval(headerSet, 1000)

        function headerSet () {
            var d = new Date();

            var strP = format(d.getHours()) + ":" +  format(d.getMinutes()) + ":" + format(d.getSeconds());
            clock.innerHTML = strP;

            var strD = d.getFullYear() + "年" + (d.getMonth()+1) + "月" + d.getDate() + "日,星期" + ["日","一","二","三","四","五","六"][d.getDay()];
            dateToday.innerHTML = strD;


            
        }

        // 储存日历时间 可变
        var date = new Date();
        dateWrapForm(date);

        prev.onclick = function() {
            if (onOff == "date") {
                date.setMonth( date.getMonth()-1, 1);
                dateWrapForm(date);
                
            } else if (onOff == "month") {
                date.setFullYear(date.getFullYear()-1);
                monthWrapForm(date);

            } else {
                date.setFullYear(date.getFullYear()-10);
                yearWrapForm(date);
                
            }
            
        };
        next.onclick = function() {
            if (onOff == "date") {
                date.setMonth( date.getMonth()+1, 1);
                dateWrapForm(date);
            } else if (onOff == "month") {
                date.setFullYear(date.getFullYear()+1);
                monthWrapForm(date);
            } else{
                date.setFullYear(date.getFullYear()+10);
                yearWrapForm(date);

            }
            
        };
        

        navInform.onclick = function() {
            if (onOff == "date") {
                onOff = "month";

                wrapDate.style.display = "none";
                wrapMonth.style.display = "block";
                monthWrapForm(date);

            } else {
                wrapMonth.style.display = "none";
                wrapYear.style.display = "block";
                
                onOff = "year";
                yearWrapForm(date);
            }
        };

        function yearWrapForm (date) {
            var str = "";
            for (var i = 0; i < 16; i++) {
                str += "<span></span>";
            };
            wrapYear.innerHTML = str;

            var y = date.getFullYear();
            var y1 = Math.ceil(y/10)*10;


            str = y1 +"~" + ( y1+9 );
            navInform.innerHTML = str;

            var spans = wrapYear.querySelectorAll("span");
            var arrNum = [];
            var arrClass = [];

            for (var i = y; i < y+16; i++) {
                arrNum.push(i);
                if ( i>=y1 && i < y1+10 ) {
                    arrClass.push("nextAge");
                }else {
                    arrClass.push("");
                }
            };
            console.log(arrNum,arrClass);


            if ( today.getFullYear() == date.getFullYear()) {
                arrClass[0]="thisYear";
            };

            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = arrNum[i];
                spans[i].className = arrClass[i];
            };


            for (var i = 0; i < spans.length; i++) {
                spans[i].index = i;
                spans[i].onclick = function() {
                    wrapYear.style.display = "none";
                    wrapMonth.style.display = "block";
                    date.setFullYear( parseInt(spans[this.index].innerHTML),0,1);
                    monthWrapForm(date);
                    onOff = "month";
                };
            };
        }



        function monthWrapForm (date) {
            var str = "";
            for (var i = 0; i < 16; i++) {
                str += "<span></span>";
            };
            wrapMonth.innerHTML = str;

            str = date.getFullYear();
            navInform.innerHTML = str;

            var spans = wrapMonth.querySelectorAll("span");
            var arrNum = [];
            var arrClass = [];

            for (var i = date.getMonth() +1 ; i <= 12; i++) {
                arrNum.push(i+"月");
                arrClass.push("thisYearMonth");
            };
            for (var i = 1; i <= 4 + date.getMonth(); i++) {
                arrNum.push(i+"月");
                arrClass.push("");
            };
            if ( today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() ) {
                arrClass[0]="thisMonth";
            };

            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = arrNum[i];
                spans[i].className = arrClass[i];
            };

            for (var i = 0; i < spans.length; i++) {
                spans[i].index = i;
                spans[i].onclick = function() {
                    wrapDate.style.display = "block";
                    wrapMonth.style.display = "none";
                    date.setMonth( parseInt(spans[this.index].innerHTML)-1,1);
                    dateWrapForm(date);
                    onOff = "date";
                };
            };
        }



        function dateWrapForm (date) {
            var str = "";
            for (var i = 0; i < 42; i++) {
                str += "<span></span>";
            };
            dateWrap.innerHTML = str;

            str = date.getFullYear() + "年" + (date.getMonth()+1) + "月";
            navInform.innerHTML = str;

            var spans = dateWrap.querySelectorAll("span");

            var arrNum = [];
            var arrClass = [];

            var dateLastMonth = new Date(date.getFullYear(),date.getMonth(),0).getDate();
            var dayLastMonth = new Date(date.getFullYear(),date.getMonth(),0).getDay();
            var dateThisMonth = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();

            for (var i = dateLastMonth - dayLastMonth;i <= dateLastMonth; i++){
                arrNum.push(i);
                arrClass.push("notThisMonth");
            };
            for (var i = 1; i <= dateThisMonth; i++) {
                arrNum.push(i);
                arrClass.push("");
            };
            for (var i = 1; i < 42 - dayLastMonth - dateThisMonth; i++) {
                arrNum.push(i);
                arrClass.push("notThisMonth");
            };
            arrClass[dayLastMonth + date.getDate()] = "dateNow";

            if ( today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate())  {
                arrClass[dayLastMonth + date.getDate()] = "today";
            };
            
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = arrNum[i];
                spans[i].className = arrClass[i];
            };
        }
   }

   function format (v) {
       return v<10?"0"+v:""+v;
   }
   // 底部时间
   var timeSet = dateTime.getElementsByTagName('span')[0],
       dateSet = dateTime.getElementsByTagName('span')[1];

   NowTimeSet ();
   timer = setInterval(NowTimeSet, 1000)

   function NowTimeSet () {
       var d = new Date();
       timeSet.innerHTML = format(d.getHours()) + ":" +  format(d.getMinutes());
       dateSet.innerHTML = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
       
   }

   // 左侧菜单的日历
   var leftbtns_date=leftBtns.getElementsByTagName('li')[2];
   leftbtns_date.onclick=function(ev){
        ev = ev || event;
        ev.cancelBubble = true;
        dateTime.onclick();
   }
   // 左侧菜单的天气
   var leftbtns_weather = leftBtns.getElementsByTagName('li')[1];
   leftbtns_weather.onclick=function(ev){
        ev = ev || event;
        ev.cancelBubble = true;
        weatherBtn.onclick();
   }
   // 左侧菜单的音乐
   var leftbtns_weather = leftBtns.getElementsByTagName('li')[1];
   leftbtns_weather.onclick=function(ev){
        ev = ev || event;
        ev.cancelBubble = true;
        weatherBtn.onclick();
   }


// ****************************canvas时钟*******************************************
    var clock=document.getElementById("clock");
    var cxt=clock.getContext("2d");
    var colr=(200+Math.floor(Math.random()*55.99));
    var colg=(200+Math.floor(Math.random()*55.99));
    var colb=(200+Math.floor(Math.random()*55.99));
    resetcolor();
    function resetcolor(){
        colr=(200+Math.floor(Math.random()*55.99));
        colg=(200+Math.floor(Math.random()*55.99));
        colb=(200+Math.floor(Math.random()*55.99));
    }
    
    function drawClock(){
        //获取时间
        var now=new Date();
        var hou=now.getHours();
        var min=now.getMinutes();
        var sec=now.getSeconds();
        var mec=now.getMilliseconds();
        
        //转换12小时进制
        hou=hou>12?hou-12:hou;
        //清空画布
        cxt.clearRect(0,0,250,250);
        //阴影
        cxt.fill();
        cxt.fillStyle="rgba(0,0,0,.3)";
        cxt.beginPath();
        cxt.arc(135,130,103,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        //表盘
        cxt.fill();
        cxt.fillStyle="white";
        cxt.beginPath();
        cxt.arc(125,125,103,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        //蓝色表盘（边框）
        cxt.strokeStyle="rgba(0,0,0,.4)"
        cxt.lineWidth=10;
        cxt.beginPath();
        cxt.arc(125,125,92.5,0,Math.PI*2,true);
        cxt.closePath();
        cxt.stroke();
        cxt.strokeStyle="#"+colr.toString(16)+colg.toString(16)+colb.toString(16);
        cxt.lineWidth=10;
        cxt.beginPath();
        cxt.arc(125,125,100,0,Math.PI*2,true);
        cxt.closePath();
        cxt.stroke();
        cxt.strokeStyle="#"+colr.toString(16)+colg.toString(16)+colb.toString(16);
        cxt.lineWidth=3;
        cxt.beginPath();
        cxt.arc(125,125,96,0,Math.PI*2,true);
        cxt.closePath();
        cxt.stroke();
        cxt.strokeStyle="#"+(colr-100).toString(16)+(colg-100).toString(16)+(colb-100).toString(16);
        cxt.lineWidth=5;
        cxt.beginPath();
        cxt.arc(125,125,103,0,Math.PI*2,true);
        cxt.closePath();
        cxt.stroke();
        //刻度（时分）
            //时刻度
            for(var i=0;i<12;i++){
                cxt.save();
                cxt.lineWidth=4;
                cxt.strokeStyle="black";
                //设置原点
                cxt.translate(125,125);
                //设置旋转角度;
                cxt.rotate(30*i/180*Math.PI);
                cxt.beginPath();
                cxt.moveTo(0,90);
                cxt.lineTo(0,75);
                cxt.closePath();
                cxt.stroke();
                cxt.restore();
            }
            //分刻度
            for(var i=0;i<60;i++){
                if(i%5!=0){
                    cxt.save();
                    cxt.lineWidth=2;
                    cxt.strokeStyle="black";
                    //设置原点
                    cxt.translate(125,125);
                    //设置旋转角度;
                    cxt.rotate(6*i/180*Math.PI);
                    cxt.beginPath();
                    cxt.moveTo(0,87.5);
                    cxt.lineTo(0,82.5);
                    cxt.closePath();
                    cxt.stroke();
                    cxt.restore();
                }
            }
        //指针（时分秒）
        //时针
        cxt.save();
        cxt.lineWidth=6;
        cxt.strokeStyle="black";
        cxt.beginPath();
        cxt.translate(125,125);
        cxt.rotate((hou*30+min*0.5+180)/180*Math.PI);
        cxt.moveTo(0,0);
        cxt.lineTo(0,60);
        cxt.closePath();
        cxt.stroke()
        cxt.restore();
        //分针
        cxt.save();
        cxt.lineWidth=3;
        cxt.strokeStyle="black";
        cxt.beginPath();
        cxt.translate(125,125);
        cxt.rotate((min*6+sec*0.1+180)/180*Math.PI);
        cxt.moveTo(0,0);
        cxt.lineTo(0,75);
        cxt.closePath();
        cxt.stroke()
        cxt.restore();
        //秒针
        cxt.save();
        cxt.lineWidth=2;
        cxt.strokeStyle="red";
        cxt.beginPath();
        cxt.translate(125,125);
        cxt.rotate((sec*6+mec*0.006+180)/180*Math.PI);
        cxt.moveTo(0,0);
        cxt.lineTo(0,75);
        cxt.closePath();
        cxt.stroke();
        cxt.fillStyle="red";
        cxt.beginPath();
        cxt.arc(0,74,4,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        cxt.fillStyle="white";
        cxt.beginPath();
        cxt.arc(0,74,2,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
        //秒针装饰
        cxt.fillStyle="red";
        cxt.beginPath();
        cxt.arc(125,125,7.5,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        cxt.fillStyle="black";
        cxt.beginPath();
        cxt.arc(125,125,6,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        cxt.fillStyle="white";
        cxt.beginPath();
        cxt.arc(125,125,5,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

    
    }
    drawClock();
    //使用setInterval(代码,周期(毫秒制))让时钟动起来
    setInterval(drawClock,10);



// canvas时钟的拖拽----面向对象
    clockDrag();
    function clockDrag(){
        function Drag(id){
            this.box = document.getElementById(id);
            this.disX = 0;
            this.disY = 0;
            this.l;
            this.t;
        }
        Drag.prototype.Init=function(){
            var That = this;
            addEvent(this.box,'mousedown',function(ev){
                That.fnDown(ev);
            });
            
        }    
        Drag.prototype.fnDown=function(ev){
            var That = this;
            this.disX = ev.pageX - this.box.offsetLeft;
            this.disY = ev.pageY - this.box.offsetTop;
            
            addEvent(document,'mousemove',move1);
            addEvent(document,'mouseup',Up1);

            function move1(ev){
                That.fnMove(ev)
            }
            function Up1(){
                That.fnUp(move1,Up1)
            }
            
            ev.preventDefault();
        }
        Drag.prototype.fnMove=function(ev){
           this.l = ev.pageX - this.disX;
           this.t = ev.pageY - this.disY;
           
           //window.innerWidth
           if(this.l<0){
            this.l=0;
           }else if(this.l>document.documentElement.clientWidth -this.box.offsetWidth){
            /*
                如果left值大于可视区的宽度 - 自身的宽度就等于可视区的宽度 - 自身的宽度
            */
            this.l = document.documentElement.clientWidth - this.box.offsetWidth;
           }
           
           if(this.t < 0){
            this.t = 0;
           }else if(this.t > document.documentElement.clientHeight - this.box.offsetHeight){
            
            this.t = document.documentElement.clientHeight - this.box.offsetHeight;
            
           }
            this.box.style.left =this.l+ 'px';
            this.box.style.top = this.t + 'px';
        }

        Drag.prototype.fnUp=function(move1,Up1){
            removeEvent(document,'mousemove',move1);
            removeEvent(document,'mouseup',Up1);
        }

        var clockDrag=new Drag('clockDrag');
        clockDrag.Init();

        }
        addEvent(window, 'resize', function() { //窗口发生改变时，更新可视区尺寸
           clockDrag();

        })
// **************************************************************************
    

// *****************************天气预报********************************
    var weatherBtn = document.getElementById('tianqi');
    var weather = document.getElementById('weather');
    var close_w = document.getElementById('close_w');
    var weather_title = document.getElementById('weather_title');
    //点击顶部天气按钮 弹出天气对话框
    weatherBtn.onclick = function() {
        reg_land(weather, 318, true)
    }
    //关闭天气对话框
    close_w.onclick = function() {
        reg_land(weather);
    }
    //拖拽天气对话框
    weather_title.onmousedown = function(ev) {
        ev = ev || event;
        drag(ev, weather);
        return false; //阻止浏览器默认行为
    } 













}

