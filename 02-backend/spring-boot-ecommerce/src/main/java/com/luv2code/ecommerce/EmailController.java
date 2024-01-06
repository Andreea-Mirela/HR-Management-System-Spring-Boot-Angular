package com.luv2code.ecommerce;

import com.luv2code.ecommerce.dto.UserDto;
import com.luv2code.ecommerce.model.Employee;
import com.luv2code.ecommerce.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody UserDto userDto) throws MessagingException {
        String emailText = "Bună " + userDto.getFirstName()
                + ",<br><br>Îți trimitem acest email pentru a te felicita și a te informa că ai fost adăugat cu succes în sistemul nostru intern HRLink. În calitate de noul nostru angajat, vei avea acces la aplicația noastră internă, unde vei găsi resurse importante pentru munca ta.<br><br>"
                + "Credențialele tale de conectare sunt:<br>"
                + "   - Nume de utilizator: " + userDto.getLogin() + "<br>  - Parolă: " + userDto.getFirstName() + userDto.getLastName() + userDto.getEmail().length() + "!<br><br>"
                + "Pentru a te conecta la aplicația internă, te rugăm să accesezi link-ul de conectare: <a href='http://localhost:4200/login'>http://localhost:4200/login</a><br>"
                + "Te rugăm să păstrezi aceste informații în siguranță și să le utilizezi numai în scopuri de lucru. Asigură-te că îți schimbi parola la prima conectare în scopul securității tale personale.<br>"
                + "Dacă întâmpini probleme în procesul de conectare sau ai nevoie de asistență, te rugăm să contactezi departamentul nostru de Resurse Umane.<br><br>"
                + "Cu drag,<br>Echipa de Resurse Umane";
        emailService.sendMail(userDto.getEmail(), "Bine ai venit în echipă! Detalii de conectare pentru aplicația internă", emailText);
    }
}
