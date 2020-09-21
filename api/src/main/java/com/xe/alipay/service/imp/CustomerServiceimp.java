package com.xe.alipay.service.imp;

import com.xe.alipay.common.Platform;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Page;
import com.xe.alipay.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* author: lironghong
* date: 2018/11/23 10:24
* description:
*/
@Service
public class CustomerServiceimp implements CustomerService {

    @Autowired
    CustomerMapper customerMapper;

    @Override
    public boolean findrgbyemail(String email) {

        return customerMapper.findrgbyemail(email);
    }

    @Override
    public Customer findbymcerchid(String uid) {

        return customerMapper.findbymcerchid(uid);
    }

    @Override
    public List<Customer> finduser(String account, String password) {
        return customerMapper.finduser(account,password);
    }

    @Override
    public List<Customer> findandminUser(String account, String password) {
        List<Customer> list=customerMapper.findandminUser(account,password);
        return list;
    }

    @Override
    public int findcount() {
        return customerMapper.findcount();
    }

    @Override
    public Customer adminfindbyuuid(String useruuid) {
        return customerMapper.findadminbyuuid(useruuid);
    }

    @Override
    public Page queryall(int pageNum, int pageSize) {
        int  currentPage=(pageNum-1)*pageSize;
        int allSizes=findcount();
       int allPages=allSizes%pageSize==0?allSizes/pageSize:allSizes/pageSize+1;

        List<Customer> list=customerMapper.queryall(currentPage,pageSize);
      Page page=new Page(pageNum,pageSize,allSizes,allPages,list);
      return page;


    }


}
