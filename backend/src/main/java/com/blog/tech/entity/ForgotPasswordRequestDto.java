package com.blog.tech.entity;

import lombok.Data;

@Data
public class ForgotPasswordRequestDto {
    private String userId;
    private String email;
}
