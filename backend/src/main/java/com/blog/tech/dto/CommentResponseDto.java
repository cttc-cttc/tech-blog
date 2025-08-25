package com.blog.tech.dto;

import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.entity.CommentEntity;
import com.blog.tech.entity.PostEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Long id;
    private String userId;
    private String writer;
    private String content;
    private Long postId;
    private Long parentId;
    private String postTitle;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponseDto> children;
    private String category1;
    private String category2;

    public static CommentResponseDto fromEntity(CommentEntity comment) {
        PostEntity post = comment.getPost();
        CategoryEntity category = post != null ? post.getCategory() : null;

        // 최상위/하위 카테고리 가져오기
        String category1 = null;
        String category2 = null;

        if (category != null) {
            if (category.getDepth() == 0) {
                category1 = category.getUrlName();
            } else if (category.getDepth() == 1) {
                category2 = category.getUrlName();
                // 상위 카테고리 가져오기
                if (category.getParent() != null) {
                    category1 = category.getParent().getUrlName();
                }
            } else {
                // 필요하면 더 깊은 depth 처리 가능
            }
        }

        return CommentResponseDto.builder()
                .id(comment.getId())
                .userId(comment.getUserId())
                .writer(comment.getNickName())
                .content(comment.getContent())
                .postId(post != null ? post.getId() : null)
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .postTitle(comment.getPost() != null ? comment.getPost().getTitle() : null)
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .children(comment.getChildren()
                        .stream()
                        .map(CommentResponseDto::fromEntity)
                        .collect(Collectors.toList()))
                .category1(category1)
                .category2(category2)
                .build();
    }
}
