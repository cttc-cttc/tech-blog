package com.blog.tech.controller;

import com.blog.tech.dto.PostResponseDto;
import com.blog.tech.entity.IntroEntity;
import com.blog.tech.service.IntroService;
import com.blog.tech.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {

    private final IntroService introService;
    private final PostService postService;

    /**
     * 홈 화면에 표시할 최근 1년 간 작성했던 모든 게시글
     * @return
     */
    @GetMapping("/contribution")
    public ResponseEntity<List<PostResponseDto>> getOneYearPosts() {
        return ResponseEntity.ok(postService.getOneYearPosts());
    }

    @PostMapping("/uploadImg")
    public ResponseEntity<Map<String, String>> uploadImg(@RequestParam("image") MultipartFile file) {
        String imageUrl = introService.upload(file); // db 업로드 후 URL 반환
        Map<String, String> result = new HashMap<>();
        result.put("url", imageUrl);
        return ResponseEntity.ok(result);
    }

}
