//package com.Pos_Backend.controller;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.Pos_Backend.Model.Invoice;
//import com.Pos_Backend.Service.InvoiceService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/invoices")
//public class InvoiceController {
//
//    @Autowired
//    private InvoiceService invoiceService;
//
//    @GetMapping
//    public List<Invoice> getAllInvoices() {
//        return invoiceService.getAllInvoices();
//    }
//
//    @PostMapping
//    public Invoice createInvoice(@RequestBody Invoice invoice) {
//        return invoiceService.createInvoice(invoice);
//    }
//}



package com.Pos_Backend.controller;

import com.Pos_Backend.Dtos.CustomInvoiceItemDTO;
import com.Pos_Backend.Model.Invoice;
import com.Pos_Backend.Service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Also make sure to import your DTO and service
import com.Pos_Backend.Service.InvoiceService;

// If you're inside a class, don't forget this is within a @RestController


import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController { 

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }
    

    @PostMapping("/invoice")
    public ResponseEntity<byte[]> generateInvoice(@RequestBody List<CustomInvoiceItemDTO> items) {
        byte[] pdf = invoiceService.generateInvoicePdf(items);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "invoice.pdf");
        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }

    
    
    // 🔥 New POST endpoint to create an invoice
//    @PostMapping
//    public Invoice createInvoice(@RequestBody Invoice invoice) {
//        return invoiceService.createInvoice(invoice);
//    }
}
