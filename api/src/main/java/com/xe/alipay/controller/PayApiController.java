package com.xe.alipay.controller;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.mapper.*;
import com.xe.alipay.model.*;
import com.xe.alipay.model.Payment.Payment;
import com.xe.alipay.service.CustomerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * @author: lironghong
 * @date: 2018/11/29 11:04
 * @description: 对外支付接口api
 */
@Api(description = "外放支付接口api")
@RestController
@RequestMapping("/pay")
@Slf4j
public class PayApiController {

    @Autowired
    private Validator validator;
    @Autowired
    CustomerService customerService;
    @Autowired
    AisleMapper aisleMapper;
    @Autowired
    AislerateMapper aislerateMapper;
    @Autowired
    CusGetaccountMapper cusGetaccountMapper;
    @Autowired
    QrcodeMapper qrcodeMapper;
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CuspaymentMapper cuspaymentMapper;

    @Bean
    ShaPasswordEncoder getShaPasswordEncoder() {
        return new ShaPasswordEncoder(256);
    }

    @ApiOperation("发起支付")
    @PostMapping("/getway")
    public XResponse getway(HttpServletRequest request, HttpServletResponse response) {

        Map<String, String[]> parameterMap = new HashMap<String, String[]>(request.getParameterMap());
        parameterMap.remove("sign");
        TreeMap<String, Object> hashmap = new TreeMap<String, Object>();

        Payment payment = new Payment() {{
            //商户号
            setUid(request.getParameter("uid"));
            //金额
            setPrice(Integer.valueOf(request.getParameter("price")));
            //通道类型
            setType(Integer.valueOf(request.getParameter("type")));
            //异步回调地址
            setNotifyurl(request.getParameter("notifyurl"));
            //跳转地址
            setReturnurl(request.getParameter("returnurl"));
            //订单号
            setOrderid(request.getParameter("orderid"));
            //客户号
            setOrderuid(request.getParameter("orderuid"));
            //商品名称
            setGoodsname(request.getParameter("goodsname"));
            //签名
            setSign(request.getParameter("sign"));
        }};
        BigDecimal bigDecimal = BigDecimal.valueOf((double) payment.getPrice());
        double submitemoney = bigDecimal.doubleValue();

        Set<ConstraintViolation<Payment>> validate = validator.validate(payment);

        int size = validate.size();
        log.info("{}->{}", "支付参数缺失:", size);
        for (ConstraintViolation<Payment> model : validate) {
            log.info("{}->{}", "支付请求参数", model.getMessage());
            if (size > 0) {
                return new XResponse<String>() {{
                    setCode("1111");
                    setMessage("Faild");
                    setData(model.getMessage());
                }};
            }
        }

        Customer findbymcerchid = customerService.findbymcerchid(payment.getUid());

        //判断这个商户是否存在
        if (findbymcerchid == null || findbymcerchid.equals("")) {
            return new XResponse<String>() {{
                setCode("2222");
                setMessage("Faild");
                setData("商户号不存在");
            }};
        }
        //判断渠道是否存在
        boolean type = aisleMapper.existswithtype(request.getParameter("type"));
        log.info("{}-{}", "渠道", type);
        if (!type) {
            return new XResponse<String>() {{
                setCode("3333");
                setMessage("Faild");
                setData("支付渠道不存在");
            }};
        }


        StringBuffer buffer = new StringBuffer();
        parameterMap.forEach((k, v) -> {
            buffer.append(k + "=" + v[0].toString() + "&");
            hashmap.put(k, v[0].toString());

        });
        buffer.deleteCharAt(buffer.length() - 1);
        log.info("{}->{}", "商户请求参数", buffer);

        log.info(request.getParameter("sign"));
        //校验时拼接请求参数
        StringBuffer webuffer = new StringBuffer();
        hashmap.forEach((k, v) -> {
            webuffer.append(k + "=" + v + "&");
        });
        webuffer.deleteCharAt(webuffer.length() - 1);
        log.info("{}->{}", "校验商户请求时拼接参数", webuffer);
        String encodePassword = getShaPasswordEncoder().encodePassword(webuffer + findbymcerchid.getSecret(), "");
        log.info(encodePassword);
        if (request.getParameter("sign") == null || request.getParameter("sign") == "") {
            return new XResponse<String>() {{
                setCode("4444");
                setMessage("Faild");
                setData("签名为空");
            }};
        }
        if (request.getParameter("sign").equals(encodePassword) || request.getParameter("sign") == encodePassword) {
            log.info("{}->{}", "验签", true);
        } else {
            log.info("{}->{}", "验签", false);
            return new XResponse<String>() {{
                setCode("4444");
                setMessage("Faild");
                setData("签名错误");
            }};
        }
        //验证签名成功后
        //先判断订单号是否重复
        boolean existswithorderid = orderMapper.existswithorderid(payment.getUid(), payment.getOrderid());
        log.info("{}->{}","订单号是否重复",existswithorderid);
        if (existswithorderid){
            return new XResponse<String>(){{
                setCode("8888");
                setMessage("Filed");
                setData("订单号重复");
            }};
        }

        //先判断此商户是否为收款商户
        boolean isczsk = cuspaymentMapper.isczsk(payment.getUid());
        if (!isczsk){
            //根据通道类型找到费率
            float rate = 0f;
            //设置位数
            int scale = 2;
            //表示四舍五入，可以选择其他舍值方式，例如去尾，等等.
            int roundingMode = 4;
            List<Aislerate> findrate = aislerateMapper.findrate(payment.getType());
            for (Aislerate ai : findrate
            ) {
                rate = ai.getRate();
            }

            //判断当前余额是否够扣除当前交易金额的手续费
            float ratemoney = payment.getPrice() * rate;
            BigDecimal bd = new BigDecimal((double) ratemoney);
            bd = bd.setScale(scale, roundingMode);
            //手续费
            ratemoney = bd.floatValue();
            boolean r = findbymcerchid.getBlance().floatValue() > ratemoney;
            if (!r) {
                return new XResponse<String>() {
                    {
                        setCode("5555");
                        setMessage("Faid");
                        setData("账户余额不足");
                    }
                };
            }
        }

        //根据商户号和收款类型随机找到可用收款账户(多个收款账户)
        List<CusGetaccount> finduseaccount = cusGetaccountMapper.finduseaccount(payment.getUid(), payment.getType());
        if (finduseaccount.size()==0) {
            return new XResponse<String>() {
                {
                    setCode("6666");
                    setMessage("Filed");
                    setData("没有可用收款账户");
                }
            };
        }
        Random random = new Random();
        int n = random.nextInt(finduseaccount.size());
        log.info("{}->{}", "收款商户", finduseaccount.get(n));

        //根据收款账户找到对应还未被占用的支付二维码以及为缺失的二维码
        System.out.println(n);
        String accname=finduseaccount.get(n).getAccname();
        System.out.println(accname);
        List<Qrcode> selectnousecode = qrcodeMapper.selectnousecode(accname, submitemoney, payment.getType(),payment.getUid());
        System.out.println(selectnousecode);
        if (selectnousecode.size()==0){
            return new XResponse<String>(){
                {
                    setCode("7777");
                    setMessage("Filed");
                    setData("没有可用二维码");
                }
            };
        }
        System.out.println(selectnousecode.size());
        int s = random.nextInt(selectnousecode.size());
        System.out.println(s+"哈哈哈");
        System.out.println(selectnousecode.get(s).getAliqrurl());
        log.info("{}->{}", "收款商户二维码", selectnousecode.get(s));

        //根据返回的二维码id更改此收款码状态
        //qrcodeMapper.updateusestate(selectnousecode.get(s).getUuid());

        //新加功能判断此商户,收款类型,金额是否有支付中的如果有则返回系统繁忙请稍后再试
        boolean selecthaszfz = orderMapper.selecthaszfz(payment.getUid(), payment.getPrice(), payment.getType());
        log.info("{}->{}","此商户,收款类型,金额是否有支付中",selecthaszfz);
        if (selecthaszfz){
            return new XResponse<String>(){
                {
                    setCode("7771");
                    setMessage("Filed");
                    setData("系统繁忙请稍后再试");
                }
            };
        }

        /* 插入订单表*/

        //订单号单号
        String orderid=payment.getOrderid();
        //用户商户号
        String merchid=findbymcerchid.getMerchid();
        //用户id
       String uuid=findbymcerchid.getUuid();
        //二维码id
        String codeuuid=selectnousecode.get(s).getUuid();
        //二维码备注
        String node = selectnousecode.get(s).getNode();
        //实价
        Double sjmoney = selectnousecode.get(s).getMoney();
        //二维码类型
        int accpaytypes=selectnousecode.get(s).getAccpaytype();
        //客户号
        String uid = payment.getOrderuid();
        //异步通知地址

        //前台通知地址
//        if (!isczsk){
           orderMapper.insteroder(orderid,merchid,uuid,node,submitemoney,sjmoney,codeuuid,accpaytypes,uid,payment.getNotifyurl(),payment.getReturnurl());
//        }

        Map<String,Object> map=new HashMap<String,Object>();
        map.put("url",selectnousecode.get(s).getAliqrurl());
        map.put("uid",payment.getUid());
        map.put("price",sjmoney);
        map.put("type",request.getParameter("type"));
        map.put("notifyurl",request.getParameter("notifyurl"));
        map.put("returnurl",request.getParameter("returnurl"));
        map.put("orderid",request.getParameter("orderid"));
        map.put("goodsname",request.getParameter("goodsname"));

        return new XResponse<Map<String,Object>>(){
            {
                setCode("0000");
                setMessage("Success");
                setData(map);
            }
        };
    }
    @PostMapping("/quireorder")
    public XResponse quireorder(HttpServletRequest request, HttpServletResponse response){

        Map<String, String[]> parameterMap = new HashMap<String, String[]>(request.getParameterMap());
        parameterMap.remove("sign");

        TreeMap<String, Object> hashmap = new TreeMap<String, Object>();

        Quireorder quireorder = new Quireorder() {{
            setUid(request.getParameter("uid"));
            setOrderid(request.getParameter("orderid"));
            //通道类型
            setType(Integer.valueOf(request.getParameter("type")));
            setSign(request.getParameter("sign"));
        }};

        Set<ConstraintViolation<Quireorder>> validate = validator.validate(quireorder);

        int size = validate.size();
        log.info("{}->{}", "支付参数缺失:", size);
        for (ConstraintViolation<Quireorder> model : validate) {
            log.info("{}->{}", "支付请求参数", model.getMessage());
            if (size > 0) {
                return new XResponse<String>() {{
                    setCode("1111");
                    setMessage("Faild");
                    setData(model.getMessage());
                }};
            }
        }
        Customer findbymcerchid = customerService.findbymcerchid(quireorder.getUid());

        //判断这个商户是否存在
        if (findbymcerchid == null || findbymcerchid.equals("")) {
            return new XResponse<String>() {{
                setCode("2222");
                setMessage("Faild");
                setData("商户号不存在");
            }};
        }
        //判断渠道是否存在
        boolean type = aisleMapper.existswithtype(request.getParameter("type"));
        log.info("{}-{}", "渠道", type);
        if (!type) {
            return new XResponse<String>() {{
                setCode("3333");
                setMessage("Faild");
                setData("支付渠道不存在");
            }};
        }


        StringBuffer buffer = new StringBuffer();
        parameterMap.forEach((k, v) -> {
            buffer.append(k + "=" + v[0].toString() + "&");
            hashmap.put(k, v[0].toString());

        });
        buffer.deleteCharAt(buffer.length() - 1);
        log.info("{}->{}", "商户请求参数", buffer);

        log.info(request.getParameter("sign"));
        //校验时拼接请求参数
        StringBuffer webuffer = new StringBuffer();
        hashmap.forEach((k, v) -> {
            webuffer.append(k + "=" + v + "&");
        });
        webuffer.deleteCharAt(webuffer.length() - 1);
        log.info("{}->{}", "校验商户请求时拼接参数", webuffer);
        String encodePassword = getShaPasswordEncoder().encodePassword(webuffer + findbymcerchid.getSecret(), "");
        log.info(encodePassword);
        if (request.getParameter("sign") == null || request.getParameter("sign") == "") {
            return new XResponse<String>() {{
                setCode("4444");
                setMessage("Faild");
                setData("签名为空");
            }};
        }
        if (request.getParameter("sign").equals(encodePassword) || request.getParameter("sign") == encodePassword) {
            log.info("{}->{}", "验签", true);
            //查询订单
            Order merchselectorder = orderMapper.merchselectorder(quireorder.getUid(), quireorder.getOrderid(), quireorder.getType());
            return new XResponse<Order>() {{
                setCode("0000");
                setMessage("Success");
                setData(merchselectorder);
            }};

        } else {
            log.info("{}->{}", "验签", false);
            return new XResponse<String>() {{
                setCode("4444");
                setMessage("Faild");
                setData("签名错误");
            }};
        }
    }
}
