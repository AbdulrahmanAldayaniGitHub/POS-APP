// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Input, message } from "antd";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/api/categories");
//       setCategories(response.data);
//     } catch (error) {
//       message.error("Failed to fetch categories");
//     }
//   };

//   const handleSave = async (values) => {
//     try {
//       if (currentCategory) {
//         await axios.put(`/api/categories/${currentCategory.id}`, values);
//         message.success("Category updated successfully");
//       } else {
//         await axios.post("/api/categories", values);
//         message.success("Category created successfully");
//       }
//       fetchCategories();
//       setIsModalOpen(false);
//       form.resetFields();
//     } catch (error) {
//       message.error("Failed to save category");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/categories/${id}`);
//       message.success("Category deleted successfully");
//       fetchCategories();
//     } catch (error) {
//       message.error("Failed to delete category");
//     }
//   };

//   const openModal = (category = null) => {
//     setCurrentCategory(category);
//     if (category) {
//       form.setFieldsValue(category);
//     }
//     setIsModalOpen(true);
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={() => openModal()}>Add Category</Button>
//       <Table
//         dataSource={categories}
//         rowKey="id"
//         columns={[
//           { title: "ID", dataIndex: "id" },
//           { title: "Name", dataIndex: "name" },
//           {
//             title: "Actions",
//             render: (text, record) => (
//               <>
//                 <Button onClick={() => openModal(record)} type="link">Edit</Button>
//                 <Button onClick={() => handleDelete(record.id)} type="link" danger>
//                   Delete
//                 </Button>
//               </>
//             ),
//           },
//         ]}
//       />
//       <Modal
//         title={currentCategory ? "Edit Category" : "Add Category"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={() => form.submit()}
//       >
//         <Form form={form} onFinish={handleSave}>
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Category;
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { get, post, put, remove } from "../api";  // Assume these methods are defined in your API utility file

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const response = await get("/categories");
      setCategories(response.data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (editId) {
        await put(`/categories/${editId}`, values);
        message.success("Category updated successfully");
      } else {
        await post("/categories", values);
        message.success("Category created successfully");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchCategories();
      setEditId(null);
    } catch (error) {
      message.error("Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(`/categories/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  return (
    <div>
      <h2>Category Management</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Category
      </Button>
      <Table
        dataSource={categories}
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
        title={editId ? "Edit Category" : "Add Category"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
