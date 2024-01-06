package com.luv2code.ecommerce.model;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class VideoSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_date_time", nullable = false)
    private String sessionDateTime;

    @Column(nullable = false)
    private String password;

    @Column(name = "invitee_email1")
    private String inviteeEmail1;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionDateTime() {
        return sessionDateTime;
    }

    public void setSessionDateTime(String sessionDateTime) {
        this.sessionDateTime = sessionDateTime;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getInviteeEmail1() {
        return inviteeEmail1;
    }

    public void setInviteeEmail1(String inviteeEmail1) {
        this.inviteeEmail1 = inviteeEmail1;
    }

}
