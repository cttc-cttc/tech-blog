package com.blog.technical.service;

import com.blog.technical.entity.IntroEntity;
import com.blog.technical.repository.IntroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public IntroEntity findLastOne() {
        Optional<Integer> result = Optional.ofNullable(introRepository.findMostRecentId());
        return result.map(integer -> introRepository.findById(integer).get()).orElse(new IntroEntity());
    }

    public IntroEntity updateIntro(IntroEntity entity) {
        int id = Integer.parseInt(entity.getPost_id_str());
        entity.setPost_id(id);
        return introRepository.save(entity);
    }

    public List<IntroEntity> findAll() {
        return introRepository.findAll();
    }
}
