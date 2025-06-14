package com.Pos_Backend.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pos_Backend.Model.Subcategory;
import com.Pos_Backend.Repo.SubcategoryRepository;

import java.util.List;

@Service
public class SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }

    public Subcategory createSubcategory(Subcategory subcategory) {
        return subcategoryRepository.save(subcategory);
    }

    public Subcategory updateSubcategory(Long id, Subcategory subcategory) {
        Subcategory existingSubcategory = subcategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
        existingSubcategory.setName(subcategory.getName());
        existingSubcategory.setCategory(subcategory.getCategory());
        return subcategoryRepository.save(existingSubcategory);
    }

    public void deleteSubcategory(Long id) {
        subcategoryRepository.deleteById(id);
    }
}