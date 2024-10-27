package co.edu.sena.controller;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import co.edu.sena.models.entity.Persona;
import co.edu.sena.models.service.PersonaService;

@RestController
@RequestMapping("/api/persona")
@CrossOrigin(origins= "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class PersonaController {
	@Autowired
	PersonaService personaService;
		
	private static final String UPLOAD_DIR = "C:/Users/Otonashi/SCG/";
	
	@GetMapping("/{id}")
	public Optional<Persona> buscarPorId(@PathVariable BigInteger id) {
		
		return personaService.findById(id);		
	}
	
	@GetMapping("/listar")
	public List<Persona> listarTodos(){
		
		return personaService.findAll();
	}
	
	@PostMapping
	public Persona guardar(@RequestBody Persona pe) {
		
		return personaService.save(pe);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable BigInteger id) {
		
		personaService.deleteById(id);
	}
	
	@PutMapping("/actualizar/{id}")
	public Persona actualizar(@RequestBody Persona pe, @PathVariable BigInteger id) {
		
		Persona peEnBD = personaService.findById(id).get();
		
		peEnBD.setNombres(pe.getNombres());
		peEnBD.setApellidos(pe.getApellidos());
		peEnBD.setCedula(pe.getCedula());
		peEnBD.setCelular(pe.getCelular());
		peEnBD.setContacto(pe.getContacto());
		peEnBD.setCelularAlt(pe.getCelularAlt());
		peEnBD.setCorreo(pe.getCorreo());
		peEnBD.setTipoDocumento(pe.getTipoDocumento());
		peEnBD.setFoto(pe.getFoto());
		
		return personaService.save(peEnBD);
		
	}
		
	// Método para subir una imagen
	@PostMapping("/upload/{id}")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable BigInteger id) {
	    try {
	    	
	        // Verificar que el archivo no esté vacío
	        if (file.isEmpty()) {
	            return new ResponseEntity<>("Por favor, seleccione una imagen.", HttpStatus.BAD_REQUEST);
	        }

	        // Obtener el nombre original del archivo
	        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

	        // Generar un nombre único usando el timestamp
	        //String fileName = System.currentTimeMillis() + "_" + originalFileName;
	        
	     // Generar un nombre de archivo único
	        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
	        String uniqueFileName = UUID.randomUUID().toString() + "_" + System.currentTimeMillis() + fileExtension;

	        // Crear el directorio si no existe
	        Path uploadPath = Paths.get(UPLOAD_DIR);
	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        // Crear el archivo en la ubicación externa
	        Path path = uploadPath.resolve(uniqueFileName);
	        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	        // Devolver la URL local o la ruta relativa a la imagen
	        String imageUrl = "/imagenes/" + uniqueFileName;

	        // Actualizar la entidad Persona con la URL de la imagen
	        Optional<Persona> optionalPersona = personaService.findById(id);
	        if (optionalPersona.isPresent()) {
	            Persona persona = optionalPersona.get();
	            persona.setFoto(imageUrl); // Guardar la URL de la imagen
	            personaService.save(persona); // Guardar la entidad actualizada
	            return new ResponseEntity<>(imageUrl, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Persona no encontrada.", HttpStatus.NOT_FOUND);
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Error al subir la imagen.", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
