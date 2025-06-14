package com.Pos_Backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Pos_Backend.Model.CartItem;
import com.Pos_Backend.Model.InvoiceItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {}