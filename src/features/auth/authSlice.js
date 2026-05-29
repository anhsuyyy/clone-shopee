import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Giả lập API login dùng createAsyncThunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const users = await response.json();

      // Kiểm tra tài khoản: email khớp username và password là "user"
      const foundUser = users.find(
        (u) =>
          // u.email.toLowerCase() === username.toLowerCase()
          username.toLowerCase() === "abc" && password === "user", // Sửa lỗi: So sánh mật khẩu với chuỗi "user"
      );

      if (foundUser) {
        return { name: foundUser.name, email: foundUser.email };
      } else {
        return rejectWithValue("Email hoặc mật khẩu không chính xác.");
      }
    } catch (err) {
      return rejectWithValue("Có lỗi xảy ra khi kết nối đến máy chủ.");
    }
  },
);

// Khôi phục trạng thái từ cookie khi khởi tạo slice
const storedUser = Cookies.get("loggedInUser");
let initialUserState = null;

try {
  initialUserState = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error("Lỗi khi parse cookie user:", error);
  Cookies.remove("loggedInUser");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!initialUserState, // True nếu có user trong cookie
    user: initialUserState,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      // Xóa cookie khi đăng xuất
      Cookies.remove("loggedInUser");
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        // Lưu thông tin user vào cookie, hết hạn sau 30 phút (1/48 ngày)
        Cookies.set("loggedInUser", JSON.stringify(action.payload), {
          expires: 1 / 48,
        });
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
