package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Aislerate;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AislerateMapper extends BaseMapper<Aislerate> {
    @Update("update  aislerate  set rate=#{rate} where asuid=#{asuid}")
    int updaterate(Aislerate aislerate);

    @Insert("insert into aislerate(UUID,asuid,rate) values(UUID(),#{asuid},#{rate})")
    int addratE(Aislerate aislerate);

    //查找通道费率
    @Select("SELECT rate FROM aislerate WHERE asuid=#{type}")
    List<Aislerate> findrate(int type);
   @Select("SELECT * FROM aislerate where asuid=#{asuid}")
   Aislerate find(@Param("asuid") Integer asuid);
   @Delete("DELETE FROM aislerate WHERE asuid=#{asuid}")
    boolean  deleterate(int asuid);

}