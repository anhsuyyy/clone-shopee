import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CartList from "../../features/cart/CartList";
import CartSummary from "../../features/cart/CartSummary";
import ProductSuggestions from "../../pages/Cart/ProductSuggestions";

export default function Cart() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between font-sans">
      <div>
        {/* Render Header Giỏ hàng thu gọn với thanh tìm kiếm nhỏ bên phải */}
        <Header hasSearch={false} />

        {/* Vùng chứa cấu trúc chính */}
        <main className="container mx-auto px-2 sm:px-4 py-4 flex flex-col gap-4 pb-28 sm:pb-5">
          <CartList />
          <CartSummary />
          <ProductSuggestions />
        </main>
      </div>

      <Footer />
    </div>
  );
}
