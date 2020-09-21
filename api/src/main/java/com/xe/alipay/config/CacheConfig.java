package com.xe.alipay.config;

import com.xe.alipay.record.auth.token.TokenDBStorage;
import com.xe.alipay.record.auth.token.TokenStorage;
import org.springframework.cache.guava.GuavaCache;
import com.google.common.cache.CacheBuilder;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;
/**
* author: lironghong
* date: 2018/11/21 10:16
* description: 增加App配置缓存 APP_SETTING
*/

@Configuration
@EnableCaching
public class CacheConfig extends CachingConfigurerSupport {

    public static final String CAPTCHA_CACHE = "captcha";
    public static final String SMS_CODE_CACHE = "smscode";
    public static final String SMS_LIMIT_CACHE = "smslimit";
    public static final String ACCOUNTKIT_SMS_LIMIT_CACHE = "accountkitsmslimit";
    public static final String TOKEN_CACHE = "token";
    public static final String REFRESH_TOKEN_CACHE = "refreshtoken";
    public static final String CUSTOMER_CONTEXT_CACHE = "customercontext";
    public static final String ADMIN_CONTEXT_CACHE = "admincontextcache";
    public static final String REGION_CACHE = "regioncache";
    public static final String FACE_VERIFY_COUNT = "faceverifycount";
    public static final String OCR_COUNT = "ocrcount";
    public static final String APP_SETTING = "appsetting";
    @Override
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        GuavaCache captchaCache = new GuavaCache(CAPTCHA_CACHE, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(10, TimeUnit.MINUTES)
                .build());
        GuavaCache smsCache = new GuavaCache(SMS_CODE_CACHE, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(30, TimeUnit.MINUTES)
                .build());
        GuavaCache accountkitSmsCache = new GuavaCache(ACCOUNTKIT_SMS_LIMIT_CACHE, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(360, TimeUnit.MINUTES)
                .build());
        GuavaCache smsLimitCache = new GuavaCache(SMS_LIMIT_CACHE, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(24, TimeUnit.HOURS)
                .build());
        GuavaCache tokenCache = new GuavaCache(TOKEN_CACHE, CacheBuilder.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(2, TimeUnit.HOURS)
                .build());
        GuavaCache refreshTokenCache = new GuavaCache(REFRESH_TOKEN_CACHE, CacheBuilder.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(7, TimeUnit.DAYS)
                .build());
        GuavaCache customerContextCache = new GuavaCache(CUSTOMER_CONTEXT_CACHE, CacheBuilder.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(2, TimeUnit.HOURS)
                .expireAfterAccess(2, TimeUnit.HOURS)
                .build());
        GuavaCache adminContextCache = new GuavaCache(ADMIN_CONTEXT_CACHE, CacheBuilder.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(2, TimeUnit.HOURS)
                .expireAfterAccess(2, TimeUnit.HOURS)
                .build());
        GuavaCache regionCache = new GuavaCache(REGION_CACHE, CacheBuilder.newBuilder()
                .maximumSize(10000)
                .expireAfterWrite(7, TimeUnit.DAYS)
                .expireAfterAccess(7, TimeUnit.DAYS)
                .build());

        GuavaCache faceVerifyCountCache = new GuavaCache(FACE_VERIFY_COUNT, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(2, TimeUnit.HOURS)
                .expireAfterAccess(2, TimeUnit.HOURS)
                .build());
        GuavaCache ocrCountCache = new GuavaCache(OCR_COUNT, CacheBuilder.newBuilder()
                .maximumSize(100000)
                .expireAfterWrite(1, TimeUnit.DAYS)
                .build());
        GuavaCache appSettingCache = new GuavaCache(APP_SETTING, CacheBuilder.newBuilder()
                .maximumSize(1)
                .expireAfterWrite(2, TimeUnit.HOURS)
                .expireAfterAccess(2, TimeUnit.HOURS)
                .build());
        cacheManager.setCaches(
                Arrays.asList(captchaCache, smsCache, smsLimitCache,accountkitSmsCache, tokenCache,
                        refreshTokenCache, customerContextCache, adminContextCache,
                        regionCache, faceVerifyCountCache, ocrCountCache,appSettingCache));
        return cacheManager;
    }


    /**
     * Token操作使用db
     */
    @Bean
    public TokenStorage tokenStorage() {
        //return new TokenLocalStorage();
        return new TokenDBStorage();
    }

}
