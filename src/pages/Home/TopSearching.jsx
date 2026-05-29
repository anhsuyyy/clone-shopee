import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTopProducts } from "../../features/product/productSlice";
const TopSearching = () => {
  const topProducts = useSelector(selectTopProducts) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mỗi màn hình hiển thị cố định 5 sản phẩm
  const itemsPerPage = 5;
  return (
    <div className="container max-w-6xl mx-auto my-6 bg-white p-4 rounded shadow-sm relative group">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-orange-600! font-semibold m-0 text-center text-sm sm:text-base lg:text-xl uppercase tracking-wide">
          Tìm Kiếm Hàng Đầu
        </p>
        <a
          href="#all"
          className="text-sm text-orange-600! flex items-center text-decoration-none"
        >
          Xem Tất Cả <span className="ml-1">&gt;</span>
        </a>
      </div>
      {/* Khung chứa các item dịch chuyển bằng transform */}
      <div
        className="flex transition-transform duration-500 ease-in-out overflow-x-auto scroll-smooth scrollbar-none"
        style={{ transform: `translateX(-${currentIndex * 20}%)` }}
      >
        {topProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="w-1/3 sm:w-1/5 flex-shrink-0 p-2 relative box-border cursor-pointer  transition duration-200 ease-in-out text-decoration-none"
          >
            <div className="border border-gray-100  h-full flex flex-col justify-between relative bg-white">
              {/* Tag TOP màu cam góc trái */}
              <span className="absolute top-0 left-0 bg-orange-600 text-white text-[10px] sm:text-[12px] lg:text-[14px] font-bold px-1.5 py-0.5 rounded-br">
                TOP
              </span>

              {/* Ảnh sản phẩm */}
              <div className="w-full aspect-square bg-gray-50 mb-3 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Số lượng bán (Băng màu xám mờ phía dưới ảnh) */}
              <div className="bg-black/5 text-center text-xs py-1 text-gray-600 mb-2 font-medium">
                {product.sold}
              </div>

              {/* Tên sản phẩm */}
              <p className="text-[16px] line text-gray-800 line-clamp-2 min-h-[40px] font-normal px-3 leading-tight">
                {product.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSearching;
