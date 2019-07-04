

<!--该文件是前端ui文件-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>测试支付</title>
</head>
<body>

<p>商户订单号：<input id="payId" type="text"/></p>
<p>商户订单价：<input id="price" type="number" value="0.1"/></p>
<p>自定义参数：<input id="param" type="text" value="vone666"/></p>
<p>支付方式：<select id="type">
    <option value="1">微信支付</option>
    <option value="2">支付宝支付</option>
</select></p>
<button onclick="zf()">支付</button>
<script src="https://lib.baomitu.com/jquery/3.4.0/jquery.min.js"></script>
<script>
    $("#payId").val(new Date().getTime());

    function zf() {
        var p = "payId=" + $("#payId").val() + "&price=" + $("#price").val() + "&param=" + $("#param").val() + "&type=" + $("#type").val();
        window.location.href = "main.php?" + p;
        <!--该文件是前端ui文件，提交给后台，进行签名后发给支付页面-->

    }
</script>


</body>
</html>