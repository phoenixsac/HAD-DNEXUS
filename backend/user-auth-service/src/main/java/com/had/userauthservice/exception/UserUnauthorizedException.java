package com.had.userauthservice.exception;

public class UserUnauthorizedException extends Throwable{
    public UserUnauthorizedException(String message) {
        super(message);
    }
}
