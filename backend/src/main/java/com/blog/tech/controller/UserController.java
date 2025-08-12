package com.blog.tech.controller;

import com.blog.tech.dto.UserDto;
import com.blog.tech.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/valid-duplicate-userId")
    public ResponseEntity<Map<String, Boolean>> validDuplicateUserId(@RequestBody UserDto request) {
        userService.validDuplicateUserId(request.getUserId());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/valid-duplicate-nickName")
    public ResponseEntity<Map<String, Boolean>> validDuplicateNickName(@RequestBody UserDto request) {
        userService.validDuplicateNickName(request.getNickName());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/valid-duplicate-email")
    public ResponseEntity<Map<String, Boolean>> validDuplicateEmail(@RequestBody UserDto request) {
        userService.validDuplicateEmail(request.getEmail());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Boolean>> register(@RequestBody UserDto request) {
       userService.register(request);
       return ResponseEntity.ok(Map.of("success", true));
    }

}
