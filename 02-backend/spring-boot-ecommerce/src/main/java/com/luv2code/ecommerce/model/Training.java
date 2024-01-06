package com.luv2code.ecommerce.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Training implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String title;
    private String type;
    private String time;
    private String description;
    private byte[] logo;
    private byte[] document;
    private byte[] video;

    public Training() {
    }

    public Training(Long id, String title, String type, String time, String description, byte[] logo, byte[] document, byte[] video) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.time = time;
        this.description = description;
        this.logo = logo;
        this.document = document;
        this.video = video;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String email) {
        this.type = email;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public byte[] getDocument() {
        return document;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] video) {
        this.video = video;
    }

    @Override
    public String toString() {
        return "Training{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", time='" + time + '\'' +
                ", description='" + description + '\'' +
                ", logo='" + logo + '\'' +
                ", document='" + document + '\'' +
                ", video='" + video + '\'' +
                '}';
    }
}
