package com.blog.tech.dto;

import com.blog.tech.entity.Comment;
import lombok.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
    private Long id;
    private String writer;
    private String content;
    private List<CommentDto> children;

    public static CommentDto fromEntity(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .writer(comment.getNickName())
                .content(comment.getContent())
                .children(comment.getChildren()
                        .stream()
                        .map(CommentDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
