// ✅ InvoiceHistory.js
import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import axios from "axios";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/invoices");
      setInvoices(response.data);
    } catch (error) {
      message.error("Failed to load invoice history!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `₹ ${amount.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Details",
      dataIndex: "invoiceDetails",
      key: "invoiceDetails",
    },
  ];

  return (
    <div>
      <h2>Invoice History</h2>
      {loading ? <Spin /> : <Table dataSource={invoices} columns={columns} rowKey="id" />}
    </div>
  );
};

export default InvoiceHistory;
