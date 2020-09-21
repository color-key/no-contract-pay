package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Customer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.rmi.server.UID;
import java.util.List;
@Mapper
public interface CustomerMapper extends BaseMapper<Customer> {
    //查找邮箱是否注册
    @Select("SELECT COUNT(email) FROM customer WHERE email=#{email}")
    boolean findrgbyemail(@Param("email") String email);
    @Select("SELECT * FROM customer WHERE merchid=#{uid}")
    Customer findbymcerchid(@Param("uid") String uid);
    @Select("SELECT * FROM customer WHERE email=#{account} AND password=#{password}")
    List<Customer> finduser(@Param("account") String account, @Param("password") String password);
    @Select("SELECT COUNT(UUID) FROM customer")
    int findcount();
    @Select("select merchid from customer where uuid=#{useruuid}")
    String  findbyuuid(String useruuid);

    @Select("select * from customer where uuid=#{useruuid}")
    Customer  findadminbyuuid(String useruuid);
    //安卓登录查找商户号
    @Select("SELECT merchid FROM customer WHERE email=#{username} AND `password`= #{encodepassword}")
    String findandroidmerchid(@Param("username") String username,@Param("encodepassword") String encodepassword);
    @Select("SELECT * FROM customer WHERE email=#{account} AND password=#{password} and easzadmin=0")
    List<Customer> findandminUser(@Param("account") String account,@Param("password") String password);
    @Select("select * from customer limit #{currentPage},#{pageSize}")
    List<Customer> queryall(@Param("currentPage")int   currentPage,@Param("pageSize")int  pageSize);
    @Update("UPDATE customer SET blance=#{yue} WHERE merchid=#{uid}")
    int kcrate(@Param("yue") float yue,@Param("uid") String uid);
}