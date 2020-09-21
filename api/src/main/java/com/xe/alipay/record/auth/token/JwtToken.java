package com.xe.alipay.record.auth.token;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
/**
* author: lironghong
* date: 2018/11/21 10:18
* description: 
*/
@ApiModel("授权令牌Token")
public class JwtToken {

    @ApiModelProperty(name = "token",value = "令牌Token")
    private String token;

    @JsonIgnore
    @ApiModelProperty(name = "refreshToken",value = "刷新token")
    private String refreshToken;

    public JwtToken(String token) {
        this.token = token;
    }

    public JwtToken(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
