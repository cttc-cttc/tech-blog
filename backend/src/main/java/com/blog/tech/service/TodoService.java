package com.blog.tech.service;

import com.blog.tech.dto.todo.TodoRequestDto;
import com.blog.tech.dto.todo.TodoResponseDto;
import com.blog.tech.entity.TodoEntity;
import com.blog.tech.repository.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
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

    /**
     * todo 업데이트
     * @param request
     * @return
     */
    public TodoResponseDto updateTodo(TodoRequestDto request) {
        TodoEntity todo = todoRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("todo가 존재하지 않습니다 id: "+ request.getId()));

        todo.setTitle(request.getTitle());
        todo.setContent(request.getContent());

        TodoEntity updated = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(updated);
    }

    /**
     * todo 삭제
     * @param id
     */
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }
}
