package com.blog.tech.service;

import com.blog.tech.entity.PasswordResetTokenEntity;
import com.blog.tech.entity.UserEntity;
import com.blog.tech.repository.TokenRepository;
import com.blog.tech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(1);

        PasswordResetTokenEntity resetToken = new PasswordResetTokenEntity();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(expiry);

        tokenRepository.save(resetToken);

        String resetLink = "https://front_url/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("비밀번호 재설정 링크");
        message.setText("다음 링크를 클릭하여 비밀번호를 재설정하세요: \n" + resetLink);

        mailSender.send(message);
    }
}
