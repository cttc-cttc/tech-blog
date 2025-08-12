package com.blog.tech;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.security.Key;

@EnableJpaAuditing
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class TechBlogApplication {

	public static void main(String[] args) {
//		Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//		String base64Key = Encoders.BASE64.encode(key.getEncoded());
//		System.out.println("Generated key (Base64): " + base64Key);
		SpringApplication.run(TechBlogApplication.class, args);
	}

}
