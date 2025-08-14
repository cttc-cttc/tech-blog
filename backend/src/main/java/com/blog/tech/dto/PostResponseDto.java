package com.blog.tech.dto;

import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.entity.PostEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponseDto {
    private Long id;
    private String title;
    private String writer;
    private String contents;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String urlNameParent;
    private String urlNameChild;
    private String nameParent;
    private String nameChild;

    public static PostResponseDto fromEntity(PostEntity post) {
        CategoryEntity categoryChild = post.getCategory();
        CategoryEntity categoryParent = categoryChild.getParent(); // 상위 카테고리

        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .contents(post.getContents())
                .writer(post.getWriter())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .urlNameParent(categoryParent != null ? categoryParent.getUrlName() : null)
                .urlNameChild(categoryChild.getUrlName())
                .nameParent(categoryParent != null ? categoryParent.getName() : null)
                .nameChild(categoryChild.getName())
                .build();
    }
}
