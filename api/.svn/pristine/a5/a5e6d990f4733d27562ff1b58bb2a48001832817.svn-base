package com.xe.alipay.record.auth.token;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;


public class TokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select UUID()")
    private String uuid;
    private String subject;
    private String token;
    private Date expiredTime;
    private String refreshToken;
    private Date refreshExpiredTime;
    private String metadata;

    public TokenEntity() {
    }

    public TokenEntity(String subject, String token, Date expiredTime, String refreshToken, Date refreshExpiredTime,String metadata) {
        this.subject = subject;
        this.token = token;
        this.expiredTime = expiredTime;
        this.refreshToken = refreshToken;
        this.refreshExpiredTime = refreshExpiredTime;
        this.metadata = metadata;
    }

    public String getId() {
        return uuid;
    }

    public void setId(String id) {
        this.uuid = id;
    }

    public String getSubject() {
        return subject;
    }

    public TokenEntity setSubject(String subject) {
        this.subject = subject;
        return this;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiredTime() {
        return expiredTime;
    }

    public void setExpiredTime(Date expiredTime) {
        this.expiredTime = expiredTime;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Date getRefreshExpiredTime() {
        return refreshExpiredTime;
    }

    public void setRefreshExpiredTime(Date refreshExpiredTime) {
        this.refreshExpiredTime = refreshExpiredTime;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }
}
