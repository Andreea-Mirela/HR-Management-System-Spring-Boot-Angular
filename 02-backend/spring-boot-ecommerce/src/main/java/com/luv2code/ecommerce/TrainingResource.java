package com.luv2code.ecommerce;

import com.luv2code.ecommerce.model.Training;
import com.luv2code.ecommerce.repo.TrainingRepo;
import com.luv2code.ecommerce.service.TrainingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/training")
public class TrainingResource {
    private final TrainingService trainingService;
    @Autowired
    private TrainingRepo trainingRepo;

    public TrainingResource(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Training>> getAllTraining() {
        List<Training> trainings = trainingService.findAllTrainings();
        return new ResponseEntity<>(trainings, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Training> getTrainingById(@PathVariable("id") Long id) {
        Training training = trainingService.findTrainingById(id);
        return new ResponseEntity<>(training, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Training> addTraining(@RequestParam("title") String title,
                                                @RequestParam("type") String type,
                                                @RequestParam("time") String time,
                                                @RequestParam("description") String description,
                                                @RequestParam("logo") MultipartFile logo,
                                                @RequestParam("document") MultipartFile document,
                                                @RequestParam("video") MultipartFile video) {
        try {
            byte[] logoBytes = logo.getBytes();
            byte[] documentBytes = document.getBytes();
            byte[] videoBytes = video.getBytes();

            Training training = new Training();
            training.setTitle(title);
            training.setType(type);
            training.setTime(time);
            training.setDescription(description);
            training.setLogo(logoBytes);
            training.setDocument(documentBytes);
            training.setVideo(videoBytes);

            Training newTraining = trainingService.addTraining(training);
            return new ResponseEntity<>(newTraining, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/update")
    public ResponseEntity<Training> updateTraining(@RequestParam("id") Long id,
                                                   @RequestParam("title") String title,
                                                   @RequestParam("type") String type,
                                                   @RequestParam("time") String time,
                                                   @RequestParam("description") String description,
                                                   @RequestParam(value = "logo", required = false) MultipartFile logo,
                                                   @RequestParam(value = "document", required = false) MultipartFile document,
                                                   @RequestParam(value = "video", required = false) MultipartFile video) {
        try {
            Training training = new Training();
            training.setId(id);
            training.setTitle(title);
            training.setType(type);
            training.setTime(time);
            training.setDescription(description);

            if (logo != null && !logo.isEmpty()) {
                byte[] logoBytes = logo.getBytes();
                training.setLogo(logoBytes);
            }

            if (document != null && !document.isEmpty()) {
                byte[] documentBytes = document.getBytes();
                training.setDocument(documentBytes);
            }

            if (video != null && !video.isEmpty()) {
                byte[] videoBytes = video.getBytes();
                training.setVideo(videoBytes);
            }

            Training updatedTraining = trainingService.updateTraining(training);
            return new ResponseEntity<>(updatedTraining, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTraining(@PathVariable("id") Long id) {
        trainingService.deleteTraining(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value = "/images/{trainingId}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getTrainingLogo(@PathVariable("trainingId") Long trainingId) {
        Training training = trainingService.findTrainingById(trainingId);

        if (training != null && training.getLogo() != null) {
            byte[] logoBytes = training.getLogo();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);

            return new ResponseEntity<>(logoBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/documents/{trainingId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getTrainingDocument(@PathVariable("trainingId") Long trainingId) {
        Training training = trainingService.findTrainingById(trainingId);

        if (training != null && training.getDocument() != null) {
            byte[] documentBytes = training.getDocument();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            return new ResponseEntity<>(documentBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/videos/{trainingId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<ByteArrayResource> getTrainingVideo(@PathVariable("trainingId") Long trainingId) {
        Training training = trainingService.findTrainingById(trainingId);

        if (training != null && training.getVideo() != null) {
            byte[] videoBytes = training.getVideo();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "video.mp4");

            ByteArrayResource resource = new ByteArrayResource(videoBytes);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
