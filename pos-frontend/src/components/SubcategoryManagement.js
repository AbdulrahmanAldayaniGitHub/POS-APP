import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { get, post, put, remove } from "../api"; // Assume these methods are defined in your API utility file

const SubcategoryManagement = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const response = await get("/subcategories");
      setSubcategories(response.data);
    } catch (error) {
      message.error("Failed to fetch subcategories");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await get("/categories");
      setCategories(response.data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (editId) {
        await put(`/subcategories/${editId}`, values);
        message.success("Subcategory updated successfully");
      } else {
        await post("/subcategories", values);
        message.success("Subcategory created successfully");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchSubcategories();
      setEditId(null);
    } catch (error) {
      message.error("Failed to save subcategory");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await remove(`/subcategories/${id}`);
      message.success("Subcategory deleted successfully");
      fetchSubcategories();
    } catch (error) {
      message.error("Failed to delete subcategory");
    }
  };

  return (
    <div>
      <h2>Subcategory Management</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Subcategory
      </Button>
      <Table
        dataSource={subcategories}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Name", dataIndex: "name" },
          { title: "Category", dataIndex: ["category", "name"] },
          {
            title: "Actions",
            render: (text, record) => (
              <>
                <Button
                  onClick={() => {
                    form.setFieldsValue({
                      name: record.name,
                      categoryId: record.category?.id,
                    });
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
        title={editId ? "Edit Subcategory" : "Add Subcategory"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Subcategory Name"
            rules={[{ required: true, message: "Please enter a subcategory name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubcategoryManagement;

// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message } from "antd";
// import { get, post, put, remove } from "../api"; // Assume these methods are defined in your API utility file

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const response = await get("/products");
//       setProducts(response.data);
//     } catch (error) {
//       message.error("Failed to fetch products");
//     }
//   };

//   // Fetch Brands
//   const fetchBrands = async () => {
//     try {
//       const response = await get("/brands");
//       setBrands(response.data);
//     } catch (error) {
//       message.error("Failed to fetch brands");
//     }
//   };

//   // Fetch Subcategories
//   const fetchSubcategories = async () => {
//     try {
//       const response = await get("/subcategories");
//       setSubcategories(response.data);
//     } catch (error) {
//       message.error("Failed to fetch subcategories");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchBrands();
//     fetchSubcategories();
//   }, []);

//   // Handle Form Submission
//   const handleSubmit = async (values) => {
//     try {
//       const payload = {
//         ...values,
//         brand: { id: values.brandId }, // Ensure the structure matches your backend
//         subcategory: { id: values.subcategoryId }, // Ensure the structure matches your backend
//       };

//       if (editId) {
//         await put(`/products/${editId}`, payload);
//         message.success("Product updated successfully");
//       } else {
//         await post("/products", payload);
//         message.success("Product created successfully");
//       }

//       setIsModalOpen(false);
//       form.resetFields();
//       fetchProducts();
//       setEditId(null);
//     } catch (error) {
//       message.error("Failed to save product");
//     }
//   };

//   // Open Modal for Edit
//   const openModal = (product = null) => {
//     setEditId(product ? product.id : null);

//     if (product) {
//       form.setFieldsValue({
//         ...product,
//         brandId: product.brand?.id, // Set brand ID for editing
//         subcategoryId: product.subcategory?.id, // Set subcategory ID for editing
//       });
//     } else {
//       form.resetFields();
//     }

//     setIsModalOpen(true);
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await remove(`/products/${id}`);
//       message.success("Product deleted successfully");
//       fetchProducts();
//     } catch (error) {
//       message.error("Failed to delete product");
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={() => openModal()}>
//         Add Product
//       </Button>
//       <Table
//         dataSource={products}
//         columns={[
//           { title: "ID", dataIndex: "id", key: "id" },
//           { title: "Name", dataIndex: "name", key: "name" },
//           { title: "Brand", dataIndex: ["brand", "name"], key: "brand" },
//           { title: "Subcategory", dataIndex: ["subcategory", "name"], key: "subcategory" },
//           { title: "Price", dataIndex: "price", key: "price" },
//           { title: "Quantity", dataIndex: "quantity", key: "quantity" },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <>
//                 <Button type="link" onClick={() => openModal(record)}>
//                   Edit
//                 </Button>
//                 <Button type="link" danger onClick={() => handleDelete(record.id)}>
//                   Delete
//                 </Button>
//               </>
//             ),
//           },
//         ]}
//       />
//       <Modal
//         title={editId ? "Edit Product" : "Add Product"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSubmit} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please enter the product name" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="brandId"
//             label="Brand"
//             rules={[{ required: true, message: "Please select a brand" }]}
//           >
//             <Select placeholder="Select a Brand">
//               {brands.map((brand) => (
//                 <Select.Option key={brand.id} value={brand.id}>
//                   {brand.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="subcategoryId"
//             label="Subcategory"
//             rules={[{ required: true, message: "Please select a subcategory" }]}
//           >
//             <Select placeholder="Select a Subcategory">
//               {subcategories.map((subcategory) => (
//                 <Select.Option key={subcategory.id} value={subcategory.id}>
//                   {subcategory.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: "Please enter the price" }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             name="quantity"
//             label="Quantity"
//             rules={[{ required: true, message: "Please enter the quantity" }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editId ? "Update" : "Add"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ProductManagement;







// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message } from "antd";
// import { get, post, put, remove } from "../api"; // Assume these methods are defined in your API utility file

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const response = await get("/products");
//       setProducts(response.data); // Ensure this includes brand and subcategory details
//     } catch (error) {
//       message.error("Failed to fetch products");
//     }
//   };

//   // Fetch Brands
//   const fetchBrands = async () => {
//     try {
//       const response = await get("/brands");
//       setBrands(response.data);
//     } catch (error) {
//       message.error("Failed to fetch brands");
//     }
//   };

//   // Fetch Subcategories
//   const fetchSubcategories = async () => {
//     try {
//       const response = await get("/subcategories");
//       setSubcategories(response.data);
//     } catch (error) {
//       message.error("Failed to fetch subcategories");
//     }
//   };

//   // Fetch all data on component mount
//   useEffect(() => {
//     fetchProducts();
//     fetchBrands();
//     fetchSubcategories();
//   }, []);

//   // Handle Form Submission
//   const handleSubmit = async (values) => {
//     try {
//       const payload = {
//         ...values,
//         brand: { id: values.brandId }, // Structure required by backend
//         subcategory: { id: values.subcategoryId }, // Structure required by backend
//       };

//       if (editId) {
//         // Update existing product
//         await put(`/products/${editId}`, payload);
//         message.success("Product updated successfully");
//       } else {
//         // Create new product
//         await post("/products", payload);
//         message.success("Product created successfully");
//       }

//       setIsModalOpen(false);
//       form.resetFields();
//       fetchProducts(); // Refresh the product list
//       setEditId(null);
//     } catch (error) {
//       message.error("Failed to save product");
//     }
//   };

//   // Open Modal for Add/Edit
//   const openModal = (product = null) => {
//     setEditId(product ? product.id : null);

//     if (product) {
//       form.setFieldsValue({
//         ...product,
//         brandId: product.brand?.id, // Pre-fill brand ID
//         subcategoryId: product.subcategory?.id, // Pre-fill subcategory ID
//       });
//     } else {
//       form.resetFields();
//     }

//     setIsModalOpen(true);
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await remove(`/products/${id}`);
//       message.success("Product deleted successfully");
//       fetchProducts(); // Refresh the product list
//     } catch (error) {
//       message.error("Failed to delete product");
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={() => openModal()}>
//         Add Product
//       </Button>
//       <Table
//         dataSource={products}
//         columns={[
//           { title: "ID", dataIndex: "id", key: "id" },
//           { title: "Name", dataIndex: "name", key: "name" },
//           { title: "Brand", dataIndex: ["brand", "name"], key: "brand" },
//           { title: "Subcategory", dataIndex: ["subcategory", "name"], key: "subcategory" },
//           { title: "Price", dataIndex: "price", key: "price" },
//           { title: "Quantity", dataIndex: "quantity", key: "quantity" },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <>
//                 <Button type="link" onClick={() => openModal(record)}>
//                   Edit
//                 </Button>
//                 <Button type="link" danger onClick={() => handleDelete(record.id)}>
//                   Delete
//                 </Button>
//               </>
//             ),
//           },
//         ]}
//         rowKey="id"
//       />
//       <Modal
//         title={editId ? "Edit Product" : "Add Product"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSubmit} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please enter the product name" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="brandId"
//             label="Brand"
//             rules={[{ required: true, message: "Please select a brand" }]}
//           >
//             <Select placeholder="Select a Brand">
//               {brands.map((brand) => (
//                 <Select.Option key={brand.id} value={brand.id}>
//                   {brand.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="subcategoryId"
//             label="Subcategory"
//             rules={[{ required: true, message: "Please select a subcategory" }]}
//           >
//             <Select placeholder="Select a Subcategory">
//               {subcategories.map((subcategory) => (
//                 <Select.Option key={subcategory.id} value={subcategory.id}>
//                   {subcategory.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: "Please enter the price" }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             name="quantity"
//             label="Quantity"
//             rules={[{ required: true, message: "Please enter the quantity" }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editId ? "Update" : "Add"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ProductManagement;
