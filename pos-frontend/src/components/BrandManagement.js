import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { get, post, put, remove } from "../api";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  const fetchBrands = async () => {
    const response = await get("/brands");
    setBrands(response.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (values) => {
    if (editId) {
      await put(`/brands/${editId}`, values);
    } else {
      await post("/brands", values);
    }
    setIsModalOpen(false);
    form.resetFields();
    fetchBrands();
    setEditId(null);
  };

  const handleDelete = async (id) => {
    
    await remove(`/brands/${id}`);
    fetchBrands();
  };

  return (
    <div>
      <h2>Brand Management</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Brand
      </Button>
      <Table
        dataSource={brands}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Name", dataIndex: "name" },
          {
            title: "Actions",
            render: (text, record) => (
              <>
                <Button
                  onClick={() => {
                    form.setFieldsValue(record);
                    setEditId(record.id);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
      />
      <Modal
        title={editId ? "Edit Brand" : "Add Brand"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Brand Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandManagement;
