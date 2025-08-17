package com.blog.tech.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IntroRequestDto {
    private String writer;
    private String contents;
    private List<String> images;
}
