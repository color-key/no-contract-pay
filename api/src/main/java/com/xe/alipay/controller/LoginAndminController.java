package com.xe.alipay.controller;

import com.xe.alipay.common.Platform;
import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.record.auth.LoginAndminService;
import com.xe.alipay.record.auth.captcha.CheckCaptcha;
import com.xe.alipay.record.auth.token.JwtToken;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Api(description = "后台登陆接口")
public class LoginAndminController {
    @Autowired
    LoginAndminService loginAndminService;
    @Bean
    ShaPasswordEncoder getShaPasswordEncoder() {
        return new ShaPasswordEncoder(256);
    }
    @CheckCaptcha
    @PostMapping("/adminlogin")
    @ApiOperation(
            value = "后台登入",
            notes = "")
    public XResponse<JwtToken> login(
            @ApiParam(name = "account", value = "账号", required = true)
            @RequestParam("account")
                    String account,
            @ApiParam(name = "password", value = "密码", required = true)
            @RequestParam(value = "password")
                    String password,
            @ApiParam(name = AuthConstants.CAPTCHA_SID_HEADER, value = "获取验证码时的sid", required = false)
            @RequestHeader(value = AuthConstants.CAPTCHA_SID_HEADER, required = false)
                    String sid,
            @ApiParam(name = AuthConstants.CAPTCHA_HEADER, value = "验证码值", required = false)
            @RequestHeader(value = AuthConstants.CAPTCHA_HEADER, required = false)
                    String captcha,
            @ApiParam(name = AuthConstants.PLATFORM, value = "平台(IOS,ANDRIOD,WEBAPP)", required = true)
            @RequestHeader(value = AuthConstants.PLATFORM, required = true)
                    Platform platform) {
        String encodePassword = getShaPasswordEncoder().encodePassword(password, "xe-alipay");
        return  loginAndminService.adminlogin(account,encodePassword,platform);
    }

}
