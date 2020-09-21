package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class CusPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String reMerchid;

    private String reSercurity;

    private String reOpenuuid;


}