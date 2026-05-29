# Project Documentation: My App Test (Shopee Clone)

## 🚀 Tổng quan dự án

Đây là một ứng dụng thương mại điện tử cơ bản được xây dựng bằng **React**, **Redux Toolkit** và **Tailwind CSS**. Ứng dụng tập trung vào việc mô phỏng trải nghiệm mua sắm với các tính năng thực tế như phân loại hàng, giỏ hàng dính (sticky) và xác thực người dùng.

## 🛠 Công nghệ sử dụng

- **Frontend:** React (Hooks, Context API).
- **State Management:** Redux Toolkit (@reduxjs/toolkit).
- **Routing:** React Router v6.
- **Styling:** Tailwind CSS (thiết kế responsive, giao diện Shopee-like).
- **Persistence:** `js-cookie` (lưu trữ giỏ hàng và phiên đăng nhập).
- **Icons:** FontAwesome.
- **SEO Optimization:** Semantic HTML5, Dynamic Page Titles, Schema.org (Structured Data).

## 📦 Các tính năng chính

### 1. Quản lý Giỏ hàng (Cart Feature)

- **Lưu trữ:** Giỏ hàng được đồng bộ hóa với Cookie dựa trên `userId` (ví dụ: `cart_user@example.com` hoặc `cart_guest`).
- **Chức năng:**
  - Thêm sản phẩm với phân loại (màu sắc/mẫu mã) và số lượng.
  - Nhóm sản phẩm theo tên Cửa hàng (Shop Name) trong trang giỏ hàng.
  - Chọn tất cả hoặc chọn theo shop.
  - Tính toán tổng tiền và số lượng sản phẩm đang chọn trong thời gian thực (Sử dụng Memoized Selectors).

### 2. Xác thực (Authentication)

- **Cơ chế:** Sử dụng `createAsyncThunk` để giả lập API đăng nhập.
- **Persistence:** Lưu thông tin người dùng vào Cookie với thời gian hết hạn (30 phút).
- **ProtectedRoute:** Bảo vệ các trang nhạy cảm như `/cart`, yêu cầu người dùng đăng nhập trước khi truy cập.

### 3. Trang chi tiết sản phẩm (Product Detail)

- **SEO:** Sử dụng thẻ `h1` duy nhất, `document.title` thay đổi theo tên sản phẩm, thẻ `article` bao bọc sản phẩm.
- **Schema:** Tích hợp dữ liệu có cấu trúc (Product, Offer) giúp Google hiển thị giá và trạng thái hàng ngay trên kết quả tìm kiếm.

### 4. Gợi ý sản phẩm (Daily Discover)

- Hiển thị lưới sản phẩm (Grid) hỗ trợ responsive (2 cột trên mobile, tối đa 6 cột trên desktop).
- Tính năng "Xem thêm" để tải thêm sản phẩm vào danh sách hiển thị.

## 📂 Cấu trúc thư mục tiêu biểu

- `src/features/cart/`: Chứa Logic xử lý giỏ hàng (`cartSlice.js`) và các thành phần giao diện (`CartList`, `CartSummary`, `ProductDetail`).
- `src/features/auth/`: Xử lý đăng nhập, đăng xuất và trạng thái người dùng.
- `src/pages/`: Chứa các trang chính của ứng dụng (`Home`, `Cart`, `Login`).
- `src/components/`: Các thành phần dùng chung như `Header`, `Footer`, `ProductCard`.

## 💡 Điểm nổi bật về Code Quality

- **Redux Selectors:** Sử dụng `createSelector` để tối ưu hóa hiệu suất, tránh re-render không cần thiết khi tính toán tổng giỏ hàng.
- **Responsive Design:** Sử dụng Tailwind CSS để xử lý giao diện linh hoạt giữa thiết bị di động và máy tính (ví dụ: ẩn/hiện các cột trong giỏ hàng).
- **Cookie Sync:** Logic `setCartItems` đảm bảo dữ liệu giỏ hàng luôn nhất quán khi người dùng đăng nhập hoặc tải lại trang.

## 🛠 Hướng phát triển tiếp theo

1. **Trang Checkout:** Xây dựng trang thanh toán thực tế thay vì sử dụng `alert`.
2. **Search & Filter:** Thêm thanh tìm kiếm và bộ lọc sản phẩm tại trang chủ.
3. **Backend Integration:** Kết nối với một API thực tế (Node.js/Express) thay vì dùng JSONPlaceholder.

---

_Tài liệu này được tạo bởi Gemini Code Assist dựa trên phân tích mã nguồn dự án._
