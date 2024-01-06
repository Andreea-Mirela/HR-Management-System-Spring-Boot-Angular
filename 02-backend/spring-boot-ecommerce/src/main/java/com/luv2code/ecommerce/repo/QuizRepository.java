package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByTrainingId(Long trainingId);
}