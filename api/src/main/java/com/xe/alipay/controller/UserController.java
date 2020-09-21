package com.xe.alipay.controller;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.mapper.OrderMapper;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Page;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.CustomerService;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(description = "个人基本信息")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    TokenService tokenService;
    @Autowired
    CustomerService customerService;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    OrderMapper orderMapper;
    @CheckToken
    @ApiOperation(value = "账户基本信息")
    @PostMapping("/userandmin")
    public XResponse userandmin(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token){

        Customer customer=tokenService.getCustomer(token);
        String   useruuid=customer.getUuid();
        System.out.println(useruuid+"*******");

        Customer cus=customerService.adminfindbyuuid(useruuid);
        if(cus==null){
            return new XResponse(){{
                setCode("9999");
                setMessage("fails");
                setData(cus);
            }};
        }
        return new XResponse(){{
            setCode("0000");
            setMessage("Success");
            setData(cus);
        }};
    }

    @GetMapping("/orderstatistics")
    @ApiOperation("/订单统计")
    @CheckToken
    public XResponse<Map> statistics(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token
    ){
        Map<String,Object> map=new HashMap<String, Object>();
        Customer customer=tokenService.getCustomer(token);
        String  useruuid=customer.getUuid();
        System.out.println(useruuid);
        String merchid = customerMapper.findbyuuid(useruuid);
        System.out.println(merchid);
        Map<String, Object> selecttoday = orderMapper.selecttoday(merchid);
        map.put("today",selecttoday);
        Map<String, Object> selectyesterday = orderMapper.selectyesterday(merchid);
        map.put("yesterday",selectyesterday);
        Map<String, Object> selectsevendays = orderMapper.selectsevendays(merchid);
        map.put("sevendays",selectsevendays);
        Map<String, Object> selectthirtydays = orderMapper.selectthirtydays(merchid);
        map.put("thirtydays",selectsevendays);

        return new XResponse<Map>(){{
            setCode("0000");
            setData(map);
        }};
    }

    @CheckToken
    @ApiOperation(value = "分页查询所有用户")
    @PostMapping("/adminuser")
    public XResponse adminuser(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name= "pageNum" ,value = "起始页",required = true)
            @RequestParam(value ="pageNum" , required = true)
            int  pageNum,
            @ApiParam(name= "pageSize" ,value = "每页显示的条数",required = true)
            @RequestParam(value ="pageSize" , required = true)
                    int  pageSize
    ){

        Customer customer=tokenService.getCustomer(token);

         Page page=customerService.queryall(pageNum,pageSize);
        if(page==null){
            return new XResponse(){{
                setCode("9999");
                setMessage("fails");
                setData(page);
            }};
        }
        return new XResponse(){{
            setCode("0000");
            setMessage("Success");
            setData(page);
        }};
    }
}
