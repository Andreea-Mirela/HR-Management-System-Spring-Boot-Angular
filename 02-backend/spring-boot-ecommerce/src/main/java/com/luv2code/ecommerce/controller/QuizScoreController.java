package com.luv2code.ecommerce.controller;


import com.luv2code.ecommerce.entity.QuizScore;
import com.luv2code.ecommerce.repo.QuizScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class QuizScoreController {

    @Autowired
    private QuizScoreRepository quizScoreRepository;

    @PostMapping("/saveScore")
    public QuizScore saveScore(@RequestBody QuizScore newScore) {
        QuizScore existingScore = quizScoreRepository.findByEmail(newScore.getEmail());
        if (existingScore != null) {
            // adaugă la scorul existent
            existingScore.setScore(existingScore.getScore() + newScore.getScore());
            return quizScoreRepository.save(existingScore);
        } else {
            // dacă nu există niciun scor pentru acest e-mail, creează unul nou
            return quizScoreRepository.save(newScore);
        }
    }

    @GetMapping("/getTotalScore")
    public Integer getTotalScore(@RequestParam String email) {
        QuizScore quizScore = quizScoreRepository.findByEmail(email);
        return quizScore != null ? quizScore.getScore() : 0;
    }

}