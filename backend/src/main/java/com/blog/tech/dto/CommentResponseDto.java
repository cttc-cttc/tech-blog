package com.blog.tech.dto;

import com.blog.tech.entity.CommentEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponseDto> children;

    public static CommentResponseDto fromEntity(CommentEntity comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .userId(comment.getUserId())
                .writer(comment.getNickName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .children(comment.getChildren()
                        .stream()
                        .map(CommentResponseDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
