package co.edu.sena.models.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class CorreoServiceImpl implements CorreoService{
	
	@Autowired
    private JavaMailSender mailSender;

	@Override
	public void enviarCorreo(String to, String subject, String body) {
		try {
			 MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // true para enviar HTML
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Manejar la excepción
        }
		
	}
	
}
