package com.example.Laptops.restcontrollers;

import java.util.List;
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
import com.example.Laptops.entities.Laptop;
import com.example.Laptops.service.LaptopService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LaptopRESTController {

	@Autowired
	LaptopService laptopService;

	@RequestMapping(path = "all", method = RequestMethod.GET)
	public List<Laptop> getAllLaptops() {
		return laptopService.getAllLaptops();
	}

	@RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
	//@GetMapping("/getbyid/{id}")
	public Laptop getLaptopById(@PathVariable("id") Long id) {
		return laptopService.getLaptop(id);
	}

	@RequestMapping(value = "/addlaptop", method = RequestMethod.POST)
	//@PostMapping("/addlaptop")
	public Laptop createLaptop(@RequestBody Laptop laptop) {
		System.out.println(laptop);
		return laptopService.saveLaptop(laptop);
	}

	@RequestMapping(value = "/updatelaptop", method = RequestMethod.PUT)
	//@PutMapping("/updatelaptop")
	public Laptop updateLaptop(@RequestBody Laptop laptop) {
		return laptopService.updateLaptop(laptop);
	}

	@RequestMapping(value = "/dellaptop/{id}", method = RequestMethod.DELETE)
	//@DeleteMapping("/dellaptop/{id}")
	public void deleteLaptop(@PathVariable("id") Long id) {
		laptopService.deleteLaptopById(id);
	}

	@RequestMapping(value = "/laptopsmodel/{idModel}", method = RequestMethod.GET)
	public List<Laptop> getLaptopsByModelId(@PathVariable("idModel") Long idModel) {
		return laptopService.findByModelIdModel(idModel);
	}

	@RequestMapping(value = "/laptopsbybrand/{brandLaptop}", method = RequestMethod.GET)
	public List<Laptop> getLaptopsByBrand(@PathVariable("brandLaptop") String brandLaptop) {
		return laptopService.findByBrandLaptopContains(brandLaptop);
	}

}