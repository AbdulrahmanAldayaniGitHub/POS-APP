package com.Pos_Backend.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Pos_Backend.Model.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}