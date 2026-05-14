package com.example.Laptops.service;

import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.example.Laptops.entities.Image;

public interface ImageService {
    Image uploadImage(MultipartFile file) throws IOException;
    Image getImageDetails(Long id) throws IOException;
    ResponseEntity<byte[]> getImage(Long id) throws IOException;
    void deleteImage(Long id);
    Image uploadImageLaptop(MultipartFile file, Long idLaptop) throws IOException;
    List<Image> getImagesByLaptop(Long idLaptop);
    ResponseEntity<byte[]> getLastImageByLaptop(Long idLaptop);
}
