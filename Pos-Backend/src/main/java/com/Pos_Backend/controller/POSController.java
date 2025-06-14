////package com.Pos_Backend.controller;
////
////import com.Pos_Backend.Model.CartItem;
////import com.Pos_Backend.Service.POSService;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.HttpHeaders;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////
////import java.util.List;
////
////@RestController
////@RequestMapping("/api/pos")
////public class POSController {
////
////    @Autowired
////    private POSService posService;
////
////    // Add a product to the cart
////    @PostMapping("/cart")
////    public CartItem addProductToCart(@RequestBody CartItem cartItem) {
////        return posService.addProductToCart(cartItem);
////    }
////
////    // Get all items in the cart
////    @GetMapping("/cart")
////    public List<CartItem> getCartDetails() {
////        return posService.getCartDetails();
////    }
////
////    // Calculate total price
////    @GetMapping("/cart/total")
////    public double calculateTotalPrice() {
////        return posService.calculateTotalPrice();
////    }
////
////    // Generate invoice as PDF
////    @GetMapping("/invoice")
////    public ResponseEntity<byte[]> generateInvoice() {
////        byte[] pdfBytes = posService.generateInvoicePDF();
////        HttpHeaders headers = new HttpHeaders();
////        headers.add("Content-Disposition", "attachment; filename=invoice.pdf");
////        return ResponseEntity.ok()
////                .headers(headers)
////                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
////                .body(pdfBytes);
////    }
////}
//
//
//
//
//
//
//
//package com.Pos_Backend.controller;
//
//import com.Pos_Backend.Model.CartItem;
//import com.Pos_Backend.Model.Invoice;
//import com.Pos_Backend.Service.POSService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/pos")
////@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:3000") // Adjust as needed
//
//public class POSController {
//
//    @Autowired
//    private POSService posService;
//
//    // Add a product to the cart
//    @PostMapping("/cart")
//    public CartItem addProductToCart(@RequestBody CartItem cartItem) {
//        return posService.addProductToCart(cartItem);
//    }
//
//    // Get all items in the cart
//    @GetMapping("/cart")
//    public List<CartItem> getCartDetails() {
//        return posService.getCartDetails();
//    }
//
//    // Calculate total price of the cart
//    @GetMapping("/cart/total")
//    public double calculateTotalPrice() {
//        return posService.calculateTotalPrice();
//    }
//
//    // Generate invoice PDF and download
//    @GetMapping("/invoice")
//    public ResponseEntity<byte[]> generateInvoice() {
//        byte[] pdfBytes = posService.generateInvoicePDF();
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "attachment; filename=invoice.pdf");
//        return ResponseEntity.ok()
//                .headers(headers)
//                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
//                .body(pdfBytes);
//    }
//}




package com.Pos_Backend.controller;

import com.Pos_Backend.Dtos.CustomInvoiceItemDTO;
import com.Pos_Backend.Model.CartItem;
import com.Pos_Backend.Service.InvoiceService;
import com.Pos_Backend.Service.POSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pos")
@CrossOrigin(origins = "http://localhost:3000")
public class POSController {

    @Autowired 
    private POSService posService;
    
    @Autowired 
    private InvoiceService invoiceService;
    
    @PostMapping("/cart")
    public CartItem addProductToCart(@RequestBody CartItem cartItem) {
        return posService.addProductToCart(cartItem);
    }
    
    
    @PostMapping("/cart/add")
    public ResponseEntity<String> addToCart(@RequestBody CartItem item) {
        posService.addToCart(item);
        return ResponseEntity.ok("Product added to cart successfully!");
    }


    @GetMapping("/cart")
    public List<CartItem> getCartDetails() {
        return posService.getCartDetails();
    }

    @GetMapping("/cart/total")
    public double calculateTotalPrice() {
        return posService.calculateTotalPrice();
    }

//    @PostMapping("/invoice") // Change from @GetMapping to @PostMapping
//    public ResponseEntity<byte[]> generateInvoice(@RequestBody List<CartItem> cart) {
//        byte[] pdfBytes = posService.generateInvoicePDF(cart);
//
//        if (pdfBytes == null || pdfBytes.length == 0) {
//            return ResponseEntity.notFound().build(); // ❌ Return 404 if the PDF is empty
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "attachment; filename=invoice.pdf");
//
//        return ResponseEntity.ok()
//                .headers(headers)
//                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
//                .body(pdfBytes);
//    }
    
    
    
//    @PostMapping("/invoice")
//    public ResponseEntity<byte[]> generateInvoice(@RequestBody List<CartItem> cart) {
//        byte[] pdfBytes = posService.generateInvoicePDF(cart); // ✅ Now passing cart correctly
//
//        if (pdfBytes == null || pdfBytes.length == 0) {
//            return ResponseEntity.notFound().build();
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "attachment; filename=invoice.pdf");
//
//        return ResponseEntity.ok()
//                .headers(headers)
//                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
//                .body(pdfBytes);
//    }

    
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




    // ✅ Fixed endpoint path
    @GetMapping("/products/{id}") 
    public ResponseEntity<CartItem> getProductById(@PathVariable Long id) {
        Optional<CartItem> product = posService.getProductById(id);
        return product.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
