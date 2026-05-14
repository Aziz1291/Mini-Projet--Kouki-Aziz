package com.example.Laptops.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Laptops.entities.Model;

@RepositoryRestResource(path = "models")
public interface ModelRepository extends JpaRepository<Model, Long> {

}
