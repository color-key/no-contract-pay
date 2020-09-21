package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;
@Data
public class Token implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private String subject;

    private String token;

    private Date expiredTime;

    private String refreshToken;

    private Date refreshExpiredTime;

    private String metadate;

    private static final long serialVersionUID = 1L;

    }