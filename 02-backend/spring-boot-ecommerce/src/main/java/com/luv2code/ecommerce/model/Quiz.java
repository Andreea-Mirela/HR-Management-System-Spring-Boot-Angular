package com.luv2code.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @Column(name = "training_id")
    private Long trainingId;

    @Column(name = "quiz_json", columnDefinition = "json")
    private String quizJson;

    public Quiz() {
        // Constructor implicit fără argumente
    }

    public Quiz(Long quizId, Long trainingId, String quizJson) {
        this.quizId = quizId;
        this.trainingId = trainingId;
        this.quizJson = quizJson;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }

    public String getQuizJson() {
        return quizJson;
    }

    public void setQuizJson(String quizJson) {
        this.quizJson = quizJson;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "quizId=" + quizId +
                ", trainingId=" + trainingId +
                ", quizJson='" + quizJson + '\'' +
                '}';
    }
}