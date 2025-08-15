package com.blog.tech.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostRequestDto {
    private String title;
    private String contents;
    private String writer;
    private Long categoryId;
    private List<String> images;
}

