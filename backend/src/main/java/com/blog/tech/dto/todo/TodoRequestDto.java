package com.blog.tech.dto.todo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoRequestDto {
    private Long id;
    private String writer;
    private String title;
    private String content;
}
