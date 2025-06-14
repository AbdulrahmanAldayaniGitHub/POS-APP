package com.Pos_Backend.Dtos;


import lombok.Data;

@Data
public class CustomInvoiceItemDTO {
    private String id; // can be "custom-123456" or a real numeric ID
    private String name;
    private Double price;
    private Integer quantity;
    private Boolean custom;
    
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Boolean getCustom() {
		return custom;
	}
	public void setCustom(Boolean custom) {
		this.custom = custom;
	}

}


