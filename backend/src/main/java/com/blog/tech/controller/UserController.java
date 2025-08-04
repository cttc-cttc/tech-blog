package com.blog.tech.controller;

import com.blog.tech.dto.UserDto;
import com.blog.tech.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Boolean>> register(@RequestBody UserDto request) {
       userService.register(request);
       return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Boolean>> login(@RequestBody UserDto request) {
        userService.login(request);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
