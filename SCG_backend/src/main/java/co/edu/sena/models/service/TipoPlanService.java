package co.edu.sena.models.service;

import java.util.List;
import java.util.Optional;

import co.edu.sena.models.entity.TipoPlan;

public interface TipoPlanService {

	public Optional<TipoPlan>findById(Integer id);
	public List<TipoPlan> findAll();
	public TipoPlan save(TipoPlan tp);
	public void deleteById(Integer id);
}
