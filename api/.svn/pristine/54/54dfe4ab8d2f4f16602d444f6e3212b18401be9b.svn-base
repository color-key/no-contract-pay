package com.xe.alipay.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.junit.Test;

/**
* author: lironghong
* date: 2018/11/21 10:17
* description: 
*/
@Data
@ApiModel(value = "返回类")
public class XResponse<T extends Object> {
    @ApiModelProperty(name = "code",value = "code")
    @JsonProperty("code")
    private String code;
    @ApiModelProperty(name = "message",value = "文本描述")
    @JsonProperty("message")
    private String message;
    @ApiModelProperty(name = "data",value = "数据体")
    @JsonProperty("data")
    private T data;

   /* private static final String SUCCMESS = "success";
    private static final Integer SUCCCODE = 000;
*/
    public XResponse(){
       /* this.code = SUCCCODE;
        this.message = SUCCMESS;*/
    }

}

