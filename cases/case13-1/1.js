(function (w) {

    var Listener = function () {
        // 私有变量
        // 全局配置信息
        var _config = {
            // 是否开启多级作用域
            multiLevel: true,
            // 发布者发布后，订阅者相关动作是否需要删除
            removeNow: false,


        },
         _receives = {};

        // 订阅者
        // 需要传入订阅类型，动作
        this.subscribe = function (type, action, removeNow) {

            // 初始化
            removeNow = removeNow || _config.removeNow;

            // 对应的level
            var level = _createLevel(type);

                level.actions = level.actions || [];

            // 保证传入的是函数
            if (action instanceof Function) {
                level.actions.push({
                    action: action,
                    removeNow: removeNow
                });
            }
        };

        // 发布者
        // 需要传入发布类型和数据
        this.publish = function (type, data) {
            // 初始化
            // 获取对应actions
            var level = _searchLevel(type),
                actions = level.actions;

            // 遍历执行actions里的函数
            for(var i = 0, len = actions.length; i < len; i++) {
                actions[i].action.call(null, data);
                if (actions[i].removeNow) {
                    actions.splice(i,1);
                }
            }
            console.log(_receives);
        };

        // 私有函数

        // 寻找执行的Level
        var _searchLevel = function (type) {
            var receives = _receives,
                multiLevel = _config.multiLevel;
            if (multiLevel) {
                // 有多级作用域
                try {
                    // 分割type取得各级作用域
                    var types = type.split('.');
                    for (var i = 0, len = types.length; i < len; i++) {
                        if (receives[types[i]]) {
                            receives = receives[types[i]];
                        }
                    }

                    return receives;
                } catch (e) {
                    console.log(e);
                } 
            } else {
                return receives[type];
            }
        },
        // 创建对应的Level
        _createLevel = function (type) {
            var receives = _receives,
                multiLevel = _config.multiLevel;
            if (multiLevel) {
                // 有多级作用域
                try {
                    var types = type.split('.');
                    for (var i = 0, len = types.length; i < len; i++) {
                        // 有则选择，无则初始化
                        receives[types[i]] = receives[types[i]] || {};
                        receives = receives[types[i]];
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                receives[type] = receives[type] || {};
                receives = receives[type];
            }
            return receives;
        };
    };

    w.Listener = new Listener();
    console.log(w.Listener);
}) (window)