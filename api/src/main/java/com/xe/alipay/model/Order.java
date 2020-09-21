package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
@Data
public class Order  extends  Page{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String ordernumber;

    private String cusMerchid;

    private String cusUuid;

    private String qruuid;

    private String node;

    private BigDecimal djmoney;

    private BigDecimal sjmoney;

    private Date createtime;

    private int state;//0：支付中；1：失败；2：成功

    private int qrtype;

    private String openuserid;

    private String returnurl;

    private String notifyurl;

    private String returncode;

    private String notifycont;

}