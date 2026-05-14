package com.example.laptops;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import com.example.Laptops.LaptopsApplication;
import com.example.Laptops.entities.Laptop;
import com.example.Laptops.entities.Model;
import com.example.Laptops.repos.LaptopRepository;
import com.example.Laptops.service.LaptopService;

@SpringBootTest(classes = LaptopsApplication.class)
class LaptopsApplicationTests {

    @Autowired 
    private LaptopRepository laptopRepository;
    
    @Autowired
    private LaptopService laptopService;

    @Test 
    public void testCreateLaptop() { 
        Laptop lap = new Laptop("GIGABYE", 700.0, "4gb ram ddr4 512To Stockage", new Date()); 
        laptopRepository.save(lap);
    }
    @Test 
    public void testFindLaptop() 
    { 
    Laptop l = laptopRepository.findById(1L).get();     
    System.out.println(l); 
    }
    @Test 
    public void testUpdateLaptop() 
    { 
    Laptop l = laptopRepository.findById(1L).get(); 
    l.setPrixLaptop(2000.0);
    laptopRepository.save(l);
    System.out.println(l);
    }
    @Test 
    public void testDeleteLaptop() 
    { 
    laptopRepository.deleteById(1L);
    }
    @Test 
    public void testFindAllLaptop() 
    { 
    List<Laptop> laps = laptopRepository.findAll();
    for(Laptop l:laps) 
    {
    	System.out.println(l); 
    }
    	
    }
    @Test 
    public void testFindByNomLaptopContains() 
    { 
    Page<Laptop>  laps = laptopService.getAllLaptopsParPage(0,8); 
    System.out.println(laps.getSize()); 
    System.out.println(laps.getTotalElements()); 
    System.out.println(laps.getTotalPages()); 
    laps.getContent().forEach(l -> {System.out.println(l.toString()); 
    });  
    /*ou bien 
    for (Laptop p : laps) 
    { 
    System.out.println(p); 
    }*/
    }
    
    @Test
    public void testFindByBrandLaptop()
    {
        List<Laptop> laps = laptopRepository.findByBrandLaptop("HP");
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testFindByBrandLaptopContains()
    {
        List<Laptop> laps = laptopRepository.findByBrandLaptopContains("O");
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testFindByBrandPrix()
    {
        List<Laptop> laps = laptopRepository.findByBrandPrix("O", 1000.0);
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testFindByModel()
    {
        Model model = new Model();
        model.setIdModel(1L);
        List<Laptop> laps = laptopRepository.findByModel(model);
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testFindByModelIdModel()
    {
        List<Laptop> laps = laptopRepository.findByModelIdModel(1L);
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testFindByOrderByBrandLaptopAsc()
    {
        List<Laptop> laps = laptopRepository.findByOrderByBrandLaptopAsc();
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
    
    @Test
    public void testTrierLaptopsBrandPrix()
    {
        List<Laptop> laps = laptopRepository.trierLaptopsBrandPrix();
        for (Laptop l : laps)
        {
            System.out.println(l);
        }
    }
}