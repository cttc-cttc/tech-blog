package com.blog.tech.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    private Long postId;
    private Long userId;
    private String nickName;
    private String content;
    private Long parentId;
}
