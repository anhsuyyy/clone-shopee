import React from "react";
import { useSelector } from "react-redux"; // Đảm bảo dòng này hoạt động chính xác
import { Link, useNavigate } from "react-router-dom"; // Gộp chung các import từ react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectTotalCartQuantities } from "../../features/cart/cartSlice";
import { selectTrendingKeywords } from "../../features/product/productSlice";

export default function SearchBar() {
  const trendingKeywords = useSelector(selectTrendingKeywords);
  const totalItems = useSelector(selectTotalCartQuantities);

  const navigate = useNavigate();
  // Lấy trạng thái đăng nhập từ Redux Store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Xử lý sự kiện khi click vào Icon Giỏ hàng
  const handleCartClick = () => {
    if (!isLoggedIn) {
      // Chuyển hướng đến login kèm thông tin trang muốn đến là /cart
      navigate("/login", { state: { from: { pathname: "/cart" } } });
    } else {
      // Nếu đã đăng nhập thành công, chuyển thẳng đến trang giỏ hàng công khai
      navigate("/cart");
    }
  };
  //
  return (
    <header className=" text-white text-[13px] sm:text-xs z-[100]  top-5 w-full select-none">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center pt-2.5 pb-2 sm:pt-4 sm:pb-3 gap-2 md:gap-6 lg:gap-10">
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0 text-white text-decoration-none"
          >
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <FontAwesomeIcon icon="bag-shopping" />
              Shopee
            </span>
            <span className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-tight hidden xs:inline-block">
              Shopee
            </span>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex bg-white rounded-sm overflow-hidden p-0.5 sm:p-1 shadow-sm">
              <input
                type="text"
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-black outline-none text-xs sm:text-sm placeholder-gray-400 min-w-0"
              />
              <button className="bg-[#fb5533] text-white px-3 sm:px-6 md:px-8 py-1 rounded-sm flex-shrink-0">
                <span className="font-bold">
                  <FontAwesomeIcon icon="magnifying-glass" />
                </span>
              </button>
            </div>

            {/* Render từ khóa lấy từ Redux */}
            <div className="flex gap-3 mt-1.5 overflow-x-auto max-h-5 text-[10px] md:text-[11px] opacity-95 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {trendingKeywords.map((kw, index) => (
                <span
                  key={index}
                  className="text-[13px] hover:text-gray-200 cursor-pointer transition flex-shrink-0"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div
            onClick={handleCartClick}
            className="relative cursor-pointer p-2 sm:p-3 flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl sm:text-2xl md:text-3xl">
              <FontAwesomeIcon icon="cart-shopping" />
            </span>

            {/* Chỉ hiển thị số lượng item khi giỏ hàng có đồ VÀ người dùng ĐÃ ĐĂNG NHẬP */}
            {totalItems > 0 && isLoggedIn && (
              <span className="absolute top-0 sm:top-1 right-0 sm:right-1 bg-white text-[#ee4d2d] text-[9px] sm:text-[10px] font-bold rounded-full sm:h-5 px-1 flex items-center justify-center border border-[#ee4d2d] w-[15px] !h-[15px] shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
