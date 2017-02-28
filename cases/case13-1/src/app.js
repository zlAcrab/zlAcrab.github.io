//这里是操作数据


//单条数据的数据结构，有两条数据

/*
	UUID

	{
		id: new Date() + Math.random()
		title:"妙味课堂",
	}
*/

var data = [
	{
		id: new Date().getTime() + Math.random(),
		title:"妙味课堂111111111",
		isChecked:true  //给这条数据加上一个字段，来表示这条数据是否被选中
	},
	{
		id: new Date().getTime() + Math.random(),
		title:"欢迎回来",
		isChecked:true
	},
	/*{
		id: new Date().getTime() + Math.random(),
		title:"欢迎回来"
	},
	{
		id: new Date().getTime() + Math.random(),
		title:"欢迎回来"
	}*/
]


//所有控制数据的添加删除，都通过app这个对象下的方法


var app = {
	addItem:function (title){  //添加数据
		data.push({
			id:new Date().getTime() + Math.random(),
			title:title,
			isChecked:false
		});

		//需要告诉页面重新渲染

		app.render();
	},
	changeItem:function (id){
		data.forEach(function (item){
			if( item.id == id ){
				item.isChecked = !item.isChecked;
			}
		});
		app.render();;
	},
	changeAll:function (bl){
		data.forEach(function (item){
			item.isChecked = bl;
		});
		app.render();	
	},
	delectItem:function (id){
		data = data.filter(function (item){
				return item.id != id
			});
		app.render();	
	}
}
