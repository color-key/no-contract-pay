package com.xe.alipay.service;

import com.xe.alipay.model.Order;
import com.xe.alipay.model.Page;

public interface OrderService {
    Page<Order> fenyeorder(String merchid,Integer qrtype, Integer state, int pageNum, int pageSize);

    int getCount(String cus_merchid);
   Page<Order>  queryorder(String uid,String ordernumber,String cus_merchid,Double djmoney,int qrtype,int pageNum,int pageSize,String begintime,String endtime,Integer state);
   int  updatestateorder(String merchid,String ordernumber,int state);


}