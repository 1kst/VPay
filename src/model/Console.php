<?php
namespace app\model;
/*主页统计模块
 * */

use app\core\mvc\Model;

class Console extends Model
{
    private $today;

    public function __construct()
    {
        parent::__construct("pay_order");
        $this->today = strtotime(date("Y-m-d"), time());
    }

//取得今天的订单信息
    public function todayOrder()
    {
        $conditions = array(
            "create_date >= :create_date1 and create_date <=:create_date2",
            ":create_date1" => $this->today,
            ":create_date2" => $this->today + 86400
        );
        return $this->select()->count($conditions);
    }

//取得成功的订单信息
    public function todaySuccessOrder()
    {
        $conditions = array(
            "state >= 1 and create_date >= :create_date1 and create_date <=:create_date2",
            ":create_date1" => $this->today,
            ":create_date2" => $this->today + 86400
        );
        return $this->select()->count($conditions);
    }

    public function todayCloseOrder()
    {
        $conditions = array(
            "state = -1 and create_date >= :create_date1 and create_date <=:create_date2",
            ":create_date1" => $this->today,
            ":create_date2" => $this->today + 86400
        );
        return $this->select()->count($conditions);
    }

    public function todayMoney()
    {
        $conditions = array(
            "state >=1 and create_date >= :create_date1 and create_date <=:create_date2",
            ":create_date1" => $this->today,
            ":create_date2" => $this->today + 86400
        );
        return $this->select()->sum($conditions, "price");
    }

    //统计支付成功的订单数
    public function countOrder()
    {
        return $this->select()->count(array("state >= 1"));//1是支付完成
    }

    public function countMoney()
    {
        $conditions = array(
            "state >= 1"
        );
        return $this->select()->sum($conditions, "price");
    }
}