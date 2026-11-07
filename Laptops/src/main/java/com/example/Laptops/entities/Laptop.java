package com.example.Laptops.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
public class Laptop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idLaptop;

	@NotBlank(message = "La marque est obligatoire.")
	@Size(max = 100, message = "La marque ne doit pas dépasser 100 caractères.")
	private String brandLaptop;

	@NotNull(message = "Le prix est obligatoire.")
	@Positive(message = "Le prix doit être supérieur à 0.")
	@DecimalMax(value = "10000000", message = "Le prix ne doit pas dépasser 10 000 000.")
	private Double prixLaptop;

	@Size(max = 1000, message = "Les caractéristiques ne doivent pas dépasser 1000 caractères.")
	private String caracteristiquesLaptop;

	@PastOrPresent(message = "La date de mise en service ne peut pas être dans le futur.")
	private Date dateCreation;

	@NotNull(message = "Le modèle est obligatoire.")
	@ManyToOne
	private Model model;

	/*@OneToOne
	private Image image;*/

	@OneToMany(mappedBy = "laptop")
	private List<Image> images;

	private String imagePath;

	public Laptop() {
		super();
	}

	public Laptop(String brandLaptop, Double prixLaptop, String caracteristiquesLaptop, Date dateCreation) {
		super();
		this.brandLaptop = brandLaptop;
		this.prixLaptop = prixLaptop;
		this.caracteristiquesLaptop = caracteristiquesLaptop;
		this.dateCreation = dateCreation;
	}

	public Long getIdLaptop() {
		return idLaptop;
	}

	public void setIdLaptop(Long idLaptop) {
		this.idLaptop = idLaptop;
	}

	public String getBrandLaptop() {
		return brandLaptop;
	}

	public void setBrandLaptop(String brandLaptop) {
		this.brandLaptop = brandLaptop;
	}

	public Double getPrixLaptop() {
		return prixLaptop;
	}

	public void setPrixLaptop(Double prixLaptop) {
		this.prixLaptop = prixLaptop;
	}

	public String getCaracteristiquesLaptop() {
		return caracteristiquesLaptop;
	}

	public void setCaracteristiquesLaptop(String caracteristiquesLaptop) {
		this.caracteristiquesLaptop = caracteristiquesLaptop;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return "Laptop [idLaptop=" + idLaptop + ", brandLaptop=" + brandLaptop + ", prixLaptop=" + prixLaptop
				+ ", caracteristiquesLaptop=" + caracteristiquesLaptop + ", dateCreation=" + dateCreation + ", model=" + model + "]";
	}

}
