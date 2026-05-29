import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMockProducts } from "../../features/product/productSlice";
import ProductCard from "../../components/Common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductSuggestions() {
  const mockProducts = useSelector(selectMockProducts);
  return (
    <div className="w-full py-3 select-none ">
      {/* Tiêu đề Section (Có Thể Bạn Cũng Thích) */}
      <div className="flex justify-between items-center px-4 pb-4   ">
        <span className="text-gray-500 font-medium text-sm sm:text-base uppercase tracking-wide">
          CÓ THỂ BẠN CŨNG THÍCH
        </span>
        <button className="text-[#f6402e] text-xs sm:text-sm flex items-center gap-1 hover:opacity-80 transition font-medium">
          Xem Tất Cả
          <FontAwesomeIcon icon="chevron-right" className="text-[10px]" />
        </button>
      </div>

      {/* Lưới Grid bọc ProductCard: Tự động tính toán số cột theo kích thước màn hình */}
      {/* Trên mobile (mặc định): 2 cột | Từ màn hình sm trở lên: 3 cột | md: 4 cột | lg: 6 cột */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
        {mockProducts.map((product) => (
          <div key={product.id} className="h-full">
            {/* Gọi Component con của bạn và truyền data qua prop 'product' */}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
