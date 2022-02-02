<?php

namespace app\controller\api;

use app\core\mvc\Controller;

class BaseController extends Controller
{

    public function ret($code,$msg=null,$data=null,$count=0): array
    {
        if(is_bool($code)){
            if($code){
                $code=200;
            }else{
                $code=403;
            }
        }
        if($msg==null){
            $msg="OK";
        }
        return ["code"=>$code,"msg"=>$msg,"data"=>$data,"count"=>$count];
    }
}