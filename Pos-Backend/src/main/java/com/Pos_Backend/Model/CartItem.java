package com.Pos_Backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long productId;
    private String productName;
    private double price;
    private int quantity;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	public CartItem(Long id, Long productId, String productName, double price, int quantity) {
		super();
		this.id = id;
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
	}
    
	public CartItem() {
		
	}
       
}