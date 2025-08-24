package com.blog.tech.service;

import com.blog.tech.dto.RoleType;
import com.blog.tech.dto.UserDto;
import com.blog.tech.entity.UserEntity;
import com.blog.tech.exception.UserNotFoundException;
import com.blog.tech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
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
                .email(request.getEmail())
                .role(RoleType.ROLE_USER)
                .build();
        userRepository.save(user);
    }

    public UserDto getUserInfo(String userId) {
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setNickName(user.getNickName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        return dto;
    }

    public UserDto updateUserInfo(UserDto formData) {
        // 1. 기존 유저 조회
        UserEntity user = userRepository.findByUserId(formData.getUserId())
                .orElseThrow(() -> new UserNotFoundException(formData.getUserId()));

        boolean updated = false;

        // 2. 닉네임 변경
        if(formData.getNickName() != null && !formData.getNickName().equals(user.getNickName())) {
            user.setNickName(formData.getNickName());
            updated = true;
        }

        // 3. 이메일 변경
        if (formData.getEmail() != null && !formData.getEmail().equals(user.getEmail())) {
            user.setEmail(formData.getEmail());
            updated = true;
        }

        // 4. 비밀번호 변경 (빈 값이면 변경하지 않음)
        String newPassword = formData.getPassword();
        String confirmPassword = formData.getConfirmPassword();
        if ((newPassword != null && !newPassword.isEmpty())
                || (confirmPassword != null && !confirmPassword.isEmpty())) {

            if (!confirmPassword.equals(newPassword)) {
                throw new IllegalArgumentException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            updated = true;
        }

        // 5. 변경사항 없음
        if (!updated) {
            throw new IllegalStateException("변경된 값이 없습니다.");
        }

        // 6. 저장 후 DTO 변환
        userRepository.save(user);
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setNickName(user.getNickName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
