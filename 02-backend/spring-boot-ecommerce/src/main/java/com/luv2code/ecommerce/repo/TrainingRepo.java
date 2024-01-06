package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainingRepo extends JpaRepository<Training,Long> {
    void deleteTrainingById(Long id);

    Optional<Training> findTrainingById(Long id);
}
