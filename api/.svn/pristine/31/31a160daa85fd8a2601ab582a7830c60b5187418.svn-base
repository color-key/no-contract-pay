package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
/**
* author: lironghong
* date: 2018/12/7 11:38
* description:
*/
@Data
public class CusAccountMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String acaccname;

    private Integer acpaytype;

    private Integer acamount;

    private Date accreatetime;

    private  String  cusMerchid;

    private int  state;

}