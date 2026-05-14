package com.example.Laptops.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomLaptop", types = { Laptop.class })
public interface LaptopProjection {
    public String getBrandLaptop();
    public Double getPrixLaptop();
}
