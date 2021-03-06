package com.xe.alipay.mapper;

import com.github.pagehelper.PageInfo;
import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.CusGetaccount;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface CusGetaccountMapper extends BaseMapper<CusGetaccount> {
   @Select("select cus_merchid  from  cus_getaccount a where cusUid=#{uuid}")
    String  findbyid(String uuid);

  @Select("select * from  cus_getaccount where paytype=#{paytype}")
    List<CusGetaccount> findtype(int paytype);
    @Select("select * from cus_getaccount where paytype=#{paytype} and accname=#{accname} and cus_merchid=#{merchid}")
    CusGetaccount  queryaccount(@Param("paytype") int paytype,@Param("accname")String accname,@Param("merchid") String merchid);
  //@Select("select * from cus_getaccount where paytype=#{paytype} limit ，")
 //@Select("  select *  from cus_getaccount where  cus_uid=#{countuuid} and  paytype=#{paytype}  limit pageNum=#{currentPage},PageSize=#{PageSize}")
  List<CusGetaccount> fenyequery(@Param("paytype") Integer  paytype,@Param("currentPage") int  currentPage,@Param("pageSize") int  pageSize,@Param("countuuid") String countuuid);
 // @Select("SELECT COUNT(*) FROM cus_getaccount where paytype=#{paytype} and cus_uid=#{countuuid}")
  int  getCount(@Param("paytype") Integer paytype,@Param("countuuid") String countuuid);
  @Insert("insert into cus_getaccount(UUID,cus_uid,cus_merchid,accname,paytype,node) values(UUID(),#{cusUid},#{cusMerchid},#{accname},${paytype},#{node})")
   int add(CusGetaccount cusGetaccount);
    //根据收款账户和收款类型找到可用收款账户
    @Select("SELECT * FROM cus_getaccount WHERE state=0 AND cus_merchid=#{uid} AND paytype=#{type}")
    List<CusGetaccount> finduseaccount(@Param("uid") String uid, @Param("type") int type);
    @Delete("Delete from cus_getaccount where  uuid=#{uuid}")
     boolean   deleteCusGetaccount(String  uuid);
   // @Update("update cus_getaccount set accname=#{accname},paytype=#{paytype},state=#{state},uuid=#{uuid} ")
    int   updateCusGetaccount(@Param("accname") String accname,@Param("state") int state,@Param("node") String node,@Param("uuid") String  uuid);
 // @Select("select * from cus_getaccount where cus_merchid=#{cusMerchid} limit #{currentPage},#{pageSize}")
    List<CusGetaccount> fenyeaccount(@Param("cusMerchid")String cusMerchid,@Param("paytype")Integer paytype,@Param("currentPage")int currentPage,@Param("pageSize")int pageSize);
    int fenyeaccountCount(@Param("cusMerchid")String cusMerchid,@Param("paytype")Integer paytype);
    @Select("select count(*) from  qrcode where cus_merchid=#{merchid}")
    int  getaccount(@Param("merchid") String merchid);
   @Select("select  * from cus_getaccount where cus_merchid=#{merchid}")
    List<CusGetaccount>  accountlist(@Param("merchid") String merchid);
}