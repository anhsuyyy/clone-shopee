import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice"; // Import cái mới tạo
import flashSaleReducer from "../features/product/flashSaleSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    flashSale: flashSaleReducer,
    auth: authReducer,
  },
});
