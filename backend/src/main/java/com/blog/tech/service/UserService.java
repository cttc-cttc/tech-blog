package com.blog.tech.service;

import com.blog.tech.dto.UserDto;
import com.blog.tech.entity.UserEntity;
import com.blog.tech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void validDuplicateUserId(String userId) {
        if (userId == null) {
            throw new RuntimeException("userId : null");
        }
        if (userRepository.existsByUserId(userId)) {
            throw new RuntimeException("이미 존재하는 사용자 ID입니다.");
        }
    }

    public void validDuplicateNickName(String nickName) {
        if (nickName == null) {
            throw new RuntimeException("nickName : null");
        }
        if (userRepository.existsByNickName(nickName)) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }
    }

    public void validDuplicateEmail(String email) {
        if (email == null) {
            throw new RuntimeException("email : null");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }
    }

    public void register(UserDto request) {
//        if (userRepository.existsByUserId(request.getUserId())) {
//            throw new RuntimeException("이미 존재하는 사용자 ID입니다.");
//        }
//        if (userRepository.existsByNickName(request.getNickName())) {
//            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
//        }
//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("이미 사용 중인 이메일입니다.");
//        }

        UserEntity user = UserEntity.builder()
                .userId(request.getUserId())
                .nickName(request.getNickName())
                .password(passwordEncoder.encode(request.getPassword())) // 암호화
//                .password(request.getPassword())
                .email(request.getEmail()).build();
        userRepository.save(user);
    }

    public void login(UserDto request) {
        UserEntity user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
    }
}
