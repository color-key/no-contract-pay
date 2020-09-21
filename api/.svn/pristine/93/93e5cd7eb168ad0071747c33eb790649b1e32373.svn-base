package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@Data
public class Qrcode extends Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private double money;

    private String aliqrurl;

    private String node;

    private String cusAccountname;

    private Integer accpaytype;

    private Date createtime;

     private Integer usestate;

     private  String CusMerchid;
}