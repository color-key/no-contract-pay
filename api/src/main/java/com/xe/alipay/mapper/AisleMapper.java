package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Aisle;
import org.apache.ibatis.annotations.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface AisleMapper extends BaseMapper<Aisle> {
    //删除通道
    @Transactional
    @Delete("delete aisle,aislerate from aisle left join aislerate on aisle.aitype=aislerate.asuid  where  aitype=#{aitype}")
    int deleteChannel(@Param("aitype") int aitype);
    @Select("SELECT COUNT(aitype) FROM aisle WHERE aitype=${type}")
    boolean existswithtype(@Param("type") String type);
    //@Select("SELECT * FROM aisle where aitype=#{aitype}")
    List<Aisle> findaisle(Integer aitype);
    @Select("select * from aisle where aitype=#{aitype}")
    Aisle find(int aitype);
    @Insert("insert into aisle(uuid,aitype,asname)values(UUID(),#{aitype},#{asname})")
    Aisle   channeladd(int aitype,String asname);
    //@Select("select a.aitype,a.createtime,a.asname,b.rate from aisle a LEFT JOIN aislerate b on a.aitype=b.asuid")
    List<Aisle>   hqueryAisle();

}