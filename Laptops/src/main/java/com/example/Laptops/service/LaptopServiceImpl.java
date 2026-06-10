package com.example.Laptops.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.Laptops.entities.Laptop;
import com.example.Laptops.entities.Model;
import com.example.Laptops.repos.ImageRepository;
import com.example.Laptops.repos.LaptopRepository;

@Service
public class LaptopServiceImpl implements LaptopService {

	@Autowired
	LaptopRepository laptopRepository;

	@Autowired
	ImageRepository imageRepository;

	@Override
	public Laptop saveLaptop(Laptop l) {
		return laptopRepository.save(l);
	}

	@Override
	public Laptop updateLaptop(Laptop l) {
		return laptopRepository.save(l);
	}

	@Override
	public void deleteLaptop(Laptop l) {
		laptopRepository.delete(l);
	}

	@Override
	public void deleteLaptopById(Long id) {
		// Delete image file from disk before removing the laptop
		Laptop p = getLaptop(id);
		try {
			if (p.getImagePath() != null)
				Files.delete(Paths.get(System.getProperty("user.home") + "/images/" + p.getImagePath()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		laptopRepository.deleteById(id);
	}

	@Override
	public Laptop getLaptop(Long id) {
		return laptopRepository.findById(id).get();
	}

	@Override
	public List<Laptop> getAllLaptops() {
		return laptopRepository.findAll();
	}

	@Override
	public Page<Laptop> getAllLaptopsParPage(int page, int size) {
		return laptopRepository.findAll(PageRequest.of(page, size));
	}

	@Override
	public List<Laptop> findByBrandLaptop(String brandLaptop) {
		return laptopRepository.findByBrandLaptop(brandLaptop);
	}

	@Override
	public List<Laptop> findByBrandLaptopContains(String brandLaptop) {
		return laptopRepository.findByBrandLaptopContains(brandLaptop);
	}

	@Override
	public List<Laptop> findByBrandPrix(String brandLaptop, Double prixLaptop) {
		return laptopRepository.findByBrandPrix(brandLaptop, prixLaptop);
	}

	@Override
	public List<Laptop> findByModel(Model model) {
		return laptopRepository.findByModel(model);
	}

	@Override
	public List<Laptop> findByModelIdModel(Long id) {
		return laptopRepository.findByModelIdModel(id);
	}

	@Override
	public List<Laptop> findByOrderByBrandLaptopAsc() {
		return laptopRepository.findByOrderByBrandLaptopAsc();
	}

	@Override
	public List<Laptop> trierLaptopsBrandPrix() {
		return laptopRepository.trierLaptopsBrandPrix();
	}

}
