package com.xe.alipay.controller;

import com.alibaba.fastjson.JSON;
import com.xe.alipay.common.SnowFlake;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.CusRechargeMapper;
import com.xe.alipay.mapper.CuspaymentMapper;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.model.CusPayment;
import com.xe.alipay.model.Customer;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequestMapping("/rechage")
@Api(description = "商户充值接口api")
public class RechargeController {
    @Autowired
    TokenService tokenService;
    @Autowired
    CuspaymentMapper cuspaymentMapper;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    CusRechargeMapper cusRechargeMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Bean
    ShaPasswordEncoder getShaPasswordEncoder(){
        return new ShaPasswordEncoder(256);
    }

    @CheckToken
    @ApiOperation("商户余额充值api")
    @PostMapping("/payment")
    public ResponseEntity<String> rechage(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "aitype", value = "渠道类型", required = true)
            @RequestParam(value = "aitype", required = true)
                    int aitype,
            @ApiParam(name = "amount", value = "金额", required = true)
            @RequestParam(value = "amount", required = true)
                    int amount
    ) {
        System.out.println(token);
        //找到用户id
        Customer customer = tokenService.getCustomer(token);
        String uuid = customer.getUuid();
        String useruuid=uuid;
//        String findbymerchid = customerMapper.findbyuuid(useruuid);
        customer = customerMapper.findadminbyuuid(useruuid);

        System.out.println(uuid);
        //查询充值到账商户
//        CusPayment selectmerchine = cuspaymentMapper.selectmerchine();

        SnowFlake snowFlake = new SnowFlake(1L, 1L);
        String order = String.valueOf(snowFlake.nextId());

        //发起充值请求
        TreeMap<String,Object> treeMap=new TreeMap<String, Object>();
        //商品名称
        treeMap.put("goodsname","商户充值");
        //异步回调地址
        treeMap.put("notifyurl","www.baidu.com");
        //订单号
        treeMap.put("orderid",order);
        //客户号
        treeMap.put("orderuid",uuid);
        //金额
        treeMap.put("price",amount);
        //前台通知地址
        treeMap.put("returnurl","www.baidu.com");
        //通道类型
        treeMap.put("type",aitype);
        //商户号
        treeMap.put("uid",customer.getMerchid());
//        treeMap.put("uid",selectmerchine.getReMerchid());
        StringBuffer webuffer = new StringBuffer();
        treeMap.forEach((k, v) -> {
            webuffer.append(k + "=" + v + "&");
        });
        webuffer.deleteCharAt(webuffer.length() - 1);
        log.info("{}->{}", "校验商户请求时拼接参数", webuffer);
        String encodePassword = getShaPasswordEncoder().encodePassword(webuffer + customer.getSecret(), "");
//        String encodePassword = getShaPasswordEncoder().encodePassword(webuffer + selectmerchine.getReSercurity(), "");
        log.info(encodePassword);
        treeMap.put("sign",encodePassword);

        HttpHeaders headers = new HttpHeaders();
//  请勿轻易改变此提交方式，大部分的情况下，提交方式都是表单提交
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//  封装参数，千万不要替换为Map与HashMap，否则参数无法传递
        MultiValueMap<String, String> params= new LinkedMultiValueMap<String, String>();
//  也支持中文
        treeMap.forEach((k,v)->{
            params.add(k,v.toString());
        });

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(params, headers);
//  执行HTTP请求
        //地址
        String url="http://127.0.0.1:8082/pay/getway";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        System.out.println(response.getBody());
        Object parse = JSON.parse(response.getBody());
        Map responsemap =(Map)parse;
        System.out.println(responsemap.get("message"));
        if (responsemap.get("message").equals("Success")){
            Map date = (Map) responsemap.get("data");
            System.out.println(date.get("uid").toString());
            System.out.println(date.get("orderid").toString());
            //插入充值表
            int insertrecharge = cusRechargeMapper.insertrecharge(uuid, customer.getMerchid(), (BigDecimal) date.get("price"), date.get("orderid").toString(),Integer.parseInt(date.get("type").toString()),customer.getMerchid());
            /*if(insertrecharge>0){
                int  state=cusRechargeMapper.statenumber(treeMap.get("orderid").toString());
                if(state==0){
                    timerunnumber(treeMap.get("orderid").toString());
                }
            }*/
        }

        return response;
    }
/*    public  void  timerunnumber(String orderid){
        Runnable runnable = new Runnable() {
            public void run(){
                System.out.println("Hello !!");
                cusRechargeMapper.updatesta(orderid);
            }
        };
        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        // 第二个参数为首次执行的延时时间，第三个参数为定时执行的间隔时间
        service.scheduleAtFixedRate(runnable, 300, 300, TimeUnit.SECONDS);
    }*/

}
