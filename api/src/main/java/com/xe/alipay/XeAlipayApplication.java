package com.xe.alipay;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import tk.mybatis.spring.annotation.MapperScan;
@Slf4j
@SpringBootApplication
@MapperScan(basePackages = "com.xe.alipay.mapper")
@EnableScheduling
public class XeAlipayApplication {
    public static void main(String[] args) {
        SpringApplication.run(XeAlipayApplication.class, args);
        log.info("程序加载完成");
    }
}
