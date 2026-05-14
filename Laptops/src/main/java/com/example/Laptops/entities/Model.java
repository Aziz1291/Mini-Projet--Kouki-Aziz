package com.example.Laptops.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Model {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idModel;
	
	private String nomModel;
	private String descriptionModel;
	
	@OneToMany(mappedBy = "model")
	@JsonIgnore
	private List<Laptop> laptops;

	public Model() {
		super();
	}

	public Model(Long idModel, String nomModel, String descriptionModel, List<Laptop> laptops) {
		super();
		this.idModel = idModel;
		this.nomModel = nomModel;
		this.descriptionModel = descriptionModel;
		this.laptops = laptops;
	}

	public Long getIdModel() {
		return idModel;
	}

	public void setIdModel(Long idModel) {
		this.idModel = idModel;
	}

	public String getNomModel() {
		return nomModel;
	}

	public void setNomModel(String nomModel) {
		this.nomModel = nomModel;
	}

	public String getDescriptionModel() {
		return descriptionModel;
	}

	public void setDescriptionModel(String descriptionModel) {
		this.descriptionModel = descriptionModel;
	}

	public List<Laptop> getLaptops() {
		return laptops;
	}

	public void setLaptops(List<Laptop> laptops) {
		this.laptops = laptops;
	}
}
