package com.blog.tech.service;

import com.blog.tech.entity.UserEntity;
import com.blog.tech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository; // JPA Repository

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // DB에서 사용자 조회
        UserEntity userEntity = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userId));

        // Spring Security User 객체로 변환
        return User.builder()
                .username(userEntity.getUserId())
                .password(userEntity.getPassword()) // 반드시 암호화된 비밀번호
                .roles("USER") // ex: "USER", "ADMIN"
                .build();
    }
}
