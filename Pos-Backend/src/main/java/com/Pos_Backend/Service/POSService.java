////package com.Pos_Backend.Service;
////
////import com.Pos_Backend.Model.CartItem;
////import com.Pos_Backend.Model.Invoice;
////import com.Pos_Backend.Model.Product;
////import com.Pos_Backend.Repo.CartItemRepository;
////import com.Pos_Backend.Repo.InvoiceRepository;
////import com.Pos_Backend.Repo.ProductRepository;
////import com.itextpdf.text.*;
////import com.itextpdf.text.pdf.PdfPTable;
////import com.itextpdf.text.pdf.PdfWriter;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import java.io.ByteArrayOutputStream;
////import java.io.IOException;
////import java.time.LocalDateTime;
////import java.time.ZoneId;
////import java.util.ArrayList;
////import java.util.Date;
////import java.util.List;
////
////@Service
////public class POSService {
////
////    @Autowired
////    private ProductRepository productRepository;
////
////    @Autowired
////    private InvoiceRepository invoiceRepository;
////
////    @Autowired
////    private CartItemRepository cartItemRepository;
////
////    private List<CartItem> cart = new ArrayList<>();
////
////    public CartItem addProductToCart(CartItem cartItem) {
////        if (cartItem.getProductId() == null || cartItem.getQuantity() <= 0) {
////            throw new IllegalArgumentException("Invalid productId or quantity");
////        }
////
////        Product product = productRepository.findById(cartItem.getProductId())
////                .orElseThrow(() -> new RuntimeException("Product not found"));
////
////        CartItem existingItem = cart.stream()
////                .filter(item -> item.getProductId().equals(cartItem.getProductId()))
////                .findFirst()
////                .orElse(null);
////
////        if (existingItem != null) {
////            existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
////        } else {
////            cartItem.setPrice(product.getPrice());
////            cartItem.setProductName(product.getName());
////            cart.add(cartItem);
////        }
////
////        return existingItem != null ? existingItem : cartItem;
////    }
////
////    public List<CartItem> getCartDetails() {
////        return new ArrayList<>(cart);
////    }
////
////    public double calculateTotalPrice() {
////        return cart.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
////    }
////
////    public byte[] generateInvoicePDF() {
////        if (cart.isEmpty()) {
////            throw new RuntimeException("Cart is empty. Add products before generating an invoice.");
////        }
////
////        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
////            Document document = new Document();
////            PdfWriter.getInstance(document, out);
////            document.open();
////
////            document.add(new Paragraph("Invoice"));
////            PdfPTable table = new PdfPTable(4);
////            table.addCell("Product Name");
////            table.addCell("Quantity");
////            table.addCell("Price (per unit)");
////            table.addCell("Total Price");
////
////            double totalPrice = 0.0;
////            for (CartItem item : cart) {
////                table.addCell(item.getProductName());
////                table.addCell(String.valueOf(item.getQuantity()));
////                table.addCell(String.valueOf(item.getPrice()));
////                double itemTotal = item.getQuantity() * item.getPrice();
////                table.addCell(String.valueOf(itemTotal));
////                totalPrice += itemTotal;
////            }
////
////            document.add(table);
////            document.add(new Paragraph("Total Price: $" + totalPrice));
////            document.close();
////
////            cart.clear();
////            return out.toByteArray();
////        } catch (DocumentException | IOException e) {
////            throw new RuntimeException("Failed to generate invoice PDF", e);
////        }
////    }
////}
//
//package com.Pos_Backend.Service;
//
//import com.Pos_Backend.Model.CartItem;
//import com.Pos_Backend.Model.Invoice;
//import com.itextpdf.text.*;
//import com.itextpdf.text.pdf.PdfPCell;
//
//
//import com.Pos_Backend.Model.Product;
//import com.Pos_Backend.Repo.CartItemRepository;
//import com.Pos_Backend.Repo.InvoiceRepository;
//import com.Pos_Backend.Repo.ProductRepository;
//import com.itextpdf.text.Document;
//import com.itextpdf.text.DocumentException;
//import com.itextpdf.text.Paragraph;
//import com.itextpdf.text.pdf.PdfPTable;
//import com.itextpdf.text.pdf.PdfWriter;
//
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class POSService {
//
////	@Temporal(TemporalType.TIMESTAMP)
////	private java.sql.Date invoiceDate;
//	
//	private LocalDateTime invoiceDate;
//
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @Autowired
//    private InvoiceRepository invoiceRepository;
//
//    @Autowired
//    private CartItemRepository cartItemRepository ;
//
//    // In-memory cart for demonstration purposes.
//    private List<CartItem> cart = new ArrayList<>();
////    private final List<Product> cart = new ArrayList<>();
//
//
//    // Add product to cart using a CartItem object.
//    public CartItem addProductToCart(CartItem cartItem) {
//        if (cartItem.getProductId() == null || cartItem.getQuantity() <= 0) {
//            throw new IllegalArgumentException("Invalid productId or quantity");
//        }
//        Product product = productRepository.findById(cartItem.getProductId())
//                .orElseThrow(() -> new RuntimeException("Product not found"));
//
//        // Check if product is already in the cart
//        CartItem existingItem = cart.stream()
//                .filter(item -> item.getProductId().equals(cartItem.getProductId()))
//                .findFirst()
//                .orElse(null);
//
//        if (existingItem != null) {
//            existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
////            return existingItem;
//        } else {
//            cartItem.setPrice(product.getPrice());
//            cartItem.setProductName(product.getName());
//            cart.add(cartItem);
//            return cartItem;
//        }
//    }
//
//    public List<CartItem> getCartDetails() {
//        return new ArrayList<>(cart);
//    }
//
//    public double calculateTotalPrice() {
//        return cart.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
//    }
//
//    
//    public void addToCart(CartItem item) {
//        cart.add(item);
//    }
//
//    
//    
//    
//    
////    public byte[] generateInvoicePDF() {
////        System.out.println("Cart size before generating invoice: " + cart.size()); // Debug log
////        
////        if (cart.isEmpty()) {
////            System.out.println("Cart is empty when trying to generate invoice!");  // Debug log
////            throw new RuntimeException("Cart is empty. Add products before generating an invoice.");
////        }
////
////        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
////            Document document = new Document();
////            PdfWriter.getInstance(document, outputStream);
////            document.open();
////
////            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
////            Paragraph title = new Paragraph("Invoice", titleFont);
////            title.setAlignment(Element.ALIGN_CENTER);
////            document.add(title);
////            document.add(new Paragraph("\n"));
////
////            PdfPTable table = new PdfPTable(3);
////            table.setWidthPercentage(100);
////            
////            table.addCell(new PdfPCell(new Phrase("Product Name")));
////            table.addCell(new PdfPCell(new Phrase("Quantity")));
////            table.addCell(new PdfPCell(new Phrase("Price")));
////
////            double total = 0;
////            for (Product product : cart) {
////                table.addCell(product.getName());
////                table.addCell(String.valueOf(product.getQuantity()));
////                table.addCell(String.valueOf(product.getPrice()));
////                total += product.getQuantity() * product.getPrice();
////            }
////
////            document.add(table);
////            document.add(new Paragraph("\nTotal: $" + total));
////
////            document.close();
////            cart.clear(); // Clear cart after generating invoice
////            return outputStream.toByteArray();
////        } catch (DocumentException | IOException e) {
////            throw new RuntimeException("Error generating invoice PDF", e);
////        }
////    }
//
////    public byte[] generateInvoicePDF() {
////        List<CartItem> cart = cartItemRepository.findAll();  // Fetch cart from DB if needed
////        System.out.println("Cart size before generating invoice: " + cart.size()); // Debug log
////        
////        if (cart.isEmpty()) {
////            System.out.println("Cart is empty when trying to generate invoice!");  // Debug log
////            throw new RuntimeException("Cart is empty. Add products before generating an invoice.");
////        }
////
////        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
////            Document document = new Document();
////            PdfWriter.getInstance(document, outputStream);
////            document.open();
////
////            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
////            Paragraph title = new Paragraph("Invoice", titleFont);
////            title.setAlignment(Element.ALIGN_CENTER);
////            document.add(title);
////            document.add(new Paragraph("\n"));
////
////            PdfPTable table = new PdfPTable(3);
////            table.setWidthPercentage(100);
////            
////            table.addCell(new PdfPCell(new Phrase("Product Name")));
////            table.addCell(new PdfPCell(new Phrase("Quantity")));
////            table.addCell(new PdfPCell(new Phrase("Price")));
////
////            double total = 0;
////            for (CartItem item : cart) {
////                table.addCell(item.getProductName());
////                table.addCell(String.valueOf(item.getQuantity()));
////                table.addCell(String.valueOf(item.getPrice()));
////                total += item.getQuantity() * item.getPrice();
////            }
////
////            document.add(table);
////            document.add(new Paragraph("\nTotal: $" + total));
////
////            document.close();
////            cartItemRepository.deleteAll(); // Clear cart from database after invoice
////            return outputStream.toByteArray();
////        } catch (DocumentException | IOException e) {
////            throw new RuntimeException("Error generating invoice PDF", e);
////        }
////    }
//
//    
//    
//    public byte[] generateInvoicePDF(List<CartItem> cart) {  
//        System.out.println("Cart size before generating invoice: " + cart.size()); // Debug log
//
//        if (cart.isEmpty()) {
//            System.out.println("Cart is empty when trying to generate invoice!");  // Debug log
//            throw new RuntimeException("Cart is empty. Add products before generating an invoice.");
//        }
//
//        double total = 0;
//        StringBuilder invoiceDetails = new StringBuilder();
//
//        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
//            Document document = new Document();
//            PdfWriter.getInstance(document, outputStream);
//            document.open();
//
//            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
//            Paragraph title = new Paragraph("Invoice", titleFont);
//            title.setAlignment(Element.ALIGN_CENTER);
//            document.add(title);
//            document.add(new Paragraph("\n"));
//
//            PdfPTable table = new PdfPTable(3);
//            table.setWidthPercentage(100);
//            
//            table.addCell(new PdfPCell(new Phrase("Product Name")));
//            table.addCell(new PdfPCell(new Phrase("Quantity")));
//            table.addCell(new PdfPCell(new Phrase("Price")));
//
//            for (CartItem item : cart) {
//                table.addCell(item.getProductName());
//                table.addCell(String.valueOf(item.getQuantity()));
//                table.addCell(String.valueOf(item.getPrice()));
//                total += item.getQuantity() * item.getPrice();
//
//                // Append invoice details
//                invoiceDetails.append(item.getProductName())
//                              .append(" - Qty: ")
//                              .append(item.getQuantity())
//                              .append(" - Price: ")
//                              .append(item.getPrice())
//                              .append("\n");
//            }
//
//            document.add(table);
//            document.add(new Paragraph("\nTotal: $" + total));
//
//            document.close();
//
//            // ✅ Save Invoice to Database
//            Invoice invoice = new Invoice();
//            invoice.setTotalAmount(total);
//            invoice.setInvoiceDate(java.sql.Date.valueOf(LocalDate.now()));
//            invoice.setInvoiceDetails(invoiceDetails.toString()); // Store product details
//            invoiceRepository.save(invoice); // ✅ Save to database
//
//            cartItemRepository.deleteAll(); // Clear cart from database after invoice
//
//            return outputStream.toByteArray();
//        } catch (DocumentException | IOException e) {
//            throw new RuntimeException("Error generating invoice PDF", e);
//        }
//    }
//
//    
//    public Optional<CartItem> getProductById(Long id) {
//        return productRepository.findById(id)
//                .map(product -> new CartItem(product.getId(), id, product.getName(), product.getPrice(), 1));
//    }
//    
//}


package com.Pos_Backend.Service;

import com.Pos_Backend.Model.CartItem;
import com.Pos_Backend.Model.Invoice;
import com.Pos_Backend.Model.Product;
import com.Pos_Backend.Repo.CartItemRepository;
import com.Pos_Backend.Repo.InvoiceRepository;
import com.Pos_Backend.Repo.ProductRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date; // ✅ Correct
import java.sql.Timestamp; // Optional, not needed anymore
import java.time.LocalDateTime;
import java.util.ArrayList;
//import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class POSService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date invoiceDate;



    // In-memory cart for demonstration
    private final List<CartItem> cart = new ArrayList<>();

    /**
     * Adds a product to the cart.
     * If the product already exists, it updates the quantity.
     */
    public CartItem addProductToCart(CartItem cartItem) {
        if (cartItem.getProductId() == null || cartItem.getQuantity() <= 0) {
            throw new IllegalArgumentException("Invalid productId or quantity");
        }

        Product product = productRepository.findById(cartItem.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if the product is already in the cart
        CartItem existingItem = cart.stream()
                .filter(item -> item.getProductId().equals(cartItem.getProductId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
            return existingItem;
        } else {
            cartItem.setPrice(product.getPrice());
            cartItem.setProductName(product.getName());
            cart.add(cartItem);
            return cartItem;
        }
    }

    /**
     * Returns cart details.
     */
    public List<CartItem> getCartDetails() {
        return new ArrayList<>(cart);
    }

    /**
     * Calculates the total price of the cart.
     */
    public double calculateTotalPrice() {
        return cart.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    /**
     * Adds an item to the cart.
     */
    public void addToCart(CartItem item) {
        cart.add(item);
    }

    /**
     * Generates an invoice PDF and saves it in the database.
     */
    public byte[] generateInvoicePDF(List<CartItem> cart) {
        System.out.println("Cart size before generating invoice: " + cart.size()); // Debug log

        if (cart.isEmpty()) {
            System.out.println("Cart is empty when trying to generate invoice!");  // Debug log
            throw new RuntimeException("Cart is empty. Add products before generating an invoice.");
        }

        double total = 0;
        StringBuilder invoiceDetails = new StringBuilder();

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Invoice Title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Invoice", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph("\n"));

            // Table for Invoice Items
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.addCell(new PdfPCell(new Phrase("Product Name")));
            table.addCell(new PdfPCell(new Phrase("Quantity")));
            table.addCell(new PdfPCell(new Phrase("Price")));

            for (CartItem item : cart) {
                table.addCell(item.getProductName());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell(String.valueOf(item.getPrice()));
                total += item.getQuantity() * item.getPrice();

                // Append invoice details
                invoiceDetails.append(item.getProductName())
                        .append(" - Qty: ")
                        .append(item.getQuantity())
                        .append(" - Price: ")
                        .append(item.getPrice())
                        .append("\n");
            }

            document.add(table);
            document.add(new Paragraph("\nTotal: $" + total));
            document.close();

            // ✅ Save Invoice to Database
            Invoice invoice = new Invoice();
            invoice.setTotalAmount(total);

            // ✅ FIXED: Use `LocalDateTime.now()` or `Timestamp`
            invoice.setInvoiceDate(new Date());

            invoice.setInvoiceDetails(invoiceDetails.toString()); // Store product details
            invoiceRepository.save(invoice);

            // ✅ Clear Cart After Invoice Generation
            cartItemRepository.deleteAll();

            return outputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("Error generating invoice PDF", e);
        }
    }

    /**
     * Retrieves product by ID and returns it as a CartItem.
     */
    public Optional<CartItem> getProductById(Long id) {
        return productRepository.findById(id)
                .map(product -> new CartItem(product.getId(), id, product.getName(), product.getPrice(), 1));
    }
}
