package com.xe.alipay.mapper;


import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.CusPayment;
import org.apache.ibatis.annotations.*;

@Mapper
public interface CuspaymentMapper extends BaseMapper<CusPayment> {
    @Select("SELECT * FROM cus_payment")
    CusPayment selectmerchine();
    //判断是否为充值收款账户
    @Select("SELECT COUNT(re_merchid) FROM cus_payment WHERE re_merchid=#{uid}")
    boolean isczsk(@Param("uid") String uid);
    @Insert("INSERT INTO cus_payment(UUID,re_merchid,re_security,re_openuuid) VALUES(UUID(),#{reMerchid},#{re_security},#{re_openuuid})")
    int addPayment(CusPayment cusPayment);
    @Delete("delete from cus_payment")
    boolean  deletepayment();
}