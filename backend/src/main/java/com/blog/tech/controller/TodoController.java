package com.blog.tech.controller;

import com.blog.tech.dto.todo.TodoRequestDto;
import com.blog.tech.dto.todo.TodoResponseDto;
import com.blog.tech.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    /**
     * todo 등록
     * @param todoData
     * @return
     */
    @PostMapping("/todo")
    public ResponseEntity<TodoResponseDto> addTodo(@RequestBody TodoRequestDto todoData) {
        return ResponseEntity.ok(todoService.addTodo(todoData));
    }

    /**
     * todo list 전체 조회
     * @return
     */
    @GetMapping("/todo")
    public ResponseEntity<List<TodoResponseDto>> getTodos() {
        return ResponseEntity.ok(todoService.getTodos());
    }
}
