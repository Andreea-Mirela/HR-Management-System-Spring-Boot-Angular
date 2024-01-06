package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.exception.UserNotFoundException;
import com.luv2code.ecommerce.model.Training;
import com.luv2code.ecommerce.repo.TrainingRepo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {
    private final TrainingRepo trainingRepo;

    public TrainingService(TrainingRepo trainingRepo) {
        this.trainingRepo = trainingRepo;
    }

    public Training addTraining(Training training){
        return trainingRepo.save(training);
    }

    public List<Training> findAllTrainings() {
        return trainingRepo.findAll();
    }

    public Training updateTraining(Training training) {
        return trainingRepo.save(training);
    }

    public Training findTrainingById(Long id) {
        return trainingRepo.findTrainingById(id).orElseThrow(() -> new UserNotFoundException("Training by id" + id + "was not found"));
    }
    public void deleteTraining(Long id) {
        trainingRepo.deleteTrainingById(id); //spring intelege ce vrem sa facem dupa conventia de nume a metodei
    }
}
