package co.edu.sena.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.models.entity.TipoPlan;
import co.edu.sena.models.service.TipoPlanService;

@RestController
@RequestMapping("/api/tipoplan")
@CrossOrigin(origins= "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class TipoPlanController {

	@Autowired
	TipoPlanService tipoPlanService;
	
	@GetMapping("/{id}")
	public Optional<TipoPlan> buscarPorId(@PathVariable Integer id) {
		
		return tipoPlanService.findById(id);		
	}
	
	@GetMapping("/listar")
	public List<TipoPlan> listarTodos(){
		
		return tipoPlanService.findAll();
	}
	
	@PostMapping
	public TipoPlan guardar(@RequestBody TipoPlan tp) {
		
		return tipoPlanService.save(tp);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Integer id) {
		
		tipoPlanService.deleteById(id);
	}
	
	@PutMapping("/actualizar/{id}")
	public TipoPlan actualizar(@RequestBody TipoPlan tp, @PathVariable Integer id) {
		
		TipoPlan tpEnBD = tipoPlanService.findById(id).get();
		
		tpEnBD.setNombre(tp.getNombre());
				
		return tipoPlanService.save(tpEnBD);
		
	}
}
