package com.xe.alipay.service;
import com.xe.alipay.model.CusGetaccount;
import com.xe.alipay.model.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CusGetaccountService {
    Page<CusGetaccount> fenyequery(Integer paytype , int pageNum, int pageSize, String countuuid);
    int  GetCount(Integer paytype,String countuuid);

    int updateCusGetaccount(String accname,int State,String node,String uuid);
    boolean  deleteCusGetaccount(String  uuid);


    Page   fenyequeryqrcode(String merchid,String accname,int paytype,int pageNum,int pageSize);
     int  getCount(String merchid,int paytype);

     //二维码数量
     int getcount(Double submitemoney,String merchid,String accname,int paytype);
     Page  fenyeaccount(String merchid,Integer paytype,int pageNum,int pageSize);
  //后台查所有账户
   List<CusGetaccount>  CusGetaccount(String merchid);

}
