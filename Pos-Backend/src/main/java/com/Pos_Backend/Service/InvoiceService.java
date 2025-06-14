//package com.Pos_Backend.Service;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.Pos_Backend.Model.Invoice;
//import com.Pos_Backend.Repo.InvoiceRepository;
//
//import java.util.List;
//
//@Service
//public class InvoiceService {
//
//    @Autowired
//    private InvoiceRepository invoiceRepository;
//
//    public List<Invoice> getAllInvoices() {
//        return invoiceRepository.findAll();
//    }
//
//    public Invoice createInvoice(Invoice invoice) {
//        return invoiceRepository.save(invoice);
//    }
//}


package com.Pos_Backend.Service;

import com.Pos_Backend.Dtos.CustomInvoiceItemDTO;
import com.Pos_Backend.Model.Invoice;
import com.Pos_Backend.Repo.InvoiceRepository;
import com.Pos_Backend.Repo.ProductRepository;
import com.itextpdf.text.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.Pos_Backend.Model.Product;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;


@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    
    @Autowired
    private ProductRepository productRepository;
    
    
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }


    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }


    

    public byte[] generateInvoicePdf(List<CustomInvoiceItemDTO> items) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Invoice", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" ")); // Empty space

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{4, 2, 2, 2});

            // Header
            addTableHeader(table, "Product");
            addTableHeader(table, "Price");
            addTableHeader(table, "Qty");
            addTableHeader(table, "Total");

            for (CustomInvoiceItemDTO item : items) {
                String name;
                double price;
                int qty;

                if (item.getId().startsWith("custom-")) {
                    // Custom product
                    name = item.getName();
                    price = item.getPrice();
                    qty = item.getQuantity();
                } else {
                    // Real product
                    Long productId = Long.parseLong(item.getId());
                    Product product = productRepository.findById(productId).orElse(null);
                    if (product == null) continue;

                    name = product.getName();
                    price = product.getPrice();
                    qty = item.getQuantity();
                }

                double total = price * qty;

                addTableCell(table, name);
                addTableCell(table, String.format("%.2f", price));
                addTableCell(table, String.valueOf(qty));
                addTableCell(table, String.format("%.2f", total));
            }

            document.add(table);
            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void addTableHeader(PdfPTable table, String headerTitle) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
        header.setPhrase(new Phrase(headerTitle));
        table.addCell(header);
    }

    private void addTableCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text));
        cell.setPadding(5);
        table.addCell(cell);
    }
    

}
