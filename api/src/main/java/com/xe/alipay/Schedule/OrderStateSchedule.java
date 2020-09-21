package com.xe.alipay.Schedule;
import com.xe.alipay.mapper.OrderMapper;
import com.xe.alipay.model.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
/**
* @version:1.0.0
* @author: lironghong
* @date: 2019/1/10 17:10
* @description: 查询数据库中创建时间
*/
@Slf4j
@Component
public class OrderStateSchedule {
    @Autowired
    OrderMapper orderMapper;
    @Scheduled(fixedRate = 5000)
    public void orderstate() {
        /* //当前系统时间
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = simpleDateFormat.format(new Date());*/
        //查询数据库中创建时间距离当前时间大于5分钟的订单和状态为0(支付中)的
        List<Order> orders = orderMapper.selectallorder();
        for( int i = 0 ; i < orders.size() ; i++) {//内部不锁定，效率最高，但在多线程要考虑并发操作的问题。
            System.out.println(orders.get(i));
            orderMapper.updatesta(orders.get(i).getOrdernumber());
        }
    }
}
