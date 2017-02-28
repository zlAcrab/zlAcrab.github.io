
/*		技能展示
	*   {
	*       temp: @value String         				*         模板
	*       skillsClassify: @value Array                *         掌握的技能综合
	*       	{
					skillLanguage: @value String        *         技能名称
	*       		percent: @value String              *         技能百分比
	*       		skillTooltip: @value Array          *         对技能的描述
				}
	*   }

	temp 有两个值可选：
		"circle"：饼形
		"columns":圆柱
*/

var skills = {
		temp:"circle",
		skillsClassify:[
		{
			skillLanguage:"html5",
			percent:"70%",
			skillTooltip:[
				"熟练掌握各类语义化标签",
				"熟悉对各种标签特性及其相互转换",
				"H5拖拽、视频音频",
				"表格，H5新增表单等……"
			]
		},
		{
			skillLanguage:"CSS3",
			percent:"80%",
			skillTooltip:[
				"掌握浮动及文档流特性",
				"熟练掌握定位、浏览器兼容性",
				"CSS3圆角阴影字体、3d动画变换等有实际案例经验",
				"会使用less预处理，移动端响应式"
			]
		},
		{
			skillLanguage:"javascript",
			percent:"86%",
			skillTooltip:[
				"熟练数据类型、作用域闭包、定时器等语言特性及方法等",
				"深入使用DOM\BOM\EVENT，能完成各类组件开发",
				"掌握JS的数据调用、ajax实现机制、各类接口调用",
				"掌握面向对象编程，对封装、继承、多态等均有了解",
				"会使用MVC模板，artTemplate模板,gulp自动化工具",
				"了解Angular.js, React.js, Node.js, Vue.js框架原理及使用"
			]
		},
		{
			skillLanguage:"canvas",
			percent:"40%",
			skillTooltip:[
				"能熟练使用相关接口绘制各类图形",
				"能运用canvas开发时钟",
				"可利用canvas实现鼠标气泡等效果"
			]
		},
		{
			skillLanguage:"jQuery/jQuery UI",
			percent:"60%",
			skillTooltip:[
				"移动端响应式",
				"canvas绘图",
				"阅读过JQ源码，并了解其闭包原理",
				"熟练使用jQuery各类组件的使用",
				"熟练使用jQuery UI各类组件的使用"
			]
		},
		{
			skillLanguage:"Photoshop/AI/Firework",
			percent:"90%",
			skillTooltip:[
				"熟练使用Photoshop切图绘图制作精灵图等",
				"熟练使用AI制作矢量图标",
				"熟练使用Firework进行精准性切图或者做gif图"
			]
		}
		
	]
}