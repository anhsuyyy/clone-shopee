import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectHomeCategories,
  selectBannersRight,
  selectBannersLeft,
} from "../../features/product/productSlice";

export default function HomeWidgets() {
  const homeCategories = useSelector(selectHomeCategories);
  const bannersRight = useSelector(selectBannersRight);
  const bannersLeft = useSelector(selectBannersLeft);
  // Mảng chứa các ảnh banner của bạn

  // Quản lý vị trí ảnh đang hiển thị (0, 1, 2)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh sau mỗi 3 giây (Y như thuộc tính data-bs-ride="carousel")
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannersLeft.length);
    }, 3000);
    return () => clearInterval(timer); // Xóa timer khi component bị unmount để tránh rò rỉ bộ nhớ
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannersLeft.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === bannersLeft.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-white pb-2 sm:pb-4 shadow-sm select-none">
      <div className="container mx-auto px-2 sm:px-4 pt-2 sm:pt-4">
        {/* 1. KHU VỰC BANNER GHÉP ĐÔI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* BANNER CAROUSEL (ĐÃ LÀM LẠI CHUẨN TAILWIND) */}
          <div className="lg:col-span-2 relative rounded-sm overflow-hidden h-[160px] sm:h-[220px] md:h-[260px] group shadow-sm">
            {/* Vùng chứa các ảnh */}
            <div
              className="cursor-pointer w-full h-full flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {bannersLeft.map((banner, index) => (
                <img
                  key={index}
                  src={banner}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>

            {/* Nút bấm chuyển slide bên trái */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full hidden group-hover:block transition"
            >
              ❮
            </button>

            {/* Nút bấm chuyển slide bên phải */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full hidden group-hover:block transition"
            >
              ❯
            </button>

            {/* Các chấm tròn chỉ số bên dưới (Indicators) */}
            <div className=" absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {bannersLeft.map((_, index) => (
                <button
                  style={{ borderRadius: "999px" }}
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 2 BANNER NHỎ BÊN PHẢI (GIỮ NGUYÊN) */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 h-[90px] sm:h-[120px] lg:h-[260px]">
            {bannersRight.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Slide ${index}`}
                className="cursor-pointer w-full h-full object-cover min-h-[90px] sm:min-h-[120px] lg:h-full"
              />
            ))}
          </div>
        </div>

        {/* 2. HÀNG ICON DANH MỤC TÍNH NĂNG (GIỮ NGUYÊN) */}
        <div className="flex justify-between items-start mt-4 sm:mt-8 gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {homeCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center text-center cursor-pointer group min-w-[85px] sm:min-w-[110px] flex-shrink-0"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${cat.bg} flex items-center justify-center text-xl shadow-sm border border-gray-50 `}
              >
                <span>{cat.icon}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-700 mt-2 max-w-[75px] sm:max-w-[95px] block whitespace-normal group-hover:text-[#ee4d2d] transition">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
