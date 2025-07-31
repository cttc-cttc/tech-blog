package com.blog.technical.controller;

import com.blog.technical.entity.IntroEntity;
import com.blog.technical.service.IntroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
    public IntroEntity saveIntro(IntroEntity entity) {
        return introService.saveIntro(entity);
    }

    @PostMapping("/intro-findLastOne")
    public IntroEntity findLastOne() {
        return introService.findLastOne();
    }

    @PostMapping("/intro-update")
    public IntroEntity updateIntro(IntroEntity entity) {
        return introService.updateIntro(entity);
    }

}
