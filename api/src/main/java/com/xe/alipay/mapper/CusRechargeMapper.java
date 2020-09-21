package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.CusRecharge;
import com.xe.alipay.model.Order;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface CusRechargeMapper extends BaseMapper<CusRecharge> {
    @Insert("INSERT INTO cus_recharge(UUID,cus_id,cus_merchid,money,state,orderid,type,dzmerchid)VALUE(UUID(),#{uuid},#{uid},#{amount},0,#{orderid},#{type},#{reMerchid})")
    int insertrecharge(@Param("uuid") String uuid, @Param("uid") String uid, @Param("amount") BigDecimal amount, @Param("orderid")String orderid, @Param("type") int type, @Param("reMerchid") String reMerchid);
    @Select("SELECT * FROM cus_recharge WHERE dzmerchid=#{merchid} AND money=#{money} AND state=0")
    List<CusRecharge> selectcz(@Param("merchid") String merchid,@Param("money") String money);
    @Update("UPDATE cus_recharge SET state = 2 WHERE uuid=#{uuid}")
    int upstate(@Param("uuid") String uuid);
    @Select("SELECT COUNT(orderid) FROM cus_recharge WHERE orderid=#{ordernumber}")
    boolean selectddcz(@Param("ordernumber") String ordernumber);
    @Select("SELECT * FROM cus_recharge WHERE orderid=#{ordernumber}")
    CusRecharge selectmoney(@Param("ordernumber") String ordernumber);
    @Select("SELECT state FROM cus_recharge WHERE orderid=#{orderid}")
    int statenumber(@Param("orderid") String orderid);
    @Update("UPDATE cus_recharge SET state=1 WHERE orderid=#{orderid}")
    int updatesta(@Param("orderid") String orderid);
    //充值订单表
  //  @Select("SELECT * FROM cus_recharge WHERE cus_merchid=#{uid} and type=#{qrtype} limit #{currentPage}，#{pageSize}")
    List<CusRecharge> payorder(@Param("merchid") String merchid, @Param("qrtype")int qrtype ,@Param("currentPage") int currentPage,@Param("pageSize")int pageSize);
    int payordercount(@Param("merchid") String merchid, @Param("qrtype")int qrtype);
    @Select("select count(*) from cus_recharge")
    int getcount();
    @Select("SELECT cus_merchid FROM cus_recharge WHERE orderid=#{ordernumber}")
    String selectrechangemerchid(@Param("ordernumber") String ordernumber);
    @Update("UPDATE cus_recharge SET state=#{state} WHERE orderid=#{ordernumber} AND cus_merchid=#{cusMerchid}")
    int updatestateorder(@Param("cusMerchid")String cusMerchid,@Param("ordernumber") String ordernumber,@Param("state") int state);
    @Select("SELECT o.* FROM `cus_recharge` c,`order` o WHERE c.orderid=o.uuid AND NOW()>SUBDATE(c.createtime,INTERVAL -5 MINUTE) AND c.state=0")
    List<Order> selectallorder();
}