package com.luv2code.ecommerce;

import com.luv2code.ecommerce.model.Quiz;
import com.luv2code.ecommerce.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.saveQuiz(quiz);
    }

    @GetMapping("/{trainingId}")
    public List<Quiz> getQuizzesByTrainingId(@PathVariable Long trainingId) {
        return quizService.getQuizzesByTrainingId(trainingId);
    }
}

