package co.edu.sena.models.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.sena.models.entity.TipoPlan;
import co.edu.sena.repository.TipoPlanRepository;

@Service
public class TipoPlanServiceImpl implements TipoPlanService {

	@Autowired
	TipoPlanRepository tipoPlanRepository;
	
	@Override
	public Optional<TipoPlan> findById(Integer id) {
		
		return tipoPlanRepository.findById(id);
	}

	@Override
	public List<TipoPlan> findAll() {
		
		return tipoPlanRepository.findAll();
	}

	@Override
	public TipoPlan save(TipoPlan tp) {
		
		return tipoPlanRepository.save(tp);
	}

	@Override
	public void deleteById(Integer id) {
		
		tipoPlanRepository.deleteById(id);
	}

}
