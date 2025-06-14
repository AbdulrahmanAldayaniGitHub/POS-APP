package com.Pos_Backend.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.Pos_Backend.Model.Subcategory;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
}