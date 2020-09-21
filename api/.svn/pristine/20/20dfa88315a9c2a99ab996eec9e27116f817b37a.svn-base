package com.xe.alipay.common;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

/**
* author: lironghong
* date: 2018/11/23 14:27
* description: 
*/

@Configuration
@EnableAutoConfiguration
@Slf4j
public class ValidateFactoryConfig {
    final static Logger logger= LoggerFactory.getLogger(ValidateFactoryConfig.class);

    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor(){
        return new MethodValidationPostProcessor();
    }
}
