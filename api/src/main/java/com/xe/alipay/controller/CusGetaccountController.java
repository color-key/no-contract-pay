package com.xe.alipay.controller;
import com.xe.alipay.common.XResponse;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.CusAccountMoneyMapper;
import com.xe.alipay.mapper.CusGetaccountMapper;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.mapper.QrcodeMapper;
import com.xe.alipay.model.*;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.CusAccountMoneyService;
import com.xe.alipay.service.PaymentService;
import com.xe.alipay.service.imp.CusGetaccountServiceimpl;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@Api(description="收款账户")
public class CusGetaccountController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    CusGetaccountServiceimpl cusGetaccountServiceimpl;
    @Autowired
    private CusGetaccountMapper cusGetaccountMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CusAccountMoneyMapper cusAccountMoneyMapper;
    @Autowired
    CusAccountMoneyService cusAccountMoneySerivice;
    @Autowired
    QrcodeMapper qrcodeMapper;
    /*   @Autowired
        private TokenStorage tokenStorage;//token厂库*/
    @Autowired
    TokenService tokenService;
    @CheckToken
    @ApiOperation(value = "用户添加收款金额")
    @PostMapping("/amountadd")
    public XResponse<String> amountadd(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "paytype", value = "收款类型", required = true)
            @RequestParam(value = "paytype", required = true)
                    int paytype,
            @ApiParam(name = "amount", value = "收款金额", required = true)
            @RequestParam(value = "amount", required = true)
                    int amount
    ){
        Customer  customer=tokenService.getCustomer(token);
       String useruuid=customer.getUuid();
      String   cusMerchid=customerMapper.findbyuuid(useruuid);

      System.out.println(cusMerchid+"******************8");
       //double money=(double)amount;
        CusAccountMoney cusAccountMoney = new CusAccountMoney() {{
            setCusMerchid(cusMerchid);
            setAcaccname(accname);
            setAcpaytype(paytype);
            setAcamount(amount);
            setState(0);
        }};
        //先查询此收款账户和收款类型有没有此金额
        int existswithamount = cusAccountMoneyMapper.existswithamount(cusAccountMoney);
        if (existswithamount>0){
            return new XResponse<String>(){{
                setCode("1111");
                setMessage("Filed");
                setData("此金额已添加");
            }};
        }
        int insert = cusAccountMoneyMapper.insertall(cusAccountMoney);
        if (insert>=1){
            return new XResponse<String>(){{
                setCode("0000");
                setMessage("Success");
                setData("添加成功");
            }};
        }

        return new XResponse<>();
    }
    //查询收款账户金额

    @CheckToken
    @ApiOperation("查询收款金额")
    @GetMapping("/findamout")
    public List<CusAccountMoney> findamout(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "paytype", value = "收款类型", required = true)
            @RequestParam(value = "paytype", required = true)
                    int paytype
    ){
        List<CusAccountMoney> selectinfo = cusAccountMoneyMapper.selectinfo(accname, paytype);
        Map<String,Object> map=new HashMap<>();
        System.out.println(selectinfo);
        return selectinfo;
    }

    @CheckToken
    @ApiOperation("删除金额二维码")
    @GetMapping("/deleteamountqrcod")
    public XResponse deleteamountqrcod(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "uuid", value = "主键uid", required = true)
            @RequestParam(value = "uuid", required = true)
                    int uuid
            ){
        Customer  customer=tokenService.getCustomer(token);

      int a= cusAccountMoneyMapper.deleteByPrimaryKey(uuid);
    if(a>0){
        return new XResponse(){{
           setCode("0000");
           setMessage("Success");
            setData(a);
        }};
    }
        return new XResponse(){{
            setCode("9999");
            setMessage("faile");
            setData(a);
        }};
    }


    @CheckToken
    @ApiOperation(value = "分页查询收款账户金额")
    @PostMapping("/fenyequeryamount")
    public Page fenyequeryamount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "paytype", value = "收款类型",required = true)
            @RequestParam(value = "paytype",required = true)
                    int paytype,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "pageNum", value = "当前页")
            @RequestParam(value = "pageNum")
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数")
            @RequestParam(value = "pageSize")
                    int pageSize
    ) {
         Map   map=new HashMap();
        Customer  customer=tokenService.getCustomer(token);
        String  useruuid=customer.getUuid();
         String  merchid=customerMapper.findbyuuid(useruuid);
        Page page=cusAccountMoneySerivice.fenyeamount(merchid,accname,paytype,pageNum,pageSize);
        if(page!=null ||!page.equals("")){
            map.put("code","0000");
            map.put("msg","success");
            map.put("page",page);
        }else{
            map.put("code","9999");
            map.put("msg","查询错误");
        }

        return page;
    }

    @CheckToken
    @ApiOperation(value = "用户添加收款账户表")
    @PostMapping("/useradd")
    public XResponse useradd(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "paytype", value = "收款类型", required = true)
            @RequestParam(value = "paytype", required = true)
                    int paytype,
            @ApiParam(name = "node", value = "备注说明", required = false)
            @RequestParam(value = "node", required = false)
                    String node) {

        Customer customer = tokenService.getCustomer(token);
        String useruuid=customer.getUuid();
        System.out.println(useruuid+"********************");
        Customer cus = customerMapper.selectByPrimaryKey(useruuid);
          String   merchid=cus.getMerchid();
          System.out.println(merchid);
        CusGetaccount CusGetaccount=cusGetaccountMapper.queryaccount(paytype,accname,merchid);

        System.out.println(CusGetaccount+"******************hhh**");
        if(CusGetaccount!=null) {
            return new XResponse<String>() {{
                setMessage("Faild");
                setCode("9999");
                setData("此账户已存在");
            }};
        }else{
            CusGetaccount cusGetaccount = new CusGetaccount();
            //cusGetaccount.setCusUid(rToken.getSubject());
            cusGetaccount.setCusUid(customer.getUuid());
            cusGetaccount.setCusMerchid(cus.getMerchid());
            cusGetaccount.setAccname(accname);
            cusGetaccount.setPaytype(paytype);
            cusGetaccount.setNode(node);
            cusGetaccountMapper.add(cusGetaccount);
        }
        return new XResponse<String>(){{
            setCode("0000");
            setMessage("Success");
            setData("添加成功");
        }};
    }

    @CheckToken
    @ApiOperation(value = "查询收款账户")
    @PostMapping("/queryUser")
    public Map<String, Object> queryUser(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "paytype", value = "收款类型")
            @RequestParam(value = "paytype")
                    int paytype) {
        Map<String, Object> map = new HashMap<>();
        List<CusGetaccount> list = cusGetaccountMapper.findtype(paytype);
      //  CusGetaccount a=cusGetaccountMapper.queryaccount(paytype,accname,useruuid);
        if (list!=null){
            map.put("code", "0000");
            map.put("msg", "success");
            map.put("list", list);
        } else {
            map.put("code", "99999");
            map.put("msg", "失败");
        }
        return map;
    }

    @CheckToken
    @ApiOperation(value = "分页查询收款账户")
    @PostMapping("/fenyequery")
    public Map<String,Object> fenyequery(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "paytype", value = "收款类型",required = false)
            @RequestParam(value = "paytype",required = false)
                    Integer  paytype,
            @ApiParam(name = "pageNum", value = "当前页")
            @RequestParam(value = "pageNum")
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数")
            @RequestParam(value = "pageSize")
                    int pageSize
    ) {
        Map<String,Object> map=new HashMap<>();
        Customer customer = tokenService.getCustomer(token);
        String  countuuid=customer.getUuid();
System.out.println(countuuid+"***********************883232");
        Page<CusGetaccount> pageinfo= cusGetaccountServiceimpl.fenyequery(paytype,pageNum,pageSize,countuuid);
        System.out.println(pageinfo+"#############");
        if (!pageinfo.equals("") && pageinfo!=null) {
            map.put("cood","0000");
            map.put("msg","success");
            map.put("pageinfo",pageinfo);
        }else {
            map.put("code", "9999");
            map.put("msg","失败");
        }
        return map;
    }


    @CheckToken
    @ApiOperation(value = "后台分页查询收款账户")
    @PostMapping("/fenyeaccount")
    public Map<String,Object> fenyeaccount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "cusMerchid", value = "商户号")
            @RequestParam(value = "cusMerchid")
                    String  cusMerchid,
            @ApiParam(name = "paytype", value = "收款类型",required = false)
            @RequestParam(value = "paytype",required = false)
                    Integer  paytype,
            @ApiParam(name = "pageNum", value = "当前页")
            @RequestParam(value = "pageNum")
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数")
            @RequestParam(value = "pageSize")
                    int pageSize
    ) {
        Map<String,Object> map=new HashMap<>();
        Customer customer = tokenService.getCustomer(token);
        String  useruuid=customer.getUuid();
        Page<CusGetaccount> pageinfo= cusGetaccountServiceimpl.fenyeaccount(cusMerchid,paytype,pageNum,pageSize);
        System.out.println(pageinfo+"#############");
        if (!pageinfo.equals("") && pageinfo!=null) {
            map.put("cood","0000");
            map.put("msg","success");
            map.put("pageinfo",pageinfo);
        }else {
            map.put("code", "9999");
            map.put("msg","失败");
        }
        return map;
    }
    @CheckToken
    @ApiOperation(value = "后查询收款账户")
    @PostMapping("/listaccount")
    public Map<String,Object> listaccount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "cusMerchid", value = "商户号")
    @RequestParam(value = "cusMerchid")
            String  cusMerchid
    ) {
        tokenService.getCustomer(token);
        Map<String,Object> map=new HashMap<>();
    List  list=  cusGetaccountServiceimpl.CusGetaccount(cusMerchid);

        if (!list.equals("") && list!=null) {
            map.put("cood","0000");
            map.put("msg","success");
            map.put("pageinfo",list);
        }else {
            map.put("code", "9999");
            map.put("msg","失败");
        }
        return map;
    }






    @CheckToken
    @ApiOperation(value = "总条数")
    @PostMapping("/getCount")
    public Map<String,Object> getCount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "paytype", value = "收款类型")
            @RequestParam(value = "paytype",required = false)
                    int paytype
    ) {
        Map<String,Object> map=new HashMap<>();
        Customer customer = tokenService.getCustomer(token);
        String  countuuid=customer.getUuid();
        int  allSizes=cusGetaccountServiceimpl.GetCount(paytype,countuuid);
        System.out.println(allSizes+"***********************");
        if (allSizes>0) {
            map.put("code","0000");
            map.put("msg","success");
            map.put("allSizes",allSizes);
        }
        return map;
    }


    @CheckToken
    @ApiOperation(value = "删除收款账户")
    @PostMapping("/deleteUser")
    public XResponse deleteUser(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "uuid", value = "主键删除账户")
            @RequestParam(value = "uuid")
                    String  uuid) {
        Customer customer = tokenService.getCustomer(token);
         boolean x = cusGetaccountServiceimpl.deleteCusGetaccount(uuid);
        if (x){
            return new XResponse<String>() {{
                    setCode("0000");
                    setMessage("success");
                    setData("删除成功");
            }};
        }
        return new XResponse();
        }


    @CheckToken
    @ApiOperation(value = "修改收款账户")
    @PostMapping("/UpdateUser")
    public XResponse UpdateUser(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "uuid", value = "主键")
            @RequestParam(value = "uuid")
                    String uuid,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "State", value = "状态", required = false)
            @RequestParam(value = "State", required = false)
                    int State,
            @ApiParam(name = "node", value = "备注说明", required = false)
            @RequestParam(value = "node", required = false)
                    String node) {
        tokenService.getCustomer(token);
       int u=cusGetaccountServiceimpl.updateCusGetaccount(accname,State,node,uuid);
       System.out.println(u+"**********************s");
        if (u>0){
            return new XResponse<String>() {{
                setCode("0000");
                setMessage("success");
                setData("修改成功");
            }};
        }
        return new XResponse();
    }


    @CheckToken
    @ApiOperation(value = "分页查询收款码")
    @PostMapping("/fenyequerymeny")
    public XResponse<Page> fenyequerymeny(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
            @ApiParam(name = "paytype", value = "收款类型")
            @RequestParam(value = "paytype")
                    int paytype,
            @ApiParam(name = "money", value = "金额")
            @RequestParam(value = "money")
                    int  money,
            @ApiParam(name = "pageNum", value = "当前页")
            @RequestParam(value = "pageNum")
                    int pageNum,
            @ApiParam(name = "pageSize", value = "每页显示的条数")
            @RequestParam(value = "pageSize")
                    int pageSize
    ) {
        Customer customer=tokenService.getCustomer(token);
       String useruuid =customer.getUuid();
       //商户号
       String  merchid=customerMapper.findbyuuid(useruuid);
       Page page=cusGetaccountServiceimpl.fenyequeryqrcode(merchid,accname,paytype,pageNum,pageSize);

       return new XResponse<Page>(){{
            setCode("0000");
            setMessage("Success");
            setData(page);
        }};
    }
    @CheckToken
    @ApiOperation(value = "查询二维码收款码数量")
    @PostMapping("/querycount")
    public XResponse querycount(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "accname", value = "账户名称", required = true)
            @RequestParam(value = "accname", required = true)
                    String accname,
           @ApiParam(name = "money" ,value = "金额",required = true)
            @RequestParam(value = "money")
              double  money,
            @ApiParam(name = "paytype", value = "收款类型")
            @RequestParam(value = "paytype")
                    int paytype
    ) {
        Customer customer=tokenService.getCustomer(token);
        String    useruuid=customer.getUuid();
       //商户号
       String  merchid=customerMapper.findbyuuid(useruuid);
      int   count=qrcodeMapper.getcount(money,merchid,accname,paytype);
      System.out.println(count);
        return new XResponse<Integer>(){{
          setCode("0000");
           setMessage("success");
            setData(count);
        }};
    }
    @CheckToken
    @ApiOperation("查询充值收款")
    @GetMapping("/selectpayment")
    public XResponse<CusPayment> selectpayment(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token){
        Customer customer=tokenService.getCustomer(token);
        String    useruuid=customer.getUuid();
        CusPayment cusPayment=paymentService.findbypayment();
    if(cusPayment==null){
        return new XResponse<CusPayment>(){{
           setCode("9999");
           setMessage("filed");
           setData(cusPayment);
        }};
    }
     return new XResponse<CusPayment>(){{
         setCode("0000");
         setMessage("Success");
         setData(cusPayment);
     }};
    }
    @CheckToken
    @ApiOperation("充值收款")
    @GetMapping("/addpayment")
    public XResponse<CusPayment> addpayment(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "reMerchid", value = "收款商户号", required = true)
            @RequestParam(value = "reMerchid", required = true)
                    String reMerchid,
            @ApiParam(name = "reSercurity" ,value = "密钥",required = true)
            @RequestParam(value = "reSercurity")
                    String   reSercurity
            ){
        Customer customer=tokenService.getCustomer(token);
        String    useruuid=customer.getUuid();
        CusPayment   cusPayment=new CusPayment();
        cusPayment.setReMerchid(reMerchid);
        cusPayment.setReSercurity(reSercurity);

        int  a=paymentService.addpayment(cusPayment);
        if(a>0){
            return new XResponse<CusPayment>(){{
                setCode("0000");
                setMessage("Success");
                setData(cusPayment);
            }};
        }else{
            return new XResponse<CusPayment>(){{
                setCode("9999");
                setMessage("filed");
                setData(cusPayment);
            }};
        }
    }
    @CheckToken
    @ApiOperation("删除payment")
    @GetMapping("/deletepayment")
    public XResponse<Boolean> deletepayment(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token
    ){

        boolean  a=paymentService.delete();
        if(a){
            return new XResponse<Boolean>(){{
                setCode("0000");
                setMessage("Success");
                setData(a);
            }};
        }else{
            return new XResponse<Boolean>(){{
                setCode("9999");
                setMessage("filed");
                setData(a);
            }};
        }
    }


}