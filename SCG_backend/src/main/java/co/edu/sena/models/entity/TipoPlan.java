package co.edu.sena.models.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tipo_plan")
public class TipoPlan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_tipo_plan", nullable = false)
	private int codigo;
	
	@Column(name="nom_plan", length = 45, nullable=false)
	private String nombre;
	
	@OneToMany
	@JoinColumn(name = "tipo_plan")
	private List<Plan> plan = new ArrayList<>();

	public TipoPlan() {
		super();
	}

	public TipoPlan(int codigo) {
		super();
		this.codigo = codigo;
	}

	public TipoPlan(String nombre, List<Plan> plan) {
		super();
		this.nombre = nombre;
		this.plan = plan;
	}

	public TipoPlan(int codigo, String nombre, List<Plan> plan) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.plan = plan;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "TipoPlan [codigo=" + codigo + ", nombre=" + nombre + ", plan=" + plan + "]";
	}
	
}
