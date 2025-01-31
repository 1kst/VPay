"use strict";
layui.define(["layer","jquery"], function (exports) {
    const $ = layui.jquery;
    let okLayer = {
        /**
         * confirm()函数二次封装
         * @param content
         * @param yesFunction
         * @param zindex
         */
        confirm: function (content, yesFunction,zindex) {
            zindex=zindex||19990215;
            let options = {skin: okLayer.skinChoose(),zIndex:zindex, icon: 3, title: "提示", anim: okLayer.animChoose()};
            layer.confirm(content, options, yesFunction);
        },
        /**
         * open()函数二次封装,支持在table页面和普通页面打开
         * @param title
         * @param content
         * @param type
         * @param width
         * @param height
         * @param successFunction
         * @param endFunction
         */
        open: function (title, content,type, width, height, successFunction, endFunction) {
            if(parseInt(width)>$(document).width()){
                width="90%"
            }
            if(parseInt(height)>$(document).height()){
                height="90%"
            }
            if(type===1){
                $.ajax({
                    url: "./pages/" + content + ".html",
                    async: false,
                    dataType: "html",
                    success: function (data) {
                        content = data
                    },error:function () {
                        $.ajax({
                            url: "./pages/404.html",
                            async: false,
                            dataType: "html",
                            success: function (data) {
                               content = data;
                            }
                        });
                    }
                });
            }
            layer.open({
                zindex:100,
                title: title,
                type: type,
                maxmin: false,
                shade: 0.5,
                anim: okLayer.animChoose(),
                area: [width, height],
                content: content,
                zIndex: layer.zIndex,
                skin: okLayer.skinChoose(),
                success: successFunction,
                end: endFunction
            });
        },
        openRight: function (/*title, */content,type,  successFunction, endFunction) {
            var width="700px";
            if(width>$(document).width()){
                width="100%"
            }
            var height="100%"
            layer.open({
               // title: title,
                type: type,
                maxmin: false,
                offset: 'rt',
                title: false,
                closeBtn: 0,
               // shadeClose:true,
                scrollbar: false,
                resize:false,
                shade: 0.5,
                anim: -1,
                area: [width, height],
                content: content,
                zIndex: layer.zIndex,
                skin: okLayer.skinChoose(),
                success: successFunction,
                end: endFunction
            });
        },

        /**
         * msg()函数二次封装
         */
        // msg弹窗默认消失时间
        time: 1000,
        // 绿色勾
        greenTickMsg: function (content, callbackFunction) {
            let options = {icon: 1, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 红色叉
        redCrossMsg: function (content, callbackFunction) {
            let options = {icon: 2, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 黄色问号
        yellowQuestionMsg: function (content, callbackFunction) {
            let options = {icon: 3, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 灰色锁
        grayLockMsg: function (content, callbackFunction) {
            let options = {icon: 4, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 红色哭脸
        redCryMsg: function (content, callbackFunction) {
            let options = {icon: 5, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 绿色笑脸
        greenLaughMsg: function (content, callbackFunction) {
            let options = {icon: 6, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        // 黄色感叹号
        yellowSighMsg: function (content, callbackFunction) {
            let options = {icon: 7, time: okLayer.time, anim: okLayer.animChoose()};
            layer.msg(content, options, callbackFunction);
        },
        /**
         * 皮肤选择
         * @returns {string}
         */
        skinChoose: function () {
            let storage = window.localStorage;
            let skin = storage.getItem("skin");
            if (skin == 1) {
                // 灰白色
                return "";
            } else if (skin == 2) {
                // 墨绿色
                return "layui-layer-molv";
            } else if (skin == 3) {
                // 蓝色
                return "layui-layer-lan";
            } else if (!skin || skin == 4) {
                // 随机颜色
                var skinArray = ["", "layui-layer-molv", "layui-layer-lan"];
                return skinArray[Math.floor(Math.random() * skinArray.length)];
            }
        },
        /**
         * 动画选择
         * @returns {number}
         */
        animChoose: function () {
            let storage = window.localStorage;
            let anim = storage.getItem("anim");
            let animArray = ["0", "1", "2", "3", "4", "5", "6"];
            if (animArray.indexOf(anim) > -1) {
                // 用户选择的动画
                return anim;
            } else if (!anim || anim === 7) {
                // 随机动画
                return Math.floor(Math.random() * animArray.length);
            }
        }
    }
    exports("okLayer", okLayer);
});
