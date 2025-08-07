package com.blog.tech.dto;

import com.blog.tech.entity.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
    private Long id;
    private String title;
    private String writer;
    private String contents;
    private Long categoryId;
    private String categoryName;

    public static PostResponseDto fromEntity(PostEntity post) {
        return new PostResponseDto(
                post.getId(),
                post.getTitle(),
                post.getWriter(),
                post.getContents(),
                post.getCategory().getId(),
                post.getCategory().getName()
        );
    }
}
