package com.blog.tech.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String userId) {
        super("유저 정보가 존재하지 않습니다. userId: " + userId);
    }
}
