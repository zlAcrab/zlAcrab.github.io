
/*		前端知识汇总&案例展示
	*   {
	*       caseName: @value String            		*         案例总标题
	*       caseList: @value Array         			*         案例说明信息
	*       	caseTitle: @value String            *         案例标题  
	*      		publishTime: @value String 			*         案例上传时间  格式为：2016.10.09 08:00
	*       	caseThumbnail: @value String        *         缩略图地址
	*       	caseDescription: @value String      *         案例描述 
				caseWebsite: @value String       	*         案例网址
	*       
	*   }
*/




var casees = [
		{
			caseName:"js基础/for/this/自定义属性",
			caseList:[
				{
					caseTitle:"星星动态评分",
					publishTime:"2016-09-10 22:10",
					caseThumbnail:"cases/case1-1/case1-1.gif",
					caseDescription:"运用知识点：for循环，自定义属性、索引值。<br/>通过索引值和自定义属性的比较判断星星的显示或隐藏；这里需要注意的是点击事件的效果是在鼠标移出时实现的，所以点击后要做的事件，要放到鼠标移开的事件里，即点击的时候把点击的那个索引值赋给自定义变量cn，移出时通过i和cn的比较判断星星的状态。<br/><br/>",
					caseWebsite:"cases/case1-1/评分.html"
				},
				{
					caseTitle:"音乐列表全选",
					publishTime:"2016-09-10 21:08",
					caseThumbnail:"cases/case1-2/case1-2.gif",
					caseDescription:"描述：包含鼠标移入移出和点击事件，以及隔行变色。通过奇数偶数的判断实现隔行变色，并用自定义属性存储下来方便全选和全不选来判断。当鼠标移入和移出时需要判断是否选中，如果选中则不变色；全选根据选中的length判断是否勾选。"
					,caseWebsite:"cases/case1-2/baiduMusic.html"
				},
				{
					caseTitle:"自动生成V形",
					publishTime:"2016-09-07 20:10",
					caseThumbnail:"cases/case1-3/case1-3.gif",
					caseDescription:"描述：通过j%4判断四种情况，研究每一种情况的left和top值得规律，生成V字形。",
					caseWebsite:"cases/case1-3/自动生成V字形.html"
				},
				{
					caseTitle:"擦除图片",
					publishTime:"2016-09-07 20:10",
					caseThumbnail:"cases/case1-4/case1-4.jpg",
					caseDescription:"描述：动态生成图片上的方块，当移入时通过transform = scale(0)，和opacity=0消除。",
					caseWebsite:"cases/case1-4/擦除图片.html"
				},
				{
					caseTitle:"微信聊天",
					publishTime:"2016-09-08 00:10",
					caseThumbnail:"cases/case1-5/case1-5.gif",
					caseDescription:"描述：分为text.onkeydown，post.onkeydown，判断选中的发送键是enter还是ctrl+enter，然后执行函数体内的内容：获取输入框text的value值，b.将value值添加到ul内，ul.innerHTML+=li实现一条条呈现;",
					caseWebsite:"cases/case1-5/微信聊天.html"
				}
			]
		},
		{
			caseName:"数据类型/程序运算/函数作用域",
			caseList:[
				{
					caseTitle:"计算商品总价值",
					publishTime:"2011-9-16 22:08",
					caseThumbnail:"cases/case2-1/case2-1.jpg",
					caseDescription:"计算商品总价值计算商品总价值",
					caseWebsite:"cases/case2-1/计算商品总价值.html"
				},
				{
					caseTitle:"修改文本框的值",
					publishTime:"2011-9-16 22:10",
					caseThumbnail:"cases/case2-2/case2-2.jpg",
					caseDescription:"修改文本框的值修改文本框的值修改文本框的值",
					caseWebsite:"cases/case2-2/计算商品总价值.html"
				},
				{
					caseTitle:"模拟数据-选项卡套选项卡",
					publishTime:"2011-9-17 00:33",
					caseThumbnail:"cases/case2-3/case2-3.jpg",
					caseDescription:"模拟数据-选项卡套选项卡模拟数据-选项卡套选项卡模拟数据-选项卡套选项卡",
					caseWebsite:"cases/case2-3/模拟数据-选项卡套选项卡.html"
				},
				{
					caseTitle:"作用域、闭包知识点",
					publishTime:"2011-9-16 22:10",
					caseThumbnail:"cases/case2-2/case2-2.jpg",
					caseDescription:"修改文本框的值修改文本框的值修改文本框的值",
					caseWebsite:"cases/case2-2/计算商品总价值.html"
				},
				
			]
		},{
			caseName:"定时器/运动/日期对象",
			caseList:[
				{
					caseTitle:"倒计时",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:" liulanqi 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"

				},
				{
					caseTitle:"历史日期查询",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com",

				},
				{
					caseTitle:"时钟牌（动画）",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:" liulanqi 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"

				},
				{
					caseTitle:"日历",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:" liulanqi 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"

				},
				{
					caseTitle:"迅雷首页练习",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:" liulanqi 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"

				}
			]
		},
		{
			caseName:"字符串/数组及其方法",
			caseList:[
				{
					caseTitle:"查找替换",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				},
				{
					caseTitle:"文字搬运工",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				},
				{
					caseTitle:"图片随机排序",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				},
				{
					caseTitle:"快排算法",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				},
				{
					caseTitle:"冒泡排序",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				},
				{
					caseTitle:"数组去重三种方法",
					publishTime:"2011-11-16 22:08",
					caseThumbnail:"images/icon/exp.png",
					caseDescription:"浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认 为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可 以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为浏览器可以被认为 浏览器可以被认为浏览器可以被认为"
					,caseWebsite:"http:www.miaov.com"
				}
			]
		},{
			caseName:"DOM/BOM",
			caseList:[
				
			]
		},
		{
			caseName:"Event及事件深入应用",
			caseList:[
				
			]
		},{
			caseName:"正则表达式",
			caseList:[
				
			]
		},
		{
			caseName:"面向对象开发及组件开发",
			caseList:[
				
			]
		},{
			caseName:"jquery.js及sizzle.js",
			caseList:[
				
			]
		},
		{
			caseName:"ajax/jsonp/本地存储",
			caseList:[
				{
					caseTitle:"微博留言板（数据+分页）",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case10-1/case10-1.jpg",
					caseDescription:"需要在服务器下运行。 1.ajax数据传输实现微博留言和删除功能<br/>2.本地存储localstorage+cookie留言页面的本地存储<br/>3.location.hash+location.search实现留言板的分页功能"
					,caseWebsite:"cases/case10-1/微博留言板.html"

				}
			]
		},
		{
			caseName:"artTemplate/MVC模板",
			caseList:[
				{
					caseTitle:"3d画廊（mvc）",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case11-1/case11-1.jpg",
					caseDescription:"数据模板动态生成图片信息+css3实现旋转+js实现动画效果"
					,caseWebsite:"cases/case11-1/index.html"

				},
				{
					caseTitle:"豆瓣搜索（artTemplate模板+jsonp）",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case11-2/case11-2.jpg",
					caseDescription:"artTemplate模板生成页面+jsonp跨域读取数据"
					,caseWebsite:"cases/case11-2/豆瓣（读数据+分页）.html"

				}
			]
		},
		{
			caseName:"canvas+H5音频",
			caseList:[
				{
					caseTitle:"气泡导航",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case12-1/case12-1.jpg",
					caseDescription:"canvas实现鼠标气泡+css3实现导航旋转"
					,caseWebsite:"cases/case12-1/canvas气泡导航.html"

				},
				{
					caseTitle:"H5音频动画",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case12-2/case12-2.jpg",
					caseDescription:"canvas实现柱型图+H5音频+js实现动画效果"
					,caseWebsite:"cases/case12-2/音频动画.html"

				}
			]
		},
		{
			caseName:"react.js",
			caseList:[
				{
					caseTitle:"留言板功能",
					publishTime:"2016-10-02 23:08",
					caseThumbnail:"cases/case13-1/case13-1.jpg",
					caseDescription:"综合使用react.js实现一个留言控制功能"
					,caseWebsite:"cases/case13-1/react实例留言.html"

				}
			]
		},
		{
			caseName:"移动端事件及其组件开发",
			caseList:[
				
			]
		},
		{
			caseName:"github命令行总结",
			caseList:[
				{
					caseTitle:"命令行操作",
					publishTime:"2016-11-16 22:08",
					caseThumbnail:"cases/case15-1/case15-1.jpg",
					caseDescription:"官网说明http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000",
					caseWebsite:"cases/case15-1/命令行总结.html"

				}
			]
		},
		{
			caseName:"模块化seajs/require/webpack预编译",
			caseList:[
				
			]
		},
		{
			caseName:"gulp、grunt自动化构建工具",
			caseList:[
				
			]
		},
		{
			caseName:"ECM6&&babel编译器",
			caseList:[
				
			]
		},
		
		{
			caseName:"Less/Sass",
			caseList:[
				
			]
		},
		{
			caseName:"vue.js",
			caseList:[
				
			]
		},
		{
			caseName:"Angular.js",
			caseList:[
				
			]
		}

]