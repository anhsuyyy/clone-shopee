import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white border rounded-t-sm border-transparent hover:!border-[#f6402e] hover:!shadow-md transition-all duration-200 flex flex-col h-full cursor-pointer text-decoration-none"
    >
      {/* Hình ảnh & Badge */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover "
          loading="lazy"
        />
        {/* Nhãn giảm giá */}
        <div className="absolute top-0 right-0 bg-orange-100 text-[#f6402e] text-xs px-1.5 py-0.5 font-semibold rounded-bl-sm">
          {product.discount}
        </div>
        {/* Nhãn 25.5 ở góc dưới trái của ảnh */}
        <div className="absolute bottom-0 left-0 flex items-center bg-blue-600 text-white text-[12px] sm:text-[16px] lg:text-[20px] font-bold px-1 rounded-r-sm">
          {product.badge}
          {/* Thay đổi ở div bọc này: thêm flex flex-col items-center và leading-tight để các dòng khít nhau đẹp hơn */}
          <div className="flex flex-col items-center justify-center text-[7px] px-1 leading-tight">
            <span>Shopee</span>
            <span className="text-[10px] lg:text-[12px] text-yellow-300 font-extrabold">
              Siêu Rẻ
            </span>
          </div>
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-2 flex flex-col flex-grow text-sm">
        {/* Tiêu đề (Giới hạn 2 dòng) */}
        <p className="text-black leading-tight min-h-[2.5rem] mb-1 overflow-hidden line-clamp-2">
          {" "}
          {/* Xóa các class không chuẩn Tailwind */}
          {product.isFavorite && (
            <span className="inline-block align-middle bg-[#f6402e] text-white text-[10px] px-1 py-0.5 rounded-sm mr-1 font-medium font-sans whitespace-nowrap">
              Yêu thích
            </span>
          )}
          <span className="align-middle">{product.name}</span>
        </p>
        {/* Giá & Đã bán */}
        <div className="mt-auto">
          <div className="flex items-baseline justify-between flex-wrap">
            <span className="text-[#f6402e] text-base font-medium">
              đ{product.price.toLocaleString()}
            </span>
            <span className="text-black text-[11px]">{product.sold}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay: Tìm sản phẩm tương tự */}
      <div className="absolute left-[-1px] right-[-1px] bottom-[-36px] bg-[#f6402e] text-white text-center py-2 text-sm z-10 hidden group-hover:block transition-all">
        Tìm sản phẩm tương tự
      </div>
    </Link>
  );
};

export default ProductCard;
