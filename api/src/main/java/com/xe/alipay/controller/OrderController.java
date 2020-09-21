package com.xe.alipay.controller;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.*;
import com.xe.alipay.model.*;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.CusrechargeService;
import com.xe.alipay.service.OrderService;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(description = "订单查询")
@RestController
@RequestMapping("/api/auth")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    TokenService tokenService;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CusRechargeMapper cusRechargeMapper;
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    AislerateMapper aislerateMapper;
    @Autowired
    CusrechargeService usrechargeService;
    @Autowired
    BalanceDescriptionMapper balanceDescriptionMapper;
    @Autowired
    CuspaymentMapper cuspaymentMapper;

    @CheckToken
    @ApiOperation(value = "后台管理订单查询")
    @PostMapping("/queryOrder")
    public Map<String, Object> queryOrder(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "merchid", value = "商户号", required = false)
            @RequestParam(value = "merchid", required = false)
                    String merchid,
            @ApiParam(name = "qrtype", value = "收款渠道", required = false)
            @RequestParam(value = "qrtype", required = false)
                    Integer qrtype,
            @ApiParam(name = "state", value = "收款渠道", required = false)
            @RequestParam(value = "state", required = false)
                    Integer state,
            @ApiParam(name = "pageNum", value = "当前页", required = true)
            @RequestParam(value = "pageNum", required = true)
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数", required = true)
            @RequestParam(value = "pageSize", required = true)
                    int pageSize
    ) {
        Map<String, Object> map = new HashMap();
        Customer customer = tokenService.getCustomer(token);
        System.out.println(customer);
        String useruuid = customer.getUuid();
        customer = customerMapper.findadminbyuuid(useruuid);
        int easzadmin = customer.getEaszadmin();
        if(easzadmin == 1) {
        	merchid = customer.getMerchid();
        }
        System.out.println(merchid + "*******");

        Page<Order> page = orderService.fenyeorder(merchid, qrtype, state, pageNum, pageSize);
        if (page != null || "".equals(page)) {
            map.put("code", "0000");
            map.put("msg", "success");
            map.put("page", page);
        } else {
            map.put("code", "9999");
            map.put("msg", "失败");
        }
        return map;
    }

    @CheckToken
    @ApiOperation(value = "搜索订单")
    @GetMapping("/selectOrder")
    public Map<String, Object> selectOrder(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "ordernumber", value = "订单号", required = false)
            @RequestParam(value = "ordernumber", required = false)
                    String ordernumber,
            @ApiParam(name = "cus_merchid", value = "商户号", required = false)
            @RequestParam(value = "cus_merchid", required = false)
                    String cus_merchid,
            @ApiParam(name = "djmoney", value = "金额", required = false)
            @RequestParam(value = "djmoney", required = false)
                    Double djmoney,
            @ApiParam(name = "qrtype", value = "收款渠道", required = true)
            @RequestParam(value = "qrtype", required = true)
                    int qrtype,
            @ApiParam(name = "pageNum", value = "起始页", required = true)
            @RequestParam(value = "pageNum", required = true)
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数", required = true)
            @RequestParam(value = "pageSize", required = true)
                    int pageSize,
            @ApiParam(name = "begintime", value = "开始时间", required = false)
            @RequestParam(value = "begintime", required = false)
                    String begintime,
            @ApiParam(name = "endtime", value = "结束时间", required = false)
            @RequestParam(value = "endtime", required = false)
                    String endtime,
            @ApiParam(name = "state", value = "状态", required = false)
            @RequestParam(value = "state", required = false)
                    Integer state

    )

    {

        Map<String, Object> map = new HashMap<>();
        Customer Customer = tokenService.getCustomer(token);
        String useruuid = Customer.getUuid();
        System.out.println(useruuid + "用户id");
        String merchid = customerMapper.findbyuuid(useruuid);
        String uid = merchid;
        System.out.println(uid + "*******");
        boolean isczsk = cuspaymentMapper.isczsk(uid);
        System.out.println(isczsk + "*************************8000");
        if (!isczsk) {//true  /false
            Page<Order> page = orderService.queryorder(uid, ordernumber, cus_merchid, djmoney, qrtype, pageNum, pageSize,begintime,endtime,state);
            if (page != null || !page.equals("")) {
                map.put("code", "0000");
                map.put("msg", "success");
                map.put("page", page);
            } else {
                map.put("code", "9999");
                map.put("msg", "查询错误");
            }
        } else {
            Page<CusRecharge> page = usrechargeService.payorder(cus_merchid, qrtype, pageNum, pageSize);
            //    List page=cusRechargeMapper.fenyeorder(uid,ordernumber,djmoney,qrtype,pageNum,pageSize);


            if (page != null || !page.equals("")) {
                map.put("code", "0000");
                map.put("msg", "success");
                map.put("page", page);
            } else {
                map.put("code", "9999");
                map.put("msg", "查询错误");
            }
        }


        return map;
    }
    
    @CheckToken
    @ApiOperation(value = "充值订单")
    @GetMapping("/selectRechargeOrder")
    public Map<String, Object> selectRechargeOrder(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "cus_merchid", value = "商户号", required = false)
            @RequestParam(value = "cus_merchid", required = false)
                    String cus_merchid,
            @ApiParam(name = "qrtype", value = "收款渠道", required = true)
            @RequestParam(value = "qrtype", required = true)
                    int qrtype,
            @ApiParam(name = "pageNum", value = "起始页", required = true)
            @RequestParam(value = "pageNum", required = true)
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数", required = true)
            @RequestParam(value = "pageSize", required = true)
                    int pageSize
    )
    {

        Map<String, Object> map = new HashMap<>();
        Customer customer = tokenService.getCustomer(token);
        String useruuid = customer.getUuid();
        System.out.println(useruuid + "用户id");
        customer = customerMapper.findadminbyuuid(useruuid);
        String uid = customer.getMerchid();
        System.out.println(uid + "*******");
        boolean isadmin = customer.getEaszadmin() == 0;
        if(!isadmin) {
        	cus_merchid = customer.getMerchid();
        }
        Page<CusRecharge> page = usrechargeService.payorder(cus_merchid, qrtype, pageNum, pageSize);
        //    List page=cusRechargeMapper.fenyeorder(uid,ordernumber,djmoney,qrtype,pageNum,pageSize);

        if (page != null || !page.equals("")) {
            map.put("code", "0000");
            map.put("msg", "success");
            map.put("page", page);
        } else {
            map.put("code", "9999");
            map.put("msg", "查询错误");
        }
        return map;
    }
    // 根据订单号和金额改下状态

    @CheckToken
    @ApiOperation(value = "修改订单状态")
    @GetMapping("/UpdateOrderstats")
    public XResponse selectOrder(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "ordernumber", value = "订单号", required = true)
            @RequestParam(value = "ordernumber", required = true)
                    String ordernumber,
            @ApiParam(name = "state", value = "状态", required = false)
            @RequestParam(value = "state", required = false)
                    int state
    ) {
        Customer Customer = tokenService.getCustomer(token);
        String useruuid = Customer.getUuid();
        String merchid = customerMapper.findbyuuid(useruuid);
        System.out.println(merchid);
        //判断这笔订单是不是充值订单
//        boolean selectddcz = cusRechargeMapper.selectddcz(ordernumber);
        CusRecharge cusRecharge= cusRechargeMapper.selectmoney(ordernumber);
        boolean selectddcz = cusRecharge != null;
        System.out.println("是否是充值订单" + selectddcz);
        //如果是充值收款账户和修改收款状态为成功
        if (selectddcz && state == 2) {
        	if(cusRecharge.getState() == 2) {
	    		return new XResponse() {{
	                setMessage("Success");
	                setCode("0000");
	            }};
        	}else {
        		 //找到这笔订单充值信息
                CusRecharge selectmoney = cusRechargeMapper.selectmoney(ordernumber);
                BigDecimal money = selectmoney.getMoney();
                String uid = selectmoney.getCusMerchid();
                //找到余额
                Customer findbymcerchid1 = customerMapper.findbymcerchid(uid);
                BigDecimal blance = findbymcerchid1.getBlance();
                System.out.println(blance);

                float czje = money.floatValue();
                float yue = blance.floatValue() + czje;
                //更新余额
                customerMapper.kcrate(yue, uid);
                BalanceDescription balanceDescription = new BalanceDescription() {{
                    setCause(0);
                    setChangemoney(money);
                    setMerchid(selectmoney.getCusMerchid());
                    setYue(BigDecimal.valueOf(yue));
                    setCreatetime(new Date());
                }};
                int insert = balanceDescriptionMapper.insert(balanceDescription);
                if (insert > 0) {
                    int re = cusRechargeMapper.updatestateorder(selectmoney.getCusMerchid(), ordernumber, state);
                    if (re > 0) {
                        return new XResponse() {{
                            setMessage("Success");
                            setCode("0000");
                        }};
                    }
                }
        	}
        } else if (selectddcz && state == 0) {
            //找到这笔订单充值信息
            CusRecharge selectmoney = cusRechargeMapper.selectmoney(ordernumber);
            int re = cusRechargeMapper.updatestateorder(selectmoney.getCusMerchid(), ordernumber, state);
            if (re > 0) {
                return new XResponse() {{
                    setMessage("Success");
                    setCode("0000");
                }};
            }
        } else if (!selectddcz && state == 2) {

//            Order selectxiangxiorder = orderMapper.selectxiangxiorder(merchid, ordernumber);
            Order selectxiangxiorder = orderMapper.findOrderByOrderNo(ordernumber);
            String uid = selectxiangxiorder.getCusMerchid();
            //找到余额
            Customer findbymcerchid1 = customerMapper.findbymcerchid(uid);
            BigDecimal blance = findbymcerchid1.getBlance();
            //订单定价
            BigDecimal djmoney = selectxiangxiorder.getDjmoney();
            //费率
            int type = selectxiangxiorder.getQrtype();
            List<Aislerate> findrate = aislerateMapper.findrate(type);
            float rate = findrate.get(0).getRate();
            //手续费
            float v = djmoney.floatValue();
            float kcrate = v *= rate;
            float yue = blance.floatValue() - kcrate;
            //更新余额
            int kcrate1 = customerMapper.kcrate(yue, uid);
            BalanceDescription balanceDescription = new BalanceDescription() {{
                setCause(1);
                setChangemoney(BigDecimal.valueOf(kcrate));
                setMerchid(selectxiangxiorder.getCusMerchid());
                setYue(BigDecimal.valueOf(yue));
                setCreatetime(new Date());
            }};
            int insert = balanceDescriptionMapper.insert(balanceDescription);
            //修改发送异步次数为0重新发送
//            orderMapper.cleannotifycont(merchid,ordernumber);
            if (insert > 0) {

                int a = orderService.updatestateorder(selectxiangxiorder.getCusMerchid(), ordernumber, state);
                if (a > 0) {
                    return new XResponse() {{
                        setMessage("Success");
                        setCode("0000");
                    }};
                }
            }

        } else if (!selectddcz && state == 0) {

            int a = orderService.updatestateorder(merchid, ordernumber, state);
            if (a > 0) {
                return new XResponse() {{
                    setMessage("Success");
                    setCode("0000");
                }};
            }
        }


        return new XResponse();
    }

    @GetMapping("/balancedescription")
    @CheckToken
    @ApiOperation(value = "余额明细查询")
    public List<Blancedescrtiptionresponse> balancedescription(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token
    ) {

        Customer Customer = tokenService.getCustomer(token);
        String useruuid = Customer.getUuid();
        String merchid = customerMapper.findbyuuid(useruuid);
        List<Blancedescrtiptionresponse> selectdescription = balanceDescriptionMapper.selectdescription(merchid);

        return selectdescription;
    }


    @GetMapping("/moneybalancedescription")
    @CheckToken
    @ApiOperation(value = "管理余额明细查询")
    public List<Blancedescrtiptionresponse> moneybalancedescription(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "merchid", value = "商户号", required = true)
            @RequestParam(value = "merchid", required = true)
                    String merchid

    ) {

        Customer Customer = tokenService.getCustomer(token);

        List<Blancedescrtiptionresponse> selectdescription = balanceDescriptionMapper.selectdescription(merchid);

        return selectdescription;
    }
}
