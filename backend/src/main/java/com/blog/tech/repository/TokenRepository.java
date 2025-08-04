package com.blog.tech.repository;

import com.blog.tech.entity.PasswordResetTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<PasswordResetTokenEntity, Integer> {

    // SELECT p FROM PasswordResetTokenEntity p WHERE p.token = :token
    Optional<PasswordResetTokenEntity> findByToken(String token);
}
