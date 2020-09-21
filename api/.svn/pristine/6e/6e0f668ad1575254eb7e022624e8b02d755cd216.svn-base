package com.xe.alipay.mapper;

import com.xe.alipay.base.BaseMapper;
import com.xe.alipay.model.Token;
import com.xe.alipay.record.auth.token.TokenEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TokenMapper extends BaseMapper<Token> {

    @Insert("INSERT INTO token(UUID,SUBJECT, TOKEN, EXPIRED_TIME, REFRESH_TOKEN, REFRESH_EXPIRED_TIME, METADATA) " +
            " VALUES(UUID(),#{subject}, #{token}, #{expiredTime}, #{refreshToken}, #{refreshExpiredTime}, #{metadata})")
    //@Options(useGeneratedKeys = true)
    int createToken(TokenEntity tokenEntity);

    @Select("SELECT * FROM token WHERE TOKEN = #{token} AND EXPIRED_TIME > NOW() LIMIT 1")
    TokenEntity findToken(@Param("token")String token);

    @Select("SELECT * FROM token WHERE REFRESH_TOKEN = #{refreshToken} AND REFRESH_EXPIRED_TIME > NOW() LIMIT 1")
    TokenEntity findRefreshToken(@Param("refreshToken")String refreshToken);

    @Update("UPDATE token SET EXPIRED_TIME = NOW(), REFRESH_EXPIRED_TIME = NOW() WHERE TOKEN = #{token}")
    int invalidToken(@Param("token")String token);

    @Update("UPDATE token SET REFRESH_EXPIRED_TIME = NOW() WHERE REFRESH_TOKEN = #{refreshToken}")
    int invalidRefreshToken(@Param("refreshToken") String refreshToken);

    @Update("UPDATE token SET EXPIRED_TIME = NOW(), REFRESH_EXPIRED_TIME = NOW() WHERE SUBJECT = #{subject} AND METADATA = #{metaData} AND (EXPIRED_TIME > NOW() OR REFRESH_EXPIRED_TIME > NOW())")
    int invalidAllTokens(@Param("subject")String subject,@Param("metaData")String metaData);

    @Delete("DELETE FROM token WHERE REFRESH_EXPIRED_TIME < CURRENT_DATE - 1")
    int deleteExpiredTokens();

}