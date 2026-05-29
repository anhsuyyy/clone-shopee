import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectShopeeCategories } from "../../features/product/productSlice";

export default function HomeCategories() {
  const categories = useSelector(selectShopeeCategories) || [];
  const scrollRef = useRef(null);

  // State quản lý việc ẩn/hiện nút điều hướng thông minh ở 2 đầu biên
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Hàm tính toán vị trí cuộn để ẩn/hiện nút bấm giống Shopee
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Nếu tổng độ rộng cuộn lớn hơn vị trí hiện tại cộng khung nhìn -> còn có thể cuộn tiếp
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [categories]);

  // Hàm xử lý cuộn mượt mà khi click nút điều hướng
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      // Cuộn một khoảng bằng chính độ rộng của khung hiển thị hiện tại để trượt đúng 1 trang màn hình
      const scrollAmount =
        direction === "left"
          ? -scrollRef.current.clientWidth
          : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-0 mt-4 select-none relative group">
      {/* Khung nền trắng bọc toàn bộ khối danh mục */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-200/60 relative">
        {/* Tiêu đề Khối */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-gray-500 font-medium text-sm sm:text-base tracking-wide uppercase">
            Danh Mục
          </h2>
        </div>

        {/* 🎯 TỐI ƯU RESPONSIVE GRID CHIA CỘT TUYỆT ĐỐI:
            - grid-rows-2: Luôn luôn khóa cứng cấu trúc hiển thị ở đúng 2 dòng sản phẩm.
            - grid-flow-col: Phần tử xếp từ trên xuống dưới, điền đầy 2 hàng rồi tự động rẽ sang cột mới bên phải.
            - overflow-x-auto: Kích hoạt thanh cuộn ngang khi dữ liệu danh mục vượt quá số cột quy định.
            - grid-auto-columns-[20%]: Mặc định trên Điện thoại, ép cứng mỗi cột chiếm đúng 20% chiều rộng. Giúp hiển thị chuẩn xác ĐÚNG 5 CỘT trên màn hình, cột thứ 6 trở đi sẽ nằm chờ scroll.
            - md:grid-auto-columns-[10%]: Trên màn hình iPad (Tablet) và PC (Desktop), ép cứng mỗi cột chiếm đúng 10% chiều rộng. Giúp hiển thị chuẩn xác ĐÚNG 10 CỘT khít rịt trên màn hình!
        */}
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 auto-cols-[20%] lg:auto-cols-[10%]"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center p-3 text-center border-r border-b border-gray-100 cursor-pointer hover:bg-white hover:shadow-xl hover:scale-105 hover:z-10 transition-all duration-200 h-[140px] sm:h-[150px] origin-center bg-white w-full"
            >
              {/* Khung ảnh vuông chứa vòng tròn đổ bóng mờ của Shopee */}
              <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-[85%] h-[85%] object-cover rounded-2xl shadow-sm border border-gray-100"
                />
              </div>

              {/* Tên danh mục */}
              <span className="text-[11px] sm:text-[12px] text-gray-700 mt-2.5 line-clamp-2 min-h-[32px] px-1 leading-tight text-center">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 NÚT BẤM SANG TRÁI (❮) */}
      <button
        onClick={() => handleScroll("left")}
        className={`absolute -left-2 top-[60%] -translate-y-1/2 bg-white text-gray-600 shadow-lg border border-gray-200/80 w-10 h-10 aspect-square !rounded-full flex items-center justify-center z-20 hover:bg-gray-50 font-bold text-sm cursor-pointer p-0 m-0 overflow-hidden transform-gpu transition-all duration-300 ${
          canScrollLeft
            ? "opacity-50 group-hover:opacity-100 scale-75 group-hover:scale-110 hover:!scale-110 active:!scale-110"
            : "pointer-events-none !opacity-0"
        }`}
      >
        <span className="leading-none pr-0.5 select-none block">❮</span>
      </button>

      {/* 🎯 NÚT BẤM SANG PHẢI (❯) */}
      <button
        onClick={() => handleScroll("right")}
        className={`absolute -right-2 top-[60%] -translate-y-1/2 bg-white text-gray-600 shadow-lg border border-gray-200/80 w-10 h-10 aspect-square !rounded-full flex items-center justify-center z-20 hover:bg-gray-50 font-bold text-sm cursor-pointer p-0 m-0 overflow-hidden transform-gpu transition-all duration-300 ${
          canScrollRight
            ? "opacity-50 group-hover:opacity-100 scale-75 group-hover:scale-110 hover:!scale-110 active:!scale-110"
            : "pointer-events-none !opacity-0"
        }`}
      >
        <span className="leading-none pl-0.5 select-none block">❯</span>
      </button>
    </div>
  );
}
