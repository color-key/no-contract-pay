package com.xe.alipay.Schedule;

import com.xe.alipay.mapper.CustomerMapper;
import com.xe.alipay.mapper.OrderMapper;
import com.xe.alipay.model.Customer;
import com.xe.alipay.model.Order;
import org.acegisecurity.providers.encoding.ShaPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
* @version:1.0.0
* @author: lironghong
* @date: 2019/1/10 17:54
* @description: //查询订单是否收到回调
*/
@Component
public class NotifySchedule {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    CustomerMapper customerMapper;

    @Bean
    ShaPasswordEncoder getShaPasswordEncoder(){
        return new ShaPasswordEncoder(256);
    }

    @Scheduled(fixedRate = 5000)
    public void orderstate() {
        //查询order表中状态成功15分钟内没有收到回调的
        List<Order> selectreturncode = orderMapper.selectreturncode();
        for( int i = 0 ; i < selectreturncode.size() ; i++) {//内部不锁定，效率最高，但在多线程要考虑并发操作的问题。
            String uid=selectreturncode.get(i).getCusMerchid();
            Customer findbymcerchid = customerMapper.findbymcerchid(uid);
            HttpHeaders headers = new HttpHeaders();
//  请勿轻易改变此提交方式，大部分的情况下，提交方式都是表单提交
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//  封装参数，千万不要替换为Map与HashMap，否则参数无法传递
            MultiValueMap<String, String> params= new LinkedMultiValueMap<String, String>();
//  也支持中文
            params.add("state", String.valueOf(selectreturncode.get(i).getState()));
            params.add("uid", selectreturncode.get(i).getCusMerchid());
            params.add("ordernumber", selectreturncode.get(i).getOrdernumber());
            params.add("money", String.valueOf(selectreturncode.get(i).getSjmoney()));

            TreeMap<String,String> treeMap=new TreeMap<>();
            treeMap.put("state",String.valueOf(selectreturncode.get(i).getState()));
            treeMap.put("uid", selectreturncode.get(i).getCusMerchid());
            treeMap.put("ordernumber", selectreturncode.get(i).getOrdernumber());
            treeMap.put("money", String.valueOf(selectreturncode.get(i).getSjmoney()));
            //校验时拼接请求参数
            StringBuffer webuffer = new StringBuffer();
            treeMap.forEach((k, v) -> {
                webuffer.append(k + "=" + v + "&");
            });
            webuffer.deleteCharAt(webuffer.length() - 1);
            System.out.println("异步返回眼前"+webuffer);
            String encodePassword = getShaPasswordEncoder().encodePassword(webuffer + findbymcerchid.getSecret(), "");
            params.add("sign",encodePassword);
            System.out.println(encodePassword);
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(params, headers);
            //  执行HTTP请求
            ResponseEntity<String> responseEntity = restTemplate.exchange(selectreturncode.get(i).getNotifyurl(), HttpMethod.POST, requestEntity, String.class);
            //每发送一次更新通知次数
            orderMapper.updatenotifycont(selectreturncode.get(i).getCusMerchid(),selectreturncode.get(i).getOrdernumber());
            if (responseEntity.getBody().equals("success")||responseEntity.getBody()=="success"){
                //更新返回returncode为success将不再发送异步
                orderMapper.updatereturncode(selectreturncode.get(i).getCusMerchid(),selectreturncode.get(i).getOrdernumber());
            }


        }
    }
}
