package com.blog.tech.controller;

import com.blog.tech.entity.IntroEntity;
import com.blog.tech.service.IntroService;
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



    @PostMapping("/intro-findLastOne")
    public IntroEntity findLastOne() {
        return introService.findLastOne();
    }



    @PostMapping("/uploadImg")
    public ResponseEntity<Map<String, String>> uploadImg(@RequestParam("image") MultipartFile file) {
        String imageUrl = introService.upload(file); // db 업로드 후 URL 반환
        Map<String, String> result = new HashMap<>();
        result.put("url", imageUrl);
        return ResponseEntity.ok(result);
    }
}
