package com.xe.alipay.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;
@Data
public class Aisle implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;

    private Integer aitype;

    private Date createtime;

    private String asname;
    private   Aislerate aislerate;
    private static final long serialVersionUID = 1L;


}