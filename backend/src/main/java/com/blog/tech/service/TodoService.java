package com.blog.tech.service;

import com.blog.tech.dto.todo.TodoRequestDto;
import com.blog.tech.dto.todo.TodoResponseDto;
import com.blog.tech.entity.TodoEntity;
import com.blog.tech.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    /**
     * todo 등록
     * @param request
     * @return
     */
    public TodoResponseDto addTodo(TodoRequestDto request) {
        TodoEntity todo = TodoEntity.builder()
                .title(request.getTitle())
                .writer(request.getWriter())
                .content(request.getContent())
                .build();

        TodoEntity saved = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(saved);
    }

    /**
     * todo list 전체 조회
     * @return
     */
    public List<TodoResponseDto> getTodos() {
        return todoRepository.findAll()
                .stream()
                .map(TodoResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
