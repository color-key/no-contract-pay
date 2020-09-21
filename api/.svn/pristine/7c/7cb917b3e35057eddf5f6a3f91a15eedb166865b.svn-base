package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;
@Data
public class Aislerate implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private Integer asuid;

    private float rate;
    private static final long serialVersionUID = 1L;


}