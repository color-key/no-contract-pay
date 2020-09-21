package com.xe.alipay.controller;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.AisleMapper;
import com.xe.alipay.mapper.AislerateMapper;
import com.xe.alipay.model.Aisle;
import com.xe.alipay.model.Aislerate;
import com.xe.alipay.model.Customer;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* author: fengbiao
* date: 2018/11/23 18:16
* descripton:添加渠道
*/

@RestController
@RequestMapping("/api/auth")
@Api(description = "通道")
public class ChannelController {
    @Autowired
    AisleMapper aisleMapper;
    @Autowired
    AislerateMapper aislerateMapper;
    @Autowired
    TokenService tokenService;

    @CheckToken
    @ApiOperation(value = "添加通道")
    @PostMapping("/channeladd")
    public XResponse channeladd(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "aitype",value = "渠道类型", required = true)
            @RequestParam(value = "aitype", required = true)
                    int aitype,
            @ApiParam(name = "asname", value = "渠道名称", required = true)
            @RequestParam(value = "asname", required = true)
                    String asname){
            Customer customer = tokenService.getCustomer(token);
        String  useruuid=customer.getUuid();

        Aisle  ais=aisleMapper.find(aitype);
        System.out.println(ais+"00000000000");
      if(ais!=null){
          return   new XResponse(){{
             setCode("通道已存在");
             setMessage("9999");
             setData(ais);
          }};
      }else{
          Aisle aisle=new  Aisle(){{
              setAitype(aitype);
              setAsname(asname);
              setCreatetime(new Date());
          }};
         aisleMapper.insert(aisle);
      }
      return  new XResponse(){{
         setCode("0000");
          setMessage("Success");
          setData(ais);
      }};
    }
    @CheckToken
    @ApiOperation(value = "删除通道")
    @PostMapping("/channeldelete")
    public Map<String, Object> channeldelete(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "aitype",value = "渠道类型", required = true)
            @RequestParam(value = "aitype", required = true)
                    int aitype){
        Customer customer=tokenService.getCustomer(token);
        String  uuid=customer.getUuid();

        Map<String,Object> map =new HashMap<>();
        int a=aisleMapper.deleteChannel(aitype);
        if(a>0){
            map.put("code", "0000");
            map.put("msg","删除成功");
        }else{
            map.put("code","9999");
            map.put("msg","删除失败");
        }
        return map;
    }
    @CheckToken
    @ApiOperation(value = "查詢通道")
    @PostMapping("/queryC")
    public Map<String, Object> queryC(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "aitype",value = "渠道类型", required = false)
            @RequestParam(value = "aitype", required = false)
            Integer aitype
           ){
               Customer customer=tokenService.getCustomer(token);
        Map<String,Object> map =new HashMap<>();
        List<Aisle> list=aisleMapper.hqueryAisle();
       // List<Aisle> list=aisleMapper.findaisle(aitype);
        if(list!=null){
            map.put("code", "0000");
            map.put("msg","查詢成功");
            map.put("list",list);
        }else{
            map.put("code","9999");
            map.put("msg","查询失败");
        }
        return map;
    }
    @CheckToken
    @ApiOperation(value = "添加费率")
    @PostMapping("/aisleraterate")
    public XResponse<Aislerate> aislerate(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "asuid",value = "渠道类型", required = true)
            @RequestParam(value = "asuid", required = true)
                    int asuid,
            @ApiParam(name = "rate",value = "费率", required = true)
            @RequestParam(value = "rate", required = true)
                    float rate
            ){

        Customer customer=tokenService.getCustomer(token);
      //查询数据库有根据这个渠道查询有没有这个费率asuid代表渠道
        Aislerate aislrate=aislerateMapper.find(asuid);
       System.out.println(aislrate+"*******************null++++++null");
       /* if(a!=null && list.size()>0){*/
            if(aislrate!=null){
            return new XResponse<Aislerate>(){{
                setCode("9999");
                setMessage("费率已存在");
                setData(aislrate);
            }};
        }else{
            int a=1000;
            float  d=rate/a;
            System.out.println("*************88"+d);
            Aislerate  feilv =new Aislerate(){{
                setAsuid(asuid);
                setRate(d);
            }};
              aislerateMapper.addratE(feilv);
           }
        return new XResponse<Aislerate>(){{
            setCode("0000");
            setMessage("success");
            setData(aislrate);
        }};
    }
  @CheckToken
    @ApiOperation(value = "费率修改")
    @PostMapping("/updaterate")
    public Map<String, Object> updaterate(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true) String token,
            @ApiParam(name = "asuid",value = "渠道类型", required = true)
            @RequestParam(value = "asuid", required = true)
                    int asuid,
            @ApiParam(name = "rate",value = "费率", required = true)
            @RequestParam(value = "rate", required = true) float rate){
            Map<String,Object> map =new HashMap<>();
      int a=1000;
      float  d=rate/a;
      System.out.println("*************88"+d);
          Aislerate  feilv =new Aislerate(){{
          setAsuid(asuid);
          setRate(d);
          }};

      int b=aislerateMapper.updaterate(feilv);
        if(b>0){
            map.put("code","0000");
            map.put("msg","费率修改成功");
        }else{
            map.put("code","9999");
          map.put("msg","失败");
        }
        return map;
    }

    @CheckToken
    @ApiOperation(value = "查询费率")
    @PostMapping("/selectrate")
    public XResponse<List<Aislerate>> selectrate(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "asuid",value = "渠道类型", required = false)
            @RequestParam(value = "asuid", required = false)
                    Integer asuid

    ){
             Customer customer=tokenService.getCustomer(token);
        List<Aislerate>  list=aislerateMapper.findrate(asuid);
        return new XResponse<List<Aislerate>>(){{
            setCode("0000");
            setMessage("费率查询");
            setData(list);
        }};
      }

    @CheckToken
    @ApiOperation(value = "删除费率")
    @PostMapping("/deleterate")
    public XResponse<Boolean> deleterate(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "asuid",value = "渠道类型", required = true)
            @RequestParam(value = "asuid", required = true)
                    int asuid
    ){
        Customer customer=tokenService.getCustomer(token);
         boolean a=aislerateMapper.deleterate(asuid);

        return new XResponse<Boolean>(){{
            setCode("0000");
            setMessage("Success");
            setData(a);
        }};
    }
}
