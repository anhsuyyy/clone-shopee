import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectShopeeMallBanners,
  selectShopeeMallItems,
} from "../../features/product/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShopeeMall() {
  const banners = useSelector(selectShopeeMallBanners) || [];
  const mallItems = useSelector(selectShopeeMallItems) || [];

  return (
    <div className="container px-0 mx-auto mt-4 select-none relative group/mall">
      {/* 1. Header Tiêu đề Shopee Mall */}
      <div className="bg-white rounded-t-sm shadow-sm border-b border-gray-100 p-4 flex items-center  sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-red-600! font-bold text-lg tracking-wide uppercase border-r pr-3 border-gray-200">
            Shopee Mall
          </h2>
          {/* Các cam kết đặc trưng của Mall */}
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-700">
            <div className="flex items-center gap-1">
              <span className="text-red-500! font-bold">
                {" "}
                <FontAwesomeIcon icon="arrow-rotate-left" />
              </span>{" "}
              7 Ngày Trả Hàng
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500! font-bold">
                <FontAwesomeIcon icon="shield-halved" />
              </span>{" "}
              Chính Hãng 100%
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500! font-bold">
                {" "}
                <FontAwesomeIcon icon="truck-moving" />
              </span>{" "}
              Miễn Phí Vận Chuyển
            </div>
          </div>
        </div>
        <div className="flex content-center">
          <a
            href="#all-mall"
            className="text-red-600! hover:text-red-500 text-xs sm:text-sm font-medium flex items-center content-center gap-1 transition text-decoration-none"
          >
            Xem Tất Cả{" "}
            <span className="text-xs">
              <FontAwesomeIcon icon="circle-chevron-right" />
            </span>
          </a>
        </div>
      </div>

      {/* 2. Bố cục Nội dung chính chia khối */}
      <div className="bg-white rounded-b-sm shadow-sm flex lg:items-center flex-col lg:flex-row overflow-hidden relative border border-t-0 border-gray-200/60">
        {/* Khối Banner Trái: Chiếm trọn bên trái trên màn hình rộng, ẩn trên mobile hoặc xếp lên đầu */}
        <div className="hidden lg:block lg:w-[35%] sm:h-full lg:h-full flex-shrink-0 overflow-hidden relative group">
          <img
            src={banners[0]}
            alt="Mall Banner"
            className="w-full h-auto object-contain cursor-pointer mx-auto"
          />
        </div>

        <div className="w-full lg:w-[65%] relative overflow-hidden flex items-center bg-white">
          <div className="grid grid-rows-2 grid-flow-col overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full auto-cols-[25%] transition-all duration-300">
            {mallItems.map((item) => (
              <div
                key={item.id}
                className="relative w-full h-full flex flex-col justify-between py-3"
              >
                {/* 1. Phần ảnh chiếm trọn không gian phía trên */}
                <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cursor-pointer max-w-full max-h-full object-contain "
                  />
                </div>

                {/* 2. THÊM MỚI: Dòng chữ thương hiệu dùng absolute ghim ở đáy */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center w-full px-1 z-10 cursor-text">
                  <p className="text-[8px] sm:text-[12px] lg:text-[14px] text-center text-white bg-red-600 font-medium line-clamp-1 text-center">
                    {item.promo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
