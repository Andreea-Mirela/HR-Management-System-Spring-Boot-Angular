package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.model.VideoSession;
import com.luv2code.ecommerce.repo.VideoSessionRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class VideoSessionService {

    @Autowired
    private VideoSessionRepository videoSessionRepository;


    @Autowired
    private EmailService emailService;

    @Transactional
    public VideoSession createVideoSession(VideoSession videoSession) throws MessagingException {
        VideoSession savedVideoSession = videoSessionRepository.save(videoSession);

        String sessionDateTimeStr = videoSession.getSessionDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm").withZone(ZoneOffset.UTC);

        OffsetDateTime sessionDateTime = OffsetDateTime.parse(sessionDateTimeStr, formatter);

// Trimite e-mail la adresa introdusă
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");


        // Trimite e-mail la adresa introdusă
        String emailText = "Bună,<br><br>"
                + "Ai fost invitat să participi la training la data și ora: " + sessionDateTime.format(outputFormatter) + "<br>"
                + "Parola pentru sesiune este: " + videoSession.getPassword() + "<br><br> Te așteptăm cu drag la sesiunea live de prezentare!<br>Echipa HRLink";

        emailService.sendMail(videoSession.getInviteeEmail1(), "Invitație la sesiunea de training", emailText);


        return savedVideoSession;
    }

    public VideoSession findLatestVideoSession() {
        OffsetDateTime currentDateTime = OffsetDateTime.now(ZoneOffset.UTC);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        String currentDateTimeStr = currentDateTime.format(formatter);

        List<VideoSession> videoSessions = videoSessionRepository.findLatestVideoSessions(currentDateTimeStr);
        if (!videoSessions.isEmpty()) {
            return videoSessions.get(0);
        }
        return null;
    }


    private String formatDateTime(OffsetDateTime sessionDateTime, DateTimeFormatter formatter) {
        return sessionDateTime.format(formatter);
    }

}