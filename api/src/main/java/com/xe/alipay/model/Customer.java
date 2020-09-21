package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@Data
public class Customer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String email;

    private String username;

    private String password;

    private String phone;

    private String wecahtnm;

    private String qqnm;

    private Integer state;

    private Date createTime;

    private String merchid;

    private String secret;

    private BigDecimal blance;

    private Integer  easzadmin;//0是管理员1是普通用户
    private static final long serialVersionUID = 1L;

}