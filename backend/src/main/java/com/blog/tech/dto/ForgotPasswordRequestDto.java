package com.blog.tech.dto;

import lombok.Data;

@Data
public class ForgotPasswordRequestDto {
    private String userId;
    private String email;
}
