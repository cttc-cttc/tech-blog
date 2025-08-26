package com.blog.tech.dto.todo;

import com.blog.tech.entity.TodoEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoResponseDto {
    private Long id;
    private String title;
    private String content;
    private TodoState state;
    private LocalDateTime createdAt;

    public static TodoResponseDto fromEntity(TodoEntity todo) {
        return TodoResponseDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .content(todo.getContent())
                .state(todo.getState())
                .createdAt(todo.getCreatedAt())
                .build();
    }
}
