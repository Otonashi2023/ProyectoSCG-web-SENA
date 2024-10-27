package co.edu.sena.models.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.models.entity.Usuario;
import co.edu.sena.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService{

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	private CorreoService correoService;
	
	@Override
	public Usuario save(Usuario u) {
		
		return usuarioRepository.save(u);
	}

	@Override
	public String login(String user, String ctr) {
		
		Usuario usuario = usuarioRepository.findByUsername(user);
		
		if(usuario == null) {
			return "usuario no encontrado";
		}
		
		if(!usuario.getPassword().equals(ctr)) {
			return "contraseña incorrecta";
		}
		
		return "inicio de sesion exitoso";
	}

	@Override
	public Optional<Usuario> findById(BigInteger id) {
		
		return usuarioRepository.findById(id);
	}

	@Override
	public List<Usuario> findAll() {
		
		return usuarioRepository.findAll();
	}

	@Override
	public void deleteById(BigInteger id) {
		
		usuarioRepository.deleteById(id);
	}

	@Override
	public Optional<Usuario> findByCorreo(String correo) {
		return usuarioRepository.findByPersonal_Persona_Correo(correo);
	}

	@Override
	public void enviarCorreoRecuperacion(Usuario u) {
		// Validamos que Usuario, Personal y Persona no sean nulos
	    if (u != null && u.getPersonal() != null && u.getPersonal().getPersona() != null) {
	        // Accedemos al correo desde la entidad Persona
	        String correo = u.getPersonal().getPersona().getCorreo();
	        
	        // Construir el mensaje del correo
	        String mensaje = "<p>Hola <strong>" + u.getPersonal().getPersona().getNombres() + "</strong>,</p>"
	                + "<p>Usa este enlace para cambiar tu contraseña:</p>"
	                + "<a href=\"http://localhost:8090/#/login?redirect=/\">Cambia tu contraseña</a><br><br>"
	                + "<p><strong>Tus credenciales son:</strong></p>"
	                + "<p><b>Username:</b> " + u.getUsername() + "<br>"
	                + "<b>Password:</b> " + u.getPassword() + "</p>"
	                + "<p>Por favor, <strong>cambia tu contraseña</strong> después de iniciar sesión.</p>";

	        // Enviar el correo usando el servicio de correo
	        correoService.enviarCorreo(correo, "Recuperación de contraseña", mensaje);
	    } else {
	        System.out.println("No se encontró un usuario asociado a esa persona.");
	    }
		
	}

}
