// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Table, Button, Modal, Form, Input, Select, InputNumber, message } from "antd";

// // // const Product = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [brands, setBrands] = useState([]);
// // //   const [subcategories, setSubcategories] = useState([]);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [currentProduct, setCurrentProduct] = useState(null);
// // //   const [form] = Form.useForm();

// // //   useEffect(() => {
// // //     fetchProducts();
// // //     fetchBrands();
// // //     fetchSubcategories();
// // //   }, []);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const response = await axios.get("/api/products");
// // //       setProducts(response.data);
// // //     } catch (error) {
// // //       message.error("Failed to fetch products");
// // //     }
// // //   };

// // //   const fetchBrands = async () => {
// // //     try {
// // //       const response = await axios.get("/api/brands");
// // //       setBrands(response.data);
// // //     } catch (error) {
// // //       message.error("Failed to fetch brands");
// // //     }
// // //   };

// // //   const fetchSubcategories = async () => {
// // //     try {
// // //       const response = await axios.get("/api/subcategories");
// // //       setSubcategories(response.data);
// // //     } catch (error) {
// // //       message.error("Failed to fetch subcategories");
// // //     }
// // //   };

// // //   const handleSave = async (values) => {
// // //     try {
// // //       if (currentProduct) {
// // //         await axios.put(`/api/products/${currentProduct.id}`, values);
// // //         message.success("Product updated successfully");
// // //       } else {
// // //         await axios.post("/api/products", values);
// // //         message.success("Product created successfully");
// // //       }
// // //       fetchProducts();
// // //       setIsModalOpen(false);
// // //       form.resetFields();
// // //     } catch (error) {
// // //       message.error("Failed to save product");
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await axios.delete(`/api/products/${id}`);
// // //       message.success("Product deleted successfully");
// // //       fetchProducts();
// // //     } catch (error) {
// // //       message.error("Failed to delete product");
// // //     }
// // //   };

// // //   const openModal = (product = null) => {
// // //     setCurrentProduct(product);
// // //     if (product) {
// // //       form.setFieldsValue({
// // //         ...product,
// // //         brandId: product.brand.id,
// // //         subcategoryId: product.subcategory.id,
// // //       });
// // //     }
// // //     setIsModalOpen(true);
// // //   };

// // //   return (
// // //     <div>
// // //       <Button type="primary" onClick={() => openModal()}>Add Product</Button>
// // //       <Table
// // //         dataSource={products}
// // //         rowKey="id"
// // //         columns={[
// // //           { title: "ID", dataIndex: "id" },
// // //           { title: "Name", dataIndex: "name" },
// // //           { title: "Brand", dataIndex: ["brand", "name"] },
// // //           { title: "Subcategory", dataIndex: ["subcategory", "name"] },
// // //           { title: "Price", dataIndex: "price" },
// // //           { title: "Quantity", dataIndex: "quantity" },
// // //           {
// // //             title: "Actions",
// // //             render: (text, record) => (
// // //               <>
// // //                 <Button onClick={() => openModal(record)} type="link">Edit</Button>
// // //                 <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
// // //               </>
// // //             ),
// // //           },
// // //         ]}
// // //       />
// // //       <Modal
// // //         title={currentProduct ? "Edit Product" : "Add Product"}
// // //         open={isModalOpen}
// // //         onCancel={() => setIsModalOpen(false)}
// // //         onOk={() => form.submit()}
// // //       >
// // //         <Form form={form} onFinish={handleSave}>
// // //           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
// // //             <Input />
// // //           </Form.Item>
// // //           <Form.Item name="brandId" label="Brand" rules={[{ required: true, message: "Brand is required" }]}>
// // //             <Select>
// // //               {brands.map((brand) => (
// // //                 <Select.Option key={brand.id} value={brand.id}>
// // //                   {brand.name}
// // //                 </Select.Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>
// // //           <Form.Item name="subcategoryId" label="Subcategory" rules={[{ required: true, message: "Subcategory is required" }]}>
// // //             <Select>
// // //               {subcategories.map((subcategory) => (
// // //                 <Select.Option key={subcategory.id} value={subcategory.id}>
// // //                   {subcategory.name}
// // //                 </Select.Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>
// // //           <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
// // //             <InputNumber min={0} />
// // //           </Form.Item>
// // //           <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Quantity is required" }]}>
// // //             <InputNumber min={0} />
// // //           </Form.Item>
// // //         </Form>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default Product;



// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Table, Button, Modal, Form, Input, Select, InputNumber, message } from "antd";

// // const Product = () => {
// //   const [products, setProducts] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [subcategories, setSubcategories] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [currentProduct, setCurrentProduct] = useState(null);
// //   const [form] = Form.useForm();

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchBrands();
// //     fetchSubcategories();
// //   }, []);

// //   // Fetch products from the API
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("/api/products");
// //       setProducts(response.data);
// //     } catch (error) {
// //       message.error(`Failed to fetch products: ${error.message}`);
// //     }
// //   };

// //   // Fetch brands from the API
// //   const fetchBrands = async () => {
// //     try {
// //       const response = await axios.get("/api/brands");
// //       setBrands(response.data);
// //     } catch (error) {
// //       message.error(`Failed to fetch brands: ${error.message}`);
// //     }
// //   };

// //   // Fetch subcategories from the API
// //   const fetchSubcategories = async () => {
// //     try {
// //       const response = await axios.get("/api/subcategories");
// //       setSubcategories(response.data);
// //     } catch (error) {
// //       message.error(`Failed to fetch subcategories: ${error.message}`);
// //     }
// //   };

// //   // Save or update product
// //   const handleSave = async (values) => {
// //     try {
// //       if (currentProduct) {
// //         // Update existing product
// //         await axios.put(`/api/products/${currentProduct.id}`, values);
// //         message.success("Product updated successfully");
// //       } else {
// //         // Add new product
// //         await axios.post("/api/products", values);
// //         message.success("Product created successfully");
// //       }
// //       fetchProducts();
// //       closeModal();
// //     } catch (error) {
// //       message.error(`Failed to save product: ${error.message}`);
// //     }
// //   };

// //   // Delete a product
// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`/api/products/${id}`);
// //       message.success("Product deleted successfully");
// //       fetchProducts();
// //     } catch (error) {
// //       message.error(`Failed to delete product: ${error.message}`);
// //     }
// //   };

// //   // Open modal for adding or editing a product
// //   const openModal = (product = null) => {
// //     setCurrentProduct(product);
// //     if (product) {
// //       // Set form values for editing
// //       form.setFieldsValue({
// //         ...product,
// //         brandId: product.brand?.id,
// //         subcategoryId: product.subcategory?.id,
// //       });
// //     } else {
// //       // Reset form for adding new product
// //       form.resetFields();
// //     }
// //     setIsModalOpen(true);
// //   };

// //   // Close modal and reset form
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     form.resetFields();
// //     setCurrentProduct(null);
// //   };

// //   return (
// //     <div>
// //       <Button type="primary" onClick={() => openModal()}>Add Product</Button>
// //       <Table
// //         dataSource={products}
// //         rowKey="id"
// //         columns={[
// //           { title: "ID", dataIndex: "id" },
// //           { title: "Name", dataIndex: "name" },
// //           { title: "Brand", dataIndex: ["brand", "name"] },
// //           { title: "Subcategory", dataIndex: ["subcategory", "name"] },
// //           { title: "Price", dataIndex: "price" },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           {
// //             title: "Actions",
// //             render: (text, record) => (
// //               <>
// //                 <Button onClick={() => openModal(record)} type="link">Edit</Button>
// //                 <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
// //               </>
// //             ),
// //           },
// //         ]}
// //       />
// //       <Modal
// //         title={currentProduct ? "Edit Product" : "Add Product"}
// //         open={isModalOpen}
// //         onCancel={closeModal}
// //         onOk={() => form.submit()}
// //       >
// //         <Form form={form} onFinish={handleSave} layout="vertical">
// //           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item name="brandId" label="Brand" rules={[{ required: true, message: "Brand is required" }]}>
// //             <Select placeholder="Select a brand">
// //               {brands.map((brand) => (
// //                 <Select.Option key={brand.id} value={brand.id}>
// //                   {brand.name}
// //                 </Select.Option>
// //               ))}
// //             </Select>
// //           </Form.Item>
// //           <Form.Item name="subcategoryId" label="Subcategory" rules={[{ required: true, message: "Subcategory is required" }]}>
// //             <Select placeholder="Select a subcategory">
// //               {subcategories.map((subcategory) => (
// //                 <Select.Option key={subcategory.id} value={subcategory.id}>
// //                   {subcategory.name}
// //                 </Select.Option>
// //               ))}
// //             </Select>
// //           </Form.Item>
// //           <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
// //             <InputNumber min={0} placeholder="Enter price" style={{ width: "100%" }} />
// //           </Form.Item>
// //           <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Quantity is required" }]}>
// //             <InputNumber min={0} placeholder="Enter quantity" style={{ width: "100%" }} />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Product;

// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, InputNumber, message } from "antd";
// import { get, post, put, remove } from "../api"; // Import reusable API functions

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await get("/products");
//       setProducts(response.data);
//     } catch (error) {
//       message.error("Failed to fetch products");
//     }
//   };

//   // Fetch brands
//   const fetchBrands = async () => {
//     try {
//       const response = await get("/brands");
//       setBrands(response.data);
//     } catch (error) {
//       message.error("Failed to fetch brands");
//     }
//   };

//   // Fetch subcategories
//   const fetchSubcategories = async () => {
//     try {
//       const response = await get("/subcategories");
//       setSubcategories(response.data);
//     } catch (error) {
//       message.error("Failed to fetch subcategories");
//     }
//   };

//   // Fetch initial data
//   useEffect(() => {
//     fetchProducts();
//     fetchBrands();
//     fetchSubcategories();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     try {
//       if (editId) {
//         await put(`/products/${editId}`, values);
//         message.success("Product updated successfully");
//       } else {
//         await post("/products", values);
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

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await remove(`/products/${id}`);
//       message.success("Product deleted successfully");
//       fetchProducts();
//     } catch (error) {
//       message.error("Failed to delete product");
//     }
//   };

//   // Open modal for add/edit
//   const openModal = (product = null) => {
//     setEditId(product ? product.id : null);
//     if (product) {
//       form.setFieldsValue({
//         ...product,
//         brandId: product.brand?.id,
//         subcategoryId: product.subcategory?.id,
//       });
//     } else {
//       form.resetFields();
//     }
//     setIsModalOpen(true);
//   };
  
  

//   return (
//     <div>
//       <Button type="primary" onClick={() => openModal()}>Add Product</Button>
//       <Table
//         dataSource={products}
//         rowKey="id"
//         columns={[
//           { title: "ID", dataIndex: "id" },
//           { title: "Name", dataIndex: "name" },
//           { title: "Brand", dataIndex: ["brand", "name"] },
//           { title: "Subcategory", dataIndex: ["subcategory", "name"] },
//           { title: "Price", dataIndex: "price" },
//           { title: "Quantity", dataIndex: "quantity" },
//           {
//             title: "Actions",
//             render: (text, record) => (
//               <>
//                 <Button onClick={() => openModal(record)} type="link">Edit</Button>
//                 <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
//               </>
//             ),
//           },
//         ]}
//       />
//       <Modal
//         title={editId ? "Edit Product" : "Add Product"}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={() => form.submit()}
//       >
//         <Form form={form} onFinish={handleSubmit}>
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//   name="brandId"
//   label="Brand"
//   rules={[{ required: true, message: "Please select a brand!" }]}
// >
//   <Select placeholder="Select a Brand">
//     {brands.map((brand) => (
//       <Select.Option key={brand.id} value={brand.id}>
//         {brand.name}
//       </Select.Option>
//     ))}
//   </Select>
// </Form.Item>

// <Form.Item
//   name="subcategoryId"
//   label="Subcategory"
//   rules={[{ required: true, message: "Please select a subcategory!" }]}
// >
//   <Select placeholder="Select a Subcategory">
//     {subcategories.map((subcategory) => (
//       <Select.Option key={subcategory.id} value={subcategory.id}>
//         {subcategory.name}
//       </Select.Option>
//     ))}
//   </Select>
// </Form.Item>

//           <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
//             <InputNumber min={0} />
//           </Form.Item>
//           <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Quantity is required" }]}>
//             <InputNumber min={0} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Product;


import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { get, post, put, remove } from "../api"; // Assume these methods are defined in your API utility file

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await get("/products");
      setProducts(response.data); // Ensure this includes brand and subcategory details
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  // Fetch Brands
  const fetchBrands = async () => {
    try {
      const response = await get("/brands");
      setBrands(response.data);
    } catch (error) {
      message.error("Failed to fetch brands");
    }
  };

  // Fetch Subcategories
  const fetchSubcategories = async () => {
    try {
      const response = await get("/subcategories");
      setSubcategories(response.data);
    } catch (error) {
      message.error("Failed to fetch subcategories");
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchSubcategories();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        brand: { id: values.brandId }, // Structure required by backend
        subcategory: { id: values.subcategoryId }, // Structure required by backend
      };

      if (editId) {
        // Update existing product
        await put(`/products/${editId}`, payload);
        message.success("Product updated successfully");
      } else {
        // Create new product
        await post("/products", payload);
        message.success("Product created successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchProducts(); // Refresh the product list
      setEditId(null);
    } catch (error) {
      message.error("Failed to save product");
    }
  };

  // Open Modal for Add/Edit
  const openModal = (product = null) => {
    setEditId(product ? product.id : null);

    if (product) {
      form.setFieldsValue({
        ...product,
        brandId: product.brand?.id, // Pre-fill brand ID
        subcategoryId: product.subcategory?.id, // Pre-fill subcategory ID
      });
    } else {
      form.resetFields();
    }

    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await remove(`/products/${id}`);
      message.success("Product deleted successfully");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => openModal()}>
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Brand", dataIndex: ["brand", "name"], key: "brand" },
          { title: "Subcategory", dataIndex: ["subcategory", "name"], key: "subcategory" },
          { title: "Price", dataIndex: "price", key: "price" },
          { title: "Quantity", dataIndex: "quantity", key: "quantity" },
          {
            title: "Actions",
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => openModal(record)}>
                  Edit
                </Button>
                <Button type="link" danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
      />
      <Modal
        title={editId ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Brand"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select placeholder="Select a Brand">
              {brands.map((brand) => (
                <Select.Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subcategoryId"
            label="Subcategory"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select placeholder="Select a Subcategory">
              {subcategories.map((subcategory) => (
                <Select.Option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editId ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
