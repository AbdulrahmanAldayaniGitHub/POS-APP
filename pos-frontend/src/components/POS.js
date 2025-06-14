// // // import React, { useState, useEffect } from "react";
// // // import { Table, Button, Modal, message } from "antd";
// // // import axios from "axios";

// // // const POS = () => {
// // //   const [products, setProducts] = useState([]); // Stores products fetched from the API
// // //   const [cart, setCart] = useState([]); // Stores products added to the cart
// // //   const [isInvoiceOpen, setIsInvoiceOpen] = useState(false); // Controls invoice modal visibility
// // //   const [invoice, setInvoice] = useState(null); // Stores invoice data

// // //   // API endpoints (use your actual server's base URL)
// // //   const API_BASE_URL = "http://localhost:5000"; // Replace with your actual server URL
// // //   const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`;

// // //   // Fetch products when the component mounts
// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Fetch products from the API
// // //   const fetchProducts = async () => {
// // //     try {
// // //       const response = await axios.get(PRODUCTS_ENDPOINT);
// // //       if (response.status === 200) {
// // //         setProducts(response.data);
// // //       } else {
// // //         message.error("Failed to fetch products. Please try again later.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching products:", error);
// // //       message.error("Unable to fetch products. Check your API connection.");
// // //     }
// // //   };

// // //   // Add product to the cart
// // //   const addToCart = (product) => {
// // //     setCart((prevCart) => {
// // //       const existingProduct = prevCart.find((item) => item.id === product.id);
// // //       if (existingProduct) {
// // //         // Update quantity if the product is already in the cart
// // //         return prevCart.map((item) =>
// // //           item.id === product.id
// // //             ? { ...item, quantity: item.quantity + 1 }
// // //             : item
// // //         );
// // //       }
// // //       // Add new product to the cart
// // //       return [...prevCart, { ...product, quantity: 1 }];
// // //     });
// // //     message.success(`${product.name} added to the cart!`);
// // //   };

// // //   // Generate an invoice
// // //   const generateInvoice = () => {
// // //     if (cart.length === 0) {
// // //       message.warning("Cart is empty!");
// // //       return;
// // //     }
// // //     const invoiceData = {
// // //       items: cart,
// // //       total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
// // //     };
// // //     setInvoice(invoiceData);
// // //     setIsInvoiceOpen(true);
// // //   };

// // //   // Remove a product from the cart
// // //   const handleDeleteItem = (productId) => {
// // //     setCart(cart.filter((item) => item.id !== productId));
// // //     message.info("Item removed from the cart.");
// // //   };

// // //   // Close the invoice modal
// // //   const handleCloseInvoice = () => {
// // //     setIsInvoiceOpen(false);
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h1>Point of Sale (POS)</h1>

// // //       {/* Generate Invoice Button */}
// // //       <Button
// // //         type="primary"
// // //         onClick={generateInvoice}
// // //         disabled={cart.length === 0}
// // //         style={{
// // //           marginBottom: "20px",
// // //         }}
// // //       >
// // //         Generate Invoice
// // //       </Button>

// // //       {/* Products Table */}
// // //       <h2>Products</h2>
// // //       <Table
// // //         dataSource={products}
// // //         rowKey="id"
// // //         columns={[
// // //           { title: "ID", dataIndex: "id" },
// // //           { title: "Name", dataIndex: "name" },
// // //           { title: "Price", dataIndex: "price" },
// // //           {
// // //             title: "Actions",
// // //             render: (text, record) => (
// // //               <Button type="primary" onClick={() => addToCart(record)}>
// // //                 Add to Cart
// // //               </Button>
// // //             ),
// // //           },
// // //         ]}
// // //       />

// // //       {/* Invoice Modal */}
// // //       <Modal
// // //         title="Invoice"
// // //         open={isInvoiceOpen}
// // //         onCancel={handleCloseInvoice}
// // //         footer={null}
// // //       >
// // //         <Table
// // //           dataSource={invoice ? invoice.items : []}
// // //           rowKey="id"
// // //           columns={[
// // //             { title: "Product", dataIndex: "name" },
// // //             { title: "Price", dataIndex: "price" },
// // //             { title: "Quantity", dataIndex: "quantity" },
// // //             {
// // //               title: "Total",
// // //               render: (text, record) => record.price * record.quantity,
// // //             },
// // //             {
// // //               title: "Actions",
// // //               render: (text, record) => (
// // //                 <Button
// // //                   onClick={() => handleDeleteItem(record.id)}
// // //                   type="link"
// // //                   danger
// // //                 >
// // //                   Delete
// // //                 </Button>
// // //               ),
// // //             },
// // //           ]}
// // //         />
// // //         <div style={{ textAlign: "right", fontWeight: "bold", marginTop: "20px" }}>
// // //           Total: ${invoice ? invoice.total.toFixed(2) : 0}
// // //         </div>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default POS;

// // import React, { useState, useEffect } from "react";
// // import { Table, Button, message, Modal } from "antd";
// // import axios from "axios";

// // const POS = () => {
// //   const [products, setProducts] = useState([]);
// //   const [cart, setCart] = useState([]);
// //   const [invoice, setInvoice] = useState(null);
// //   const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

// //   // Fetch products on component mount
// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("/api/products");
// //       setProducts(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch products");
// //     }
// //   };

// //   const addToCart = (product) => {
// //     const existingItem = cart.find((item) => item.id === product.id);
// //     if (existingItem) {
// //       setCart(
// //         cart.map((item) =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart([...cart, { ...product, quantity: 1 }]);
// //     }
// //     message.success(`${product.name} added to cart!`);
// //   };

// //   const generateInvoice = async () => {
// //     if (cart.length === 0) {
// //       message.warning("Cart is empty!");
// //       return;
// //     }

// //     try {
// //       const response = await axios.post("/api/invoices", { cart });
// //       setInvoice(response.data);
// //       setIsInvoiceOpen(true);
// //       message.success("Invoice generated successfully!");
// //       setCart([]); // Clear cart after generating invoice
// //     } catch (error) {
// //       message.error("Failed to generate invoice");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>POS System</h1>
// //       <Button
// //         type="primary"
// //         onClick={generateInvoice}
// //         disabled={cart.length === 0}
// //         style={{ marginBottom: "20px" }}
// //       >
// //         Generate Invoice
// //       </Button>

// //       <h2>Products</h2>
// //       <Table
// //         dataSource={products}
// //         rowKey="id"
// //         columns={[
// //           { title: "Name", dataIndex: "name" },
// //           { title: "Price", dataIndex: "price" },
// //           {
// //             title: "Actions",
// //             render: (text, record) => (
// //               <Button onClick={() => addToCart(record)}>Add to Cart</Button>
// //             ),
// //           },
// //         ]}
// //       />

// //       <Modal
// //         title="Invoice"
// //         visible={isInvoiceOpen}
// //         onCancel={() => setIsInvoiceOpen(false)}
// //         footer={null}
// //       >
// //         <div>
// //           {invoice ? (
// //             <>
// //               <h3>Invoice ID: {invoice.id}</h3>
// //               <p>Total Price: ${invoice.total_price.toFixed(2)}</p>
// //             </>
// //           ) : null}
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default POS;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const POS = () => {
// //   const [products, setProducts] = useState([]); // List of all products
// //   const [cart, setCart] = useState([]); // Items in the cart
// //   const [totalPrice, setTotalPrice] = useState(0); // Total price of the cart
// //   const [invoice, setInvoice] = useState(null); // Generated invoice

// //   // State for new product
// //   const [newProduct, setNewProduct] = useState({
// //     name: "",
// //     price: "",
// //     stock: "",
// //   });

// //   // Fetch all products
// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("/api/products");
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //     }
// //   };

// //   // Add a product to the database
// //   const handleAddProduct = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("/api/products", newProduct); // POST new product to backend
// //       setProducts([...products, response.data]); // Update product list
// //       setNewProduct({ name: "", price: "", stock: "" }); // Reset form
// //     } catch (error) {
// //       console.error("Error adding product:", error);
// //     }
// //   };

// //   // Add a product to the cart
// //   const addToCart = (product) => {
// //     const existingItem = cart.find((item) => item.productId === product.id);
// //     if (existingItem) {
// //       setCart(
// //         cart.map((item) =>
// //           item.productId === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart([...cart, { productId: product.id, name: product.name, price: product.price, quantity: 1 }]);
// //     }
// //   };

// //   // Calculate total price whenever the cart changes
// //   useEffect(() => {
// //     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //     setTotalPrice(total);
// //   }, [cart]);

// //   // Generate invoice
// //   const generateInvoice = async () => {
// //     try {
// //       const response = await axios.post("/api/pos/invoice", cart);
// //       setInvoice(response.data); // Set the generated invoice
// //       setCart([]); // Clear the cart
// //     } catch (error) {
// //       console.error("Error generating invoice:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>POS System</h1>
      
// //       {/* Add New Product Form */}
// //       <div>
// //         <h2>Add New Product</h2>
// //         <form onSubmit={handleAddProduct}>
// //           <input
// //             type="text"
// //             placeholder="Product Name"
// //             value={newProduct.name}
// //             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="number"
// //             placeholder="Price"
// //             value={newProduct.price}
// //             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="number"
// //             placeholder="Stock"
// //             value={newProduct.stock}
// //             onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
// //             required
// //           />
// //           <button type="submit">Add Product</button>
// //         </form>
// //       </div>

// //       {/* Product List */}
// //       <div>
// //         <h2>Products</h2>
// //         <ul>
// //           {products.map((product) => (
// //             <li key={product.id}>
// //               {product.name} - ${product.price} - Stock: {product.stock}
// //               <button onClick={() => addToCart(product)}>Add to Cart</button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Cart */}
// //       <div>
// //         <h2>Cart</h2>
// //         <ul>
// //           {cart.map((item) => (
// //             <li key={item.productId}>
// //               {item.name} - ${item.price} x {item.quantity}
// //             </li>
// //           ))}
// //         </ul>
// //         <h3>Total: ${totalPrice.toFixed(2)}</h3>
// //         {cart.length > 0 && (
// //           <button onClick={generateInvoice}>Generate Invoice</button>
// //         )}
// //       </div>

// //       {/* Invoice */}
// //       {invoice && (
// //         <div>
// //           <h2>Invoice</h2>
// //           <p>Total Amount: ${invoice.totalAmount}</p>
// //           <p>Date: {new Date(invoice.createdAt).toLocaleString()}</p>
// //           <h3>Items:</h3>
// //           <ul>
// //             {invoice.items.map((item, index) => (
// //               <li key={index}>
// //                 {item.product.name} - ${item.pricePerUnit} x {item.quantity} = ${item.totalPrice}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default POS;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const POS = () => {
// //   const [products, setProducts] = useState([]); // List of all products
// //   const [selectedProduct, setSelectedProduct] = useState(null); // Product selected from the dropdown
// //   const [cart, setCart] = useState([]); // Items in the cart
// //   const [totalPrice, setTotalPrice] = useState(0); // Total price of the cart
// //   const [invoice, setInvoice] = useState(null); // Generated invoice

// //   // Fetch all products
// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("/api/products");
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //     }
// //   };

// //   // Add the selected product to the cart
// //   const addToCart = () => {
// //     if (!selectedProduct) return;

// //     const existingItem = cart.find((item) => item.productId === selectedProduct.id);
// //     if (existingItem) {
// //       setCart(
// //         cart.map((item) =>
// //           item.productId === selectedProduct.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart([...cart, { productId: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, quantity: 1 }]);
// //     }
// //   };

// //   // Calculate total price whenever the cart changes
// //   useEffect(() => {
// //     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //     setTotalPrice(total);
// //   }, [cart]);

// //   // Generate invoice
// //   const generateInvoice = async () => {
// //     try {
// //       const response = await axios.post("/api/pos/invoice", cart);
// //       setInvoice(response.data); // Set the generated invoice
// //       setCart([]); // Clear the cart
// //     } catch (error) {
// //       console.error("Error generating invoice:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>POS System</h1>

// //       {/* Dropdown for Products */}
// //       <div>
// //         <h2>Select Product</h2>
// //         <select
// //           value={selectedProduct?.id || ""}
// //           onChange={(e) => {
// //             const product = products.find((p) => p.id === parseInt(e.target.value));
// //             setSelectedProduct(product);
// //           }}
// //         >
// //           <option value="" disabled>
// //             Select a product
// //           </option>
// //           {products.map((product) => (
// //             <option key={product.id} value={product.id}>
// //               {product.name} - ${product.price} - Stock: {product.stock}
// //             </option>
// //           ))}
// //         </select>
// //         <button onClick={addToCart} disabled={!selectedProduct}>
// //           Add to Cart
// //         </button>
// //       </div>

// //       {/* Cart */}
// //       <div>
// //         <h2>Cart</h2>
// //         <ul>
// //           {cart.map((item) => (
// //             <li key={item.productId}>
// //               {item.name} - ${item.price} x {item.quantity}
// //             </li>
// //           ))}
// //         </ul>
// //         <h3>Total: ${totalPrice.toFixed(2)}</h3>
// //         {cart.length > 0 && (
// //           <button onClick={generateInvoice}>Generate Invoice</button>
// //         )}
// //       </div>

// //       {/* Invoice */}
// //       {invoice && (
// //         <div>
// //           <h2>Invoice</h2>
// //           <p>Total Amount: ${invoice.totalAmount}</p>
// //           <p>Date: {new Date(invoice.createdAt).toLocaleString()}</p>
// //           <h3>Items:</h3>
// //           <ul>
// //             {invoice.items.map((item, index) => (
// //               <li key={index}>
// //                 {item.product.name} - ${item.pricePerUnit} x {item.quantity} = ${item.totalPrice}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default POS;




// // import React, { useState, useEffect } from "react";
// // import { message } from "antd"; // For error messages
// // import axios from "axios";

// // const POS = () => {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [cart, setCart] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [invoice, setInvoice] = useState(null);

// //   // API call to fetch data
// //   const get = async (endpoint) => {
// //     try {
// //       const response = await axios.get(endpoint);
// //       return response;
// //     } catch (error) {
// //       message.error("Failed to fetch data");
// //       throw error;
// //     }
// //   };

// //   const post = async (endpoint, data) => {
// //     try {
// //       const response = await axios.post(endpoint, data);
// //       return response;
// //     } catch (error) {
// //       message.error("Failed to process request");
// //       throw error;
// //     }
// //   };

// //   // Fetch products
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await get("/api/products");
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //     }
// //   };

// //   // Fetch categories (if needed)
// //   const fetchCategories = async () => {
// //     try {
// //       const response = await get("/api/categories");
// //       setCategories(response.data);
// //     } catch (error) {
// //       console.error("Error fetching categories:", error);
// //     }
// //   };

// //   // Add the selected product to the cart
// //   const addToCart = () => {
// //     if (!selectedProduct) return;

// //     const existingItem = cart.find((item) => item.productId === selectedProduct.id);
// //     if (existingItem) {
// //       setCart(
// //         cart.map((item) =>
// //           item.productId === selectedProduct.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart([...cart, { productId: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, quantity: 1 }]);
// //     }
// //   };

// //   // Generate invoice
// //   const generateInvoice = async () => {
// //     try {
// //       const response = await post("/api/pos/invoice", cart);
// //       setInvoice(response.data);
// //       setCart([]);
// //     } catch (error) {
// //       console.error("Error generating invoice:", error);
// //     }
// //   };

// //   // Calculate total price
// //   useEffect(() => {
// //     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //     setTotalPrice(total);
// //   }, [cart]);

// //   // Fetch initial data
// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories(); // Optional: Include if categories are required
// //   }, []);

// //   return (
// //     <div>
// //       <h1>POS System</h1>

// //       {/* Dropdown for Products */}
// //       <div>
// //         <h2>Select Product</h2>
// //         <select
// //           value={selectedProduct?.id || ""}
// //           onChange={(e) => {
// //             const product = products.find((p) => p.id === parseInt(e.target.value));
// //             setSelectedProduct(product);
// //           }}
// //         >
// //           <option value="" disabled>
// //             Select a product
// //           </option>
// //           {products.map((product) => (
// //             <option key={product.id} value={product.id}>
// //               {product.name} - ${product.price} - Stock: {product.stock}
// //             </option>
// //           ))}
// //         </select>
// //         <button onClick={addToCart} disabled={!selectedProduct}>
// //           Add to Cart
// //         </button>
// //       </div>

// //       {/* Cart */}
// //       <div>
// //         <h2>Cart</h2>
// //         <ul>
// //           {cart.map((item) => (
// //             <li key={item.productId}>
// //               {item.name} - ${item.price} x {item.quantity}
// //             </li>
// //           ))}
// //         </ul>
// //         <h3>Total: ${totalPrice.toFixed(2)}</h3>
// //         {cart.length > 0 && (
// //           <button onClick={generateInvoice}>Generate Invoice</button>
// //         )}
// //       </div>

// //       {/* Invoice */}
// //       {invoice && (
// //         <div>
// //           <h2>Invoice</h2>
// //           <p>Total Amount: ${invoice.totalAmount}</p>
// //           <p>Date: {new Date(invoice.createdAt).toLocaleString()}</p>
// //           <h3>Items:</h3>
// //           <ul>
// //             {invoice.items.map((item, index) => (
// //               <li key={index}>
// //                 {item.product.name} - ${item.pricePerUnit} x {item.quantity} = ${item.totalPrice}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default POS;


// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Input, message } from "antd";
// // import { get, post } from "../api";

// // const POS = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [form] = Form.useForm();

// //   // Fetch cart items
// //   const fetchCartItems = async () => {
// //     try {
// //       const response = await get("/pos/cart");
// //       setCartItems(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch cart items");
// //     }
// //   };

// //   // Fetch total price
// //   const fetchTotalPrice = async () => {
// //     try {
// //       const response = await get("/pos/cart/total");
// //       setTotalPrice(response.data);
// //     } catch (error) {
// //       message.error("Failed to calculate total price");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCartItems();
// //     fetchTotalPrice();
// //   }, []);

// //   // Handle form submission to add product to cart
// //   const handleAddToCart = async (values) => {
// //     try {
// //       await post("/pos/cart", values);
// //       message.success("Product added to cart successfully");
// //       fetchCartItems();
// //       fetchTotalPrice();
// //       setIsModalOpen(false);
// //       form.resetFields();
// //     } catch (error) {
// //       message.error("Failed to add product to cart");
// //     }
// //   };

// //   // Generate invoice
// //   const handleGenerateInvoice = async () => {
// //     try {
// //       const response = await post("/pos/invoice");
// //       message.success("Invoice generated successfully");
// //       console.log("Invoice:", response.data); // Display or process the invoice as needed
// //       fetchCartItems(); // Optionally clear cart after invoice
// //       fetchTotalPrice();
// //     } catch (error) {
// //       message.error("Failed to generate invoice");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>POS System</h2>
// //       <Button type="primary" onClick={() => setIsModalOpen(true)}>
// //         Add to Cart
// //       </Button>
// //       <Table
// //         dataSource={cartItems}
// //         rowKey="id"
// //         columns={[
// //           { title: "Product ID", dataIndex: "productId" },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           { title: "Price", dataIndex: "price" },
// //         ]}
// //       />
// //       <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
// //       <Button type="primary" onClick={handleGenerateInvoice}>
// //         Generate Invoice
// //       </Button>

// //       <Modal
// //         title="Add Product to Cart"
// //         visible={isModalOpen}
// //         onCancel={() => setIsModalOpen(false)}
// //         onOk={() => form.submit()}
// //       >
// //         <Form form={form} onFinish={handleAddToCart}>
// //           <Form.Item
// //             name="productId"
// //             label="Product ID"
// //             rules={[{ required: true, message: "Please enter the product ID" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             name="quantity"
// //             label="Quantity"
// //             rules={[{ required: true, message: "Please enter the quantity" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default POS;














































// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Input, message } from "antd";
// // import { get, post } from "../api";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";

// // const POS = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [form] = Form.useForm();

// //   // Fetch cart items
// //   const fetchCartItems = async () => {
// //     try {
// //       const response = await get("/pos/cart");
// //       setCartItems(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch cart items");
// //     }
// //   };

// //   // Fetch total price
// //   const fetchTotalPrice = async () => {
// //     try {
// //       const response = await get("/pos/cart/total");
// //       setTotalPrice(response.data);
// //     } catch (error) {
// //       message.error("Failed to calculate total price");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCartItems();
// //     fetchTotalPrice();
// //   }, []);

// //   // Handle form submission to add product to cart
// //   const handleAddToCart = async (values) => {
// //     try {
// //       await post("/pos/cart", values);
// //       message.success("Product added to cart successfully");
// //       fetchCartItems();
// //       fetchTotalPrice();
// //       setIsModalOpen(false);
// //       form.resetFields();
// //     } catch (error) {
// //       message.error("Failed to add product to cart");
// //     }
// //   };

// //   // Generate invoice
// //   const handleGenerateInvoice = async () => {
// //     try {
// //       const response = await post("/pos/invoice");
// //       message.success("Invoice generated successfully");
// //       console.log("Invoice:", response.data); // Display or process the invoice as needed
// //       fetchCartItems(); // Optionally clear cart after invoice
// //       fetchTotalPrice();
// //     } catch (error) {
// //       message.error("Failed to generate invoice");
// //     }
// //   };

// //   // Generate and download PDF invoice
// //   const handleDownloadPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text("Invoice", 14, 10);
// //     doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 14, 20);

// //     // Add table for cart items
// //     const tableColumn = ["Product ID", "Quantity", "Price"];
// //     const tableRows = cartItems.map((item) => [
// //       item.productId,
// //       item.quantity,
// //       item.price.toFixed(2),
// //     ]);

// //     doc.autoTable({
// //       startY: 30,
// //       head: [tableColumn],
// //       body: tableRows,
// //     });

// //     doc.save("invoice.pdf");
// //     message.success("Invoice PDF downloaded successfully");
// //   };

// //   return (
// //     <div>
// //       <h2>POS System</h2>
// //       <Button type="primary" onClick={() => setIsModalOpen(true)}>
// //         Add to Cart
// //       </Button>
// //       <Table
// //         dataSource={cartItems}
// //         rowKey="id"
// //         columns={[
// //           { title: "Product ID", dataIndex: "productId" },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           { title: "Price", dataIndex: "price" },
// //         ]}
// //       />
// //       <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
// //       <Button type="primary" onClick={handleGenerateInvoice}>
// //         Generate Invoice
// //       </Button>
// //       <Button type="default" onClick={handleDownloadPDF} style={{ marginLeft: "10px" }}>
// //         Download PDF
// //       </Button>

// //       <Modal
// //         title="Add Product to Cart"
// //         visible={isModalOpen}
// //         onCancel={() => setIsModalOpen(false)}
// //         onOk={() => form.submit()}
// //       >
// //         <Form form={form} onFinish={handleAddToCart}>
// //           <Form.Item
// //             name="productId"
// //             label="Product ID"
// //             rules={[{ required: true, message: "Please enter the product ID" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             name="quantity"
// //             label="Quantity"
// //             rules={[{ required: true, message: "Please enter the quantity" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default POS;
































// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Input, Select, message } from "antd";
// // import { get, post } from "../api";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";

// // const { Option } = Select;

// // const POS = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [productList, setProductList] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [form] = Form.useForm(); 

// //   // Fetch cart items
// //   const fetchCartItems = async () => {
// //     try {
// //       const response = await get("/pos/cart");
// //       setCartItems(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch cart items");
// //     }
// //   };

// //   // Fetch product list
// //   const fetchProductList = async () => {
// //     try {
// //       const response = await get("/products");
// //       setProductList(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch product list");
// //     }
// //   };

// //   // Fetch total price
// //   const fetchTotalPrice = async () => {
// //     try {
// //       const response = await get("/pos/cart/total");
// //       setTotalPrice(response.data);
// //     } catch (error) {
// //       message.error("Failed to calculate total price");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCartItems();
// //     fetchProductList();
// //     fetchTotalPrice();
// //   }, []);

// //   // Handle form submission to add product to cart
// //   const handleAddToCart = async (values) => {
// //     try {
// //       await post("/pos/cart", values);
// //       message.success("Product added to cart successfully");
// //       fetchCartItems();
// //       fetchTotalPrice();
// //       setIsModalOpen(false);
// //       form.resetFields();
// //     } catch (error) {
// //       message.error("Failed to add product to cart");
// //     }
// //   };

// //   // Generate and download PDF invoice
// //   const handleDownloadPDF = () => {
// //     const doc = new jsPDF();
// //     const currentDate = new Date();
// //     const formattedDate = currentDate.toLocaleDateString();
// //     const formattedTime = currentDate.toLocaleTimeString();

// //     // Add invoice header
// //     doc.text("Invoice", 14, 10);
// //     doc.text(`Date: ${formattedDate}`, 14, 20);
// //     doc.text(`Time: ${formattedTime}`, 14, 30);
// //     doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 14, 40);

// //     // Add table for cart items
// //     const tableColumn = ["Product Name", "Quantity", "Price/Unit ($)", "Total Price ($)"];
// //     const tableRows = cartItems.map((item) => [
// //       item.productName,
// //       item.quantity,
// //       item.price.toFixed(2),
// //       (item.quantity * item.price).toFixed(2),
// //     ]);

// //     doc.autoTable({
// //       startY: 50,
// //       head: [tableColumn],
// //       body: tableRows,
// //     });

// //     doc.save("invoice.pdf");
// //     message.success("Invoice PDF downloaded successfully");
// //   };

// //   return (
// //     <div>
// //       <h2>POS System</h2>
// //       <Button type="primary" onClick={() => setIsModalOpen(true)}>
// //         Add to Cart
// //       </Button>
// //       <Table
// //         dataSource={cartItems}
// //         rowKey="id"
// //         columns={[
// //           { title: "Product Name", dataIndex: "productName" },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           { title: "Price (per unit)", dataIndex: "price" },
// //           { title: "Total Price", render: (_, record) => (record.quantity * record.price).toFixed(2) },
// //         ]}
// //       />
// //       <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
// //       <Button type="default" onClick={handleDownloadPDF} style={{ marginTop: "10px" }}>
// //         Download PDF
// //       </Button>

// //       <Modal
// //         title="Add Product to Cart"
// //         visible={isModalOpen}
// //         onCancel={() => setIsModalOpen(false)}
// //         onOk={() => form.submit()}
// //       >
// //         <Form form={form} onFinish={handleAddToCart}>
// //           <Form.Item
// //             name="productName"
// //             label="Product Name"
// //             rules={[{ required: true, message: "Please select a product" }]}
// //           >
// //             <Select placeholder="Select a product">
// //               {productList.map((product) => (
// //                 <Option key={product.id} value={product.name}>
// //                   {product.name}
// //                 </Option>
// //               ))}
// //             </Select>
// //           </Form.Item>
// //           <Form.Item
// //             name="quantity"
// //             label="Quantity"
// //             rules={[{ required: true, message: "Please enter the quantity" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //           <Form.Item
// //             name="price"
// //             label="Price per Unit"
// //             rules={[{ required: true, message: "Please enter the price" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default POS;













// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Modal, Form, Input, Select, message } from "antd";
// // import { get, post } from "../api"; // Ensure these API helpers are properly implemented

// // const { Option } = Select;

// // const POS = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [productList, setProductList] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [form] = Form.useForm();

// //   // Fetch product list from the server
// //   const fetchProductList = async () => {
// //     try {
// //       const response = await get("/products");
// //       setProductList(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch product list");
// //     }
// //   };

// //   // Fetch cart items from the server
// //   const fetchCartItems = async () => {
// //     try {
// //       const response = await get("/pos/cart");
// //       setCartItems(response.data);
// //     } catch (error) {
// //       message.error("Failed to fetch cart items");
// //     }
// //   };

// //   // Fetch total price of the cart
// //   const fetchTotalPrice = async () => {
// //     try {
// //       const response = await get("/pos/cart/total");
// //       setTotalPrice(response.data);
// //     } catch (error) {
// //       message.error("Failed to calculate total price");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProductList();
// //     fetchCartItems();
// //     fetchTotalPrice();
// //   }, []);

// //   // Add product to the cart
// //   const handleAddToCart = async (values) => {
// //     try {
// //       const response = await post("/pos/cart", values); // Assuming this posts data to the server
// //       if (response.status === 200) {
// //         message.success("Product added to cart successfully");
// //         fetchCartItems(); // Refresh cart items
// //         fetchTotalPrice(); // Refresh total price
// //         setIsModalOpen(false); // Close the modal
// //         form.resetFields(); // Reset the form
// //       } else {
// //         message.error("Failed to add product to cart");
// //       }
// //     } catch (error) {
// //       console.error("Add to Cart Error:", error);
// //       message.error("Failed to add product to cart. Please try again.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>POS System</h2>
// //       <Button type="primary" onClick={() => setIsModalOpen(true)}>
// //         Add to Cart
// //       </Button>
// //       <Table
// //         dataSource={cartItems}
// //         rowKey="id"
// //         columns={[
// //           { title: "Product Name", dataIndex: "productName" },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           { title: "Price (per unit)", dataIndex: "price" },
// //           { title: "Total Price", render: (_, record) => (record.quantity * record.price).toFixed(2) },
// //         ]}
// //       />
// //       <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

// //       <Modal
// //         title="Add Product to Cart"
// //         visible={isModalOpen}
// //         onCancel={() => setIsModalOpen(false)}
// //         onOk={() => form.submit()}
// //       >
// //         <Form form={form} onFinish={handleAddToCart}>
// //           <Form.Item
// //             name="productName"
// //             label="Product Name"
// //             rules={[{ required: true, message: "Please select a product" }]}
// //           >
// //             <Select placeholder="Select a product">
// //               {productList.map((product) => (
// //                 <Option key={product.id} value={product.name}>
// //                   {product.name}
// //                 </Option>
// //               ))}
// //             </Select>
// //           </Form.Item>
// //           <Form.Item
// //             name="quantity"
// //             label="Quantity"
// //             rules={[{ required: true, message: "Please enter the quantity" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //           <Form.Item
// //             name="price"
// //             label="Price per Unit"
// //             rules={[{ required: true, message: "Please enter the price" }]}
// //           >
// //             <Input type="number" />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default POS;

// // import React, { useState, useEffect } from "react";
// // import { Table, Button, Input, message } from "antd";
// // import { get, post } from "../api";

// // const POS = () => {
// //   const [productId, setProductId] = useState("");
// //   const [cart, setCart] = useState([]);
// //   const [total, setTotal] = useState(0);

// //   useEffect(() => {
// //     const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //     setTotal(newTotal);
// //   }, [cart]);

// //   const addProduct = async () => {
// //     if (!productId.trim()) {
// //       message.error("Please enter a Product ID");
// //       return;
// //     }

// //     try {
// //       // ✅ Fixed API route
// //       const response = await get(`/pos/products/${productId}`);
// //       const product = response.data;

// //       const existingProduct = cart.find((item) => item.id === product.id);
// //       if (existingProduct) {
// //         setCart((prev) =>
// //           prev.map((item) =>
// //             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
// //           )
// //         );
// //       } else {
// //         setCart((prev) => [...prev, { ...product, quantity: 1 }]);
// //       }

// //       setProductId("");
// //     } catch (error) {
// //       message.error("Product not found!");
// //     }
// //   };

// //   const removeProduct = (id) => {
// //     setCart(cart.filter((item) => item.id !== id));
// //   };

// //   const createInvoice = async () => {
// //     if (cart.length === 0) {
// //         message.warning("Cart is empty!");
// //         return;
// //     }

// //     try {
// //         // ✅ Ensure the correct API route is called
// //         const response = await get("/pos/invoice", { responseType: "blob" });

// //         // ✅ Create a Blob from the response
// //         const blob = new Blob([response.data], { type: "application/pdf" });
// //         const link = document.createElement("a");
// //         link.href = window.URL.createObjectURL(blob);
// //         link.download = "invoice.pdf";
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);

// //         message.success("Invoice downloaded successfully!");
// //     } catch (error) {
// //         message.error("Error generating invoice!");
// //     }
// // };


// //   return (
// //     <div className="p-6 space-y-4">
// //       <h2>Point of Sale (POS)</h2>

// //       <div className="flex space-x-2">
// //         <Input
// //           placeholder="Enter Product ID"
// //           value={productId}
// //           onChange={(e) => setProductId(e.target.value)}
// //           style={{ width: "200px" }}
// //         />
// //         <Button type="primary" onClick={addProduct}>
// //           Add Product
// //         </Button>
// //       </div>

// //       <Table
// //         dataSource={cart}
// //         rowKey="id"
// //         columns={[
// //           { title: "Product", dataIndex: "name" },
// //           { title: "Price", dataIndex: "price", render: (price) => `$${price}` },
// //           { title: "Quantity", dataIndex: "quantity" },
// //           {
// //             title: "Total",
// //             render: (_, record) => `$${record.price * record.quantity}`,
// //           },
// //           {
// //             title: "Actions",
// //             render: (_, record) => (
// //               <Button danger onClick={() => removeProduct(record.id)}>
// //                 Remove
// //               </Button>
// //             ),
// //           },
// //         ]}
// //       />

// //       <div className="text-right text-lg font-bold mt-4">Total: ${total}</div>
// //       <Button type="primary" className="w-full mt-4" onClick={createInvoice}>
// //         Generate Invoice
// //       </Button>
// //     </div>
// //   );
// // };

// // export default POS;

// import React, { useState, useEffect } from "react";
// import { Table, Button, Input, message } from "antd";
// import axios from "axios"; // Import Axios for better API handling

// const POS = () => {
//   const [productId, setProductId] = useState("");
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     // ✅ Calculate total dynamically
//     setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
//   }, [cart]);

//   const addProduct = async () => {
//     if (!productId.trim()) {
//       message.error("Please enter a Product ID");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:8080/api/pos/products/${productId}`);
//       const product = response.data;

//       setCart((prevCart) => {
//         const existingProduct = prevCart.find((item) => item.id === product.id);
//         if (existingProduct) {
//           return prevCart.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//           );
//         } else {
//           return [...prevCart, { ...product, quantity: 1 }];
//         }
//       });

//       setProductId("");
//     } catch (error) {
//       message.error("Product not found!");
//     }
//   };

//   const removeProduct = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // const createInvoice = async () => {
//   //   if (cart.length === 0) {
//   //     message.warning("Cart is empty!");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.get("http://localhost:8080/api/pos/invoice", {
//   //       responseType: "blob",
//   //     });

//   //     const blob = new Blob([response.data], { type: "application/pdf" });
//   //     const url = window.URL.createObjectURL(blob);
//   //     const link = document.createElement("a");
//   //     link.href = url;
//   //     link.download = "invoice.pdf";
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);

//   //     message.success("Invoice downloaded successfully!");
//   //     setCart([]); // ✅ Clear cart after invoice generation
//   //   } catch (error) {
//   //     message.error("Error generating invoice!");
//   //   }
//   // };


//   const createInvoice = async (cart) => {
//     if (cart.length === 0) {
//       message.warning("Cart is empty!");
//       return;
//     }
  
//     try {
//       // Sending the cart data via POST request
//       const response = await post("/pos/invoice", cart, { responseType: "blob" });
  
//       // Creating a Blob from the response
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "invoice.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
  
//       message.success("Invoice downloaded successfully!");
//     } catch (error) {
//       message.error("Error generating invoice!");
//     }
//   };



//   return (
//     <div className="p-6 space-y-4">
//       <h2>Point of Sale (POS)</h2>

//       <div className="flex space-x-2">
//         <Input
//           placeholder="Enter Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           style={{ width: "200px" }}
//         />
//         <Button type="primary" onClick={addProduct}>
//           Add Product
//         </Button>
//       </div>

//       <Table
//         dataSource={cart}
//         rowKey="id"
//         columns={[
//           { title: "Product", dataIndex: "name" },
//           { title: "Price", dataIndex: "price", render: (price) => `$${price}` },
//           { title: "Quantity", dataIndex: "quantity" },
//           {
//             title: "Total",
//             render: (_, record) => `$${record.price * record.quantity}`,
//           },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <Button danger onClick={() => removeProduct(record.id)}>
//                 Remove
//               </Button>
//             ),
//           },
//         ]}
//       />

//       <div className="text-right text-lg font-bold mt-4">Total: ${total}</div>
//       <Button type="primary" className="w-full mt-4" onClick={createInvoice}>
//         Generate Invoice
//       </Button>
//     </div>
//   );
// };

// export default POS;
   
// import React, { useState, useEffect } from "react";
// import { Table, Button, Input, message } from "antd";
// import { get } from "../api";
// import createInvoice from "./createInvoice"; // ✅ Importing function correctly

// const POS = () => {
//   const [productId, setProductId] = useState("");
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Calculate total whenever cart updates
//   useEffect(() => {
//     const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity,  );
//     setTotal(newTotal);
//   }, [cart]);

//   // Function to add a product to the cart
//   const addProduct = async () => {
//     if (!productId.trim()) {
//       message.error("Please enter a Product ID");
//       return;
//     }

//     try {
//       const response = await get(`/pos/products/${productId}`);
//       const product = response.data;

//       // Check if product is already in cart
//       const existingProduct = cart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         setCart((prev) =>
//           prev.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//           )
//         );
//       } else {
//         setCart((prev) => [...prev, { ...product, quantity: 1 }]);
//       }

//       setProductId(""); // Reset input field
//     } catch (error) {
//       message.error("Product not found!");
//     }
//   };

//   // Remove a product from cart
//   const removeProduct = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2>Point of Sale (POS)</h2>

//       {/* Product Input and Add Button */}
//       <div className="flex space-x-2">
//         <Input
//           placeholder="Enter Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           style={{ width: "200px" }}
//         />
//         <Button type="primary" onClick={addProduct}>
//           Add Product
//         </Button>
//       </div>

//       {/* Table to Show Products in Cart */}
//       <Table
//         dataSource={cart}
//         rowKey="id"
//         columns={[
//           { title: "Product", dataIndex: "name" },
//           { title: "Price", dataIndex: "price", render: (price) => `$${price}` },
//           { title: "Quantity", dataIndex: "quantity" },
//           {
//             title: "Total",
//             render: (_, record) => `$${record.price * record.quantity}`,
//           },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <Button danger onClick={() => removeProduct(record.id)}>
//                 Remove
//               </Button>
//             ),
//           },
//         ]}
//       />

//       {/* Total Price and Generate Invoice Button */}
//       <div className="text-right text-lg font-bold mt-4">Total: ${total}</div>
//       <Button type="primary" className="w-full mt-4" onClick={() => createInvoice(cart)}>
//         Generate Invoice
//       </Button>
//     </div>
//   );
// };

// export default POS;






// import React, { useState, useEffect } from "react";
// import { Table, Button, Input, message } from "antd";
// import { get } from "../api";
// import createInvoice from "./createInvoice"; // ✅ Importing function correctly

// const POS = () => {
//   const [productId, setProductId] = useState("");
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Update total when cart changes
//   useEffect(() => {
//     const newTotal = cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     setTotal(newTotal);
//   }, [cart]);

//   // Add product to cart
//   const addProduct = async () => {
//     if (!productId.trim()) {
//       message.error("Please enter a Product ID");
//       return;
//     }

//     try {
//       const response = await get(`/pos/products/${productId}`);
//       const product = response.data;

//       // Check if product already exists in cart
//       const existingProduct = cart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         setCart((prev) =>
//           prev.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         );
//       } else {
//         setCart((prev) => [...prev, { ...product, quantity: 1 }]);
//       }

//       setProductId(""); // Clear input
//     } catch (error) {
//       message.error("Product not found!");
//     }
//   };

//   // Remove product from cart
//   const removeProduct = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   // Update price for a product
//   const updatePrice = (id, newPrice) => {
//     if (isNaN(newPrice) || newPrice < 0) return;
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, price: newPrice } : item
//       )
//     );
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2>Point of Sale (POS)</h2>

//       {/* Product ID Input */}
//       <div className="flex space-x-2">
//         <Input
//           placeholder="Enter Product ID"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           style={{ width: "200px" }}
//         />
//         <Button type="primary" onClick={addProduct}>
//           Add Product
//         </Button>
//       </div>

//       {/* Cart Table */}
//       <Table
//         dataSource={cart}
//         rowKey="id"
//         columns={[
//           { title: "Product", dataIndex: "name" },
//           {
//             title: "Price",
//             dataIndex: "price",
//             render: (price, record) => (
//               <Input
//                 type="number"
//                 value={record.price}
//                 min={0}
//                 onChange={(e) =>
//                   updatePrice(record.id, parseFloat(e.target.value))
//                 }
//                 style={{ width: "80px" }}
//               />
//             ),
//           },
//           { title: "Quantity", dataIndex: "quantity" },
//           {
//             title: "Total",
//             render: (_, record) =>
//               `$${(record.price * record.quantity).toFixed(2)}`,
//           },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <Button danger onClick={() => removeProduct(record.id)}>
//                 Remove
//               </Button>
//             ),
//           },
//         ]}
//       />

//       {/* Total and Invoice Button */}
//       <div className="text-right text-lg font-bold mt-4">
//         Total: ${total.toFixed(2)}
//       </div>
//       <Button
//         type="primary"
//         className="w-full mt-4"
//         onClick={() => createInvoice(cart)}
//       >
//         Generate Invoice
//       </Button>
//     </div>
//   );
// };

// export default POS;




// import React, { useState, useEffect } from "react";
// import { Table, Button, Input, message, Switch } from "antd";
// import { get } from "../api";
// import createInvoice from "./createInvoice";

// const POS = () => {
//   const [productId, setProductId] = useState("");
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [isCustomMode, setIsCustomMode] = useState(false);
//   const [customName, setCustomName] = useState("");
//   const [customPrice, setCustomPrice] = useState("");
//   const [customQty, setCustomQty] = useState("");

//   useEffect(() => {
//     const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotal(newTotal);
//   }, [cart]);

//   const addProduct = async () => {
//     if (!productId.trim()) {
//       message.error("Please enter a Product ID");
//       return;
//     }

//     try {
//       const response = await get(`/pos/products/${productId}`);
//       const product = response.data;

//       const existingProduct = cart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         setCart((prev) =>
//           prev.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//           )
//         );
//       } else {
//         setCart((prev) => [...prev, { ...product, quantity: 1 }]);
//       }

//       setProductId("");
//     } catch (error) {
//       message.error("Product not found!");
//     }
//   };

//   const addCustomProduct = () => {
//     if (!customName || !customPrice || !customQty) {
//       message.error("Please fill all custom fields");
//       return;
//     }

//     const newCustomItem = {
//       id: `custom-${Date.now()}`, // unique id for React
//       name: customName,
//       price: parseFloat(customPrice),
//       quantity: parseInt(customQty),
//     };

//     setCart((prev) => [...prev, newCustomItem]);

//     // Clear fields
//     setCustomName("");
//     setCustomPrice("");
//     setCustomQty("");
//   };

//   const updatePrice = (id, newPrice) => {
//     if (isNaN(newPrice) || newPrice < 0) return;
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, price: newPrice } : item
//       )
//     );
//   };

//   const removeProduct = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2>Point of Sale (POS)</h2>

//       {/* Mode Switch */}
//       <div className="mb-4">
//         <Switch
//           checked={isCustomMode}
//           onChange={setIsCustomMode}
//         />{" "}
//         Enable Custom POS Mode
//       </div>

//       {!isCustomMode ? (
//         <div className="flex space-x-2">
//           <Input
//             placeholder="Enter Product ID"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//             style={{ width: "200px" }}
//           />
//           <Button type="primary" onClick={addProduct}>
//             Add Product
//           </Button>
//         </div>
//       ) : (
//         <div className="flex space-x-2">
//           <Input
//             placeholder="Product Name"
//             value={customName}
//             onChange={(e) => setCustomName(e.target.value)}
//             style={{ width: "150px" }}
//           />
//           <Input
//             type="number"
//             placeholder="Price"
//             value={customPrice}
//             onChange={(e) => setCustomPrice(e.target.value)}
//             style={{ width: "100px" }}
//           />
//           <Input
//             type="number"
//             placeholder="Quantity"
//             value={customQty}
//             onChange={(e) => setCustomQty(e.target.value)}
//             style={{ width: "100px" }}
//           />
//           <Button type="dashed" onClick={addCustomProduct}>
//             Add Custom Product
//           </Button>
//         </div>
//       )}

//       <Table
//         dataSource={cart}
//         rowKey="id"
//         columns={[
//           { title: "Product", dataIndex: "name" },
//           {
//             title: "Price",
//             dataIndex: "price",
//             render: (price, record) => (
//               <Input
//                 type="number"
//                 value={record.price}
//                 min={0}
//                 onChange={(e) =>
//                   updatePrice(record.id, parseFloat(e.target.value))
//                 }
//                 style={{ width: "80px" }}
//               />
//             ),
//           },
//           { title: "Quantity", dataIndex: "quantity" },
//           {
//             title: "Total",
//             render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
//           },
//           {
//             title: "Actions",
//             render: (_, record) => (
//               <Button danger onClick={() => removeProduct(record.id)}>
//                 Remove
//               </Button>
//             ),
//           },
//         ]}
//       />

//       <div className="text-right text-lg font-bold mt-4">Total: ${total.toFixed(2)}</div>
//       <Button type="primary" className="w-full mt-4" onClick={() => createInvoice(cart)}>
//         Generate Invoice
//       </Button>
//     </div>
//   );
// };

// export default POS;




import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Switch, Modal, Form } from "antd";
import { get } from "../api";
import createInvoice from "./createInvoice";

const POS = () => {
  const [productId, setProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Calculate total on cart update
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const addProduct = async () => {
    if (!productId.trim()) {
      message.error("Please enter a Product ID");
      return;
    }

    try {
      const response = await get(`/pos/products/${productId}`);
      const product = response.data;

      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        setCart((prev) =>
          prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      }

      setProductId("");
    } catch (error) {
      message.error("Product not found!");
    }
  };

  const addCustomProduct = (values) => {
    const customProduct = {
      id: `custom-${Date.now()}`, // Unique ID
      name: values.name,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity),
      custom: true,
    };

    setCart((prev) => [...prev, customProduct]);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Custom product added!");
  };

  const removeProduct = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h2>Point of Sale (POS)</h2>

      <div className="flex items-center space-x-4 mb-4">
        <span>Enable Custom POS Mode:</span>
        <Switch checked={customMode} onChange={(checked) => setCustomMode(checked)} />
      </div>

      {!customMode ? (
        <div className="flex space-x-2">
          <Input
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{ width: "200px" }}
          />
          <Button type="primary" onClick={addProduct}>
            Add Product
          </Button>
        </div>
      ) : (
        <Button type="dashed" onClick={() => setIsModalVisible(true)}>
          Add Custom Product
        </Button>
      )}

      <Table
        dataSource={cart}
        rowKey="id"
        columns={[
          { title: "Product", dataIndex: "name" },
          {
            title: "Price",
            dataIndex: "price",
            render: (price) => `$${price.toFixed(2)}`,
          },
          { title: "Quantity", dataIndex: "quantity" },
          {
            title: "Total",
            render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Button danger onClick={() => removeProduct(record.id)}>
                Remove
              </Button>
            ),
          },
        ]}
      />

      <div className="text-right text-lg font-bold mt-4">Total: ${total.toFixed(2)}</div>

      <Button type="primary" className="w-full mt-4" onClick={() => createInvoice(cart)}>
        Generate Invoice
      </Button>

      <Modal
        title="Add Custom Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={addCustomProduct}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" step="0.01" />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <Input type="number" min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default POS;
