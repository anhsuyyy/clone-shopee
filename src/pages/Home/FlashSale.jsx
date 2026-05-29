import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  tick,
  selectFlashSaleTimer,
} from "../../features/product/flashSaleSlice";
const FlashSale = () => {
  const dispatch = useDispatch();

  // Sử dụng selector đã viết ở slice để lấy thời gian đẹp (hh:mm:ss)
  const timer = useSelector(selectFlashSaleTimer);
  const { products } = useSelector((state) => state.flashSale);

  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(tick());
    }, 1000);

    // Xóa bộ đếm khi component unmount để tránh rò rỉ bộ nhớ (memory leak)
    return () => clearInterval(intervalId);
  }, [dispatch]);
  //

  return (
    <div className="container max-w-6xl mx-auto my-6 bg-white p-3 rounded shadow-sm relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
        <div className="flex items-center space-x-4 text-[10px] md:text-[14px] lg:text-[16px]">
          <span className="text-orange-600 font-black text-[16px] md:text-[18px] lg:text-[20px] italic tracking-tighter">
            FLASH SALE
          </span>
          <div className="flex items-center space-x-1 font-bold text-white ">
            <span className="bg-black px-1.5 py-0.5 rounded min-w-[12px] text-center">
              {timer.hours}
            </span>
            <span className="text-black font-extrabold">:</span>
            <span className="bg-black px-1.5 py-0.5 rounded min-w-[12px] text-center">
              {timer.minutes}
            </span>
            <span className="text-black font-extrabold">:</span>
            <span className="bg-black px-1.5 py-0.5 rounded min-w-[12px] text-center">
              {timer.seconds}
            </span>
          </div>
        </div>
        <a href="#all" className="text-sm text-orange-600! no-underline! ">
          Xem tất cả &gt;
        </a>
      </div>

      {/* Slider Viewport */}
      <div className="relative overflow-x-auto scroll-smooth scrollbar-none">
        {/* Khung chạy slide */}
        <div className="flex transition-transform duration-500 ease-in-out">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="w-1/3 sm:w-1/6 flex-shrink-0 p-1.5 box-border cursor-pointer transition duration-200 ease-in-out text-decoration-none"
            >
              <div className="flex flex-col justify-between rounded relative bg-white pb-2 hover:shadow-md transition-shadow">
                {/* Khu vực ảnh */}
                <div className="w-full aspect-square bg-gray-50 relative mb-3 overflow-hidden">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <span className="absolute top-0 left-0 bg-orange-600 text-white text-[9px] px-1 py-0.5 rounded-br-sm">
                    Yêu thích
                  </span>
                  <div className="absolute top-0 right-0 bg-yellow-400 text-orange-600 text-[10px] font-bold px-1 py-0.5">
                    {product.discount}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[9px] py-0.5 px-1 flex justify-between">
                    <span className="font-bold">25.5</span>
                    <span className="bg-yellow-400 text-blue-900 px-0.5 rounded-[2px] font-extrabold">
                      SIÊU RẺ
                    </span>
                  </div>
                </div>

                {/* Khu vực thông tin giá và tiến độ */}
                <div className="flex flex-col items-center px-1">
                  <div className="text-orange-600 font-medium text-base">
                    {product.price.toLocaleString()}
                    <span className="text-xs">₫</span>
                  </div>

                  {/* Thanh tiến trình lấy từ dữ liệu phần trăm của từng sản phẩm trên Store */}
                  <div className="w-full bg-orange-200 rounded-full h-4 mt-2 relative overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${product.progress}%` }}
                    ></div>
                    <span className="absolute text-[9px] text-white font-bold uppercase z-10">
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
