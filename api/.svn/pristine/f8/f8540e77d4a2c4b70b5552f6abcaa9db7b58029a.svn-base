package com.xe.alipay.mapper;


import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.CusAccountMoney;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
* author: lironghong
* date: 2018/12/7 11:39
* description:
*/
@Mapper
@Repository
public interface CusAccountMoneyMapper extends BaseMapper<CusAccountMoney> {

    @Insert("INSERT INTO cus_accountmoney (UUID,cus_merchid,acaccname,acpaytype,acamount,state) VALUES (UUID(),#{cusMerchid},#{acaccname},#{acpaytype},#{acamount},#{state})")
    int insertall(CusAccountMoney cusAccountMoney);

    //先查询此收款账户和收款类型有没有此金额
    @Select("SELECT COUNT(acamount) FROM cus_accountmoney WHERE  cus_merchid=#{cusMerchid} and acamount=#{acamount} AND acaccname=#{acaccname} AND acpaytype=#{acpaytype}")
    int existswithamount(CusAccountMoney cusAccountMoney);
    @Select("SELECT * FROM cus_accountmoney WHERE acaccname=#{accname} AND acpaytype=#{paytype}")
    List<CusAccountMoney> selectinfo(@Param("accname") String accname, @Param("paytype") int paytype);
    @Select("SELECT * FROM cus_accountmoney WHERE cus_merchid=#{merchid} and acaccname=#{accname} and acpaytype=#{paytype} ORDER BY acamount DESC limit #{currentPage},#{pageSize}")
    List<CusAccountMoney> fenyeamount(@Param("merchid") String merchid,@Param("accname") String accname, @Param("paytype") int paytype,@Param("currentPage") int currentPage,@Param("pageSize")int pageSize);
    @Select("SELECT * FROM cus_accountmoney WHERE cus_merchid=#{uid}  and acpaytype=#{paytype} limit #{currentPage},#{pageSize}")
    List<CusAccountMoney> fenye(@Param("uid") String uid, @Param("paytype") int paytype,@Param("currentPage") int currentPage,@Param("pageSize")int pageSize);
    @Select("SELECT count(*) FROM cus_accountmoney WHERE  acpaytype=#{paytype} and  cus_merchid=#{merchid}")
    int   getCountMoney(@Param("paytype") int paytype,@Param("merchid") String merchid);

    @Update("UPDATE cus_accountmoney SET state=0 WHERE cus_merchid=#{cusmerchid} AND acaccname=#{accountname} AND acpaytype=#{accpaytype} AND acamount=#{amount}")
    int updatestate(@Param("cusmerchid") String cusmerchid, @Param("accountname") String accountname,@Param("accpaytype") int accpaytype,@Param("amount") int amount);

    CusAccountMoney getMoneyDtail(@Param("paytype") int paytype,@Param("ordernumber") String ordernumber);
}