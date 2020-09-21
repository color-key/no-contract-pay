package com.xe.alipay.record.auth.token;

import org.springframework.stereotype.Service;

@Service
public interface TokenStorage {

    TokenEntity findToken(String token);

    TokenEntity findRefreshToken(String refreshToken);

    int create(TokenEntity token);

    int invalidateToken(String token);

    int invalidateRefreshToken(String refreshToken);

    int invalidateAll(String subject, String metaData);

}
