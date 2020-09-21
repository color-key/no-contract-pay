package com.xe.alipay.service;

import com.xe.alipay.common.Platform;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Page;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* author: lironghong
* date: 2018/11/23 10:19
* description: 商户用户业务代码
*/
public interface CustomerService {
    //查找用户表中邮箱是否注册
    boolean findrgbyemail(String email);

    Customer findbymcerchid(String uid);

    List<Customer> finduser(String account, String password);
    //后台登陆
    List<Customer> findandminUser(String account, String password);
    int   findcount();

    Customer adminfindbyuuid(String useruuid);


     Page queryall(int pageNum, int pageSize);
}
