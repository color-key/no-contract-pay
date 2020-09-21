package com.xe.alipay.controller;

import com.sun.jdi.PathSearchingVirtualMachine;
import com.sun.org.apache.regexp.internal.RE;
import com.xe.alipay.common.XResponse;
import com.xe.alipay.mapper.*;
import com.xe.alipay.model.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.ibatis.annotations.Update;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import sun.security.krb5.internal.Krb5;

import javax.print.attribute.standard.Fidelity;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @version:1.0.0
 * @author: lironghong
 * @date: 2018/12/12 16:22
 * @description:
 */
@RestController
@RequestMapping("/apk")
@Slf4j
public class ApkController {
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CusRechargeMapper cusRechargeMapper;
    @Autowired
    CuspaymentMapper cuspaymentMapper;
    @Autowired
    AislerateMapper aislerateMapper;
    @Autowired
    BalanceDescriptionMapper balanceDescriptionMapper;

    @Bean
    ShaPasswordEncoder getShaPasswordEncoder() {
        return new ShaPasswordEncoder(256);
    }

    @GetMapping("/login")
    public XResponse<String> login(@RequestParam("username") String username, @RequestParam("pas") String pas) {
        //passwordencode
        String encodepassword = getShaPasswordEncoder().encodePassword(pas, "xe-alipay");

        String merchid = customerMapper.findandroidmerchid(username, encodepassword);
        if (merchid == null || "".equals(merchid)) {
            return new XResponse<String>() {{
                setCode("1111");
                setMessage("Filed");
                setData("账号密码错误");
            }};
        }
        return new XResponse<String>() {{
            setCode("0000");
            setMessage("Sucess");
            setData(merchid);
        }};
    }

    @GetMapping("/notifyurl")
    public void notifyurl(
            @RequestParam(value = "payType", required = true)
                    int payType,
            @RequestParam(value = "money", required = true)
                    String money,
            @RequestParam(value = "username", required = true)
                    String username,
            @RequestParam(value = "dianYuan", required = true)
                    boolean dianYuan,
            @RequestParam(value = "merchid", required = true)
                    String merchid,
            HttpServletRequest request,
            HttpServletResponse response) {
        System.out.println(payType);
        System.out.println(money);
        System.out.println(username);
        System.out.println(dianYuan);
        System.out.println(username);
        System.out.println(dianYuan);
        System.out.println(merchid);

        int kcrate1 = 0;
        new Thread() {
            @Override
            public void run() {
                super.run();
                //订单匹配
                List<Order> selectorder = orderMapper.selectorder(payType, Double.parseDouble(money), merchid);
                System.out.println(selectorder);
                if (selectorder.size()!=0) {
                    String uid = merchid;
                    String uuid = selectorder.get(0).getUuid();
                    String cusMerchid = selectorder.get(0).getCusMerchid();
                    //更改状态
                    int updateorderstate = orderMapper.updateorderstate(uuid);
                    if (updateorderstate > 0) {
                        //先判断此商户是不是充值收款账户
                        //先判断此商户是否为收款商户
                        boolean isczsk = cuspaymentMapper.isczsk(uid);
                        if (!isczsk) {
                            //扣手续费
                            //订单定价
                            BigDecimal djmoney = selectorder.get(0).getDjmoney();
                            //费率
                            int type = payType;
                            List<Aislerate> findrate = aislerateMapper.findrate(type);
                            float rate = findrate.get(0).getRate();
                            //手续费
                            float v = djmoney.floatValue();
                            float kcrate = v *= rate;
                            Customer findbymcerchid = customerMapper.findbymcerchid(uid);
                            BigDecimal blance = findbymcerchid.getBlance();
                            float flyue = blance.floatValue();
                            float yue= flyue- kcrate;
                            //更新余额
                            int kcrate1 = customerMapper.kcrate(yue, uid);
                            if (kcrate1>0){
                                BalanceDescription balanceDescription = new BalanceDescription() {{
                                    setCause(1);
                                    setChangemoney(BigDecimal.valueOf(kcrate));
                                    setMerchid(cusMerchid);
                                    setYue(BigDecimal.valueOf(yue));
                                }};
                                //插入余额明细表
                                balanceDescriptionMapper.insert(balanceDescription);
                            }

                        }

                    }
                }

                //判断是否是充值
                List<CusRecharge> selectcz = cusRechargeMapper.selectcz(merchid, money);
                System.out.println(merchid+"商户号");
                System.out.println(money+"金额");
                System.out.println(selectcz);
                if (selectcz.size() !=0) {
                    System.out.println("haha");
                    String uuid = selectcz.get(0).getUuid();
                    String cusMerchid = selectcz.get(0).getCusMerchid();
                    System.out.println(uuid);
                    //更改状态
                    int upstate = cusRechargeMapper.upstate(uuid);
                    System.out.println(upstate);
                    if (upstate > 0) {
                        String uid=cusMerchid;
                        System.out.println("更新完毕");
                        float money1 = Float.parseFloat(money);
                        Customer findbymcerchid = customerMapper.findbymcerchid(uid);
                        BigDecimal blance = findbymcerchid.getBlance();
                        float flyue = blance.floatValue();
                        float yue= flyue+ money1;

                        //更新余额
                        int kcrate = customerMapper.kcrate(yue, uid);
                        System.out.println(kcrate);
                        if (kcrate>0){
                            BalanceDescription balanceDescription = new BalanceDescription() {{
                                setCause(0);
                                setChangemoney(BigDecimal.valueOf(money1));
                                setMerchid(cusMerchid);
                                setYue(BigDecimal.valueOf(yue));
                            }};
                            //插入余额明细表
                            balanceDescriptionMapper.insert(balanceDescription);
                        }

                    }
                }
            }
        }.start();

    }

    //订单查询跳转
    @GetMapping("/selectstate")
    @ApiOperation("查询订单状态")
    public XResponse<String> redurictorder(@ApiParam(name = "uid", value = "商户号", required = true)
                                           @RequestParam("uid")
                                                   String uid,
                                           @ApiParam(name = "orderid", value = "订单号", required = true)
                                           @RequestParam("orderid")
                                           String orderid,
                                           @ApiParam(name = "money", value = "金额", required = true)
                                               @RequestParam("money")
                                           String money) {
        String selectstate = orderMapper.selectstate(uid, orderid, money);
        System.out.println(selectstate);
        return new XResponse<String>() {{
            setCode("0000");
            setMessage("Success");
            setData(selectstate);
        }};
    }

}
