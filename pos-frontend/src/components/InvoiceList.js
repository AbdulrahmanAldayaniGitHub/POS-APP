/* import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, InputNumber, message } from "antd";

const Invoice = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      message.error("Product already in cart");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    try {
      const invoice = {
        products: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        totalAmount,
      };
      await axios.post("/api/invoices", invoice);
      message.success("Invoice created successfully");
      setCart([]);
      setTotalAmount(0);
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to create invoice");
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    calculateTotal();
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Create Invoice</Button>
      <Table
        dataSource={products}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Price", dataIndex: "price" },
          {
            title: "Action",
            render: (text, record) => (
              <Button onClick={() => addToCart(record)}>Add to Cart</Button>
            ),
          },
        ]}
      />
      <Modal
        title="Invoice"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCheckout}
      >
        <Table
          dataSource={cart}
          rowKey="id"
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Price", dataIndex: "price" },
            {
              title: "Quantity",
              render: (text, record) => (
                <InputNumber
                  min={1}
                  value={record.quantity}
                  onChange={(value) => updateQuantity(record.id, value)}
                />
              ),
            },
            {
              title: "Subtotal",
              render: (text, record) => <span>{record.price * record.quantity}</span>,
            },
          ]}
        />
        <h3>Total: {totalAmount}</h3>
      </Modal>
    </div>
  );
};

export default Invoice;









import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { get } from "../api";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    try {
      const response = await get("/invoices");
      console.log("Invoices Data:", response.data); // Debugging log
      setInvoices(response.data);
    } catch (error) {
      message.error("Failed to fetch invoices");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        View Invoices
      </Button>
      <Modal
        title="Invoices"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Table
          dataSource={invoices}
          rowKey="id"
          columns={[
            { title: "Invoice ID", dataIndex: "id" },
            { title: "Total Amount", dataIndex: "totalAmount" },
            {
              title: "Products",
              render: (_, record) => (
                <div>
                  {record.products && Array.isArray(record.products) ? (
                    record.products.map((product) => (
                      <div key={product.id}>
                        {product.name} x {product.quantity} = $
                        {product.price * product.quantity}
                      </div>
                    ))
                  ) : (
                    <span>No Products</span>
                  )}
                </div>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Invoice;





import React, { useState, useEffect } from "react";
import { get } from "../api";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    get("/invoices").then((res) => setInvoices(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <p>Invoice #{invoice.id} - Date: {invoice.date} - Total: ${invoice.total}</p>
          <Link to={`/invoice/${invoice.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;


import { post } from "../api";
import { message } from "antd";

const createInvoice = async (cart) => {
  if (cart.length === 0) {
    message.warning("Cart is empty!");
    return;
  }

  try {
    // Sending cart data to backend for invoice generation
    const response = await post("/pos/invoice", cart, { responseType: "blob" });

    // Handling the response as a downloadable PDF
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("Invoice downloaded successfully!");
  } catch (error) {
    message.error("Error generating invoice!");
  }
};

export default createInvoice;
*/