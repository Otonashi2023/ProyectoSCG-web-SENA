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

import co.edu.sena.models.entity.Ejercicio;
import co.edu.sena.models.entity.Persona;
import co.edu.sena.models.service.EjercicioService;

@RestController
@RequestMapping("/api/ejercicio")
@CrossOrigin(origins= "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class EjercicioController {
	@Autowired
	EjercicioService ejercicioService;
	
	private static final String UPLOAD_DIR = "C:/Users/Otonashi/SCG/";
	
	@GetMapping("/{id}")
	public Optional<Ejercicio> buscarPorId(@PathVariable Integer id) {
		
		return ejercicioService.findById(id);		
	}
	
	@GetMapping("/listar")
	public List<Ejercicio> listarTodos(){
		
		return ejercicioService.findAll();
	}
	
	@PostMapping
	public Ejercicio guardar(@RequestBody Ejercicio e) {
		
		return ejercicioService.save(e);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		
		ejercicioService.deleteById(id);
	}
	
	@PutMapping("/actualizar/{id}")
	public Ejercicio actualizar(@RequestBody Ejercicio e, @PathVariable Integer id) {
		
		Ejercicio eEnBD = ejercicioService.findById(id).get();
		
		eEnBD.setNombre(e.getNombre());
		eEnBD.setSeries(e.getSeries());
		eEnBD.setRepeticiones(e.getRepeticiones());
		eEnBD.setDescanso(e.getDescanso());
		eEnBD.setTipoEjercicio(e.getTipoEjercicio());
		eEnBD.setMusculo(e.getMusculo());
		eEnBD.setImagen(e.getImagen());
		
		return ejercicioService.save(eEnBD);
		
	}
	
	@PostMapping("/upload/{id}")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable Integer id) {
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
	        Optional<Ejercicio> optionalEjercicio = ejercicioService.findById(id);
	        if (optionalEjercicio .isPresent()) {
	        	Ejercicio  ejercicio  = optionalEjercicio.get();
	        	ejercicio.setImagen(imageUrl); // Guardar la URL de la imagen
	        	ejercicioService.save(ejercicio); // Guardar la entidad actualizada
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
