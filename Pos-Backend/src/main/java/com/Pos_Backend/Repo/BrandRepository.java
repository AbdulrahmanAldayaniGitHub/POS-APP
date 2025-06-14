package com.Pos_Backend.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Pos_Backend.Model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}