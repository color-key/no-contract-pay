package com.xe.alipay.exception;

import com.xe.alipay.constant.RecordErrorConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class RecordTokenException extends BaseException {

    protected static String code = RecordErrorConstants.ERR_AUTH;

    public RecordTokenException(String code, String msg) {
        super(code, msg);
    }

    public RecordTokenException(String code) {
        super(code, null);
    }

    public RecordTokenException() {
        super(code, null);
    }

}