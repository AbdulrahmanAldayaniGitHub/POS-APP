package com.Pos_Backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Pos_Backend.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}