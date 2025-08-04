package com.blog.tech.controller;

import com.blog.tech.entity.PasswordResetTokenEntity;
import com.blog.tech.dto.ForgotPasswordRequestDto;
import com.blog.tech.dto.ResetPasswordRequestDto;
import com.blog.tech.entity.UserEntity;
import com.blog.tech.repository.TokenRepository;
import com.blog.tech.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PasswordResetController {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDto request) throws MessagingException {
        UserEntity user = userRepository.findByUserIdAndEmail(request.getUserId(), request.getEmail())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(30); // 만료시간 설정

        PasswordResetTokenEntity resetToken = new PasswordResetTokenEntity(token, user, expiry);
        tokenRepository.save(resetToken);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        // 메일 전송
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

        helper.setFrom("kwystechblog@gmail.com"); // 이거 추가 후 555 syntax 에러 해결
        helper.setTo(user.getEmail());
        helper.setSubject("kwy's tech blog 비밀번호 재설정 링크입니다.");
        helper.setText("아래 링크를 클릭해 비밀번호를 재설정하세요:\n" + resetLink);

        mailSender.send(mimeMessage);

        return ResponseEntity.ok("비밀번호 재설정 링크를 이메일로 전송했습니다.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequestDto request) {
        PasswordResetTokenEntity token = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("유효하지 않은 토큰입니다."));

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("토큰이 만료되었습니다.");
        }

        UserEntity user = token.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword())); // BCrypt 알고리즘으로 암호화(해시)된 비밀번호
//        user.setPassword(request.getNewPassword()); // 일반 String
        userRepository.save(user); // 유저 정보 update

        tokenRepository.delete(token); // 한 번 쓰면 제거

        return ResponseEntity.ok("비밀번호 변경 완료");
    }
}
