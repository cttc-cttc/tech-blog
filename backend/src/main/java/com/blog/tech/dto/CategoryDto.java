package com.blog.tech.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private String name;
    private Long parentId; // null이면 최상위
}
