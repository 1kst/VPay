# V免签 PHP版

![](https://img.shields.io/github/v/release/dreamncn/VPay.svg)
![](https://img.shields.io/github/issues/dreamncn/VPay)
![](https://img.shields.io/badge/PoweredBy-Dreamn-f39f37)
![](https://img.shields.io/github/license/dreamncn/VPay)
![](https://img.shields.io/github/stars/dreamncn/VPay.svg?label=Stars&style=social)


## 项目简介&功能特性

V免签(PHP) 是基于SpeedPHP4 + mysql 实现的一套免签支付程序，主要包含以下特色：

```
    1. 收款即时到账，无需进入第三方账户，收款更安全
    2. 提供示例代码（demo）简单接入
    3. 免费、开源，无后门风险
    4. 支持监听店员收款信息，可使用支付宝微信小号/模拟器挂机，方便IOS用户
    5. 免root，免xp框架，不修改支付宝/微信客户端，防封更安全
    6. 如果您不熟悉PHP环境的配置，您可以使用Java版本的服务端
```

JAVA版的开源地址位于：[这里](https://github.com/szvone/Vmq)

监控端的开源地址位于：[这里](https://github.com/szvone/VmqApk)

在线演示：[这里](https://pay.dreamn.cn/)

本程序启用**付费咨询**，10RMB/次，开源作品，时间有限 咨询地址 -> [点我](https://pay.dreamn.cn/demo/main/index)

> **注意**
> 1. 本项目为开源项目，本人不可能总会及时修复存在的漏洞
> 2. 请仔细阅读README,非代码本身问题不予以处理
> 3. 开源项目，有能力者可自行对漏洞进行修复，我有空也会对漏洞进行修复
> 4. 如发现严重漏洞，比如低于原价付款成功，后台登录绕过等，可直接发邮件给我（dream@dreamn.cn）
> 5. 感谢您的理解与使用，如果对您有帮助，请点个star，感谢您的支持！

#### 开发建议

1. 不要自己封装处理类、处理函数，demo中自带工具类可以直接使用
2. 默认工具类为`/demo/core`
3. 建议仔细研究一下 `demo`目录，工具类的具体使用方案都有详细的注释

#### 原理

用户扫码付款 -> 收到款项后手机通知栏会有提醒 -> V免签监控端监听到提醒，推送至服务端->服务端根据金额判断是哪笔订单

## 环境依赖

1. CentOS 7.0
2. PHP 7.3 + openssl + PDO
3. Apache / Nginx

## 伪静态
> Apache
```<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule ^index\.php$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . index.php [L]
   </IfModule>
```

> Nignx

```
   location / {
   	if (!-e $request_filename){
   		rewrite (.*) /index.php;
   	}
   }
   location ^~ /protected {
   	deny all;
   }
```

## 部署步骤

1. 下载源代码到您的服务器
2. 然后访问服务器公网IP开始安装
3. 如果您是第一次使用建议您选择完全安装
4. 安装好后登录后台进行配置
5. 打开网站后台监控端设置
6. 下载监控端[点击这里](https://github.com/szvone/vmqApk/releases)
7. 安装监控端后使用手动配置或扫码配置
8. 监控端中点击开启服务跳转到辅助功能中开启服务
9. 开启服务后返回v免签点击检测监听权限
10. 如果显示监听权限正常，至此安装完毕，如果只收到通知栏推送的测试通知，则系统不兼容无法正常监听
11. 如果显示监听权限正常，还是无法正常运行，那么请确定微信是否关注 “微信支付” 和 “微信收款助手” 这两个公众号

**注意事项**

 - 本作品基于[SpeedPHP4](https://github.com/dreamncn/SpeedPHP)开发，采用MVC单一入口程序开发规范

 - 由服务器中间件实现伪静态，故本程序必须放在域名根目录才能正常运行。

 - 比如说，您的web目录为`/var/www/`,那么本程序所放目录为`/var/www/pay`,确保index.php在`/var/www/pay`目录下



### V免签客户端设置步骤

（教程为MIUI系统，非MIUI系统请参考教程进行设置）

1. 关闭系统神隐模式

   - （旧版MIUI系统）在系统【设置】 - 【其他高级设置】 - 【电量与性能】 - 【神隐模式】 - 【V免签监控端】设置为关闭

   - （新版MIUI系统）在系统【设置】 - 【其他高级设置】 - 【电量与性能】 - 【省电优化】 - 【应用智能省电】，将V免签监控端、微信、支付宝的3个APP全都改为无限制

2. 添加内存清理白名单

3. 关闭WIFI优化

    - （旧版MIUI系统）在系统【设置】 - 【WLAN】 -【高级设置】 -【WLAN优化】，关闭它。

    - （新版MIUI系统）在系统【设置】 - 【WLAN】 -【高级设置】 - 【在休眠状态下保持WLAN网络连接】改为“始终”

4. 开启推送通知

    - 系统【设置】 - 【通知和状态栏】 - 【通知管理】中，找到这3个App，把里面的开关全部打开

    - 在微信的【设置】 - 【勿扰模式】中，关闭勿扰模式

    - 在微信的公众号，关注 【微信收款助手】 这个公众号

    - 在支付宝的主页，上方搜索框 搜索 【支付助手】 ，进入支付助手，右上角小齿轮，打开【接收付款消息提醒】

5. 通知测试
    
    - 拿另一个手机扫描付款码进行付款，如果手机有语音播报，则表示开启成功，否则表示失败，客户端问题请反馈到[这里](https://github.com/szvone/vmqApk/)

    - 检查后台的访问日志，App成功监听到收款并发送给服务端的推送url应该长这样
        `/AppPush`
    - 如果有语音播报，但是客户端访问日志不存在，则表示监听不正常（客户端不是我开发，别找我，谢谢）

### DEMO测试

> 本程序自带两个demo，分别位于根目录的demo目录和protected/controller/demo目录

1、根目录的demo

    - 需要修改的文件为`demo/core/config.php`
    - 需要在后台添加应用，修改上述文件的应用id和通讯密钥
    - 访问地址-> 您的网站域名/demo
    - 同步回调地址-> 您的网站域名/demo/return.php
    - 异步回调地址-> 您的网站域名/demo/notify.php

2、内置demo

    - 需要修改的文件为`protected/lib/pay/config.php`
    - 需要修改`protected/controller/index/MainController.php`文件`$admin=false;`为`$admin=true;`
    - 需要在后台添加应用，修改上述文件的应用id和通讯密钥
    - 访问地址-> 您的网站域名
    - 同步回调地址-> 您的网站域名/demo/buy/return
    - 异步回调地址-> 您的网站域名/demo/buy/notify

## 版本内容更新


**普通更新，直接删除install目录直接覆盖安装即可，注意修改config.php的相关配置文件**
#### Ver. 2.0(2020.03.16)
**紧急更新**
1、修复价格递增不生效的问题

#### Ver. 2.0(2020.03.06)
**紧急更新**
1、修复web类默认参数未设置的问题

#### Ver. 1.9(2020.03.06)
**普通更新**

1、添加在线更新功能，登录后台可以自动和github对比，提醒及时更新
2、[BUG]修复邮件测试发送没有错误日志的问题，感谢@eshao2018提醒
3、[建议]支付宝转账接口可能已经失效（原先是安卓有效，IOS失效），建议暂时将支付宝UID那个那个选项先空着


#### Ver. 1.8 (2020.03.04)
**紧急更新**

1、由于本人的疏忽，忘记将新版本的sp核心框架加入git仓库管理...请立即更新

#### Ver. 1.7 (2020.03.04)
**普通更新**

1、[BUG]修复邮件系统保存失败的bug,感谢@kikij11提醒


#### Ver. 1.6 (2020.03.03)
**普通更新**

1、[BUG]修复上传二维码失败的问题,感谢@eshao2018提醒

2、更新安装程序的bug

3、更新README的时间错误

#### Ver. 1.5 (2020.02.29)
**普通更新**

1、修改几处调试问题

2、更新安装教程

#### Ver. 1.4 (2020.02.29)
**普通更新**

1、美化后台UI

2、添加邮件功能

3、[BUG]修复下一页无效的问题（一直存在，一直忘了修）

4、[BUG]修复微信付款码调用失败的问题

5、[BUG]修复支付成功无法及时跳转的问题

6、更新demo（集成到了程序中）地址：`/protected/controller/demo` 核心库位于 `/protected/lib/pay` 将`/protected/controller/index/Maincontroller.php`中的`$admin=false;`改成`$admin=true;`即可使用demo 原先位于程序外部的demo依然保留不受影响

7、增加掉线提醒

8、增加日志功能，目录位于`/protected/logs`，按照日期存储，如果对接的时候出现了问题，可以到这里翻一翻日志查看问题

9、完善一些其他的小问题


#### Ver. 1.3 (2020.01.18)
**普通更新**

1、[BUG]修复了0元购买漏洞

2、[BUG]修复恶意刷取低价购买的漏洞

3、完善订单生成api

####  Ver. 1.2（2020.01.16）
**本次更新请直接删除原站点进行覆盖更新，需要手动修改/protected/config.php的配置文件**

1、添加登录验证码，提高安全性

2、[BUG]修改登录密码的加密传输方式，修复上个版本部分时间段无法登录的情况

**本次需要重置密码方可登录，可以重置账号为admin密码123**
**在pay_settings表中字段UserPassword修改成以下数据即可，账号也需要改成admin**
`9974954aff3028fd7a810a5d4ebf9e58da4e6aa3bb02e424bcc7c8f64fef5749`

3、对原有版本添加命名空间的支持

4、不再对低版本PHP提供支持，仅支持PHP7.0+

5、[BUG]修复了由于函数大小写导致的补单无反应bug



####  Ver. 1.1（2019.09.29）

**本次更新对数据库结构进行了修改，您可能需要重新安装数据库或者根据mysql.sql文件自行修改数据库结构**

1、修改后台登录部分密码传输与密码加密存储方案（防止中间人）

2、修改sign的最终计算方案（MD5->sha256）

3、优化了后端数据库，删除精简不必要的字段、规范后端模块命名与编写、增加大量注释便于修改

4、自定义参数部分默认进行url解码与unicode解码，方便查看

5、对demo部分封装新的类库，方便直接调用

6、删掉没必要的api接口的教程

7、对支付结果增加校验，便于了解支付结果

####  Ver. 1.0（2019.06.23）

1、原作者的php版本后台安全性有点脆弱，主要是是后台登录校验部分

2、而且采用了一个非常臃肿的thinkphp框架，上传速率慢

3、给原作者增加安装程序，用以安装该项目

4、对于其支付宝支付部分稍作修改增强用户体验

5、修改回调方式

6、采用全新修改的sp框架重新编写，速度更快

7、更换sign计算方式

## 鸣谢

- [V免签](https://github.com/szvone/Vmq)
- [SpeedPHP框架](https://github.com/SpeedPHP/manual)


## 版权声明

V免签 - Dreamn修改版遵循 [MIT License](/LICENSE) 开源协议发布，并提供免费使用，请勿用于非法用途。

版权所有Copyright © 2020 by dreamn (https://dreamn.cn)

All rights reserved。

