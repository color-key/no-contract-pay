package com.xe.alipay.model;

import lombok.Data;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
@Data
public class CusGetaccount extends Page{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String cusUid;

    private String cusMerchid;

    private String accname;

    private int paytype;

    private Date createtime;

    private int State;

    private String node;


}