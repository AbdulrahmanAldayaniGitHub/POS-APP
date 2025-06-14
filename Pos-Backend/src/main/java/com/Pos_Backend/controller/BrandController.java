package com.Pos_Backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Pos_Backend.Model.Brand;
import com.Pos_Backend.Service.BrandService;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "http://localhost:3000")
public class BrandController {
    @Autowired
    private BrandService brandService;
 
    @PostMapping
    public ResponseEntity<Brand> addBrand(@RequestBody Brand brand) {
        return ResponseEntity.ok(brandService.saveBrand(brand));
    }

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
        return ResponseEntity.ok(brandService.updateBrand(id, brand));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}