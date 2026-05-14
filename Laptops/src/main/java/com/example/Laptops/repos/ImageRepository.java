package com.example.Laptops.repos;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Laptops.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findTopByLaptopIdLaptopOrderByIdImageDesc(Long idLaptop);
}
