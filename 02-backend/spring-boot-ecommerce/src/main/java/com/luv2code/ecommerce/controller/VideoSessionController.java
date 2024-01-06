package com.luv2code.ecommerce.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.luv2code.ecommerce.model.VideoSession;
import com.luv2code.ecommerce.service.VideoSessionService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/videoSessions")
public class VideoSessionController {

    @Autowired
    private VideoSessionService videoSessionService;

    @PostMapping
    public VideoSession createVideoSession(@RequestBody VideoSession videoSession) throws MessagingException {
        return videoSessionService.createVideoSession(videoSession);
    }

    @GetMapping("/latest")
    public VideoSession getLatestVideoSession() {
        return videoSessionService.findLatestVideoSession();
    }



    // alte endpointuri necesare
}