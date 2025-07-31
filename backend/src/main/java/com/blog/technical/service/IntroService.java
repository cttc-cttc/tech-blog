package com.blog.technical.service;

import com.blog.technical.entity.IntroEntity;
import com.blog.technical.repository.IntroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IntroService {

    private final IntroRepository introRepository;

    @Autowired
    public IntroService(IntroRepository introRepository) {
        this.introRepository = introRepository;
    }

    public IntroEntity saveIntro(IntroEntity entity) {
        return introRepository.save(entity);
    }

    public IntroEntity findById(int id) {
        return introRepository.findById(id).get();
    }

    public List<IntroEntity> findAll() {
        return introRepository.findAll();
    }
}
