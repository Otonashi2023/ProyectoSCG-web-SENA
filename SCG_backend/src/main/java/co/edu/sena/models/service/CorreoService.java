package co.edu.sena.models.service;

public interface CorreoService {
	
	void enviarCorreo(String to, String subject, String body);
}
