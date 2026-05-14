package com.example.Laptops.service;

import java.util.List;

import com.example.Laptops.entities.Laptop;
import com.example.Laptops.entities.Model;

public interface LaptopService {

	Laptop saveLaptop(Laptop l);
	Laptop updateLaptop(Laptop l);
	void deleteLaptop(Laptop l);
	void deleteLaptopById(Long id);
	Laptop getLaptop(Long id);
	List<Laptop> getAllLaptops();

	List<Laptop> findByBrandLaptop(String brandLaptop);
	List<Laptop> findByBrandLaptopContains(String brandLaptop);
	List<Laptop> findByBrandPrix(String brandLaptop, Double prixLaptop);
	List<Laptop> findByModel(Model model);
	List<Laptop> findByModelIdModel(Long id);
	List<Laptop> findByOrderByBrandLaptopAsc();
	List<Laptop> trierLaptopsBrandPrix();

}