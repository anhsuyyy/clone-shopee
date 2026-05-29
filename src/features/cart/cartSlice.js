import { createSlice, createSelector } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Hàm helper để lấy key cookie theo user
const getCartKey = (userId) => (userId ? `cart_${userId}` : "cart_guest");

// Hàm helper đọc giỏ hàng từ cookie ngay khi load ứng dụng
const getInitialCart = () => {
  try {
    const storedUser = Cookies.get("loggedInUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const cartKey = getCartKey(user?.email);
    const storedCart = Cookies.get(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    return [];
  }
};

// Helper function để persist dữ liệu (Clean Code: DRY)
const persistCart = (userId, items) => {
  Cookies.set(getCartKey(userId), JSON.stringify(items), { expires: 7 });
};

const initialState = {
  items: getInitialCart(), // Đọc trực tiếp từ cookie để tránh bị trống khi refresh
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload || []; // Đảm bảo là mảng rỗng nếu payload null/undefined
    },
    addToCart: (state, action) => {
      const { product, userId } = action.payload; // Destructure product và userId
      const existingItem = state.items.find((item) => item.id === product.id); // Sử dụng product.id

      const newItem = { ...product };

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          checked: true,
        });
      }
      persistCart(userId, state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity, userId } = action.payload; // Thêm userId vào destructuring
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
        persistCart(userId, state.items);
      }
    },
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload; // Thêm userId vào destructuring
      state.items = state.items.filter((item) => item.id !== id);
      persistCart(userId, state.items);
    },
    toggleCheckItem: (state, action) => {
      const { id, userId } = action.payload; // Thêm userId vào destructuring
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.checked = !existingItem.checked;
        persistCart(userId, state.items);
      }
    },
    toggleCheckAll: (state, action) => {
      const { isAllChecked, userId } = action.payload; // Thêm userId vào destructuring
      state.items.forEach((item) => {
        item.checked = isAllChecked;
      });
      persistCart(userId, state.items);
    },
    toggleCheckMultiple: (state, action) => {
      const { ids, checked, userId } = action.payload;
      state.items.forEach((item) => {
        if (ids.includes(item.id)) {
          item.checked = checked;
        }
      });
      persistCart(userId, state.items);
    },
    removeCheckedItems: (state, action) => {
      const { userId } = action.payload;
      // Giữ lại những item chưa được chọn (checked === false)
      state.items = state.items.filter((item) => !item.checked);
      persistCart(userId, state.items);
    },
  },
});

export const {
  setCartItems,
  addToCart,
  updateQuantity,
  removeFromCart,
  toggleCheckItem,
  toggleCheckAll,
  toggleCheckMultiple,
  removeCheckedItems,
} = cartSlice.actions;

// --- MEMOIZED SELECTORS ---
const selectCartItems = (state) => state.cart.items;

export const selectTotalCartQuantities = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0),
);

export const selectIsAllChecked = createSelector(
  [selectCartItems],
  (items) => items.length > 0 && items.every((item) => item.checked),
);

export const selectCartSummary = createSelector([selectCartItems], (items) => {
  return items.reduce(
    (summary, item) => {
      if (item.checked) {
        summary.totalAmount += item.price * item.quantity;
        summary.checkedCount += item.quantity;
      }
      return summary;
    },
    { totalAmount: 0, checkedCount: 0 },
  );
});

export default cartSlice.reducer;
