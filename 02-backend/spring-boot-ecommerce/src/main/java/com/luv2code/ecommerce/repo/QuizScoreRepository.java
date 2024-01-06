package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.entity.QuizScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizScoreRepository extends JpaRepository<QuizScore, String> {
    QuizScore findByEmail(String email);
}