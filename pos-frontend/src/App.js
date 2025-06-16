import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BrandManagement from "./components/BrandManagement";
import CategoryManagement from "./components/CategoryManagement"; 
import SubcategoryManagement from "./components/SubcategoryManagement";
import ProductManagement from "./components/ProductManagement";
import POS from "./components/POS";
import InvoiceHistory from "./components/InvoiceHistory.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/brands" element={<BrandManagement />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/subcategories" element={<SubcategoryManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/invoices" element={<InvoiceHistory />} />

      </Routes>
    </Router>
  );
};

export default App;
