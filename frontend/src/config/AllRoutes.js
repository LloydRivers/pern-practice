import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import ProductListing from "../components/products/ProductListing";
import React from "react";
import EditProduct from "../components/products/EditProduct";
import ProductDetails from "../components/products/ProductDetails";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/list" element={<ProductListing />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
