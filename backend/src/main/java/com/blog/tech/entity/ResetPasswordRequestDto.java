package com.blog.tech.entity;

import lombok.Data;

@Data
public class ResetPasswordRequestDto {
    private String token;
    private String newPassword;
}
