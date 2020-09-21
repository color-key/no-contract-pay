package com.xe.alipay.Schedule;

import com.xe.alipay.mapper.CusRechargeMapper;
import com.xe.alipay.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @version:1.0.0
 * @author: lironghong
 * @date: 2019/1/10 17:54
 * @description: //查询充值订单是否支付
 */
@Component
public class RechangeSchedule {
    @Autowired
    CusRechargeMapper cusRechargeMapper;
    @Scheduled(fixedRate = 5000)
    public void rechangeorderstate() {

        //查询数据库中创建时间距离当前时间大于5分钟的订单和状态为0(支付中)的
        List<Order> orders = cusRechargeMapper.selectallorder();
        for( int i = 0 ; i < orders.size() ; i++) {//内部不锁定，效率最高，但在多线程要考虑并发操作的问题。
            String orderid = orders.get(i).getOrdernumber();
            cusRechargeMapper.updatesta(orderid);
        }
    }
}
