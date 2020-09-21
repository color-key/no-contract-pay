package com.xe.alipay.model.Payment;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;


@Data
public class Payment {
    //商户uid
    @NotBlank(message = "缺少uid" )
    String uid;
    //价格
    @NotNull(message = "缺少金额")
    Integer price;
    //支付渠道
    @NotNull(message = "缺少通道类型")
    Integer type;
    //通知回调地址
    @NotBlank(message = "缺少异步回调地址")
    String notifyurl;
    //跳转网址
    @NotBlank(message = "缺少前台通知地址")
    String returnurl;
    //商户自定义订单号
    @NotBlank(message = "缺少订单号")
    String orderid;
    //商户自定义客户号
    String orderuid;
    //商品名称
    String goodsname;
    @NotBlank(message = "缺少签名")
    String sign;
}
