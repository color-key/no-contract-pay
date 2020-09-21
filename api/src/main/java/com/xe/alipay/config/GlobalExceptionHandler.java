package com.xe.alipay.config;

import com.xe.alipay.common.XResponse;
import com.xe.alipay.exception.BaseException;
import com.xe.alipay.constant.RecordErrorConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

/**
* author: lironghong
* date: 2018/11/21 10:16
* description: 异常处理
*/
@ControllerAdvice
public class GlobalExceptionHandler {

    //处理自定义异常
    @ExceptionHandler(BaseException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //响应吗
    @ResponseBody
    public XResponse handlerMyException(HttpServletRequest request, BaseException e){

       // e.printStackTrace();
        if (e.getCode()== RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA){
            return new XResponse(){{
                setCode("500");
                setMessage(e.getCode());
            }};
        }
        return new XResponse(){{
            setCode("501");
            setMessage("exception now");
        }};
    }

    //处理自定义异常
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //响应吗
    @ResponseBody
    public XResponse handlerMyException(HttpServletRequest request,Exception e){
        e.printStackTrace();
        return new XResponse(){{
            setCode("501");
            setMessage(e.getMessage());
        }};
    }

}
