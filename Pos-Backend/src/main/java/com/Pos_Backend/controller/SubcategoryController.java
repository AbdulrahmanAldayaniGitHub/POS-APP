package com.Pos_Backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Pos_Backend.Model.Subcategory;
import com.Pos_Backend.Service.SubcategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin(origins = "http://localhost:3000")

public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping
    public List<Subcategory> getAllSubcategories() {
        return subcategoryService.getAllSubcategories(); 
    }

    @PostMapping
    public Subcategory createSubcategory(@RequestBody Subcategory subcategory) {
        return subcategoryService.createSubcategory(subcategory);
    }

    @PutMapping("/{id}")
    public Subcategory updateSubcategory(@PathVariable Long id, @RequestBody Subcategory subcategory) {
        return subcategoryService.updateSubcategory(id, subcategory);
    }

    @DeleteMapping("/{id}")
    public void deleteSubcategory(@PathVariable Long id) {
        subcategoryService.deleteSubcategory(id);
    }
}
