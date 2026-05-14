package com.example.Laptops;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.Laptops.entities.Laptop;
import com.example.Laptops.entities.Model;

@SpringBootApplication
public class LaptopsApplication implements CommandLineRunner {

	@Autowired
	private RepositoryRestConfiguration repositoryRestConfiguration;

	public static void main(String[] args) {
		SpringApplication.run(LaptopsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Expose IDs in Spring Data REST responses
		repositoryRestConfiguration.exposeIdsFor(Laptop.class);
		repositoryRestConfiguration.exposeIdsFor(Model.class);
	}

}
