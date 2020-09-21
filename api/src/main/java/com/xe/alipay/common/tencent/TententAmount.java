package com.xe.alipay.common.tencent;

import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
* author: lironghong
* date: 2018/12/6 11:33
* description: 腾讯云文字识别接口
*/
@Slf4j
public class TententAmount {

    public Double returnamount(String url) {

        String imgFile = url;

        /**
         * 对图像进行base64编码
         */
        String imgBase64;
        String contentSize;
        String sign;
        double amount = 0D;
        try {

            sign = Sign.appSign(Constats.APP_ID, Constats.SECRET_ID, Constats.SECRET_KEY, null);

            File file = new File(imgFile);
            contentSize = file.length() + "";
            log.info("param json info:    " + file.getName() + "    " + file.length());

            byte[] content = new byte[(int) file.length()];
            FileInputStream finputstream = new FileInputStream(file);
            finputstream.read(content);
            finputstream.close();
            imgBase64 = new String(Base64.encodeBase64(content));
            log.info("base64 info:  " + imgBase64);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
            headers.setContentType(type);
            headers.add("Authorization",sign);
            headers.add("Host","recognition.image.myqcloud.com");
            //headers.add("Content-Length",);
            headers.add("Accept", MediaType.APPLICATION_JSON.toString());
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("appid", Constats.APP_ID_STR);
            jsonObj.put("image", imgBase64);

            HttpEntity<String> formEntity = new HttpEntity<String>(jsonObj.toString(), headers);

            String s = restTemplate.postForObject(Constats.URL, formEntity, String.class);
            System.out.println(s);
            // 要验证的字符串
            String str = s;
            // 正则表达式规则
           // String regEx = "\"itemstring\":\"￥.*";
            String regEx = "\"itemstring\":\"￥[0-9]*.[0-9]*\"";
            // 编译正则表达式
            Pattern pattern = Pattern.compile(regEx);
            // 忽略大小写的写法
            // Pattern pat = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(str);
//            System.out.println(matcher.find());
            if(matcher.find()) {
            	System.out.println("***********************");
            	System.out.println(matcher.groupCount());
                for (int i = 0; i <= matcher.groupCount(); i++) {
                	System.out.println(matcher.group(i));
                    //System.out.println(i + ":" + matcher.group(i));
                   String[] split = matcher.group(i).split("}");
                    //System.out.println(split[0]);
                     int length = split[0].length();
                   // System.out.println(length);
                    String substring = split[0].substring(15, length - 1);
                     substring = substring.replace(" ", "");
                    //System.out.println(substring);
                    amount=Double.valueOf(substring.trim());

                }
                //System.out.println(amount);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return amount;
    }

}
