package com.example.Laptops.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.example.Laptops.entities.Image;
import com.example.Laptops.entities.Laptop;
import com.example.Laptops.repos.ImageRepository;
import com.example.Laptops.repos.LaptopRepository;

@Transactional
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    LaptopService laptopService;

    @Autowired
    LaptopRepository laptopRepository;

    @Override
    public Image uploadImage(MultipartFile file) throws IOException {
        /*
         * Ce code commenté est équivalent au code utilisant le design pattern Builder
         * Image image = new Image(null, file.getOriginalFilename(),
         *                         file.getContentType(), file.getBytes(), null);
         * return imageRepository.save(image);
         */
        return imageRepository.save(
            Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .build()
        );
    }

    @Override
    public Image getImageDetails(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return Image.builder()
            .idImage(dbImage.get().getIdImage())
            .name(dbImage.get().getName())
            .type(dbImage.get().getType())
            .image(dbImage.get().getImage())
            .build();
    }

    @Override
    public ResponseEntity<byte[]> getImage(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return ResponseEntity.ok()
            .contentType(MediaType.valueOf(dbImage.get().getType()))
            .body(dbImage.get().getImage());
    }

    @Override
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image uploadImageLaptop(MultipartFile file, Long idLaptop) throws IOException {
        Laptop laptop = new Laptop();
        laptop.setIdLaptop(idLaptop);
        return imageRepository.save(
            Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .laptop(laptop)
                .build()
        );
    }

    @Override
    public List<Image> getImagesByLaptop(Long idLaptop) {
        Laptop laptop = laptopRepository.findById(idLaptop).get();
        return laptop.getImages();
    }

    @Override
    public ResponseEntity<byte[]> getLastImageByLaptop(Long idLaptop) {
        Optional<Image> last = imageRepository.findTopByLaptopIdLaptopOrderByIdImageDesc(idLaptop);
        if (last.isEmpty() || last.get().getImage() == null) {
            return ResponseEntity.notFound().build();
        }
        String type = last.get().getType() != null ? last.get().getType() : "image/jpeg";
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(type))
            .body(last.get().getImage());
    }
}
