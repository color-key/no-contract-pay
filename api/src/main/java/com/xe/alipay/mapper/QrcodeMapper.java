package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Qrcode;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QrcodeMapper extends BaseMapper<Qrcode> {
    //根据收款账户找到对应还未被占用的支付二维码以及为缺失的二维码
    //@Select("SELECT * FROM qrcode WHERE money BETWEEN #{submitemoney}-0.02 AND #{submitemoney}+0.02  AND usestate='0'")
    @Select("SELECT * FROM cus_accountmoney AS c LEFT JOIN qrcode AS q ON c.cus_merchid=q.cus_merchid WHERE q.money BETWEEN #{submitemoney}-0.02 AND #{submitemoney}+0.02 AND q.cus_accountname=#{accname} AND q.cus_merchid=#{uid} AND q.usestate=0 AND c.state=0")
    List<Qrcode> selectnousecode(@Param("accname") String accname, @Param("submitemoney") double submitemoney,@Param("type") int type,@Param("uid") String uid);

    @Select("select * from qrcode where cus_merchid=#{merchid} and cus_accountname=#{accname} and accpaytype=#{paytype} limit #{currentPage},#{pageSize}")
    List<Qrcode>  queryfenye(@Param("merchid") String merchid,@Param("accname")String  accname,@Param("paytype")int paytype,@Param("currentPage")int currentPage,@Param("pageSize")int pageSize);
    @Select("select * from qrcode where cus_merchid=#{merchid} limit #{currentPage},#{pageSize}")
    List<Qrcode>  fenyeQrecode(@Param("merchid") String merchid,@Param("currentPage")int currentPage,@Param("pageSize")int pageSize);

    //金额下二维码的数量
    @Select("SELECT COUNT(aliqrurl) FROM qrcode WHERE  money BETWEEN #{money}-0.02 AND #{money}+0.02 and cus_merchid=#{merchid} and cus_accountname=#{accname} and accpaytype=#{paytype}")
   int  getcount(@Param("money") Double money ,@Param("merchid") String merchid,@Param("accname")String accname,@Param("paytype") int paytype);
    @Select("select count(*) from  qrcode where cus_merchid=#{merchid} and accpaytype=#{paytype}")
    int  count(@Param("merchid") String merchid,@Param("paytype") int paytype);
    @Select("select count(*) from  qrcode where cus_merchid=#{merchid}")
    int  getrecodecount(@Param("merchid") String merchid);
    @Insert("insert into qrcode(uuid,money,aliqrurl,node,cus_accountname,accpaytype,usestate,cus_merchid) values(UUID(),#{money},#{aliqrurl},#{node},#{cusAccountname},#{accpaytype},#{usestate},#{CusMerchid})")
    int addqrcode(Qrcode qrcode);



    @Delete("delete  from qrcode where money BETWEEN #{money}-0.02 AND #{money}+0.02 and cus_merchid=#{merchid} and cus_accountname=#{cusAccountname} and accpaytype=#{accpaytype}")
    int  deleteqrcode(@Param("merchid") String merchid,@Param("money") Double money,@Param("cusAccountname")String  cusAccountname,@Param("accpaytype") int accpaytype);
    @Transactional
    @Delete("delete cus_accountmoney,qrcode from cus_accountmoney left join qrcode on cus_accountmoney.cus_merchid=qrcode.cus_merchid  where acamount BETWEEN #{acamount}-0.02 AND #{acamount}+0.02 and cus_accountmoney.cus_merchid=#{merchid} and acaccname=#{acaccname} and cus_accountmoney.acpaytype=#{acpaytype}")
    int  deletemoney(@Param("merchid") String merchid,@Param("acamount") Double acamount,@Param("acaccname")String  acaccname,@Param("acpaytype") int acpaytype);
//@Select("select * from qrcode  where cus_merchid=#{merchid} and cus_accountname=#{cusAccountname} and accpaytype=#{accpaytype} ")
List<Qrcode> queryselect(@Param("merchid") String merchid,@Param("cusAccountname")String  cusAccountname,@Param("accpaytype") Integer accpaytype,@Param("money") Double money);

}