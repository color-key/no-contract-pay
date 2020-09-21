package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Order;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface OrderMapper extends BaseMapper<Order> {
    //判断订单号是否重复
    @Select("SELECT COUNT(ordernumber) FROM `order` WHERE cus_merchid=#{uid} AND ordernumber=#{orderid}")
    boolean existswithorderid(@Param("uid") String uid,@Param("orderid") String orderid);
    @Insert("INSERT INTO `order`(UUID,ordernumber,cus_merchid,cus_uuid,node,djmoney,sjmoney,qruuid,qrtype,openuserid,notifyurl,returnurl) VALUES (UUID(),#{orderid},#{merchid},#{uuid},#{node},#{submitemoney},#{sjmoney},#{codeuuid},#{accpaytypes},#{uid},#{notifyurl},#{returnurl})")
    int insteroder(@Param("orderid") String orderid, @Param("merchid") String merchid,@Param("uuid") String uuid, @Param("node") String node, @Param("submitemoney") Double submitemoney,@Param("sjmoney") Double sjmoney ,@Param("codeuuid") String codeuuid,@Param("accpaytypes") int accpaytypes, @Param("uid") String uid,@Param("notifyurl") String notifyurl,@Param("returnurl") String returnurl);
   // @Select("select * from `order` where cus_merchid=#{cus_merchid} limit #{currentPage},#{pageSize}")
    public List<Order> fenyeorder(@Param("merchid") String merchid,@Param("qrtype") Integer qrtype,@Param("state") Integer state,@Param("currentPage") int currentPage,@Param("pageSize") int pageSize);
    @Select("SELECT COUNT(*) FROM `order` WHERE cus_merchid=#{cus_merchid}")
    int getCount(String cus_merchid);
    int getOrderCount(@Param("merchid") String merchid,@Param("qrtype") Integer qrtype,@Param("state") Integer state);
   /* @Select("select o.ordernumber,o.cus_merchid,q.node,o.createtime,q.money,q.accpaytype,o.state from `order` o,qrcode q \n" +
            "where  o.ordernumber=#{ordernumber} and  o.cus_merchid=#{cus_merchid} and q.money=#{money} and q.accpaytype=#{accpaytype} limit #{currentPage},#{pageSize}")*/
    List<Order> findorder (@Param("uid")String uid,@Param("ordernumber") String ordernumber,@Param("cus_merchid") String cus_merchid,@Param("djmoney") Double djmoney,@Param("qrtype") int qrtype,@Param("currentPage") int currentPage,@Param("pageSize") int pageSize,@Param("begintime") String begintime,@Param("endtime") String endtime,@Param("state") Integer state);

    //订单匹配
    @Select("SELECT * FROM `order` WHERE qrtype=#{payType} AND state=0 AND sjmoney=#{money} AND cus_merchid=#{merchid}")
    List<Order> selectorder(@Param("payType") int payType, @Param("money") double money, @Param("merchid") String merchid);

    //更改订单状态
    @Update("UPDATE `order` SET state=2 WHERE UUID=#{uuid}")
    int updateorderstate(@Param("uuid") String uuid);
    @Update("UPDATE `order` SET state=#{state} WHERE ordernumber=#{ordernumber} AND cus_merchid=#{merchid}")
    int updatestateorder(@Param("merchid")String merchid,@Param("ordernumber") String ordernumber,@Param("state") int state);
    //查询订单状态跳转
    @Select("SELECT state FROM `order` WHERE cus_merchid=#{uid} AND djmoney=#{money} AND ordernumber=#{orderid}")
    String selectstate(@Param("uid") String uid, @Param("orderid") String orderid,@Param("money") String money);

    @Update("UPDATE `order` SET state=1 WHERE ordernumber=#{ordernumber}")
    int updatesta(@Param("ordernumber") String ordernumber);

    @Select("SELECT state FROM  `order` where  ordernumber=#{ordernumber}")
    int   statenumber(@Param("ordernumber")String ordernumber);
    @Select("SELECT * FROM `order` WHERE ordernumber=#{ordernumber} AND cus_merchid=#{merchid}")
    Order selectxiangxiorder(@Param("merchid") String merchid,@Param("ordernumber") String ordernumber);
    @Select("SELECT * FROM `order` WHERE ordernumber=#{ordernumber}")
    Order findOrderByOrderNo(@Param("ordernumber") String ordernumber);
    @Select("SELECT ordernumber,cus_merchid,djmoney,sjmoney,createtime,state,qrtype,notifyurl,returnurl FROM `order` WHERE cus_merchid=#{uid} AND ordernumber=#{orderid} AND qrtype=#{type}")
    Order merchselectorder(@Param("uid") String uid, @Param("orderid") String orderid,@Param("type") int type);
    //新加功能判断此商户,收款类型,金额是否有支付中的如果有则返回系统繁忙请稍后再试
    @Select("SELECT COUNT(sjmoney) FROM `order` WHERE sjmoney=#{price} AND qrtype=#{type} AND cus_merchid=#{uid} AND state=0")
    boolean selecthaszfz(@Param("uid") String uid, @Param("price") Integer price,@Param("type") Integer type);
    //查询数据库中创建时间距离当前时间大于5分钟的订单和状态为0(支付中)的
    @Select("SELECT * FROM `order` WHERE createtime < DATE_SUB(NOW(), INTERVAL 5 MINUTE) AND state =0")
    List<Order> selectallorder();
    //查询order表中状态成功没有收到回调的
    //@Select("SELECT * FROM `order` WHERE createtime BETWEEN DATE_ADD(NOW(), INTERVAL - 15 MINUTE) AND NOW() AND state=2 AND returncode=\"filed\"")
    @Select("SELECT * FROM `order` WHERE returncode=\"filed\" AND state=2 AND notifycont<3")
    List<Order> selectreturncode();
    @Update("UPDATE `order` SET returncode=\"success\" WHERE cus_merchid=#{cusMerchid} AND ordernumber=#{ordernumber}")
	int updatereturncode(@Param("cusMerchid") String cusMerchid, @Param("ordernumber") String ordernumber);
    @Update("UPDATE `order` SET notifycont=notifycont+1 WHERE cus_merchid=#{cusMerchid} AND ordernumber=#{ordernumber}")
    int updatenotifycont(@Param("cusMerchid") String cusMerchid, @Param("ordernumber") String ordernumber);
    @Select("SELECT SUM(sjmoney) AS ordersum,COUNT(ordernumber) AS ordercount FROM `order` WHERE TO_DAYS(createtime) = TO_DAYS(NOW()) AND cus_merchid=#{merchid} AND state=2")
    Map<String,Object> selecttoday(@Param("merchid") String merchid);
    @Select("SELECT SUM(sjmoney) AS ordersum,COUNT(ordernumber) AS ordercount FROM `order` WHERE TO_DAYS( NOW( ) ) - TO_DAYS( createtime) <= 1 AND cus_merchid=#{merchid} AND state=2")
    Map<String,Object> selectyesterday(@Param("merchid") String merchid);
    @Select("SELECT SUM(sjmoney) AS ordersum,COUNT(ordernumber) AS ordercount FROM `order` WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(createtime) AND cus_merchid=#{merchid} AND state=2")
    Map<String,Object> selectsevendays(@Param("merchid") String merchid);
    @Select("SELECT SUM(sjmoney) AS ordersum,COUNT(ordernumber) AS ordercount FROM `order` WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(createtime) AND cus_merchid=#{merchid} AND state=2")
    Map<String,Object> selectthirtydays(@Param("merchid") String merchid);
    @Update("UPDATE `order` SET notifycont=0 AND cus_merchid=#{merchid} AND ordernumber=#{ordernumber}")
    int cleannotifycont(@Param("merchid") String merchid, @Param("ordernumber") String ordernumber);
}