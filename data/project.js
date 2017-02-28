
/*		项目池
	*   {
	*       projectName: @value String            *         项目名称
	*       projectWebsite: @value String         *         项目网址
	*       startTime: @value String              *         项目开始时间  格式为：2016.10.09
	*       endTime: @value String 			      *         项目结束时间  格式为：2016.10.09
	*       projectExplain: @value String         *         项目说明
	*       projectLabel: @value Array            *         项目技术标签 
			projectThumbnail: @value String       *         缩略图地址
	*       
	*   }
*/

var projects = [
		{
			projectName:"助造网络官网开发",
			projectWebsite:"http://www.achiaim.com",
		    startTime:"2015.09",
			endTime:"2015.11",
			projectExplain:"建立企业官网，包含企业主营业务，企业资讯等；并建立手机端同步站。1.负责整个项目的所有功能的实现，主要运用bootstrap框架建立多屏自适应网站；2.配合后台开发人员进行php嵌入，兼容性的处理；3.负责填充各个栏目内容，并使用ftp上线及后期SEO搜索引擎优化和维护。4.手机端宣传：http://www.achiaim.com/h5/index.php",
			projectLabel:["html","css/css3","js","Bootstrap","SEO"],
			projectThumbnail:"images/icon/project01.png"
		},
		{
			projectName:"网聚生活官网开发",
			projectWebsite:"http://www.wangjushenghuo.com/index.html",
		    startTime:"2016.05",
			endTime:"2016.07",
			projectExplain:"为客户项目建立项目官网，并实现多屏自适应。1.主要负责项目官网的前端开发，其中主要以bootstrap框架为基础实现多屏自适应。2.为了提高性能，采用了延迟加载、延迟渲染、事件代理等优化方式。3.负责SEO优化及兼容性处理并上线。",
			projectLabel:["html/html5","css/css3","js","Bootstrap","SEO"],
			projectThumbnail:"images/icon/project02.png"
		},
		{
			projectName:"Web Q+桌面应用功能开发",
			projectWebsite:"./webDesktop/Desktop.html",
		    startTime:"2016.07",
			endTime:"2016.10",
			projectExplain:"模拟Q+系统桌面开发各项功能，包含万年历功能、可变色时钟功能、登录注册功能、更换桌面壁纸功能；鼠标右键刷新、大小图标切换功能、图标排序功能、新建文件夹、删除文件夹、文件夹重命名功能、便签功能、注销功能、个人中心；canvas+js扇形导航等；",
			projectLabel:["html","css/css3","js","canvas","面向对象js"],
			projectThumbnail:"images/icon/project03.png"
		}
]