<?php
namespace app\controller\index;
/*
 * 手机app推送消息，进行心跳测试等
 * */


use app\model\Config;
use app\model\Order;
use app\model\Temp;

class AppController extends BaseController
{

    //进行心跳
    public function actionAppHeart()
    {//app心跳
        $ord=new Order();
        $ord->closeEndOrder();//清理过期订单
        $conf = new Config();

        $key = $conf->getData(Config::Key);//取出与app通信的密钥

        $t = arg("t");

        $_sign = $t . $key;

        
        if (md5($_sign) !== arg("sign")) {
            exit(json_encode(array("code" => Config::Api_Err, "msg" => "签名校验不通过")));
        }

        $jg = time() * 1000 - intval($t);
        if ($jg > 50000 || $jg < -50000) {
            exit(json_encode(array("code" => Config::Api_Err, "msg" => "客户端时间错误",'data'=>[time(),$t])));
        }

        $conf->setData("LastHeart", time());

        $conf->setData("State", Config::State_Online);//表示正常监听

        echo json_encode(array("code" => Config::Api_Ok, "msg" => "Success"));
    }

    //App数据推送,说是收到钱了
    public function actionAppPush()
    {


        $conf = new Config();

        $key = $conf->getData(Config::Key);//取出与app通信的密钥

        $t = arg("t");

        $type = arg("type");

        $price = arg("price");

        $_sign = $type . $price . $t . $key;


        if (md5($_sign) !== arg("sign")) {
            exit(json_encode(array("code" => Config::Api_Err, "msg" => "签名校验不通过")));
        }

        $jg = time() * 1000 - $t;
        if ($jg > 50000 || $jg < -50000) {
            exit(json_encode(array("code" => Config::Api_Err, "msg" => "客户端时间错误")));
        }

        $conf->setData("LastPay", time());//最后支付时间

        $ord = new Order();//对订单进行处理

        $res = $ord->GetOrderByParam($price, Order::State_Wait, $type);
        //找到等待支付的订单~

        if(!$res)return;

        $tmp = new Temp();

        $tmp->DelByOid($res["order_id"]);//删除临时表

        $ord->ChangeStateByOrderId($res["order_id"], Order::State_Ok, time(), time());//更新订单信息

        echo $ord->Notify($res["order_id"]);

    }


}
