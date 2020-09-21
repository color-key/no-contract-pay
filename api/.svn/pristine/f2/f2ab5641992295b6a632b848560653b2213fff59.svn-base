package com.xe.alipay.controller;

import com.google.code.kaptcha.servlet.KaptchaExtend;
import com.xe.alipay.record.auth.captcha.CaptchaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/api/auth")
@Api(description = "验证码操作")
public class CaptchaController extends KaptchaExtend {

    @Autowired
    private CaptchaService captchaService;

    @GetMapping("/captcha")
    @ApiOperation(
            value="获取验证码图片",
            notes="注意：sid;建议使用 设备类型+时间戳+OTHER ps:IOS1540347185V0.1001")
    public void captcha(@RequestParam(value = "sid") String serialId,
                        @RequestParam(value = "width", required = false, defaultValue = "200") int width,
                        @RequestParam(value = "height", required = false, defaultValue = "80") int height,
                        HttpServletResponse response) throws IOException {
        captchaService.genImage(serialId, width, height, response, false);
    }
}
