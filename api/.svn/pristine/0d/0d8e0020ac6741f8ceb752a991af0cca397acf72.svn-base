package com.xe.alipay.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

/**
 * @version:1.0.0
 * @author: lironghong
 * @date: 2019/1/10 15:25
 * @description: @scheduled启动的定时任务默认是单线程,为了满足现实生活中的使用场景，开启多个线程
 */
@Configuration
public class ScheduleConfig {

    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        //线程池
        taskScheduler.setPoolSize(30);
        return taskScheduler;
    }
}