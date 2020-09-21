package com.xe.alipay.controller;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.mapper.QrcodeMapper;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Page;
import com.xe.alipay.model.Qrcode;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.RecodeService;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(description = "二维码查询")
@RestController
@RequestMapping("/api/auth")
public class QrcodeController {
    @Autowired
    TokenService tokenService;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    RecodeService recodeService;
    @Autowired
    QrcodeMapper qrcodeMapper;

    @CheckToken
    @ApiOperation(value = "分页查询二维码收款码")
    @PostMapping("/queryqrcode")
    public XResponse querycount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "merchid", value = "商户号", required = false)
            @RequestParam(value = "merchid", required = false)
                    String merchid,
            @ApiParam(name = "pageNum", value = "起始页", required = true)
            @RequestParam(value = "pageNum", required = true)
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数", required = true)
            @RequestParam(value = "pageSize", required = true)
                    int pageSize
    ) {

        Customer customer = tokenService.getCustomer(token);
        String useruuid = customer.getUuid();
        System.out.println(merchid + "*******");
        Page page = recodeService.findqrcode(merchid, pageNum, pageSize);
        if (page != null) {
            return new XResponse() {{
                setMessage("成功");
                setCode("0000");
                setData(page);
            }};
        }
        return new XResponse() {{
            setCode("9999");
            setMessage("fila");
            setData(page);

        }};
    }

    /*
     * 清空所有二维码
     *
     **/
    @CheckToken
    @ApiOperation(value = "删除所有二维码")
    @PostMapping("/deleteqrcode")
    public XResponse deleteqrcode(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "money", value = "金额", required = true)
            @RequestParam(value = "money", required = true)
                    Double money,
            @ApiParam(name = "cusAccountname", value = "账户名称", required = true)
            @RequestParam(value = "cusAccountname", required = true)
                    String cusAccountname,
            @ApiParam(name = "accpaytype", value = "收款渠道", required = true)
            @RequestParam(value = "accpaytype", required = true)
                    int accpaytype
    ) {
        Customer customer = tokenService.getCustomer(token);
        String uuid = customer.getUuid();
        String merchid = customerMapper.findbyuuid(uuid);
        System.out.println(merchid + "**************8776");
        int a = qrcodeMapper.deleteqrcode(merchid, money, cusAccountname, accpaytype);
        if (a > 0) {
            return new XResponse() {{
                setMessage("成功");
                setCode("0000");
                setData(a);
            }};
        }
        return new XResponse() {{
            setData(a);
            setMessage("file");
            setCode("9999");
        }};
    }

    /*
     * 删除
     *
     **/
    @CheckToken
    @ApiOperation(value = "删除")
    @PostMapping("/deletemoney")
    public XResponse querycount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "acamount", value = "金额", required = true)
            @RequestParam(value = "acamount", required = true)
                    Double acamount,
            @ApiParam(name = "acaccname", value = "账户名称", required = true)
            @RequestParam(value = "acaccname", required = true)
                    String acaccname,
            @ApiParam(name = "acpaytype", value = "收款渠道", required = true)
            @RequestParam(value = "acpaytype", required = true)
                    int acpaytype
    ) {
        Customer customer = tokenService.getCustomer(token);
        String uuid = customer.getUuid();
        String merchid = customerMapper.findbyuuid(uuid);
        System.out.println(merchid + "**************8776");
        int a = qrcodeMapper.deletemoney(merchid, acamount, acaccname, acpaytype);
        if (a > 0) {
            return new XResponse() {{
                setMessage("成功");
                setCode("0000");
                setData(a);
            }};
        }
        return new XResponse() {{
            setData(a);
            setMessage("file");
            setCode("9999");
        }};
    }


    @ApiOperation(value = "查询所有二维码")
    @PostMapping("/query")
    public XResponse query(
            @ApiParam(name = "cus_merchid", value = "商户号", required = true)
            @RequestParam(value = "cus_merchid", required = true)
                    String cus_merchid,
            @ApiParam(name = "cusAccountname", value = "账户名称", required = false)
            @RequestParam(value = "cusAccountname", required = false)
                    String cusAccountname,
            @ApiParam(name = "money", value = "金额", required = false)
            @RequestParam(value = "money", required = false)
                    Double money,
            @ApiParam(name = "accpaytype", value = "收款渠道", required = false)
            @RequestParam(value = "accpaytype", required = false)
                    Integer accpaytype
    ) {

        List<Qrcode> list= recodeService.qrcodeselect(cus_merchid,cusAccountname,accpaytype,money);
      System.out.println(list+"**************");
      if(list!=null || list.size()>0){
          return new XResponse(){{
              setCode("0000");
              setMessage("Success");
              setData(list);
          }};
      }
      return new XResponse(){{
          setCode("9999");
          setMessage("fial");
          setData(list);
      }};
    }
}