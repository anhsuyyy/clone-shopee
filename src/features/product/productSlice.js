import { createSlice } from "@reduxjs/toolkit";
import { initialProductData } from "./productData";

const initialState = {
  ...initialProductData,
  dailyDiscoverVisibleCount: 48,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMoreDailyDiscover: (state) => {
      // Mỗi lần nhấn tăng thêm 12 sản phẩm (tương đương 2 hàng mới trong lưới 6 cột)
      state.dailyDiscoverVisibleCount += 12;
    },
    // Thêm action để sau này fetch từ API
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

// Selector để các Component bốc dữ liệu ra dùng
export const selectTrendingKeywords = (state) =>
  state.products.trendingKeywords;
export const selectHomeCategories = (state) => state.products.homeCategories;
export const selectAllProducts = (state) => state.products.products;
export const selectBannersLeft = (state) => state.products.bannersLeft;
export const selectBannersRight = (state) => state.products.bannersRight;
export const selectShopeeCategories = (state) =>
  state.products.shopeeCategories;
export const selectShopeeMallBanners = (state) =>
  state.products.shopeeMallBanners;
export const selectShopeeMallItems = (state) => state.products.shopeeMallItems;
export const selectTopProducts = (state) => state.products.topProducts;
//
export const { loadMoreDailyDiscover } = productSlice.actions;
export const selectDailyDiscoverProducts = (state) =>
  state.products.dailyDiscoverProducts;
export const selectDailyDiscoverVisibleCount = (state) =>
  state.products.dailyDiscoverVisibleCount;
//
export const selectMockProducts = (state) => state.products.mockProducts;
// Selector tìm sản phẩm theo ID từ tất cả các danh sách
export const selectProductById = (id) => (state) => {
  const allLists = [
    ...state.products.products,
    ...state.products.dailyDiscoverProducts,
    ...state.products.mockProducts,
    ...state.products.topProducts,
    ...(state.flashSale?.products || []),
  ];
  return allLists.find((p) => p.id === parseInt(id));
};
//
export default productSlice.reducer;
