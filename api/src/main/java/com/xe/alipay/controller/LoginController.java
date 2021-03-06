package com.xe.alipay.controller;

import com.xe.alipay.common.MD5Util;
import com.xe.alipay.common.Platform;
import com.xe.alipay.common.XResponse;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.model.Customer;
import com.xe.alipay.record.auth.LoginService;
import com.xe.alipay.record.auth.captcha.CheckCaptcha;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.record.auth.token.JwtToken;
import com.xe.alipay.service.CustomerService;
import com.xe.alipay.service.RedisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;


/**
 * author: lironghong
 * date: 2018/11/22 16:21
 * description:
 */
//@ApiIgnore
@RestController
@RequestMapping("/api/auth")
@Api(description = "授权验证")
public class LoginController {
    private String merchidcon = "10000";

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private LoginService loginService;

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    private CustomerService customerService;
    @Autowired
    RedisService redisService;

    @Bean
    ShaPasswordEncoder getShaPasswordEncoder() {
        return new ShaPasswordEncoder(256);
    }
/*    //注册验证码
    @ApiOperation(value = "验证码")
    @PostMapping("/sendsms")
    public void loginsms(
            @ApiParam(name = "phone", value = "手机号", required = true)
            @RequestParam(value = "phone", required = true)
                    String phone
    ){

        final String url="http://smsapi.sungoin.com:9001/templateSmsSend.do";
        final String username="hanyang";
        String password="hanyang84";
        password= MD5Util.getMD5String(username+MD5Util.getMD5String(password));
        Random random=new Random();
        StringBuffer content=new StringBuffer();
        for (int i=0;i<=3;i++){
            int b = random.nextInt(10);
            content.append(b);
        }

        RestTemplate restTemplate=new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
//  请勿轻易改变此提交方式，大部分的情况下，提交方式都是表单提交
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//  封装参数，千万不要替换为Map与HashMap，否则参数无法传递
        MultiValueMap<String, String> params= new LinkedMultiValueMap<String, String>();
//  也支持中文
        params.add("username", username);
        params.add("password", password);
        params.add("mobile", phone);
        params.add("id", "41885");
        params.add("params", content.toString());

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        //  执行HTTP请求
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Map.class);
        System.out.println(response.getBody().get("result"));
        String result = response.getBody().get("result").toString();
        if (result.equals("success")){
            redisService.set(phone,content.toString());
            new Thread(){
                @Override
                public void run() {
                    for (int i = 10; i > 0; i--) {
                        try {
                            Thread.sleep(7000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        System.out.println(i);
                        if (i==1){
                            redisService.remove(phone);
                        }

                    }
                }
            }.start();
        }

    }*/

    @ApiOperation(value = "注册")
    @PostMapping("/register")
    public Map<String, Object> resister(
            @ApiParam(name = "email", value = "邮箱", required = true)
            @RequestParam(value = "email", required = true)
                    String email,
            @ApiParam(name = "username", value = "姓名", required = true)
            @RequestParam(value = "username", required = true)
                    String username,
            @ApiParam(name = "password", value = "密码", required = true)
            @RequestParam(value = "password", required = true)
                    String password,
            @ApiParam(name = "phone", value = "手机号", required = true)
            @RequestParam(value = "phone", required = true)
                    String phone,
            @ApiParam(name = "wechatnm", value = "微信号", required = false)
            @RequestParam(value = "wechatnm", required = false)
                    String wechatnm,
            @ApiParam(name = "qqnm", value = "qq号", required = false)
            @RequestParam(value = "qqnm", required = false)
                    String qqnm
           /* @ApiParam(name = "smscode", value = "验证码", required = true)
            @RequestParam(value = "smscode", required = true)
                    String smscode*/
            ) {

        Map<String, Object> map = new HashMap<>();
        /*if(smscode==null||smscode.equals("")){
            map.put("code", "1111");
            map.put("msg", "验证码为空");
            return map;
        }

        String code = redisService.get(phone);
        System.out.println(code);
        if (code==null||code.equals("")){
            map.put("code", "1111");
            map.put("msg", "无效验证码");
            return map;
        }
*/
        //先查找用户表中此邮箱是否注册
        boolean findrgbyemail = customerService.findrgbyemail(email);
        if (findrgbyemail) {
            map.put("code", "1111");
            map.put("msg", "该邮箱已被注册");
            return map;
        }
        //passwordencode
        String encodepassword = getShaPasswordEncoder().encodePassword(password, "xe-alipay");
        //创建商户号
        //统计条数
        int findcount = customerService.findcount();
        System.out.println(findcount);
        merchidcon += findcount + 1;
        System.out.println(merchidcon);
        //createsecutity
        String encodesecurity = getShaPasswordEncoder().encodePassword(email + username, "xe-alipay");

        Customer customer = new Customer() {
            {
                setEmail(email);
                setUsername(username);
                setPassword(encodepassword);
                setPhone(phone);
                setState(1);
                setWecahtnm(wechatnm);
                setQqnm(qqnm);
                setMerchid(merchidcon);
                setSecret(encodesecurity);
                setBlance(BigDecimal.valueOf(0.00));
                setEaszadmin(1);
                setCreateTime(new Date());
            }
        };
        int insert = customerMapper.insert(customer);
        if (insert > 0) {
            map.put("code", "0000");
            map.put("msg", "success");
        }else{
            map.put("code","9999");
            map.put("msg","添加失败");
        }
        return map;
    }


    //@CheckSmsCode
    @CheckCaptcha
    @PostMapping("/login")
    @ApiOperation(
            value = "登入",
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
        return loginService.login(account, encodePassword, platform);
    }
    @CheckToken
    @PostMapping("/refresh")
    @ApiOperation(
            value = "刷新token",
            notes = "")
    public XResponse refresh(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,

            @ApiParam(name = AuthConstants.PLATFORM, value = "平台(IOS,ANDRIOD,WEBAPP)", required = true)
            @RequestHeader(value = AuthConstants.PLATFORM, required = true)
                    Platform platform
    ) {
          loginService.refresh(token, platform.name());
        return new XResponse();
    }
/*
    @CheckToken
    @PostMapping("/logout")
    @ApiOperation(
            value = "登出",
            notes = "")
    public XResponse logout(
            @ApiParam(name = "AUTH_TOKEN_HEADER", value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "PLATFORM", value = "平台", required = true)
            @RequestHeader(value = AuthConstants.PLATFORM, required = true)
                    Platform platform
    ){
        return loginService.logout(token,platform.name());
    }*/


}
