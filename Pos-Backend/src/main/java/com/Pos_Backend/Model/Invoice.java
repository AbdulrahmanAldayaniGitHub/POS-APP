package com.Pos_Backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private double totalAmount;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date invoiceDate;

    @Lob // Store large text
    private String invoiceDetails;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public Date getInvoiceDate() { return invoiceDate; }
    public void setInvoiceDate(Date invoiceDate) { this.invoiceDate = invoiceDate; }

    public String getInvoiceDetails() { return invoiceDetails; }
    public void setInvoiceDetails(String invoiceDetails) { this.invoiceDetails = invoiceDetails; }
    
}
