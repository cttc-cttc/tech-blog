package com.blog.tech.controller;

import com.blog.tech.dto.UserDto;
import com.blog.tech.entity.UserEntity;
import com.blog.tech.jwt.JwtTokenProvider;
import com.blog.tech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto request) {
        String userId = request.getUserId();
        String password = request.getPassword();
        System.out.println("userId:" + userId + ", password:" + password);
        try {
            // 인증 처리
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userId, password)
            );

            // DB에서 유저 정보 조회
            UserEntity user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 토큰 생성
            String token = jwtTokenProvider.createToken(userId);

            // 응답 데이터 구성
            Map<String, Object> body = new HashMap<>();
            body.put("success", true);
            body.put("accessToken", token);
            body.put("userId", user.getUserId());
            body.put("nickName", user.getNickName());
            body.put("role", user.getRole());

            return ResponseEntity.ok(body);

        } catch (AuthenticationException e) {
            Map<String, Object> body = new HashMap<>();
            body.put("success", false);
            body.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
        }
    }

}
