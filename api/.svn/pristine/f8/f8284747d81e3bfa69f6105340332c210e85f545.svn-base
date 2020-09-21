package com.xe.alipay.mapper;


import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.BalanceDescription;
import com.xe.alipay.model.Blancedescrtiptionresponse;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BalanceDescriptionMapper extends BaseMapper<BalanceDescription> {
    //@Select("SELECT b.cause,b.changemoney,b.createtime,c.blance FROM balancedescription AS b LEFT JOIN customer AS c ON b.merchid= c.merchid WHERE b.merchid=#{merchid}  ORDER BY createtime DESC")
    @Select("SELECT cause,changemoney,createtime,yue AS blance  FROM balancedescription WHERE merchid=#{merchid} ORDER BY createtime DESC")
    List<Blancedescrtiptionresponse> selectdescription(@Param("merchid") String merchid);
}