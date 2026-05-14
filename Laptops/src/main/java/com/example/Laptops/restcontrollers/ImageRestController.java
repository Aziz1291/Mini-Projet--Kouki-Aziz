package com.example.Laptops.restcontrollers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.Laptops.entities.Image;
import com.example.Laptops.entities.Laptop;
import com.example.Laptops.service.ImageService;
import com.example.Laptops.service.LaptopService;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*")
public class ImageRestController {

    @Autowired
    ImageService imageService;

    @Autowired
    LaptopService laptopService;

    @RequestMapping(value = "/uploadFS/{id}", method = RequestMethod.POST)
    public void uploadImageFS(@RequestParam("image") MultipartFile file,
            @PathVariable("id") Long id) throws IOException {
        Laptop p = laptopService.getLaptop(id);
        p.setImagePath(id + ".jpg");
        Files.createDirectories(Paths.get(System.getProperty("user.home") + "/images"));
        Files.write(Paths.get(System.getProperty("user.home") + "/images/" + p.getImagePath()),
                file.getBytes());
        laptopService.saveLaptop(p);
    }

    @RequestMapping(value = "/loadfromFS/{id}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageFS(@PathVariable("id") Long id) throws IOException {
        Laptop p = laptopService.getLaptop(id);
        if (p == null || p.getImagePath() == null) {
            return ResponseEntity.notFound().build();
        }
        java.nio.file.Path filePath = Paths.get(System.getProperty("user.home") + "/images/" + p.getImagePath());
        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(Files.readAllBytes(filePath));
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }

    @PostMapping(value = "/uploadImageLaptop/{idLaptop}")
    public Image uploadMultiImages(@RequestParam("image") MultipartFile file,
            @PathVariable("idLaptop") Long idLaptop) throws IOException {
        return imageService.uploadImageLaptop(file, idLaptop);
    }

    @RequestMapping(value = "/getImagesLaptop/{idLaptop}", method = RequestMethod.GET)
    public List<Image> getImagesLaptop(@PathVariable("idLaptop") Long idLaptop) throws IOException {
        return imageService.getImagesByLaptop(idLaptop);
    }

    @RequestMapping(value = "/getLastImageLaptop/{idLaptop}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getLastImageLaptop(@PathVariable("idLaptop") Long idLaptop) {
        return imageService.getLastImageByLaptop(idLaptop);
    }

    @RequestMapping(value = "/get/info/{id}", method = RequestMethod.GET)
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

    @RequestMapping(value = "/load/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Image updateImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }
}
