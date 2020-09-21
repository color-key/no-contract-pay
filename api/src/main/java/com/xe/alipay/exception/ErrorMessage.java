package com.xe.alipay.exception;

public class ErrorMessage {

    private final String error;
    private final String message;

    public ErrorMessage(String code) {
        this(code, null);
    }

    public ErrorMessage(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

}
