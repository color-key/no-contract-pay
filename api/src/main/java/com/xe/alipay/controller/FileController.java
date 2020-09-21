package com.xe.alipay.controller;

import com.xe.alipay.common.FileUtil;
import com.xe.alipay.common.JsonData;
import com.xe.alipay.common.QRCodeUtil;
import com.xe.alipay.common.tencent.TententAmount;
import com.xe.alipay.constant.AuthConstants;
import com.xe.alipay.mapper.CusAccountMoneyMapper;
import com.xe.alipay.mapper.CusGetaccountMapper;
import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.mapper.QrcodeMapper;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Qrcode;
import com.xe.alipay.record.auth.token.CheckToken;
import com.xe.alipay.service.imp.TokenService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;
/**
* author: lironghong
* date: 2018/12/7 13:56
* description: 二维码批量上传
*/
@Controller
public class FileController {
    @Value("${web.upload-path}")
    private String filePath;
    @Value("${web.domain}")
    private String domain;
    @Autowired
    TokenService tokenService;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CusGetaccountMapper cusGetaccountMapper;
    @Autowired
    QrcodeMapper qrcodeMapper;
    @Autowired
    CusAccountMoneyMapper cusAccountMoneyMapper;

    @CheckToken
    @PostMapping(value = "/upload")
    @ResponseBody
    public JsonData upload(
            @ApiParam(name = AuthConstants.AUTH_TOKEN_HEADER, value = "Token", required = true)
            @RequestHeader(value = AuthConstants.AUTH_TOKEN_HEADER, required = true)
                    String token,
            @ApiParam(name = "head_img", value = "图片", required = true)
            @RequestParam("head_img") MultipartFile[] files,
            @ApiParam(name = "amount", value = "金额", required = true)
            @RequestParam("amount")
                    int amount,
            @ApiParam(name = "accountname", value = "收款账户", required = true)
            @RequestParam("accountname")
                    String accountname,
            @ApiParam(name = "accpaytype", value = "收款类型", required = true)
            @RequestParam("accpaytype")
                    int accpaytype,
            HttpServletRequest request) {
            Customer c=tokenService.getCustomer(token);
                String useruuid= c.getUuid();
             String  merchid= customerMapper.findbyuuid(useruuid);
        if (0 == files.length) {
            return new JsonData(5000, null, "fail to file is empty");
        }
        //System.out.println(token);
        Customer customer = tokenService.getCustomer(token);
        String uuid = customer.getUuid();
        //System.out.println(uuid);
        String cusmerchid = customerMapper.findbyuuid(uuid);
        String amounti = String.valueOf(amount);
        System.out.println(amounti+"***********");
        String folder_name = merchid + "/" + amounti;

        System.out.println(folder_name);
        folder_name = folder_name.replace(".", "/");
        String formatPath = filePath;
        //E:/Project-resources/
        if (null != folder_name && !folder_name.isEmpty()) {
            formatPath = String.format("%s%s/", filePath, folder_name);
            //E:/Project-resources/images
        }
        FileUtil fileUtil = new FileUtil();
        if (!fileUtil.mkdirsDirectory(formatPath)) {
            return new JsonData(5000, null, "fail to create directory");
        }
        List<String> data = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            String filename = files[i].getOriginalFilename();//上传的文件名
            String suffixName = filename.substring(filename.lastIndexOf("."));//上传的后缀名
            filename = UUID.randomUUID().toString().replace("-", "") + suffixName;//生成后的文件名
            File dest = new File(formatPath + filename);//文件上传的目的地

            try {
                files[i].transferTo(dest);
                if (null != folder_name && !folder_name.isEmpty()) {

                    //http://localhost:8080/images/1b221abf14db4420ad3451d2f139d907.JPG
                    data.add(i, String.format("%s/%s/%s", domain, folder_name, filename));
                } else {
                    //http://localhost:8080/1b221abf14db4420ad3451d2f139d907.JPG
                    data.add(i, String.format("%s/%s", domain, filename));
                }
            } catch (IOException e) {
                return new JsonData(5000, null, e.getMessage());
            }
        }
        //System.out.println(data.get(0));
        Map<String,Object> map=new HashMap<String, Object>();
        //解析存库
        for (String qr:data) {
            //System.out.println(qr);
            //调取腾讯文字识别接口
            TententAmount tententAmount=new TententAmount();
            Double returnamount = tententAmount.returnamount(qr);
            System.out.println(returnamount);
            try {

               Object o=QRCodeUtil.zxingCodeAnalyze(qr);//异常
             //   Object o=QRCodeUtil.zxingutils(qr);
                map.put(o.toString(),returnamount);
            } catch (Exception e) {
                e.printStackTrace();
                return new JsonData(5000,"Filed");
            }
           // map.put((String) aliqr,returnamount);
        }
        map.forEach((k,v)->{
            System.out.println(k+"="+v);
            Qrcode qrcode = new Qrcode() {{
                setCusMerchid(cusmerchid);
                setMoney((Double) v);
                setAliqrurl(k);
                setNode("");
                setCusAccountname(accountname);
                setAccpaytype(accpaytype);
                setUsestate(0);

            }};
            System.out.println(qrcode.getMoney());
             qrcodeMapper.addqrcode(qrcode);
            cusAccountMoneyMapper.updatestate(cusmerchid,accountname,accpaytype,amount);
        });

            return new JsonData(2000,"Success");
    }


/*    @CheckToken
    @PostMapping(value = "/uploadfile")
    @ResponseBody
    public JsonData uploadfile(
            @ApiParam(name = "head_img", value = "图片", required = true)
            @RequestParam("head_img") MultipartFile[] files,
            HttpServletRequest request) {
        if (0 == files.length) {
            return new JsonData(5000, null, "fail to file is empty");
        }
        String folder_name = "/";

        //System.out.println(folder_name);
        folder_name = folder_name.replace(".", "/");
        String formatPath = filePath;
        if (null != folder_name && !folder_name.isEmpty()) {
            formatPath = String.format("%s%s/", filePath, folder_name);
            //E:/Project-resources/images
        }
        FileUtil fileUtil = new FileUtil();
        if (!fileUtil.mkdirsDirectory(formatPath)) {
            return new JsonData(5000, null, "fail to create directory");
        }
        List<String> data = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            String filename = files[i].getOriginalFilename();//上传的文件名
            String suffixName = filename.substring(filename.lastIndexOf("."));//上传的后缀名
            //String newFileName = UUID.randomUUID()+filename.substring(filename.lastIndexOf("."));
            filename = UUID.randomUUID().toString().replace("-", "") + suffixName;//生成后的文件名
            File dest = new File(formatPath + filename);//文件上传的目的地
            System.out.println(dest+"***********************");
            try {
                files[i].transferTo(dest);
                    //http://localhost:8080/images/1b221abf14db4420ad3451d2f139d907.JPG
                    data.add(i, String.format(filename));
                    //http://localhost:8080/1b221abf14db4420ad3451d2f139d907.JPG
                    data.add(i, String.format(filename));
            } catch (IOException e) {
                return new JsonData(5000, null, e.getMessage());
            }

        }

        return new JsonData(2000,"Success");
    }


    @PostMapping(value = "/uploadPicture")
    @ResponseBody
    public String uploadPicture(
            @RequestParam(value="file",required=false)MultipartFile file,
            HttpServletRequest request) {
        File targetFile = null;
        String msg = "";//返回存储路径
        int code = 1;
        String fileName = file.getOriginalFilename();//获取文件名加后缀
        if (fileName != null && fileName != "") {
            String returnUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/upload/imgs/";//存储路径
            String path = request.getSession().getServletContext().getRealPath("upload/imgs"); //文件存储位置
            String fileF = fileName.substring(fileName.lastIndexOf("."), fileName.length());//文件后缀
            fileName = new Date().getTime() + "_" + new Random().nextInt(1000) + fileF;//新的文件名

            //先判断文件是否存在
            String fileAdd = DateUtil.formatAsDatetime(new Date());
            File file1 = new File(path + "/" + fileAdd);
            //如果文件夹不存在则创建
            if (!file1.exists() && !file1.isDirectory()) {
                file1.mkdir();
            }
            targetFile = new File(file1, fileName);
//          targetFile = new File(path, fileName);
            try {
                file.transferTo(targetFile);
//              msg=returnUrl+fileName;
                msg = returnUrl + fileAdd + "/" + fileName;
                code = 0;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return JSON.toJSONString(msg, code);
    }*/
}

