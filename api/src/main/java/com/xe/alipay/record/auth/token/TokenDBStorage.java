package com.xe.alipay.record.auth.token;

import com.xe.alipay.mapper.TokenMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenDBStorage implements TokenStorage {

    @Autowired
    private TokenMapper tokenMapper;

    @Override
    public TokenEntity findToken(String token) {
        return tokenMapper.findToken(token);
    }

    @Override
    public TokenEntity findRefreshToken(String refreshToken) {
        return tokenMapper.findRefreshToken(refreshToken);
    }

    @Override
    public int create(TokenEntity token) {
        return tokenMapper.createToken(token);
    }

    @Override
    public int invalidateToken(String token) {
        return tokenMapper.invalidToken(token);
    }

    @Override
    public int invalidateRefreshToken(String refreshToken) {
        return tokenMapper.invalidRefreshToken(refreshToken);
    }

    @Override
    public int invalidateAll(String subject,String metaData) {
        return tokenMapper.invalidAllTokens(subject,metaData);
    }

}
