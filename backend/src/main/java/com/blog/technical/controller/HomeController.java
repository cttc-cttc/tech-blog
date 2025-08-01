package com.blog.technical.controller;

import com.blog.technical.entity.IntroEntity;
import com.blog.technical.service.IntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api")
public class HomeController {

    private final IntroService introService;

    @Autowired
    public HomeController(IntroService introService) {
        this.introService = introService;
    }

    @GetMapping("/hello")
    public List<String> hello() {
        return Arrays.asList("시작 페이지", "hi react");
    }

    @GetMapping("/intro")
    public String findAll() {
        List<IntroEntity> result = introService.findAll();

        if(!result.isEmpty()) {
            return result.getFirst().getContents();
        }
        return "";
    }

    @PostMapping("/intro-insert")
    public void saveIntro(IntroEntity entity, @RequestParam("images") List<String> images) {
        introService.saveIntro(entity, images);
    }

    @PostMapping("/intro-findLastOne")
    public IntroEntity findLastOne() {
        return introService.findLastOne();
    }

    @PostMapping("/intro-update")
    public void updateIntro(IntroEntity entity, @RequestParam("images") List<String> images) {
        introService.updateIntro(entity, images);
    }

    @PostMapping("/uploadImg")
    public ResponseEntity<Map<String, String>> uploadImg(@RequestParam("image") MultipartFile file) {
        String imageUrl = introService.upload(file); // db 업로드 후 URL 반환
        Map<String, String> result = new HashMap<>();
        result.put("url", imageUrl);
        return ResponseEntity.ok(result);
    }
}
