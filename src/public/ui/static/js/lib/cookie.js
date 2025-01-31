layui.define(["jquery"], function (exports) {
    var jQuery=layui.$;
    (function ($) {
        $.fn.cookie = {
            set: function (key, val, time, path) {//设置cookie方法
                 path = path||"/";
                time = time||700;
                var date = new Date(); //获取当前时间
                date.setTime(date.getTime() + time * 24 * 3600 * 1000); //格式化为cookie识别的时间
                document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=" + path;  //设置cookie
            },
            get: function (key,def) {//获取cookie方法
                /*获取cookie参数*/
                var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
                var arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
                var tips = '';  //声明变量tips
                for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
                    var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                    if (key === arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                        tips = arr[1];   //将cookie的值赋给变量tips
                        break;   //终止for循环遍历
                    }
                }
                return tips===''?def:tips;
            }
        };
    }(jQuery));
    exports('cookie');
});