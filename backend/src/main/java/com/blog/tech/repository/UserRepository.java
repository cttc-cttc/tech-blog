package com.blog.tech.repository;

import com.blog.tech.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    /**
     * SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END
     * FROM UserEntity u
     * WHERE u.userId = :userId
     */
    boolean existsByUserId(String userId);

    boolean existsByNickName(String nickName);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByUserId(String userId);

    // SELECT u FROM UserEntity u WHERE u.email = :email
    Optional<UserEntity> findByEmail(String email);

    // SELECT u FROM UserEntity u WHERE u.userId = :userId AND u.email = :email
    Optional<UserEntity> findByUserIdAndEmail(String userId, String email);
}
