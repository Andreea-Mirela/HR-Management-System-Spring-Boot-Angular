package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.model.Quiz;
import com.luv2code.ecommerce.repo.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz saveQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getQuizzesByTrainingId(Long trainingId) {
        return quizRepository.findByTrainingId(trainingId);
    }
}