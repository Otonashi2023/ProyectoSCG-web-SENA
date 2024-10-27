package co.edu.sena.models.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="ejercicio")
public class Ejercicio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name="id_ejercicio", nullable = false)
	private int codigo;
	
	@Column (name="series", nullable = false)
	private int series;
	
	@Column (name="repeticiones", nullable = false)
	private int repeticiones;
	
	@Column (name="descanso", nullable = false)
	private int descanso;
	
	@Column (name="imagen", length=255, nullable = true)
	private String imagen;
	
	@ManyToOne
	@JoinColumn (name="nombre_ejercicio", nullable=false)
	private NombreEjercicio nombre;
	
	@ManyToOne
	@JoinColumn (name="tipo_ejercicio", nullable=false)
	private TipoEjercicio tipoEjercicio;
	
	@ManyToOne
	@JoinColumn (name="musculo", nullable=false)
	private Musculo musculo;
	
	@OneToMany(orphanRemoval = true)
	@JoinColumn(name = "ejercicio")
	private List<RutinaEjercicio> rutinaEjercicio = new ArrayList<>();
	
	public Ejercicio() {
		super();
	}

	public Ejercicio(int codigo) {
		super();
		this.codigo = codigo;
	}
	
	public Ejercicio(int series, int repeticiones, int descanso, NombreEjercicio nombre, TipoEjercicio tipoEjercicio, Musculo musculo,
			List<RutinaEjercicio> rutinaEjercicio, String imagen) {
		super();
		this.series = series;
		this.repeticiones = repeticiones;
		this.descanso = descanso;
		this.nombre = nombre;
		this.tipoEjercicio = tipoEjercicio;
		this.musculo = musculo;
		this.rutinaEjercicio = rutinaEjercicio;
		this.imagen = imagen;
	}
	
	public Ejercicio(int codigo, int series, int repeticiones, int descanso, NombreEjercicio nombre, TipoEjercicio tipoEjercicio, Musculo musculo,
			List<RutinaEjercicio> rutinaEjercicio, String imagen) {
		super();
		this.codigo = codigo;
		this.series = series;
		this.repeticiones = repeticiones;
		this.descanso = descanso;
		this.nombre = nombre;
		this.tipoEjercicio = tipoEjercicio;
		this.musculo = musculo;
		this.rutinaEjercicio = rutinaEjercicio;
		this.imagen = imagen;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public int getSeries() {
		return series;
	}

	public void setSeries(int series) {
		this.series = series;
	}

	public int getRepeticiones() {
		return repeticiones;
	}

	public void setRepeticiones(int repeticiones) {
		this.repeticiones = repeticiones;
	}

	public int getDescanso() {
		return descanso;
	}

	public void setDescanso(int descanso) {
		this.descanso = descanso;
	}

	public NombreEjercicio getNombre() {
		return nombre;
	}

	public void setNombre(NombreEjercicio nombre) {
		this.nombre = nombre;
	}

	public TipoEjercicio getTipoEjercicio() {
		return tipoEjercicio;
	}

	public void setTipoEjercicio(TipoEjercicio tipoEjercicio) {
		this.tipoEjercicio = tipoEjercicio;
	}

	public Musculo getMusculo() {
		return musculo;
	}

	public void setMusculo(Musculo musculo) {
		this.musculo = musculo;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	@Override
	public String toString() {
		return "Ejercicio [codigo=" + codigo + ", series=" + series + ", repeticiones=" + repeticiones + ", descanso="
				+ descanso + ", imagen=" + imagen + ", nombre=" + nombre + ", tipoEjercicio=" + tipoEjercicio
				+ ", musculo=" + musculo + ", rutinaEjercicio=" + rutinaEjercicio + "]";
	}
	
}
