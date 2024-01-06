package com.luv2code.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class QuizScore {
    @Id
    private String email;

    private Integer score;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
