package com.blog.tech.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String userId;
    private String nickName;
    private String password;
    private String confirmPassword;
    private String email;
    private RoleType role;
}
