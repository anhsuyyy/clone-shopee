import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"; // Đường dẫn tới file Home.jsx của bạn
import Cart from "./pages/Cart/Cart"; // Đường dẫn tới file Cart.jsx của bạn
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Home />} />
        {/* Trang giỏ hàng */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* Route chi tiết sản phẩm */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
