package com.example.Laptops.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImage;

    private String name;

    private String type;

    @Column(name = "IMAGE", length = 4048576)
    @Lob
    private byte[] image;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @jakarta.persistence.ManyToOne
    @jakarta.persistence.JoinColumn(name = "LAPTOP_ID")
    private Laptop laptop;
}
