package com.example.Laptops.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Laptops.entities.Laptop;
import com.example.Laptops.entities.Model;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {

	List<Laptop> findByBrandLaptop(String brandLaptop);
	List<Laptop> findByBrandLaptopContains(String brandLaptop);

	@Query("select l from Laptop l where l.brandLaptop like %:brandLaptop and l.prixLaptop > :prixLaptop")
	List<Laptop> findByBrandPrix(@Param("brandLaptop") String brandLaptop, @Param("prixLaptop") Double prixLaptop);

	@Query("select l from Laptop l where l.model = ?1")
	List<Laptop> findByModel(Model model);

	List<Laptop> findByModelIdModel(Long id);

	List<Laptop> findByOrderByBrandLaptopAsc();

	@Query("select l from Laptop l order by l.brandLaptop ASC, l.prixLaptop DESC")
	List<Laptop> trierLaptopsBrandPrix();

}
